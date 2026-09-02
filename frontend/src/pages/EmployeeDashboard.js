import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const [employee, setEmployee] = useState({});
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const username =
    localStorage.getItem("username") || "Employee";

  const employeeId =
    localStorage.getItem("employeeId");

  useEffect(() => {
    loadDashboard();

    const dataTimer = setInterval(() => {
      loadDashboard();
    }, 10000);

    const clockTimer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(dataTimer);
      clearInterval(clockTimer);
    };
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      let employeeData = {};

      /*
       * First try employee ID from localStorage.
       */
      if (employeeId) {
        try {
          const response = await API.get(
            `/employees/${employeeId}`
          );

          employeeData = response.data || {};
        } catch (error) {
          console.log("Employee ID API unavailable");
        }
      }

      /*
       * If employee ID is not available,
       * try username.
       */
      if (
        !employeeData.id &&
        username
      ) {
        try {
          const response = await API.get(
            `/employees/username/${username}`
          );

          employeeData = response.data || {};
        } catch (error) {
          console.log("Username API unavailable");
        }
      }

      /*
       * Dashboard API
       */
      try {
        const response =
          await API.get("/dashboard");

        if (response.data) {
          employeeData = {
            ...response.data,
            ...employeeData
          };
        }
      } catch (error) {
        console.log("Dashboard API unavailable");
      }

      /*
       * Tasks
       */
      try {
        const response =
          await API.get("/tasks");

        setTasks(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (error) {
        setTasks([]);
      }

      /*
       * Leaves
       */
      try {
        const response =
          await API.get("/leave");

        setLeaves(
          Array.isArray(response.data)
            ? response.data
            : []
        );
      } catch (error) {
        setLeaves([]);
      }

      setEmployee(employeeData);

    } catch (error) {
      console.error(
        "Employee dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "COMPLETED" ||
      task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) =>
      task.status === "PENDING" ||
      task.status === "Pending"
  ).length;

  const attendance =
    Number(
      employee.attendancePercentage ??
      employee.attendance_percentage ??
      0
    );

  const performance =
    Number(
      employee.performanceScore ??
      employee.performance_score ??
      0
    );

  const salary =
    employee.salary ??
    0;

  const attritionRisk =
    employee.attritionRisk ??
    employee.attrition_risk ??
    "LOW";

  const department =
    employee.department ||
    "IT";

  const designation =
    employee.designation ||
    "EMPLOYEE";

  const firstName =
    employee.firstName ||
    employee.first_name ||
    username;

  const lastName =
    employee.lastName ||
    employee.last_name ||
    "";

  const fullName =
    `${firstName} ${lastName}`.trim();

  const email =
    employee.email ||
    "Not available";

  const phone =
    employee.phone ||
    "Not available";

  const status =
    employee.status ||
    "ACTIVE";

  const project =
    employee.currentProject ||
    employee.current_project ||
    "";

  const projectCount =
    employee.projectCount ||
    employee.project_count ||
    0;

  const missingSkills =
    employee.missingSkills ||
    employee.missing_skills ||
    "None";

  const taskCompletion =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) *
            100
        )
      : 0;

  const formatTime = () =>
    time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });

  const formatDate = () =>
    time.toLocaleDateString([], {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });

  const attendanceData = [
    88,
    66,
    58,
    80,
    73,
    39,
    58
  ];

  return (
    <div className="employee-dashboard-layout">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="employee-dashboard-main">

        <Navbar />

        <div className="employee-dashboard-container">

          {/* ================= HEADER ================= */}

          <div className="employee-page-header">

            <div>
              <h1>
                Employee Dashboard
              </h1>

              <p>
                Enterprise Workforce Management System
              </p>
            </div>

            <div className="employee-header-right">

              <div className="employee-search">
                <span>⌕</span>
                <input
                  placeholder="Search anything..."
                />
              </div>

              <div className="notification-icon">
                🔔
                <span>3</span>
              </div>

              <div className="header-user">

                <div>
                  <strong>
                    Welcome, {firstName}
                  </strong>

                  <small>
                    EMPLOYEE
                  </small>
                </div>

                <div className="header-avatar">
                  👨‍💼
                  <i></i>
                </div>

              </div>

            </div>

          </div>

          {/* ================= WELCOME ================= */}

          <section className="employee-welcome">

            <div className="welcome-profile">

              <div className="large-avatar">
                👨‍💼
                <span></span>
              </div>

              <div>

                <h2>
                  Good Morning, {firstName} 👋
                </h2>

                <p>
                  Let's manage your work in one place.
                </p>

                <div className="welcome-tags">

                  <span>
                    👤 EMPLOYEE
                  </span>

                  <span>
                    ▣ {department}
                  </span>

                </div>

              </div>

            </div>

            <div className="realtime-pill">
              <span></span>
              Real-time
            </div>

          </section>

          {/* ================= KPI ================= */}

          <section className="employee-kpi-grid">

            {/* ATTENDANCE */}

            <div className="employee-kpi">

              <div className="kpi-icon blue">
                ✓
              </div>

              <div className="kpi-content">

                <div className="kpi-top">
                  <span>
                    Attendance
                  </span>

                  <b className="green-text">
                    ● Live
                  </b>
                </div>

                <strong>
                  {attendance}%
                </strong>

                <small>
                  Current attendance
                </small>

              </div>

              <div className="kpi-mini-chart blue-chart">
                ╱╲╱╲╱╲
              </div>

            </div>

            {/* COMPLETED */}

            <div className="employee-kpi">

              <div className="kpi-icon green">
                ✓
              </div>

              <div className="kpi-content">

                <div className="kpi-top">
                  <span>
                    Completed Tasks
                  </span>

                  <b className="green-text">
                    Active
                  </b>
                </div>

                <strong>
                  {completedTasks}
                </strong>

                <small>
                  Tasks completed
                </small>

              </div>

              <div className="kpi-mini-chart green-chart">
                ╱╲╱╲╱╲
              </div>

            </div>

            {/* PENDING */}

            <div className="employee-kpi">

              <div className="kpi-icon orange">
                !
              </div>

              <div className="kpi-content">

                <div className="kpi-top">
                  <span>
                    Pending Tasks
                  </span>

                  <b className="orange-text">
                    Attention
                  </b>
                </div>

                <strong>
                  {pendingTasks}
                </strong>

                <small>
                  Need attention
                </small>

              </div>

              <div className="kpi-mini-chart orange-chart">
                ╱╲━━╱╲
              </div>

            </div>

            {/* SALARY */}

            <div className="employee-kpi">

              <div className="kpi-icon purple">
                ₹
              </div>

              <div className="kpi-content">

                <div className="kpi-top">
                  <span>
                    Monthly Salary
                  </span>

                  <b className="purple-text">
                    Monthly
                  </b>
                </div>

                <strong>
                  ₹{Number(salary).toLocaleString("en-IN")}
                </strong>

                <small>
                  Current salary
                </small>

              </div>

              <div className="kpi-mini-chart purple-chart">
                ╱╲╱╲╱╲
              </div>

            </div>

          </section>

          {/* ================= ROW 1 ================= */}

          <section className="employee-main-grid">

            {/* ATTENDANCE */}

            <div className="employee-panel attendance-panel">

              <div className="panel-heading">

                <div>
                  <h3>
                    Attendance Overview
                  </h3>

                  <p>
                    Your attendance analytics
                  </p>
                </div>

                <select>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>

              </div>

              <div className="bar-chart">

                <div className="chart-y">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>

                <div className="bars">

                  {attendanceData.map(
                    (value, index) => (

                    <div
                      className="bar-column"
                      key={index}
                    >

                      <div
                        className="bar"
                        style={{
                          height:
                            `${value}%`
                        }}
                      ></div>

                      <small>
                        {
                          [
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                            "Sun"
                          ][index]
                        }
                      </small>

                    </div>

                  ))}

                </div>

              </div>

              <div className="chart-footer">

                <span>
                  <i className="dot blue-dot"></i>
                  Attendance
                </span>

                <span>
                  <i className="dot red-dot"></i>
                  Absent
                </span>

              </div>

            </div>

            {/* PERFORMANCE */}

            <div className="employee-panel performance-card">

              <div className="panel-heading">

                <div>
                  <h3>
                    Performance
                  </h3>

                  <p>
                    Current performance score
                  </p>
                </div>

                <b className="green-text">
                  ● Live
                </b>

              </div>

              <div
                className="performance-ring"
                style={{
                  "--score":
                    `${performance}%`
                }}
              >

                <div>
                  <strong>
                    {performance}%
                  </strong>

                  <span>
                    Score
                  </span>
                </div>

              </div>

              <p className="performance-label">
                Current Performance
              </p>

            </div>

            {/* PROFILE */}

            <div className="employee-panel profile-card">

              <div className="panel-heading">

                <h3>
                  My Profile
                </h3>

                <a href="/profile">
                  View All →
                </a>

              </div>

              <div className="profile-main">

                <div className="profile-avatar">
                  👨‍💼
                </div>

                <div>
                  <strong>
                    {fullName}
                  </strong>

                  <span>
                    {designation}
                  </span>
                </div>

              </div>

              <div className="profile-details">

                <div>
                  <span>Email</span>
                  <strong>{email}</strong>
                </div>

                <div>
                  <span>Phone</span>
                  <strong>{phone}</strong>
                </div>

                <div>
                  <span>Department</span>
                  <strong>{department}</strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong className="active-status">
                    {status}
                  </strong>
                </div>

              </div>

            </div>

          </section>

          {/* ================= ROW 2 ================= */}

          <section className="employee-secondary-grid">

            {/* TASKS */}

            <div className="employee-panel tasks-card">

              <div className="panel-heading">

                <h3>
                  My Tasks
                </h3>

                <a href="/my-tasks">
                  View All →
                </a>

              </div>

              <div className="task-summary">

                <div className="task-box completed-box">
                  <strong>
                    {completedTasks}
                  </strong>
                  <span>
                    Completed
                  </span>
                </div>

                <div className="task-box pending-box">
                  <strong>
                    {pendingTasks}
                  </strong>
                  <span>
                    Pending
                  </span>
                </div>

                <div className="completion-info">

                  <span>
                    Task Completion
                  </span>

                  <strong>
                    {taskCompletion}%
                  </strong>

                  <div className="progress">
                    <span
                      style={{
                        width:
                          `${taskCompletion}%`
                      }}
                    ></span>
                  </div>

                </div>

              </div>

            </div>

            {/* AI */}

            <div className="employee-panel ai-card">

              <div className="panel-heading">

                <h3>
                  AI Workforce
                </h3>

                <span className="ai-badge">
                  AI
                </span>

              </div>

              <div className="ai-content">

                <div>
                  <span>
                    Attrition Risk
                  </span>

                  <strong className="low-risk">
                    {attritionRisk}
                  </strong>

                  <small>
                    Your current attrition risk is low.
                  </small>
                </div>

                <div className="ai-divider"></div>

                <div>
                  <span>
                    Missing Skills
                  </span>

                  <strong>
                    {missingSkills}
                  </strong>
                </div>

              </div>

            </div>

            {/* PROJECT */}

            <div className="employee-panel project-card">

              <div className="panel-heading">

                <h3>
                  Current Project
                </h3>

                <a href="/projects">
                  View All →
                </a>

              </div>

              <div className="project-content">

                <div className="project-icon">
                  📁
                </div>

                <div>

                  <strong>
                    {project ||
                      "No Project Assigned"}
                  </strong>

                  <p>
                    {project
                      ? "Currently assigned project"
                      : "No project has been assigned yet."}
                  </p>

                </div>

                <span className="project-count">
                  {projectCount} Projects
                </span>

              </div>

            </div>

          </section>

          {/* ================= ROW 3 ================= */}

          <section className="employee-bottom-grid">

            {/* RECENT TASKS */}

            <div className="employee-panel table-card">

              <div className="panel-heading">

                <h3>
                  Recent Tasks
                </h3>

                <a href="/my-tasks">
                  View All →
                </a>

              </div>

              <table>

                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {tasks.length === 0 ? (

                    <tr>
                      <td
                        colSpan="4"
                        className="empty-table"
                      >
                        No Tasks Found
                      </td>
                    </tr>

                  ) : (

                    tasks
                      .slice(0, 5)
                      .map((task) => (

                      <tr key={task.id}>

                        <td>
                          {task.taskName ||
                            "Task"}
                        </td>

                        <td>
                          {task.projectName ||
                            "-"}
                        </td>

                        <td>
                          {task.priority ||
                            "-"}
                        </td>

                        <td>
                          <span
                            className={
                              task.status ===
                              "COMPLETED"
                                ? "table-status completed"
                                : "table-status pending"
                            }
                          >
                            {task.status}
                          </span>
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

            {/* LEAVES */}

            <div className="employee-panel table-card">

              <div className="panel-heading">

                <h3>
                  My Leave Requests
                </h3>

                <a href="/leave">
                  View All →
                </a>

              </div>

              <table>

                <thead>
                  <tr>
                    <th>Leave Type</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {leaves.length === 0 ? (

                    <tr>
                      <td
                        colSpan="3"
                        className="empty-table"
                      >
                        No Leave Requests Found
                      </td>
                    </tr>

                  ) : (

                    leaves
                      .slice(0, 5)
                      .map((leave) => (

                      <tr key={leave.id}>

                        <td>
                          {leave.leaveType ||
                            leave.type ||
                            "-"}
                        </td>

                        <td>
                          {leave.reason ||
                            "-"}
                        </td>

                        <td>
                          <span className="table-status">
                            {leave.status}
                          </span>
                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </section>

          {/* ================= REAL TIME ================= */}

          <div className="employee-realtime">

            <div>
              <span className="live-dot"></span>

              <strong>
                Real-time data synchronized
              </strong>

              <span>
                Dashboard automatically refreshes every 10 seconds
              </span>
            </div>

            <strong>
              ◷ {formatTime()}
            </strong>

          </div>

        </div>

      </main>

    </div>
  );
}

export default EmployeeDashboard;