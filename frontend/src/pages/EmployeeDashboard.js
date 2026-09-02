import React, { useCallback, useEffect, useMemo, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./EmployeeDashboard.css";

const REFRESH_MS = 10000;

/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

const toArray = (value) => {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) {
    return value.data;
  }

  if (Array.isArray(value?.content)) {
    return value.content;
  }

  if (Array.isArray(value?.items)) {
    return value.items;
  }

  return [];
};

const num = (...values) => {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      const n = Number(value);

      if (!Number.isNaN(n)) {
        return n;
      }
    }
  }

  return 0;
};

const statusOf = (item) =>
  String(
    item?.status ||
      item?.attendanceStatus ||
      ""
  ).toUpperCase();

const taskStatus = (task) =>
  String(task?.status || "").toUpperCase();

const leaveStatus = (leave) =>
  String(leave?.status || "").toUpperCase();

const employeeIdOf = (employee) =>
  employee?.id ??
  employee?.employeeId ??
  employee?.employeeID;

const employeeNameOf = (employee) => {
  if (!employee) {
    return "Employee";
  }

  if (employee.name) {
    return employee.name;
  }

  if (employee.fullName) {
    return employee.fullName;
  }

  if (employee.employeeName) {
    return employee.employeeName;
  }

  const first =
    employee.firstName ||
    employee.firstname ||
    "";

  const last =
    employee.lastName ||
    employee.lastname ||
    "";

  const fullName =
    `${first} ${last}`.trim();

  return (
    fullName ||
    employee.email ||
    "Employee"
  );
};

