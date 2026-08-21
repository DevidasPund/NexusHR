import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  /* =====================================================
     LOAD DATA
  ===================================================== */

  useEffect(() => {
    loadData();

    const dataInterval = setInterval(() => {
      loadData();
    }, 10000);

    const clockInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const loadData = async () => {
    try {
      const requests = [
        API.get("/dashboard"),
        API.get("/tasks"),
        API.get("/leave"),
        API.get("/employees")
      ];

      const [
        dashboardRes,
        taskRes,
        leaveRes,
        employeeRes
      ] = await Promise.allSettled(requests);

      if (dashboardRes.status === "fulfilled") {
        setDashboard(dashboardRes.value.data || {});
      }

      if (taskRes.status === "fulfilled") {
        setTasks(
          Array.isArray(taskRes.value.data)
            ? taskRes.value.data
            : []
        );
      }

      if (leaveRes.status === "fulfilled") {
        setLeaves(
          Array.isArray(leaveRes.value.data)
            ? leaveRes.value.data
            : []
        );
      }

      if (employeeRes.status === "fulfilled") {
        setEmployees(
          Array.isArray(employeeRes.value.data)
            ? employeeRes.value.data
            : []
        );
      }

      setLoading(false);

    } catch (error) {
      console.error(
        "Manager dashboard error:",
        error
      );

      setLoading(false);
    }
  };

  /* =====================================================
     LEAVE ACTIONS
  ===================================================== */

  const approveLeave = async (id) => {
    try {
      await API.put(
        `/leave/manager-approve/${id}`
      );

      await loadData();

    } catch (error) {
      console.error(
        "Approve leave error:",
        error
      );
    }
  };

  const rejectLeave = async (id) => {
    try {
      await API.put(
        `/leave/manager-reject/${id}`
      );

      await loadData();

    } catch (error) {
      console.error(
        "Reject leave error:",
        error
      );
    }
  };

  /* =====================================================
     USER
  ===================================================== */

  const username =
    localStorage.getItem("username") ||
    "Manager";

  /* =====================================================
     TASK CALCULATIONS
  ===================================================== */

  const pendingTasks = tasks.filter(
    (task) =>
      String(task.status).toUpperCase() ===
      "PENDING"
  ).length;

  const completedTasks = tasks.filter(
    (task) =>
      String(task.status).toUpperCase() ===
      "COMPLETED"
  ).length;

  const totalTasks = tasks.length;

  const taskCompletion =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  /* =====================================================
     LEAVE CALCULATIONS
  ===================================================== */

  const pendingLeaves = leaves.filter(
    (leave) =>
      String(leave.status).toUpperCase() ===
      "PENDING"
  );

  const approvedLeaves = leaves.filter(
    (leave) =>
      String(leave.status).toUpperCase() ===
      "APPROVED"
  ).length;

  /* =====================================================
     TEAM
  ===================================================== */

  const totalTeam =
    dashboard.totalEmployees ??
    dashboard.teamMembers ??
    employees.length ??
    0;

  const activeEmployees =
    dashboard.activeEmployees ??
    employees.filter(
      (employee) =>
        String(employee.status).toUpperCase() ===
        "ACTIVE"
    ).length;

  const projects =
    dashboard.totalProjects ?? 0;

  const attendance =
    dashboard.attendancePercentage ??
    0;

  /* =====================================================
     PERFORMANCE
  ===================================================== */

  const performanceEmployees = [...employees]
    .filter(
      (employee) =>
        employee.performanceScore !== null &&
        employee.performanceScore !== undefined
    )
    .sort(
      (a, b) =>
        Number(b.performanceScore || 0) -
        Number(a.performanceScore || 0)
    )
    .slice(0, 8);

  /* =====================================================
     FALLBACK PERFORMANCE DATA
  ===================================================== */

  const fallbackPerformance = [
    {
      name: "Team Member",
      score: 90
    },
    {
      name: "Team Member",
      score: 88
    },
    {
      name: "Team Member",
      score: 85
    },
    {
      name: "Team Member",
      score: 80
    }
  ];

  const performers =
    performanceEmployees.length > 0
      ? performanceEmployees.map(
          (employee) => ({
            name:
              `${employee.firstName || ""} ${
                employee.lastName || ""
              }`.trim() ||
              employee.username ||
              "Employee",

            score: Number(
              employee.performanceScore || 0
            )
          })
        )
      : fallbackPerformance;

  /* =====================================================
     ATTENDANCE
  ===================================================== */

  const attendanceValue =
    Number(attendance) > 0
      ? Math.min(Number(attendance), 100)
      : 75;

  const attendanceBars = [
    82,
    68,
    76,
    84,
    62,
    58,
    47,
    78,
    83,
    42,
    70,
    attendanceValue
  ];

  /* =====================================================
     DATE / TIME
  ===================================================== */

  const formatTime = () => {
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  const formatDate = () => {
    return time.toLocaleDateString([], {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="manager-layout">

        <Sidebar />

        <main className="manager-main">

          <Navbar />

          <div className="manager-container">

            <div className="manager-panel">
              <div className="empty-state">
                Loading Manager Dashboard...
              </div>
            </div>

          </div>

        </main>

      </div>
    );
  }

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <div className="manager-layout">

      <Sidebar />

      <main className="manager-main">

        <Navbar />

        <div className="manager-container">

          {/* =================================================
              WELCOME
          ================================================= */}

          <div className="manager-top">

            <div className="manager-welcome">

              <div className="manager-avatar-small">
                👨‍💼
              </div>

              <div>

                <h2>
                  Good Morning, {username} 👋
                </h2>

                <p>
                  Let's manage your employees in one place.
                </p>

              </div>

            </div>

            <div className="manager-date">
              📅 {formatDate()}
            </div>

          </div>


          {/* =================================================
              KPI CARDS
          ================================================= */}

          <div className="manager-grid">

            {/* TEAM */}

            <div className="manager-card stat-card">

              <div className="stat-top">

                <div className="stat-icon orange">
                  👥
                </div>

                <span className="stat-change green">
                  Active
                </span>

              </div>

              <h2>
                {totalTeam}
              </h2>

              <p>
                Team Members
              </p>

              <div className="mini-chart green-chart">
                ╱╲╱╲━━╱╲╱
              </div>

            </div>


            {/* TASKS */}

            <div className="manager-card stat-card">

              <div className="stat-top">

                <div className="stat-icon orange">
                  📋
                </div>

                <span className="stat-change red">
                  {pendingTasks} pending
                </span>

              </div>

              <h2>
                {pendingTasks}
              </h2>

              <p>
                Pending Tasks
              </p>

              <div className="mini-chart red-chart">
                ━╲╱╲━━╱╲╱
              </div>

            </div>


            {/* LEAVES */}

            <div className="manager-card stat-card">

              <div className="stat-top">

                <div className="stat-icon orange">
                  🌴
                </div>

                <span className="stat-change orange-text">
                  Pending
                </span>

              </div>

              <h2>
                {pendingLeaves.length}
              </h2>

              <p>
                Pending Leaves
              </p>

              <div className="mini-chart orange-chart">
                ╱╲━━╲╱╲╱
              </div>

            </div>


            {/* PROJECTS */}

            <div className="manager-card stat-card">

              <div className="stat-top">

                <div className="stat-icon green">
                  📁
                </div>

                <span className="stat-change green">
                  Active
                </span>

              </div>

              <h2>
                {projects}
              </h2>

              <p>
                Projects
              </p>

              <div className="mini-chart green-chart">
                ━╱╲╱╲━━╱
              </div>

            </div>

          </div>


          {/* =================================================
              ATTENDANCE + TEAM STATUS
          ================================================= */}

          <div className="manager-two-column">

            {/* ATTENDANCE */}

            <div className="manager-panel attendance-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Attendance Overview
                  </h3>

                  <span>
                    Team attendance analytics
                  </span>

                </div>

                <select defaultValue="2026">

                  <option value="2026">
                    2026
                  </option>

                  <option value="2025">
                    2025
                  </option>

                  <option value="2024">
                    2024
                  </option>

                </select>

              </div>


              <div className="attendance-chart">

                <div className="chart-grid">

                  {attendanceBars.map(
                    (value, index) => {

                      const months = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                      ];

                      return (
                        <div
                          className="chart-bar"
                          key={months[index]}
                        >

                          <span
                            style={{
                              height:
                                `${value}%`
                            }}
                          ></span>

                          <small>
                            {months[index]}
                          </small>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>


              <div className="chart-legend">

                <span>
                  <i className="dot green-dot"></i>
                  On Time
                </span>

                <span>
                  <i className="dot orange-dot"></i>
                  Late In
                </span>

                <span>
                  <i className="dot red-dot"></i>
                  Absent
                </span>

              </div>

            </div>


            {/* TEAM STATUS */}

            <div className="manager-panel status-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Team Status
                  </h3>

                  <span>
                    Current team overview
                  </span>

                </div>

                <span className="more">
                  •••
                </span>

              </div>


              <div className="donut-wrapper">

                <div className="donut">

                  <div className="donut-center">

                    <strong>
                      {totalTeam}
                    </strong>

                    <span>
                      Team
                    </span>

                  </div>

                </div>

              </div>


              <div className="status-legend">

                <span>
                  <i className="dot green-dot"></i>
                  Active {activeEmployees}
                </span>

                <span>
                  <i className="dot gray-dot"></i>
                  Leave {pendingLeaves.length}
                </span>

                <span>
                  <i className="dot orange-dot"></i>
                  Other
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              PERFORMANCE
          ================================================= */}

          <div className="manager-panel performance-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Top Performance Employees
                </h3>

                <span>
                  Highest performing team members
                </span>

              </div>

              <span className="more">
                •••
              </span>

            </div>


            <div className="performers">

              {performers.map(
                (employee, index) => (

                  <div
                    className="performer"
                    key={index}
                  >

                    <div className="performer-avatar">
                      👤
                    </div>

                    <strong>
                      {employee.name}
                    </strong>

                    <span>
                      {employee.score}%
                    </span>

                  </div>

                )
              )}

            </div>

          </div>


          {/* =================================================
              TASKS + LEAVES
          ================================================= */}

          <div className="manager-bottom-grid">

            {/* TASKS */}

            <div className="manager-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Team Tasks
                  </h3>

                  <span>
                    Latest team tasks
                  </span>

                </div>

                <a href="/tasks">
                  View All →
                </a>

              </div>


              <div className="task-list">

                {tasks.length === 0 ? (

                  <div className="empty-state">
                    No team tasks available
                  </div>

                ) : (

                  tasks
                    .slice(0, 5)
                    .map((task) => (

                      <div
                        className="task-row"
                        key={task.id}
                      >

                        <div className="task-icon">
                          ✓
                        </div>

                        <div className="task-info">

                          <strong>
                            {task.taskName ||
                              "Task"}
                          </strong>

                          <span>
                            {task.employeeName ||
                              "Employee"}
                          </span>

                        </div>

                        <span
                          className={
                            String(
                              task.status
                            ).toUpperCase() ===
                            "COMPLETED"
                              ? "status-badge completed"
                              : "status-badge pending"
                          }
                        >
                          {task.status ||
                            "PENDING"}
                        </span>

                      </div>

                    ))

                )}

              </div>

            </div>


            {/* LEAVE REQUESTS */}

            <div className="manager-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Leave Requests
                  </h3>

                  <span>
                    Pending manager approvals
                  </span>

                </div>

                <a href="/leave-management">
                  View All →
                </a>

              </div>


              <div className="leave-list">

                {pendingLeaves.length === 0 ? (

                  <div className="empty-state">
                    No pending leave requests
                  </div>

                ) : (

                  pendingLeaves
                    .slice(0, 4)
                    .map((leave) => (

                      <div
                        className="leave-row"
                        key={leave.id}
                      >

                        <div>

                          <strong>
                            Employee #
                            {leave.employeeId}
                          </strong>

                          <span>
                            {leave.reason ||
                              "Leave request"}
                          </span>

                        </div>


                        <div className="leave-actions">

                          <button
                            className="approve-btn"
                            onClick={() =>
                              approveLeave(
                                leave.id
                              )
                            }
                          >
                            ✓
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() =>
                              rejectLeave(
                                leave.id
                              )
                            }
                          >
                            ×
                          </button>

                        </div>

                      </div>

                    ))

                )}

              </div>

            </div>

          </div>


          {/* =================================================
              REAL TIME
          ================================================= */}

          <div className="realtime-bar">

            <span className="live-dot"></span>

            <strong>
              Real-time data synchronized
            </strong>

            <span>
              Dashboard automatically refreshes
              every 10 seconds.
            </span>

            <span className="live-time">
              {formatTime()}
            </span>

          </div>

        </div>

      </main>

    </div>
  );
}

export default ManagerDashboard;