import React, { useEffect, useMemo, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

import "./ManagerDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function ManagerDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  /*
   * =========================================================
   * LOAD DATA
   * =========================================================
   */

  useEffect(() => {
    loadData();

    const dataInterval = setInterval(() => {
      loadData();
    }, 10000);

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const loadData = async () => {
    try {
      const [
        dashboardRes,
        taskRes,
        leaveRes,
      ] = await Promise.all([
        API.get("/dashboard"),
        API.get("/tasks"),
        API.get("/leave"),
      ]);

      setDashboard(dashboardRes.data || {});
      setTasks(
        Array.isArray(taskRes.data)
          ? taskRes.data
          : []
      );
      setLeaves(
        Array.isArray(leaveRes.data)
          ? leaveRes.data
          : []
      );
    } catch (error) {
      console.error(
        "Manager dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * LEAVE APPROVAL
   * =========================================================
   */

  const approveLeave = async (id) => {
    try {
      setActionLoading(id);

      await API.put(
        `/leave/manager-approve/${id}`
      );

      await loadData();
    } catch (error) {
      console.error(
        "Leave approval error:",
        error
      );
    } finally {
      setActionLoading(null);
    }
  };

  const rejectLeave = async (id) => {
    try {
      setActionLoading(id);

      await API.put(
        `/leave/manager-reject/${id}`
      );

      await loadData();
    } catch (error) {
      console.error(
        "Leave rejection error:",
        error
      );
    } finally {
      setActionLoading(null);
    }
  };

  /*
   * =========================================================
   * REAL-TIME VALUES
   * =========================================================
   */

  const teamMembers =
    Number(dashboard.totalEmployees) || 0;

  const pendingTasks =
    Number(dashboard.pendingTasks) ||
    tasks.filter(
      (task) =>
        String(task.status || "")
          .toUpperCase() === "PENDING"
    ).length ||
    0;

  const pendingLeaves =
    Number(dashboard.pendingLeaves) ||
    leaves.filter(
      (leave) =>
        String(leave.status || "")
          .toUpperCase() === "PENDING"
    ).length ||
    0;

  const totalProjects =
    Number(dashboard.totalProjects) || 0;

  const completedTasks =
    Number(dashboard.completedTasks) ||
    tasks.filter(
      (task) =>
        String(task.status || "")
          .toUpperCase() === "COMPLETED"
    ).length ||
    0;

  const totalTasks = tasks.length;

  const taskCompletion =
    totalTasks > 0
      ? Math.round(
          (completedTasks / totalTasks) * 100
        )
      : 0;

  /*
   * =========================================================
   * AI RISK
   * =========================================================
   */

  const highRiskEmployees =
    Number(dashboard.highRiskEmployees) || 0;

  const mediumRiskEmployees =
    Number(dashboard.mediumRiskEmployees) || 0;

  const lowRiskEmployees =
    Number(dashboard.lowRiskEmployees) || 0;

  /*
   * =========================================================
   * LEAVE DATA
   * =========================================================
   */

  const approvedLeaves =
    Number(dashboard.approvedLeaves) ||
    leaves.filter(
      (leave) =>
        String(leave.status || "")
          .toUpperCase() === "APPROVED"
    ).length ||
    0;

  const rejectedLeaves =
    Number(dashboard.rejectedLeaves) ||
    leaves.filter(
      (leave) =>
        String(leave.status || "")
          .toUpperCase() === "REJECTED"
    ).length ||
    0;

  /*
   * =========================================================
   * RECENT TASKS
   * =========================================================
   */

  const recentTasks = useMemo(() => {
    return tasks.slice(0, 6);
  }, [tasks]);

  /*
   * =========================================================
   * PENDING LEAVES
   * =========================================================
   */

  const pendingLeaveRequests = useMemo(() => {
    return leaves
      .filter(
        (leave) =>
          String(leave.status || "")
            .toUpperCase() === "PENDING"
      )
      .slice(0, 5);
  }, [leaves]);

  /*
   * =========================================================
   * BAR CHART
   * =========================================================
   */

  const taskChartData = {
    labels: [
      "Pending",
      "Completed",
      "Approved",
      "Rejected",
    ],

    datasets: [
      {
        label: "Team Activity",

        data: [
          pendingTasks,
          completedTasks,
          approvedLeaves,
          rejectedLeaves,
        ],

        backgroundColor: [
          "#f59e0b",
          "#173b24",
          "#22c55e",
          "#ef4444",
        ],

        borderRadius: 7,

        borderSkipped: false,

        barThickness: 32,
      },
    ],
  };

  const taskChartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#173b24",

        padding: 10,

        cornerRadius: 8,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "#edf0eb",
        },

        ticks: {
          color: "#87938b",
        },
      },

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#657168",
        },
      },
    },
  };

  /*
   * =========================================================
   * LEAVE DOUGHNUT
   * =========================================================
   */

  const leaveChartData = {
    labels: [
      "Pending",
      "Approved",
      "Rejected",
    ],

    datasets: [
      {
        data: [
          pendingLeaves,
          approvedLeaves,
          rejectedLeaves,
        ],

        backgroundColor: [
          "#f59e0b",
          "#173b24",
          "#ef4444",
        ],

        borderWidth: 0,

        hoverOffset: 5,
      },
    ],
  };

  const leaveChartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "68%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,

          padding: 15,

          color: "#657168",

          font: {
            size: 10,
          },
        },
      },
    },
  };

  /*
   * =========================================================
   * DATE / TIME
   * =========================================================
   */

  const formattedDate =
    currentTime.toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  const formattedTime =
    currentTime.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
    );

  /*
   * =========================================================
   * TASK STATUS COLOR
   * =========================================================
   */

  const getTaskStatusClass = (status) => {
    const value = String(
      status || ""
    ).toUpperCase();

    if (value === "COMPLETED") {
      return "status-completed";
    }

    if (value === "IN_PROGRESS") {
      return "status-progress";
    }

    if (value === "PENDING") {
      return "status-pending";
    }

    return "status-default";
  };

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <div className="manager-loading">

        <div className="manager-loader"></div>

        <h4>
          Loading Manager Dashboard...
        </h4>

        <p>
          Connecting to NexusHR real-time services
        </p>

      </div>
    );
  }

  /*
   * =========================================================
   * DASHBOARD
   * =========================================================
   */

  return (
    <div className="manager-dashboard">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />

      <div className="manager-main">

        {/* ===================================================
            NAVBAR
        =================================================== */}

        <Navbar />

        <main className="manager-content">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="manager-header">

            <div>

              <div className="manager-title-row">

                <div className="manager-avatar">
                  👨‍💼
                </div>

                <div>

                  <h1>
                    Good Morning, Manager
                    <span>👋</span>
                  </h1>

                  <p>
                    Manage your team,
                    tasks and workforce in one place.
                  </p>

                </div>

              </div>

            </div>

            <div className="manager-date">

              <span>
                📅
              </span>

              <div>
                <strong>
                  {formattedDate}
                </strong>

                <small>
                  {formattedTime}
                </small>
              </div>

            </div>

          </div>

          {/* =================================================
              KPI GRID
          ================================================= */}

          <section className="manager-kpi-grid">

            {/* TEAM MEMBERS */}

            <div className="manager-kpi-card">

              <div className="manager-kpi-top">

                <div className="manager-kpi-icon purple">
                  👥
                </div>

                <span className="kpi-growth positive">
                  +12% ↑
                </span>

              </div>

              <h2>
                {teamMembers.toLocaleString()}
              </h2>

              <p>
                Team Members
              </p>

              <div className="kpi-spark green">
                ╱╲╱╲━━╱╲╱╲
              </div>

            </div>

            {/* TASKS */}

            <div className="manager-kpi-card">

              <div className="manager-kpi-top">

                <div className="manager-kpi-icon orange">
                  📋
                </div>

                <span className="kpi-growth warning">
                  Pending
                </span>

              </div>

              <h2>
                {pendingTasks}
              </h2>

              <p>
                Pending Tasks
              </p>

              <div className="kpi-spark orange">
                ━╱╲╱╲━━╱╲
              </div>

            </div>

            {/* LEAVES */}

            <div className="manager-kpi-card">

              <div className="manager-kpi-top">

                <div className="manager-kpi-icon green">
                  🌴
                </div>

                <span className="kpi-growth warning">
                  Review
                </span>

              </div>

              <h2>
                {pendingLeaves}
              </h2>

              <p>
                Pending Leaves
              </p>

              <div className="kpi-spark red">
                ╱╲━━╱╲╱╲
              </div>

            </div>

            {/* PROJECTS */}

            <div className="manager-kpi-card">

              <div className="manager-kpi-top">

                <div className="manager-kpi-icon blue">
                  📁
                </div>

                <span className="kpi-growth positive">
                  Active
                </span>

              </div>

              <h2>
                {totalProjects}
              </h2>

              <p>
                Total Projects
              </p>

              <div className="kpi-spark blue">
                ╱╲╱╲━━╱╲╱
              </div>

            </div>

          </section>

          {/* =================================================
              QUICK SUMMARY
          ================================================= */}

          <section className="manager-summary-grid">

            <div className="manager-small-card">

              <div className="small-card-icon green">
                ✓
              </div>

              <div>
                <strong>
                  {completedTasks}
                </strong>

                <span>
                  Completed Tasks
                </span>
              </div>

            </div>

            <div className="manager-small-card">

              <div className="small-card-icon orange">
                ⏳
              </div>

              <div>
                <strong>
                  {taskCompletion}%
                </strong>

                <span>
                  Task Completion
                </span>
              </div>

            </div>

            <div className="manager-small-card">

              <div className="small-card-icon blue">
                ✓
              </div>

              <div>
                <strong>
                  {approvedLeaves}
                </strong>

                <span>
                  Approved Leaves
                </span>
              </div>

            </div>

            <div className="manager-small-card">

              <div className="small-card-icon red">
                !
              </div>

              <div>
                <strong>
                  {rejectedLeaves}
                </strong>

                <span>
                  Rejected Leaves
                </span>
              </div>

            </div>

          </section>

          {/* =================================================
              CHARTS
          ================================================= */}

          <section className="manager-charts-grid">

            {/* TEAM ACTIVITY */}

            <div className="manager-panel">

              <div className="manager-panel-header">

                <div>

                  <h3>
                    Team Activity
                  </h3>

                  <p>
                    Current team workload overview
                  </p>

                </div>

                <span className="live-badge">
                  ● Live
                </span>

              </div>

              <div className="manager-chart">
                <Bar
                  data={taskChartData}
                  options={taskChartOptions}
                />
              </div>

            </div>

            {/* LEAVE SUMMARY */}

            <div className="manager-panel">

              <div className="manager-panel-header">

                <div>

                  <h3>
                    Leave Summary
                  </h3>

                  <p>
                    Current leave requests
                  </p>

                </div>

                <span className="three-dot">
                  •••
                </span>

              </div>

              <div className="leave-chart">

                <Doughnut
                  data={leaveChartData}
                  options={leaveChartOptions}
                />

                <div className="leave-chart-center">

                  <strong>
                    {pendingLeaves +
                      approvedLeaves +
                      rejectedLeaves}
                  </strong>

                  <span>
                    Total Leaves
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              AI WORKFORCE INSIGHTS
          ================================================= */}

          <section className="manager-panel ai-panel">

            <div className="manager-panel-header">

              <div>

                <h3>
                  🤖 AI Workforce Insights
                </h3>

                <p>
                  Workforce risk analysis
                </p>

              </div>

              <span className="ai-badge">
                Powered by AI
              </span>

            </div>

            <div className="ai-grid">

              <div className="ai-card high">

                <div className="ai-icon">
                  ⚠
                </div>

                <div>

                  <strong>
                    {highRiskEmployees}
                  </strong>

                  <span>
                    High Risk Employees
                  </span>

                  <small>
                    Requires immediate attention
                  </small>

                </div>

              </div>

              <div className="ai-card medium">

                <div className="ai-icon">
                  !
                </div>

                <div>

                  <strong>
                    {mediumRiskEmployees}
                  </strong>

                  <span>
                    Medium Risk Employees
                  </span>

                  <small>
                    Monitor workforce trends
                  </small>

                </div>

              </div>

              <div className="ai-card low">

                <div className="ai-icon">
                  ✓
                </div>

                <div>

                  <strong>
                    {lowRiskEmployees}
                  </strong>

                  <span>
                    Low Risk Employees
                  </span>

                  <small>
                    Workforce performing well
                  </small>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <section className="manager-panel">

            <div className="manager-panel-header">

              <div>

                <h3>
                  Quick Actions
                </h3>

                <p>
                  Manage your team quickly
                </p>

              </div>

            </div>

            <div className="quick-actions">

              <a
                href="/tasks"
                className="quick-action purple"
              >

                <span>
                  ➕
                </span>

                <div>
                  <strong>
                    Assign Task
                  </strong>

                  <small>
                    Create team task
                  </small>
                </div>

              </a>

              <a
                href="/projects"
                className="quick-action green"
              >

                <span>
                  📁
                </span>

                <div>
                  <strong>
                    Projects
                  </strong>

                  <small>
                    Manage projects
                  </small>
                </div>

              </a>

              <a
                href="/leave-management"
                className="quick-action orange"
              >

                <span>
                  🌴
                </span>

                <div>
                  <strong>
                    Leave Approval
                  </strong>

                  <small>
                    Review requests
                  </small>
                </div>

              </a>

              <a
                href="/reports"
                className="quick-action blue"
              >

                <span>
                  📊
                </span>

                <div>
                  <strong>
                    Reports
                  </strong>

                  <small>
                    View analytics
                  </small>
                </div>

              </a>

            </div>

          </section>

          {/* =================================================
              TEAM TASKS + LEAVE REQUESTS
          ================================================= */}

          <section className="manager-tables-grid">

            {/* TEAM TASKS */}

            <div className="manager-panel">

              <div className="manager-panel-header">

                <div>

                  <h3>
                    Team Tasks
                  </h3>

                  <p>
                    Latest assigned tasks
                  </p>

                </div>

                <a href="/tasks">
                  View All →
                </a>

              </div>

              <div className="modern-table-wrapper">

                <table className="modern-table">

                  <thead>

                    <tr>

                      <th>
                        Task
                      </th>

                      <th>
                        Employee
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {recentTasks.length === 0 ? (

                      <tr>

                        <td
                          colSpan="3"
                          className="empty-table"
                        >
                          No tasks available
                        </td>

                      </tr>

                    ) : (

                      recentTasks.map(
                        (task) => (

                          <tr key={task.id}>

                            <td>

                              <strong>
                                {task.taskName ||
                                  "Untitled Task"}
                              </strong>

                              {task.projectName && (
                                <small>
                                  {task.projectName}
                                </small>
                              )}

                            </td>

                            <td>
                              {task.employeeName ||
                                "Not Assigned"}
                            </td>

                            <td>

                              <span
                                className={`task-status ${getTaskStatusClass(
                                  task.status
                                )}`}
                              >
                                {task.status ||
                                  "PENDING"}
                              </span>

                            </td>

                          </tr>

                        )
                      )

                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* LEAVE REQUESTS */}

            <div className="manager-panel">

              <div className="manager-panel-header">

                <div>

                  <h3>
                    Leave Requests
                  </h3>

                  <p>
                    Pending approvals
                  </p>

                </div>

                <a href="/leave-management">
                  View All →
                </a>

              </div>

              <div className="leave-request-list">

                {pendingLeaveRequests.length === 0 ? (

                  <div className="empty-leaves">

                    <span>
                      ✓
                    </span>

                    <strong>
                      No pending leave requests
                    </strong>

                    <small>
                      Your team is up to date
                    </small>

                  </div>

                ) : (

                  pendingLeaveRequests.map(
                    (leave) => (

                      <div
                        className="leave-request"
                        key={leave.id}
                      >

                        <div className="leave-person-icon">
                          👤
                        </div>

                        <div className="leave-details">

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
                            disabled={
                              actionLoading ===
                              leave.id
                            }
                            onClick={() =>
                              approveLeave(
                                leave.id
                              )
                            }
                          >
                            {actionLoading ===
                            leave.id
                              ? "..."
                              : "✓"}
                          </button>

                          <button
                            className="reject-btn"
                            disabled={
                              actionLoading ===
                              leave.id
                            }
                            onClick={() =>
                              rejectLeave(
                                leave.id
                              )
                            }
                          >
                            {actionLoading ===
                            leave.id
                              ? "..."
                              : "×"}
                          </button>

                        </div>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          </section>

          {/* =================================================
              REAL-TIME STATUS
          ================================================= */}

          <div className="manager-live-status">

            <div>

              <span className="live-dot"></span>

              <strong>
                Real-time monitoring active
              </strong>

              <span>
                Dashboard automatically refreshes
                every 10 seconds
              </span>

            </div>

            <span className="connected-status">
              ● Connected
            </span>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="manager-footer">

            <span>
              © 2026 NexusHR Enterprise HRMS
            </span>

            <span>
              Manager Workforce Dashboard
            </span>

          </footer>

        </main>

      </div>

    </div>
  );
}

export default ManagerDashboard;