const initials = (name) => {
  return String(name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const formatDate = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatDateTime = (value) => {
  if (!value) {
    return "-";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
};

const sameDay = (value) => {
  if (!value) {
    return false;
  }

  const date = new Date(value);
  const now = new Date();

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

/* =========================================================
   EMPLOYEE DASHBOARD
   ========================================================= */

function EmployeeDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [attendanceToday, setAttendanceToday] = useState([]);
  const [attendanceHistory, setAttendanceHistory] =
    useState([]);
  const [attendanceSummary, setAttendanceSummary] =
    useState({});
  const [performances, setPerformances] =
    useState([]);
  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);

  const [connected, setConnected] =
    useState(false);

  const [error, setError] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState(false);

  const [lastUpdated, setLastUpdated] =
    useState(null);

  const [clock, setClock] =
    useState(new Date());

  /* =======================================================
     USER INFORMATION
     ======================================================= */

  const username =
    localStorage.getItem("username") ||
    localStorage.getItem("name") ||
    "Employee";

  const storedEmployeeId =
    localStorage.getItem("employeeId") ||
    localStorage.getItem("employeeID") ||
    localStorage.getItem("userId");

  /* =======================================================
     LOAD DASHBOARD DATA
     ======================================================= */

  const loadData = useCallback(
    async (manual = false) => {
      if (manual) {
        setRefreshing(true);
      }

      const requests = {
        dashboard:
          API.get("/dashboard"),

        employees:
          API.get("/employees"),

        tasks:
          API.get("/tasks"),

        leaves:
          API.get("/leave"),

        attendanceToday:
          API.get("/attendance/today"),

        attendanceHistory:
          API.get("/attendance/history"),

        attendanceSummary:
          API.get("/attendance/summary"),

        performances:
          API.get("/performance"),

        notifications:
          API.get("/notifications"),
      };

      const entries =
        Object.entries(requests);

      try {
        const results =
          await Promise.allSettled(
            entries.map(
              ([, request]) => request
            )
          );

        let successCount = 0;

        results.forEach(
          (result, index) => {
            if (
              result.status !==
              "fulfilled"
            ) {
              return;
            }

            successCount++;

            const key =
              entries[index][0];

            const data =
              result.value?.data;

            switch (key) {
              case "dashboard":
                setDashboard(
                  data || {}
                );
                break;

              case "employees":
                setEmployees(
                  toArray(data)
                );
                break;

              case "tasks":
                setTasks(
                  toArray(data)
                );
                break;

              case "leaves":
                setLeaves(
                  toArray(data)
                );
                break;

              case "attendanceToday":
                setAttendanceToday(
                  toArray(data)
                );
                break;

              case "attendanceHistory":
                setAttendanceHistory(
                  toArray(data)
                );
                break;

              case "attendanceSummary":
                setAttendanceSummary(
                  data || {}
                );
                break;

              case "performances":
                setPerformances(
                  toArray(data)
                );
                break;

              case "notifications":
                setNotifications(
                  toArray(data)
                );
                break;

              default:
                break;
            }
          }
        );

        if (successCount > 0) {
          setConnected(true);
          setError("");
          setLastUpdated(
            new Date()
          );
        } else {
          setConnected(false);

          setError(
            "NexusHR backend is not reachable."
          );
        }
      } catch (err) {
        console.error(
          "Employee dashboard error:",
          err
        );

        setConnected(false);

        setError(
          err?.response?.data
            ?.message ||
            err?.message ||
            "Unable to load employee dashboard."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  /* =======================================================
     AUTO REFRESH + LIVE CLOCK
     ======================================================= */

  useEffect(() => {
    loadData();

    const dataTimer =
      setInterval(() => {
        loadData();
      }, REFRESH_MS);

    const clockTimer =
      setInterval(() => {
        setClock(
          new Date()
        );
      }, 1000);

    return () => {
      clearInterval(dataTimer);
      clearInterval(clockTimer);
    };
  }, [loadData]);

  /* =======================================================
     CURRENT EMPLOYEE
     ======================================================= */

  const currentEmployee =
    useMemo(() => {
      if (!employees.length) {
        return null;
      }

      if (!storedEmployeeId) {
        return employees.find(
          (employee) => {
            const email =
              localStorage.getItem(
                "email"
              );

            return (
              email &&
              employee?.email ===
                email
            );
          }
        ) || employees[0];
      }

      return (
        employees.find(
          (employee) =>
            String(
              employeeIdOf(employee)
            ) ===
            String(storedEmployeeId)
        ) || employees[0]
      );
    }, [
      employees,
      storedEmployeeId,
    ]);

  const employeeId =
    employeeIdOf(
      currentEmployee
    );

  const employeeName =
    employeeNameOf(
      currentEmployee
    );

  /* =======================================================
     EMPLOYEE TASKS
     ======================================================= */

  const myTasks =
    useMemo(() => {
      if (!tasks.length) {
        return [];
      }

      if (!employeeId) {
        return tasks;
      }

      const filtered =
        tasks.filter(
          (task) =>
            String(
              task?.employeeId ??
                task?.employeeID ??
                task?.assignedEmployeeId ??
                task?.employee?.id
            ) ===
            String(employeeId)
        );

      return filtered.length
        ? filtered
        : tasks;
    }, [
      tasks,
      employeeId,
    ]);

  const pendingTasks =
    useMemo(() => {
      return myTasks.filter(
        (task) =>
          [
            "PENDING",
            "ASSIGNED",
            "IN_PROGRESS",
          ].includes(
            taskStatus(task)
          )
      );
    }, [myTasks]);

  const completedTasks =
    useMemo(() => {
      return myTasks.filter(
        (task) =>
          [
            "COMPLETED",
            "DONE",
          ].includes(
            taskStatus(task)
          )
      );
    }, [myTasks]);

  /* =======================================================
     MY LEAVES
     ======================================================= */

  const myLeaves =
    useMemo(() => {
      if (!leaves.length) {
        return [];
      }

      if (!employeeId) {
        return leaves;
      }

      const filtered =
        leaves.filter(
          (leave) =>
            String(
              leave?.employeeId ??
                leave?.employeeID ??
                leave?.employee?.id
            ) ===
            String(employeeId)
        );

      return filtered;
    }, [
      leaves,
      employeeId,
    ]);

  const pendingLeaves =
    useMemo(() => {
      return myLeaves.filter(
        (leave) =>
          [
            "PENDING",
            "PENDING_MANAGER",
            "PENDING_ADMIN",
            "PENDING_APPROVAL",
          ].includes(
            leaveStatus(leave)
          )
      );
    }, [myLeaves]);

  const approvedLeaves =
    useMemo(() => {
      return myLeaves.filter(
        (leave) =>
          leaveStatus(leave) ===
          "APPROVED"
      );
    }, [myLeaves]);

  /* =======================================================
     TODAY ATTENDANCE
     ======================================================= */

  const myAttendanceToday =
    useMemo(() => {
      if (!attendanceToday.length) {
        return null;
      }

      if (!employeeId) {
        return attendanceToday[0];
      }

      return (
        attendanceToday.find(
          (record) =>
            String(
              record?.employeeId ??
                record?.employeeID ??
                record?.employee?.id
            ) ===
            String(employeeId)
        ) || null
      );
    }, [
      attendanceToday,
      employeeId,
    ]);

  const todayAttendanceStatus =
    statusOf(
      myAttendanceToday
    );

  const isCheckedIn =
    Boolean(
      myAttendanceToday?.checkInTime ||
        myAttendanceToday?.checkIn ||
        [
          "PRESENT",
          "LATE",
          "WFH",
        ].includes(
          todayAttendanceStatus
        )
    ) &&
    !(
      myAttendanceToday?.checkOutTime ||
      myAttendanceToday?.checkOut
    );

  const isCheckedOut =
    Boolean(
      myAttendanceToday?.checkOutTime ||
        myAttendanceToday?.checkOut
    );

  /* =======================================================
     ATTENDANCE SUMMARY
     ======================================================= */

  const attendancePercentage =
    Math.min(
      100,
      Math.max(
        0,
        num(
          attendanceSummary.attendancePercentage,
          attendanceSummary.attendanceRate,
          dashboard.attendancePercentage
        )
      )
    );

  /* =======================================================
     MY PERFORMANCE
     ======================================================= */

  const myPerformance =
    useMemo(() => {
      if (!performances.length) {
        return [];
      }

      if (!employeeId) {
        return performances.slice(
          0,
          5
        );
      }

      return performances
        .filter(
          (performance) =>
            String(
              performance?.employeeId ??
                performance?.employeeID ??
                performance?.employee?.id
            ) ===
            String(employeeId)
        )
        .slice(0, 5);
    }, [
      performances,
      employeeId,
    ]);

  const latestPerformance =
    myPerformance[0];

  const performanceScore =
    num(
      latestPerformance?.overallScore,
      latestPerformance?.kpiScore,
      latestPerformance?.score
    );

  /* =======================================================
     MY ATTENDANCE HISTORY
     ======================================================= */

  const recentAttendance =
    useMemo(() => {
      if (!attendanceHistory.length) {
        return [];
      }

      let records =
        attendanceHistory;

      if (employeeId) {
        const filtered =
          attendanceHistory.filter(
            (record) =>
              String(
                record?.employeeId ??
                  record?.employeeID ??
                  record?.employee?.id
              ) ===
              String(employeeId)
          );

        if (filtered.length) {
          records = filtered;
        }
      }

      return [...records]
        .sort(
          (a, b) =>
            new Date(
              b?.date ||
                b?.attendanceDate ||
                b?.createdAt ||
                0
            ) -
            new Date(
              a?.date ||
                a?.attendanceDate ||
                a?.createdAt ||
                0
            )
        )
        .slice(0, 7);
    }, [
      attendanceHistory,
      employeeId,
    ]);

  /* =======================================================
     RECENT NOTIFICATIONS
     ======================================================= */

  const recentNotifications =
    useMemo(() => {
      return [...notifications]
        .sort(
          (a, b) =>
            new Date(
              b?.createdAt ||
                b?.createdDate ||
                b?.timestamp ||
                0
            ) -
            new Date(
              a?.createdAt ||
                a?.createdDate ||
                a?.timestamp ||
                0
            )
        )
        .slice(0, 5);
    }, [notifications]);

  /* =======================================================
     ATTENDANCE ACTIONS
     ======================================================= */

  const handleCheckIn =
    async () => {
      if (!employeeId) {
        setError(
          "Employee ID was not found. Please login again."
        );
        return;
      }

      setActionLoading(true);
      setError("");

      try {
        await API.post(
          `/attendance/checkin/${employeeId}`
        );

        await loadData(true);
      } catch (err) {
        console.error(
          "Check-in error:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Unable to check in."
        );
      } finally {
        setActionLoading(false);
      }
    };

  const handleCheckOut =
    async () => {
      if (!employeeId) {
        setError(
          "Employee ID was not found. Please login again."
        );
        return;
      }

      setActionLoading(true);
      setError("");

      try {
        await API.post(
          `/attendance/checkout/${employeeId}`
        );

        await loadData(true);
      } catch (err) {
        console.error(
          "Check-out error:",
          err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Unable to check out."
        );
      } finally {
        setActionLoading(false);
      }
    };

  /* =======================================================
     LOADING SCREEN
     ======================================================= */

  if (loading) {
    return (
      <div className="employee-layout">

        <Sidebar />

        <main className="employee-main">

          <Navbar />

          <div className="employee-loading">

            <div className="spinner-border text-primary" />

            <h5>
              Loading Employee Dashboard...
            </h5>

            <p>
              Connecting to live NexusHR data.
            </p>

          </div>

        </main>

      </div>
    );
  }

  /* =======================================================
     MAIN UI
     ======================================================= */

  return (
    <div className="employee-layout">

      <Sidebar />

      <main className="employee-main">

        <Navbar />

        <div className="employee-container">

          {/* =================================================
              HERO
              ================================================= */}

          <section className="employee-hero">

            <div>

              <div className="employee-live-line">

                <span
                  className={
                    connected
                      ? "employee-live-dot"
                      : "employee-offline-dot"
                  }
                />

                {connected
                  ? "LIVE COMPANY DATA"
                  : "BACKEND OFFLINE"}

              </div>

              <h1>
                Welcome back, {employeeName} 👋
              </h1>

              <p>
                View your attendance, tasks,
                leave requests and performance
                from your employee workspace.
              </p>

            </div>

            <div className="employee-time">

              <strong>
                {clock.toLocaleTimeString(
                  "en-IN",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }
                )}
              </strong>

              <span>
                {clock.toLocaleDateString(
                  "en-IN",
                  {
                    weekday: "long",
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>

              <button
                className="employee-refresh-btn"
                onClick={() =>
                  loadData(true)
                }
                disabled={refreshing}
              >
                {refreshing
                  ? "Refreshing..."
                  : "↻ Refresh"}
              </button>

            </div>

          </section>

          {/* =================================================
              ERROR
              ================================================= */}

          {error && (
            <div className="employee-alert">

              <span>
                ⚠
              </span>

              <span>
                {error}
              </span>

            </div>
          )}

          {/* =================================================
              KPI CARDS
              ================================================= */}

          <section className="employee-kpi-grid">

            <div className="employee-kpi">

              <div className="employee-kpi-icon">
                🕘
              </div>

              <div>

                <span>
                  Today's Status
                </span>

                <strong>
                  {todayAttendanceStatus ||
                    "NOT MARKED"}
                </strong>

                <small>
                  {myAttendanceToday
                    ? "Attendance recorded"
                    : "Attendance not recorded"}
                </small>

              </div>

            </div>

            <div className="employee-kpi">

              <div className="employee-kpi-icon green">
                ✓
              </div>

              <div>

                <span>
                  My Attendance
                </span>

                <strong>
                  {Math.round(
                    attendancePercentage
                  )}
                  %
                </strong>

                <small>
                  Current attendance rate
                </small>

              </div>

            </div>

            <div className="employee-kpi">

              <div className="employee-kpi-icon orange">
                ✓
              </div>

              <div>

                <span>
                  My Tasks
                </span>

                <strong>
                  {pendingTasks.length}
                </strong>

                <small>
                  {completedTasks.length} completed
                </small>

              </div>

            </div>

            <div className="employee-kpi">

              <div className="employee-kpi-icon purple">
                ★
              </div>

              <div>

                <span>
                  Performance
                </span>

                <strong>
                  {performanceScore || "-"}
                </strong>

                <small>
                  Latest available score
                </small>

              </div>

            </div>

          </section>

          {/* =================================================
              ATTENDANCE ACTION CARD
              ================================================= */}

          <section className="employee-card">

            <div className="employee-card-header">

              <div>

                <h2>
                  Today's Attendance
                </h2>

                <p>
                  Record your working time through
                  the NexusHR backend.
                </p>

              </div>

              <span className="employee-live-pill">
                ● LIVE
              </span>

            </div>

            <div className="attendance-action-layout">

              <div className="attendance-status-box">

                <div className="attendance-big-icon">
                  {isCheckedOut
                    ? "✓"
                    : isCheckedIn
                    ? "●"
                    : "○"}
                </div>

                <div>

                  <span>
                    Current Status
                  </span>

                  <strong>
                    {isCheckedOut
                      ? "CHECKED OUT"
                      : isCheckedIn
                      ? "CHECKED IN"
                      : "NOT CHECKED IN"}
                  </strong>

                </div>

              </div>

              <div className="attendance-times">

                <div>

                  <span>
                    Check In
                  </span>

                  <strong>
                    {myAttendanceToday?.checkInTime ||
                      myAttendanceToday?.checkIn ||
                      "-"}
                  </strong>

                </div>

                <div>

                  <span>
                    Check Out
                  </span>

                  <strong>
                    {myAttendanceToday?.checkOutTime ||
                      myAttendanceToday?.checkOut ||
                      "-"}
                  </strong>

                </div>

              </div>

              <div className="attendance-buttons">

                {!isCheckedIn &&
                  !isCheckedOut && (
                    <button
                      className="employee-checkin-btn"
                      onClick={
                        handleCheckIn
                      }
                      disabled={
                        actionLoading
                      }
                    >
                      {actionLoading
                        ? "Processing..."
                        : "✓ Check In"}
                    </button>
                  )}

                {isCheckedIn &&
                  !isCheckedOut && (
                    <button
                      className="employee-checkout-btn"
                      onClick={
                        handleCheckOut
                      }
                      disabled={
                        actionLoading
                      }
                    >
                      {actionLoading
                        ? "Processing..."
                        : "↗ Check Out"}
                    </button>
                  )}

                {isCheckedOut && (
                  <span className="attendance-complete">
                    ✓ Today's attendance completed
                  </span>
                )}

              </div>

            </div>

          </section>

          {/* =================================================
              TASKS + LEAVES
              ================================================= */}

          <div className="employee-two-column">

            {/* TASKS */}

            <section className="employee-card">

              <div className="employee-card-header">

                <div>

                  <h2>
                    My Tasks
                  </h2>

                  <p>
                    Current work assigned to you.
                  </p>

                </div>

                <span className="employee-count-pill">
                  {myTasks.length}
                </span>

              </div>

              {myTasks.length === 0 ? (

                <div className="employee-empty">

                  <div>
                    ✓
                  </div>

                  <strong>
                    No tasks found
                  </strong>

                  <span>
                    No task records were returned
                    by the backend.
                  </span>

                </div>

              ) : (

                myTasks
                  .slice(0, 6)
                  .map(
                    (
                      task,
                      index
                    ) => (

                      <div
                        className="employee-task-row"
                        key={
                          task?.id ||
                          index
                        }
                      >

                        <div className="employee-task-number">
                          {index + 1}
                        </div>

                        <div className="employee-task-info">

                          <strong>
                            {task?.title ||
                              task?.taskName ||
                              `Task #${
                                task?.id ||
                                index + 1
                              }`}
                          </strong>

                          <span>
                            {task?.description ||
                              task?.projectName ||
                              "Assigned work"}
                          </span>

                        </div>

                        <span
                          className={`employee-task-status employee-status-${taskStatus(
                            task
                          ).toLowerCase()}`}
                        >
                          {taskStatus(
                            task
                          ) || "UNKNOWN"}
                        </span>

                      </div>

                    )
                  )

              )}

            </section>

            {/* LEAVES */}

            <section className="employee-card">

              <div className="employee-card-header">

                <div>

                  <h2>
                    My Leave Requests
                  </h2>

                  <p>
                    Track your submitted leave requests.
                  </p>

                </div>

                <span className="employee-count-pill">
                  {myLeaves.length}
                </span>

              </div>

              {myLeaves.length === 0 ? (

                <div className="employee-empty">

                  <div>
                    📋
                  </div>

                  <strong>
                    No leave requests
                  </strong>

                  <span>
                    Your leave history will appear here.
                  </span>

                </div>

              ) : (

                myLeaves
                  .slice(0, 6)
                  .map(
                    (
                      leave,
                      index
                    ) => {

                      const status =
                        leaveStatus(
                          leave
                        );

                      return (

                        <div
                          className="employee-leave-row"
                          key={
                            leave?.id ||
                            index
                          }
                        >

                          <div className="employee-leave-icon">
                            📅
                          </div>

                          <div className="employee-leave-info">

                            <strong>
                              {leave?.leaveType ||
                                leave?.type ||
                                "Leave"}
                            </strong>

                            <span>

                              {formatDate(
                                leave?.startDate ||
                                  leave?.fromDate ||
                                  leave?.leaveDate
                              )}

                              {" → "}

                              {formatDate(
                                leave?.endDate ||
                                  leave?.toDate ||
                                  leave?.leaveDate
                              )}

                            </span>

                          </div>

                          <span
                            className={`employee-leave-status leave-${status.toLowerCase()}`}
                          >
                            {status ||
                              "UNKNOWN"}
                          </span>

                        </div>

                      );
                    }
                  )

              )}

            </section>

          </div>

          {/* =================================================
              ATTENDANCE HISTORY
              ================================================= */}

          <section className="employee-card">

            <div className="employee-card-header">

              <div>

                <h2>
                  Attendance History
                </h2>

                <p>
                  Your latest attendance records.
                </p>

              </div>

              <span className="employee-count-pill">
                {recentAttendance.length}
              </span>

            </div>

            {recentAttendance.length === 0 ? (

              <div className="employee-empty">

                <strong>
                  No attendance history
                </strong>

                <span>
                  Attendance records will appear here.
                </span>

              </div>

            ) : (

              <div className="employee-table-wrap">

                <table className="employee-table">

                  <thead>

                    <tr>

                      <th>
                        Date
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Check In
                      </th>

                      <th>
                        Check Out
                      </th>

                      <th>
                        Working Hours
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {recentAttendance.map(
                      (
                        record,
                        index
                      ) => (

                        <tr
                          key={
                            record?.id ||
                            index
                          }
                        >

                          <td>
                            {formatDate(
                              record?.date ||
                                record?.attendanceDate ||
                                record?.createdAt
                            )}
                          </td>

                          <td>

                            <span
                              className={`employee-status-chip attendance-${statusOf(
                                record
                              ).toLowerCase()}`}
                            >
                              {statusOf(
                                record
                              ) ||
                                "UNKNOWN"}
                            </span>

                          </td>

                          <td>
                            {record?.checkInTime ||
                              record?.checkIn ||
                              "-"}
                          </td>

                          <td>
                            {record?.checkOutTime ||
                              record?.checkOut ||
                              "-"}
                          </td>

                          <td>
                            {record?.workingHours ||
                              record?.hoursWorked ||
                              "-"}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </section>

          {/* =================================================
              PERFORMANCE + NOTIFICATIONS
              ================================================= */}

          <div className="employee-two-column">

            {/* PERFORMANCE */}

            <section className="employee-card">

              <div className="employee-card-header">

                <div>

                  <h2>
                    My Performance
                  </h2>

                  <p>
                    Latest available performance reviews.
                  </p>

                </div>

              </div>

              {myPerformance.length === 0 ? (

                <div className="employee-empty">

                  <strong>
                    No performance data
                  </strong>

                  <span>
                    Performance information will
                    appear when available.
                  </span>

                </div>

              ) : (

                myPerformance.map(
                  (
                    performance,
                    index
                  ) => {

                    const score =
                      num(
                        performance?.overallScore,
                        performance?.kpiScore,
                        performance?.score
                      );

                    return (

                      <div
                        className="employee-performance-row"
                        key={
                          performance?.id ||
                          index
                        }
                      >

                        <div className="employee-performance-icon">
                          ★
                        </div>

                        <div className="employee-performance-info">

                          <strong>
                            {performance?.reviewMonth ||
                              "Performance Review"}
                          </strong>

                          <span>
                            {performance?.remarks ||
                              performance?.comments ||
                              "Latest performance record"}
                          </span>

                        </div>

                        <strong className="employee-score">
                          {score || "-"}
                        </strong>

                      </div>

                    );
                  }
                )

              )}

            </section>

            {/* NOTIFICATIONS */}

            <section className="employee-card">

              <div className="employee-card-header">

                <div>

                  <h2>
                    Recent Notifications
                  </h2>

                  <p>
                    Latest HR and company updates.
                  </p>

                </div>

              </div>

              {recentNotifications.length === 0 ? (

                <div className="employee-empty">

                  <strong>
                    No recent notifications
                  </strong>

                  <span>
                    New HR notifications will appear here.
                  </span>

                </div>

              ) : (

                recentNotifications.map(
                  (
                    notification,
                    index
                  ) => (

                    <div
                      className="employee-notification-row"
                      key={
                        notification?.id ||
                        index
                      }
                    >

                      <div className="employee-notification-icon">
                        •
                      </div>

                      <div>

                        <strong>
                          {notification?.title ||
                            "HR Notification"}
                        </strong>

                        <span>
                          {notification?.message ||
                            "No message available."}
                        </span>

                        <small>
                          {formatDateTime(
                            notification?.createdAt ||
                              notification?.createdDate ||
                              notification?.timestamp
                          )}
                        </small>

                      </div>

                    </div>

                  )
                )

              )}

            </section>

          </div>

          {/* =================================================
              FOOTER
              ================================================= */}

          <footer className="employee-footer">

            <span>
              NexusHR Employee Workspace
            </span>

            <span>
              {connected
                ? "Connected to backend"
                : "Backend connection unavailable"}
            </span>

            <span>
              Last sync:{" "}
              {lastUpdated
                ? lastUpdated.toLocaleTimeString(
                    "en-IN"
                  )
                : "-"}
            </span>

          </footer>

        </div>

      </main>

    </div>
  );
}

export default EmployeeDashboard;