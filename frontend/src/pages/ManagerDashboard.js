import React, { useCallback, useEffect, useMemo, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./ManagerDashboard.css";

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
    if (value !== undefined && value !== null && value !== "") {
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

const employeeIdOf = (employee) =>
  employee?.id ??
  employee?.employeeId ??
  employee?.employeeID;

const employeeNameOf = (employee) => {
  if (!employee) {
    return "Unknown";
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
    `Employee #${employeeIdOf(employee) || "-"}`
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

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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

const taskStatus = (task) =>
  String(task?.status || "").toUpperCase();

const leaveStatus = (leave) =>
  String(leave?.status || "").toUpperCase();

/* =========================================================
   MANAGER DASHBOARD
   ========================================================= */

function ManagerDashboard() {
  const [dashboard, setDashboard] = useState({});

  const [employees, setEmployees] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [leaves, setLeaves] =
    useState([]);

  const [attendanceToday, setAttendanceToday] =
    useState([]);

  const [attendanceSummary, setAttendanceSummary] =
    useState({});

  const [performances, setPerformances] =
    useState([]);

  const [notifications, setNotifications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [connected, setConnected] =
    useState(false);

  const [error, setError] =
    useState("");

  const [actionId, setActionId] =
    useState(null);

  const [lastUpdated, setLastUpdated] =
    useState(null);

  const [clock, setClock] =
    useState(new Date());

  /* =======================================================
     USER
     ======================================================= */

  const username =
    localStorage.getItem("username") ||
    "Manager";

  /* =======================================================
     LOAD DASHBOARD DATA
     ======================================================= */

  const loadData = useCallback(
    async (manual = false) => {
      if (manual) {
        setRefreshing(true);
      }

      const requests = {
        dashboard: API.get("/dashboard"),

        employees: API.get("/employees"),

        tasks: API.get("/tasks"),

        leaves: API.get("/leave"),

        attendanceToday:
          API.get("/attendance/today"),

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
          "Manager dashboard error:",
          err
        );

        setConnected(false);

        setError(
          err?.response?.data
            ?.message ||
            err?.message ||
            "Unable to load manager dashboard."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  /* =======================================================
     REAL-TIME REFRESH
     ======================================================= */

  useEffect(() => {
    loadData();

    const dataTimer =
      setInterval(() => {
        loadData();
      }, REFRESH_MS);

    const clockTimer =
      setInterval(() => {
        setClock(new Date());
      }, 1000);

    return () => {
      clearInterval(dataTimer);
      clearInterval(clockTimer);
    };
  }, [loadData]);

  /* =======================================================
     TEAM MEMBERS
     ======================================================= */

  const totalTeam = num(
    dashboard.totalEmployees,
    dashboard.teamMembers,
    employees.length
  );

  /* =======================================================
     ACTIVE TEAM
     ======================================================= */

  const activeTeam = useMemo(() => {
    const direct =
      dashboard.activeEmployees;

    if (
      direct !== undefined &&
      direct !== null
    ) {
      return num(direct);
    }

    return employees.filter(
      (employee) => {
        const status =
          String(
            employee?.status ||
              employee?.employmentStatus ||
              ""
          ).toUpperCase();

        return (
          employee?.active === true ||
          status === "ACTIVE"
        );
      }
    ).length;
  }, [
    dashboard,
    employees,
  ]);

  /* =======================================================
     PRESENT TODAY
     ======================================================= */

  const presentToday = num(
    attendanceSummary.presentToday,
    dashboard.presentToday,

    attendanceToday.filter(
      (attendance) =>
        [
          "PRESENT",
          "LATE",
          "WFH",
        ].includes(
          statusOf(attendance)
        )
    ).length
  );

  /* =======================================================
     LATE TODAY
     ======================================================= */

  const lateToday = num(
    attendanceSummary.lateToday,
    dashboard.lateToday,

    attendanceToday.filter(
      (attendance) =>
        statusOf(attendance) ===
        "LATE"
    ).length
  );

  /* =======================================================
     WFH TODAY
     ======================================================= */

  const wfhToday =
    attendanceToday.filter(
      (attendance) =>
        statusOf(attendance) ===
        "WFH"
    ).length;

  /* =======================================================
     ATTENDANCE PERCENTAGE
     ======================================================= */

  const attendancePercentage =
    Math.min(
      100,
      Math.max(
        0,
        num(
          attendanceSummary.attendancePercentage,

          attendanceSummary.attendanceRate,

          dashboard.attendancePercentage,

          totalTeam
            ? (presentToday /
                totalTeam) *
                100
            : 0
        )
      )
    );

  /* =======================================================
     PENDING TASKS
     ======================================================= */

  const pendingTasks =
    useMemo(() => {
      return tasks.filter(
        (task) =>
          [
            "PENDING",
            "IN_PROGRESS",
            "ASSIGNED",
          ].includes(
            taskStatus(task)
          )
      ).length;
    }, [tasks]);

  /* =======================================================
     COMPLETED TASKS
     ======================================================= */

  const completedTasks =
    useMemo(() => {
      return tasks.filter(
        (task) =>
          [
            "COMPLETED",
            "DONE",
          ].includes(
            taskStatus(task)
          )
      ).length;
    }, [tasks]);

  /* =======================================================
     PENDING LEAVES
     ======================================================= */

  const pendingLeaves =
    useMemo(() => {
      return leaves.filter(
        (leave) =>
          [
            "PENDING",
            "PENDING_ADMIN",
          ].includes(
            leaveStatus(leave)
          )
      );
    }, [leaves]);

  /* =======================================================
     APPROVED LEAVES
     ======================================================= */

  const approvedLeaves =
    useMemo(() => {
      return leaves.filter(
        (leave) =>
          leaveStatus(leave) ===
          "APPROVED"
      ).length;
    }, [leaves]);

  /* =======================================================
     TODAY'S APPROVED LEAVE
     ======================================================= */

  const todayLeaveCount =
    useMemo(() => {
      return leaves.filter(
        (leave) =>
          leaveStatus(leave) ===
            "APPROVED" &&
          (
            sameDay(
              leave?.startDate
            ) ||
            sameDay(
              leave?.fromDate
            ) ||
            sameDay(
              leave?.leaveDate
            )
          )
      ).length;
    }, [leaves]);

  /* =======================================================
     RECENT TASKS
     ======================================================= */

  const recentTasks =
    useMemo(() => {
      return [...tasks]
        .sort(
          (a, b) =>
            new Date(
              b?.createdAt ||
                b?.createdDate ||
                0
            ) -
            new Date(
              a?.createdAt ||
                a?.createdDate ||
                0
            )
        )
        .slice(0, 6);
    }, [tasks]);

  /* =======================================================
     TOP PERFORMERS
     ======================================================= */

  const topPerformers =
    useMemo(() => {
      return [...performances]
        .sort(
          (a, b) =>
            num(
              b?.overallScore,
              b?.kpiScore,
              b?.score
            ) -
            num(
              a?.overallScore,
              a?.kpiScore,
              a?.score
            )
        )
        .slice(0, 5);
    }, [performances]);

  /* =======================================================
     RECENT ACTIVITY
     ======================================================= */

  const recentActivity =
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
     APPROVE LEAVE
     ======================================================= */

  const approveLeave = async (id) => {
    setActionId(id);

    try {
      await API.put(
        `/leave/manager-approve/${id}`
      );

      await loadData(true);
    } catch (err) {
      console.error(
        "Approve leave error:",
        err
      );

      setError(
        err?.response?.data
          ?.message ||
          "Unable to approve leave request."
      );
    } finally {
      setActionId(null);
    }
  };

  /* =======================================================
     REJECT LEAVE
     ======================================================= */

  const rejectLeave = async (id) => {
    setActionId(id);

    try {
      await API.put(
        `/leave/reject/${id}`
      );

      await loadData(true);
    } catch (err) {
      console.error(
        "Reject leave error:",
        err
      );

      setError(
        err?.response?.data
          ?.message ||
          "Unable to reject leave request."
      );
    } finally {
      setActionId(null);
    }
  };

  /* =======================================================
     LOADING SCREEN
     ======================================================= */

  if (loading) {
    return (
      <div className="manager-layout">
        <Sidebar />

        <main className="manager-main">
          <Navbar />

          <div className="manager-loading">
            <div className="spinner-border text-primary" />

            <h5>
              Loading Manager Dashboard...
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
     MAIN DASHBOARD
     ======================================================= */

  return (
    <div className="manager-layout">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <main className="manager-main">

        {/* NAVBAR */}

        <Navbar />

        <div className="manager-container">

          {/* =================================================
              HERO
          ================================================= */}

          <section className="manager-hero">

            <div>

              <div className="manager-live-line">

                <span
                  className={
                    connected
                      ? "live-dot"
                      : "offline-dot"
                  }
                />

                {connected
                  ? "LIVE COMPANY DATA"
                  : "BACKEND OFFLINE"}

              </div>

              <h1>
                Good morning, {username} 👋
              </h1>

              <p>
                Manage your team, attendance,
                tasks and leave approvals from
                one professional workspace.
              </p>

            </div>

            <div className="manager-time">

              <strong>
                {clock.toLocaleTimeString(
                  "en-IN",
                  {
                    hour:
                      "2-digit",
                    minute:
                      "2-digit",
                    second:
                      "2-digit",
                  }
                )}
              </strong>

              <span>
                {clock.toLocaleDateString(
                  "en-IN",
                  {
                    weekday:
                      "long",
                    day:
                      "2-digit",
                    month:
                      "short",
                    year:
                      "numeric",
                  }
                )}
              </span>

              <button
                className="manager-refresh-btn"
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
            <div className="manager-alert">

              <span>⚠</span>

              <span>
                {error}
              </span>

            </div>
          )}

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <section className="manager-kpi-grid">

            {/* TEAM */}

            <div className="manager-kpi">

              <div className="kpi-icon">
                👥
              </div>

              <div>

                <span>
                  Team Members
                </span>

                <strong>
                  {totalTeam}
                </strong>

                <small>
                  {activeTeam} active employees
                </small>

              </div>

            </div>

            {/* ATTENDANCE */}

            <div className="manager-kpi">

              <div className="kpi-icon green">
                ✓
              </div>

              <div>

                <span>
                  Attendance Today
                </span>

                <strong>
                  {Math.round(
                    attendancePercentage
                  )}
                  %
                </strong>

                <small>
                  {presentToday} present
                </small>

              </div>

            </div>

            {/* TASKS */}

            <div className="manager-kpi">

              <div className="kpi-icon orange">
                ✓
              </div>

              <div>

                <span>
                  Pending Tasks
                </span>

                <strong>
                  {pendingTasks}
                </strong>

                <small>
                  {completedTasks} completed
                </small>

              </div>

            </div>

            {/* LEAVES */}

            <div className="manager-kpi">

              <div className="kpi-icon red">
                📋
              </div>

              <div>

                <span>
                  Leave Requests
                </span>

                <strong>
                  {pendingLeaves.length}
                </strong>

                <small>
                  {approvedLeaves} approved
                </small>

              </div>

            </div>

          </section>

          {/* =================================================
              ATTENDANCE
          ================================================= */}

          <section className="manager-card">

            <div className="manager-card-header">

              <div>

                <h2>
                  Today's Team Attendance
                </h2>

                <p>
                  Live records from the attendance service.
                </p>

              </div>

              <span className="live-pill">
                ● LIVE
              </span>

            </div>

            <div className="attendance-mini-grid">

              {/* PRESENT */}

              <div>

                <span>
                  Present
                </span>

                <strong className="text-green">
                  {presentToday}
                </strong>

              </div>

              {/* LATE */}

              <div>

                <span>
                  Late
                </span>

                <strong className="text-orange">
                  {lateToday}
                </strong>

              </div>

              {/* WFH */}

              <div>

                <span>
                  WFH
                </span>

                <strong className="text-blue">
                  {wfhToday}
                </strong>

              </div>

              {/* LEAVE */}

              <div>

                <span>
                  On Leave
                </span>

                <strong>
                  {todayLeaveCount}
                </strong>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="progress-track">

              <div
                className="progress-value"
                style={{
                  width:
                    `${attendancePercentage}%`,
                }}
              />

            </div>

            <div className="progress-caption">

              <span>
                Team attendance rate
              </span>

              <strong>
                {Math.round(
                  attendancePercentage
                )}
                %
              </strong>

            </div>

          </section>

          {/* =================================================
              TWO COLUMN
          ================================================= */}

          <div className="manager-two-column">

            {/* =================================================
                LEAVE APPROVAL
            ================================================= */}

            <section className="manager-card">

              <div className="manager-card-header">

                <div>

                  <h2>
                    Leave Approvals
                  </h2>

                  <p>
                    Review pending requests.
                  </p>

                </div>

                <span className="count-pill">
                  {pendingLeaves.length}
                </span>

              </div>

              {pendingLeaves.length === 0 ? (

                <div className="manager-empty">

                  <div>
                    ✓
                  </div>

                  <strong>
                    No pending requests
                  </strong>

                  <span>
                    Your team is up to date.
                  </span>

                </div>

              ) : (

                <div>

                  {pendingLeaves
                    .slice(0, 5)
                    .map((leave) => {

                      const employee =
                        employees.find(
                          (employee) =>
                            String(
                              employeeIdOf(
                                employee
                              )
                            ) ===
                            String(
                              leave?.employeeId ??
                                leave
                                  ?.employee
                                  ?.id
                            )
                        );

                      const name =
                        leave?.employeeName ||
                        employeeNameOf(
                          employee
                        );

                      return (

                        <div
                          className="leave-request"
                          key={leave.id}
                        >

                          <div className="employee-avatar">
                            {initials(name)}
                          </div>

                          <div className="leave-request-info">

                            <strong>
                              {name}
                            </strong>

                            <span>
                              {leave?.leaveType ||
                                leave?.type ||
                                "Leave"}
                            </span>

                            <small>

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

                            </small>

                          </div>

                          <div className="leave-actions">

                            <button
                              className="approve-btn"
                              disabled={
                                actionId ===
                                leave.id
                              }
                              onClick={() =>
                                approveLeave(
                                  leave.id
                                )
                              }
                            >

                              {actionId ===
                              leave.id
                                ? "..."
                                : "Approve"}

                            </button>

                            <button
                              className="reject-btn"
                              disabled={
                                actionId ===
                                leave.id
                              }
                              onClick={() =>
                                rejectLeave(
                                  leave.id
                                )
                              }
                            >
                              Reject
                            </button>

                          </div>

                        </div>

                      );
                    })}

                </div>

              )}

            </section>

            {/* =================================================
                TASKS
            ================================================= */}

            <section className="manager-card">

              <div className="manager-card-header">

                <div>

                  <h2>
                    Team Tasks
                  </h2>

                  <p>
                    Current task workload.
                  </p>

                </div>

                <span className="count-pill">
                  {tasks.length}
                </span>

              </div>

              {recentTasks.length === 0 ? (

                <div className="manager-empty">

                  <div>
                    ✓
                  </div>

                  <strong>
                    No task records
                  </strong>

                  <span>
                    No tasks were returned by the backend.
                  </span>

                </div>

              ) : (

                <div>

                  {recentTasks.map(
                    (task, index) => (

                      <div
                        className="task-row"
                        key={
                          task.id ||
                          index
                        }
                      >

                        <div className="task-number">
                          {index + 1}
                        </div>

                        <div className="task-info">

                          <strong>
                            {task?.title ||
                              task?.taskName ||
                              `Task #${
                                task?.id ||
                                index + 1
                              }`}
                          </strong>

                          <span>
                            {task?.employeeName ||
                              task?.assignedToName ||
                              task?.assignee ||
                              "Assigned team task"}
                          </span>

                        </div>

                        <span
                          className={`task-status status-${taskStatus(
                            task
                          ).toLowerCase()}`}
                        >
                          {taskStatus(task) ||
                            "UNKNOWN"}
                        </span>

                      </div>

                    )
                  )}

                </div>

              )}

            </section>

          </div>

          {/* =================================================
              TEAM DIRECTORY
          ================================================= */}

          <section className="manager-card">

            <div className="manager-card-header">

              <div>

                <h2>
                  Team Directory
                </h2>

                <p>
                  Employees currently returned by
                  the HR backend.
                </p>

              </div>

              <span className="count-pill">
                {employees.length}
              </span>

            </div>

            <div className="manager-table-wrap">

              <table className="manager-table">

                <thead>

                  <tr>

                    <th>
                      Employee
                    </th>

                    <th>
                      Department
                    </th>

                    <th>
                      Designation
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Today
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {employees
                    .slice(0, 10)
                    .map(
                      (
                        employee,
                        index
                      ) => {

                        const id =
                          employeeIdOf(
                            employee
                          );

                        const attendance =
                          attendanceToday.find(
                            (record) =>
                              String(
                                record?.employeeId ??
                                  record?.employeeID ??
                                  record
                                    ?.employee
                                    ?.id
                              ) ===
                              String(id)
                          );

                        const employeeStatus =
                          String(
                            employee?.status ||
                              employee?.employmentStatus ||
                              ""
                          )
                            .toUpperCase() ||
                          "ACTIVE";

                        return (

                          <tr
                            key={
                              id ||
                              index
                            }
                          >

                            <td>

                              <div className="employee-cell">

                                <div className="employee-avatar">

                                  {initials(
                                    employeeNameOf(
                                      employee
                                    )
                                  )}

                                </div>

                                <div>

                                  <strong>
                                    {employeeNameOf(
                                      employee
                                    )}
                                  </strong>

                                  <small>
                                    ID:{" "}
                                    {id ||
                                      "-"}
                                  </small>

                                </div>

                              </div>

                            </td>

                            <td>
                              {employee?.departmentName ||
                                employee?.department
                                  ?.name ||
                                employee?.department ||
                                "-"}
                            </td>

                            <td>
                              {employee?.designation ||
                                employee?.role ||
                                "-"}
                            </td>

                            <td>

                              <span
                                className={`status-chip ${
                                  employeeStatus ===
                                  "ACTIVE"
                                    ? "active"
                                    : "inactive"
                                }`}
                              >
                                {employeeStatus}
                              </span>

                            </td>

                            <td>

                              <span
                                className={`status-chip attendance-${statusOf(
                                  attendance
                                ).toLowerCase()}`}
                              >
                                {statusOf(
                                  attendance
                                ) ||
                                  "NOT MARKED"}
                              </span>

                            </td>

                          </tr>

                        );
                      }
                    )}

                </tbody>

              </table>

            </div>

          </section>

          {/* =================================================
              PERFORMANCE + ACTIVITY
          ================================================= */}

          <div className="manager-two-column">

            {/* PERFORMANCE */}

            <section className="manager-card">

              <div className="manager-card-header">

                <div>

                  <h2>
                    Performance Snapshot
                  </h2>

                  <p>
                    Highest available performance scores.
                  </p>

                </div>

              </div>

              {topPerformers.length === 0 ? (

                <div className="manager-empty">

                  <strong>
                    No performance data
                  </strong>

                  <span>
                    Performance records will
                    appear here when available.
                  </span>

                </div>

              ) : (

                topPerformers.map(
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
                        className="performance-row"
                        key={
                          performance?.id ||
                          index
                        }
                      >

                        <div className="rank">
                          #{index + 1}
                        </div>

                        <div className="performance-info">

                          <strong>
                            {performance?.employeeName ||
                              `Employee #${
                                performance?.employeeId ||
                                "-"
                              }`}
                          </strong>

                          <span>
                            {performance?.reviewMonth ||
                              "Latest review"}
                          </span>

                        </div>

                        <div className="score">
                          {score}
                        </div>

                      </div>

                    );
                  }
                )

              )}

            </section>

            {/* ACTIVITY */}

            <section className="manager-card">

              <div className="manager-card-header">

                <div>

                  <h2>
                    Recent HR Activity
                  </h2>

                  <p>
                    Latest backend notifications.
                  </p>

                </div>

              </div>

              {recentActivity.length === 0 ? (

                <div className="manager-empty">

                  <strong>
                    No recent activity
                  </strong>

                  <span>
                    No notifications were returned.
                  </span>

                </div>

              ) : (

                recentActivity.map(
                  (
                    item,
                    index
                  ) => (

                    <div
                      className="activity-row"
                      key={
                        item?.id ||
                        index
                      }
                    >

                      <div className="activity-icon">
                        •
                      </div>

                      <div>

                        <strong>
                          {item?.title ||
                            "HR Notification"}
                        </strong>

                        <span>
                          {item?.message ||
                            "No message available."}
                        </span>

                      </div>

                      <small>
                        {formatDate(
                          item?.createdAt ||
                            item?.createdDate ||
                            item?.timestamp
                        )}
                      </small>

                    </div>

                  )
                )

              )}

            </section>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="manager-footer">

            <span>
              NexusHR Manager Workspace
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

export default ManagerDashboard;