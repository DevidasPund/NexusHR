import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./ManagerDashboard.css";

function ManagerDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [time, setTime] = useState(new Date());

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
      const [dashboardRes, taskRes, leaveRes] =
        await Promise.all([
          API.get("/dashboard"),
          API.get("/tasks"),
          API.get("/leave")
        ]);

      setDashboard(dashboardRes.data || {});
      setTasks(Array.isArray(taskRes.data) ? taskRes.data : []);
      setLeaves(Array.isArray(leaveRes.data) ? leaveRes.data : []);
    } catch (error) {
      console.error("Manager dashboard error:", error);
    }
  };

  const approveLeave = async (id) => {
    try {
      await API.put(`/leave/manager-approve/${id}`);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectLeave = async (id) => {
    try {
      await API.put(`/leave/manager-reject/${id}`);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const username =
    localStorage.getItem("username") || "Manager";

  const pendingTasks = tasks.filter(
    (task) =>
      task.status === "PENDING" ||
      task.status === "Pending"
  ).length;

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "COMPLETED" ||
      task.status === "Completed"
  ).length;

  const pendingLeaves = leaves.filter(
    (leave) => leave.status === "PENDING"
  );

  const totalTeam =
    dashboard.totalEmployees ||
    dashboard.teamMembers ||
    0;

  const projects =
    dashboard.totalProjects || 0;

  const attendance =
    dashboard.attendancePercentage || 0;

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

  return (
    <div className="manager-layout">

      {/* ================= SIDEBAR ================= */}

      <Sidebar />

      {/* ================= MAIN ================= */}

      <main className="manager-main">

        <Navbar />

        <div className="manager-container">

          {/* ================= TOP HEADER ================= */}

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

          {/* ================= KPI AREA ================= */}

          <div className="manager-grid">

            {/* TOTAL EMPLOYEES */}

            <div className="manager-card stat-card">

              <div className="stat-top">

                <div className="stat-icon orange">
                  👥
                </div>

                <span className="stat-change green">
                  +12% ↑
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


          {/* ================= ATTENDANCE + TEAM STATUS ================= */}

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

                <select>
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>

              </div>

              <div className="attendance-chart">

                <div className="chart-grid">

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "82%"
                      }}
                    ></span>
                    <small>Jan</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "68%"
                      }}
                    ></span>
                    <small>Feb</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "76%"
                      }}
                    ></span>
                    <small>Mar</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "84%"
                      }}
                    ></span>
                    <small>Apr</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "62%"
                      }}
                    ></span>
                    <small>May</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "58%"
                      }}
                    ></span>
                    <small>Jun</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "47%"
                      }}
                    ></span>
                    <small>Jul</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "78%"
                      }}
                    ></span>
                    <small>Aug</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "83%"
                      }}
                    ></span>
                    <small>Sep</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "42%"
                      }}
                    ></span>
                    <small>Oct</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "70%"
                      }}
                    ></span>
                    <small>Nov</small>
                  </div>

                  <div className="chart-bar">
                    <span
                      style={{
                        height: "88%"
                      }}
                    ></span>
                    <small>Dec</small>
                  </div>

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
                  Active
                </span>

                <span>
                  <i className="dot gray-dot"></i>
                  Leave
                </span>

                <span>
                  <i className="dot orange-dot"></i>
                  Other
                </span>

              </div>

            </div>

          </div>


          {/* ================= TOP PERFORMANCE ================= */}

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

              {[
                {
                  name: "Mark Wood",
                  score: 90
                },
                {
                  name: "Nora Ray",
                  score: 88
                },
                {
                  name: "Mark Wood",
                  score: 85
                },
                {
                  name: "Ava Singh",
                  score: 80
                },
                {
                  name: "Mark Wood",
                  score: 70
                },
                {
                  name: "Nora Ray",
                  score: 69
                },
                {
                  name: "Mark Wood",
                  score: 65
                },
                {
                  name: "Ava Singh",
                  score: 62
                }
              ].map((employee, index) => (

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

              ))}

            </div>

          </div>


          {/* ================= TASK + LEAVE ================= */}

          <div className="manager-bottom-grid">

            {/* TEAM TASKS */}

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

                  tasks.slice(0, 5).map((task) => (

                    <div
                      className="task-row"
                      key={task.id}
                    >

                      <div className="task-icon">
                        ✓
                      </div>

                      <div className="task-info">

                        <strong>
                          {task.taskName}
                        </strong>

                        <span>
                          {task.employeeName}
                        </span>

                      </div>

                      <span
                        className={
                          task.status === "COMPLETED"
                            ? "status-badge completed"
                            : "status-badge pending"
                        }
                      >
                        {task.status}
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
                            Employee #{leave.employeeId}
                          </strong>

                          <span>
                            {leave.reason}
                          </span>

                        </div>

                        <div className="leave-actions">

                          <button
                            className="approve-btn"
                            onClick={() =>
                              approveLeave(leave.id)
                            }
                          >
                            ✓
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() =>
                              rejectLeave(leave.id)
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


          {/* ================= REAL TIME ================= */}

          <div className="realtime-bar">

            <span className="live-dot"></span>

            <strong>
              Real-time data synchronized
            </strong>

            <span>
              Dashboard automatically refreshes every 10 seconds.
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