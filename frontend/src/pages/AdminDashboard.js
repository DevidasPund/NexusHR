import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://nexushr-production-bdec.up.railway.app";

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [dashboardResponse, employeeResponse] =
        await Promise.all([
          API.get("/dashboard"),
          API.get("/employees"),
        ]);

      setDashboard(dashboardResponse.data || {});
      setEmployees(employeeResponse.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Dashboard loading error:", error);
      setLoading(false);
    }
  };

  const totalEmployees =
    dashboard.totalEmployees || employees.length || 0;

  const activeEmployees =
    dashboard.activeEmployees ||
    employees.filter((e) => e.status === "ACTIVE").length ||
    0;

  const pendingLeaves =
    dashboard.pendingLeaves || 0;

  const approvedLeaves =
    dashboard.approvedLeaves || 0;

  const totalDepartments =
    dashboard.totalDepartments || 0;

  const totalSalary =
    dashboard.totalSalary || 0;

  const attendancePercentage =
    dashboard.attendancePercentage || 0;

  const presentToday =
    dashboard.presentToday || 0;

  const absentToday =
    dashboard.absentToday || 0;

  const highRisk =
    dashboard.highRiskEmployees || 0;

  const mediumRisk =
    dashboard.mediumRiskEmployees || 0;

  const lowRisk =
    dashboard.lowRiskEmployees || 0;

  const topPerformers =
    dashboard.topPerformers || 0;

  const averagePerformance =
    dashboard.averagePerformance ||
    dashboard.averagePerformers ||
    0;

  const recentEmployees = employees.slice(0, 6);

  /* ---------------- BAR CHART ---------------- */

  const barData = {
    labels: [
      "Employees",
      "Attendance",
      "Pending Leaves",
      "Approved Leaves",
      "Departments",
    ],

    datasets: [
      {
        label: "HR Analytics",

        data: [
          totalEmployees,
          dashboard.totalAttendance || 0,
          pendingLeaves,
          approvedLeaves,
          totalDepartments,
        ],

        backgroundColor: [
          "#4f46e5",
          "#10b981",
          "#f59e0b",
          "#06b6d4",
          "#ef4444",
        ],

        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#eef2f7",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  /* ---------------- LINE CHART ---------------- */

  const lineData = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
      "Sun",
    ],

    datasets: [
      {
        label: "Attendance",

        data: [
          72,
          81,
          76,
          88,
          92,
          85,
          attendancePercentage || 90,
        ],

        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.08)",

        tension: 0.4,
        fill: true,

        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        min: 0,
        max: 100,

        grid: {
          color: "#eef2f7",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  /* ---------------- DOUGHNUT ---------------- */

  const leaveData = {
    labels: [
      "Pending",
      "Approved",
    ],

    datasets: [
      {
        data: [
          pendingLeaves,
          approvedLeaves,
        ],

        backgroundColor: [
          "#f59e0b",
          "#10b981",
        ],

        borderWidth: 0,
      },
    ],
  };

  const leaveOptions = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "70%",

    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  /* ---------------- PROFILE IMAGE ---------------- */

  const getProfileImage = (employee) => {
    if (employee.profileImage) {
      return `${API_URL}/uploads/${employee.profileImage}`;
    }

    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  };

  /* ---------------- RISK ---------------- */

  const getRiskClass = (risk) => {
    if (!risk) return "risk-low";

    const value = String(risk).toLowerCase();

    if (value.includes("high")) {
      return "risk-high";
    }

    if (value.includes("medium")) {
      return "risk-medium";
    }

    return "risk-low";
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-primary"></div>
        <p>Loading NexusHR Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="nexus-dashboard">

      {/* SIDEBAR */}

      <Sidebar />

      <div className="dashboard-main">

        {/* NAVBAR */}

        <Navbar />

        <main className="dashboard-content">

          {/* ================= WELCOME ================= */}

          <section className="welcome-banner">

            <div className="welcome-content">

              <span className="welcome-small">
                NEXUSHR ENTERPRISE HRMS
              </span>

              <h1>
                Good Morning, Admin
                <span> 👋</span>
              </h1>

              <p>
                Manage your workforce, monitor performance
                and make smarter HR decisions in real time.
              </p>

              <div className="welcome-actions">

                <button
                  className="primary-action"
                  onClick={() =>
                    window.location.href = "/employees"
                  }
                >
                  + Add Employee
                </button>

                <button
                  className="secondary-action"
                  onClick={() =>
                    window.location.href = "/reports"
                  }
                >
                  View Reports
                </button>

              </div>

            </div>

            <div className="welcome-decoration">

              <div className="decoration-circle circle-one"></div>
              <div className="decoration-circle circle-two"></div>
              <div className="decoration-circle circle-three"></div>

              <div className="dashboard-icon">
                📊
              </div>

            </div>

          </section>

          {/* ================= KPI ================= */}

          <section className="kpi-grid">

            {/* Employees */}

            <div className="kpi-card">

              <div className="kpi-top">

                <div className="kpi-icon blue">
                  👥
                </div>

                <span className="kpi-trend positive">
                  +12%
                </span>

              </div>

              <h2>{totalEmployees}</h2>

              <p>Total Employees</p>

              <div className="mini-line blue-line">
                ━╱╲╱╲━━╱╲╱
              </div>

            </div>

            {/* Active */}

            <div className="kpi-card">

              <div className="kpi-top">

                <div className="kpi-icon green">
                  ✓
                </div>

                <span className="kpi-trend positive">
                  +8%
                </span>

              </div>

              <h2>{activeEmployees}</h2>

              <p>Active Employees</p>

              <div className="mini-line green-line">
                ━╱╲━━╱╲╱╲━
              </div>

            </div>

            {/* Leaves */}

            <div className="kpi-card">

              <div className="kpi-top">

                <div className="kpi-icon orange">
                  📋
                </div>

                <span className="kpi-trend warning">
                  Pending
                </span>

              </div>

              <h2>{pendingLeaves}</h2>

              <p>Pending Leaves</p>

              <div className="mini-line orange-line">
                ━╲╱╲━━╲╱╲━
              </div>

            </div>

            {/* Payroll */}

            <div className="kpi-card">

              <div className="kpi-top">

                <div className="kpi-icon purple">
                  ₹
                </div>

                <span className="kpi-trend positive">
                  +15%
                </span>

              </div>

              <h2>
                ₹{Number(totalSalary).toLocaleString("en-IN")}
              </h2>

              <p>Total Payroll</p>

              <div className="mini-line purple-line">
                ━╱╲━━╱╲╱╲━
              </div>

            </div>

          </section>

          {/* ================= QUICK STATS ================= */}

          <section className="quick-stats">

            <div className="quick-stat">

              <div className="quick-icon green">
                ✓
              </div>

              <div>
                <strong>{presentToday}</strong>
                <span>Present Today</span>
              </div>

            </div>

            <div className="quick-stat">

              <div className="quick-icon red">
                !
              </div>

              <div>
                <strong>{absentToday}</strong>
                <span>Absent Today</span>
              </div>

            </div>

            <div className="quick-stat">

              <div className="quick-icon blue">
                %
              </div>

              <div>
                <strong>{attendancePercentage}%</strong>
                <span>Attendance</span>
              </div>

            </div>

            <div className="quick-stat">

              <div className="quick-icon purple">
                🏢
              </div>

              <div>
                <strong>{totalDepartments}</strong>
                <span>Departments</span>
              </div>

            </div>

          </section>

          {/* ================= ANALYTICS ================= */}

          <section className="analytics-grid">

            <div className="dashboard-card large-chart">

              <div className="card-heading">

                <div>
                  <h3>HR Analytics</h3>
                  <span>Workforce overview</span>
                </div>

                <button className="chart-filter">
                  This Week ▾
                </button>

              </div>

              <div className="chart-container">
                <Bar
                  data={barData}
                  options={barOptions}
                />
              </div>

            </div>

            <div className="dashboard-card">

              <div className="card-heading">

                <div>
                  <h3>Leave Summary</h3>
                  <span>Current leave status</span>
                </div>

              </div>

              <div className="donut-container">

                <Doughnut
                  data={leaveData}
                  options={leaveOptions}
                />

                <div className="donut-center">
                  <strong>
                    {pendingLeaves + approvedLeaves}
                  </strong>
                  <span>Total</span>
                </div>

              </div>

            </div>

          </section>

          {/* ================= ATTENDANCE ================= */}

          <section className="dashboard-card attendance-chart">

            <div className="card-heading">

              <div>
                <h3>Attendance Overview</h3>
                <span>Weekly attendance performance</span>
              </div>

              <div className="attendance-value">
                {attendancePercentage}%
                <small>Average</small>
              </div>

            </div>

            <div className="line-chart-container">

              <Line
                data={lineData}
                options={lineOptions}
              />

            </div>

          </section>

          {/* ================= EMPLOYEES ================= */}

          <section className="dashboard-card employees-card">

            <div className="card-heading">

              <div>
                <h3>Recent Employees</h3>
                <span>
                  Latest workforce records
                </span>
              </div>

              <button
                className="view-all-btn"
                onClick={() =>
                  window.location.href = "/employees"
                }
              >
                View All →
              </button>

            </div>

            <div className="employee-table-wrapper">

              <table className="employee-table">

                <thead>

                  <tr>
                    <th>EMPLOYEE</th>
                    <th>DEPARTMENT</th>
                    <th>DESIGNATION</th>
                    <th>STATUS</th>
                    <th>ATTENDANCE</th>
                    <th>RISK</th>
                  </tr>

                </thead>

                <tbody>

                  {recentEmployees.length === 0 ? (

                    <tr>
                      <td
                        colSpan="6"
                        className="empty-table"
                      >
                        No employees found
                      </td>
                    </tr>

                  ) : (

                    recentEmployees.map((employee) => (

                      <tr key={employee.id}>

                        <td>

                          <div className="employee-info">

                            <img
                              src={getProfileImage(employee)}
                              alt="Employee"
                            />

                            <div>

                              <strong>
                                {employee.firstName}{" "}
                                {employee.lastName}
                              </strong>

                              <span>
                                {employee.email}
                              </span>

                            </div>

                          </div>

                        </td>

                        <td>
                          <span className="department">
                            {employee.department || "N/A"}
                          </span>
                        </td>

                        <td>
                          {employee.designation || "N/A"}
                        </td>

                        <td>

                          <span
                            className={
                              employee.status === "ACTIVE"
                                ? "status active"
                                : "status inactive"
                            }
                          >
                            ●{" "}
                            {employee.status || "UNKNOWN"}
                          </span>

                        </td>

                        <td>

                          <div className="attendance-cell">

                            <div className="progress">

                              <div
                                className="progress-bar"
                                style={{
                                  width: `${Math.min(
                                    employee.attendancePercentage ||
                                      0,
                                    100
                                  )}%`,
                                }}
                              ></div>

                            </div>

                            <span>
                              {employee.attendancePercentage ||
                                0}
                              %
                            </span>

                          </div>

                        </td>

                        <td>

                          <span
                            className={`risk-badge ${getRiskClass(
                              employee.attritionRisk
                            )}`}
                          >
                            {employee.attritionRisk ||
                              "LOW"}
                          </span>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </section>

          {/* ================= AI INSIGHTS ================= */}

          <section className="ai-section">

            <div className="section-title">

              <div>
                <h2>
                  🤖 AI Workforce Insights
                </h2>

                <p>
                  Intelligent workforce analytics
                </p>
              </div>

              <span className="ai-live">
                ● LIVE
              </span>

            </div>

            <div className="ai-grid">

              <div className="ai-card high">

                <span className="ai-card-icon">
                  ⚠
                </span>

                <div>
                  <strong>{highRisk}</strong>
                  <span>High Risk Employees</span>
                </div>

              </div>

              <div className="ai-card medium">

                <span className="ai-card-icon">
                  !
                </span>

                <div>
                  <strong>{mediumRisk}</strong>
                  <span>Medium Risk Employees</span>
                </div>

              </div>

              <div className="ai-card low">

                <span className="ai-card-icon">
                  ✓
                </span>

                <div>
                  <strong>{lowRisk}</strong>
                  <span>Low Risk Employees</span>
                </div>

              </div>

              <div className="ai-card performance">

                <span className="ai-card-icon">
                  ⭐
                </span>

                <div>
                  <strong>{topPerformers}</strong>
                  <span>Top Performers</span>
                </div>

              </div>

            </div>

            <div className="ai-summary">

              <div>
                <span>
                  Average Performance
                </span>

                <strong>
                  {averagePerformance}%
                </strong>
              </div>

              <div>
                <span>
                  Top Skill Gaps
                </span>

                <strong>
                  {dashboard.topSkillGaps ||
                    "No major gaps"}
                </strong>
              </div>

            </div>

          </section>

          {/* ================= SYSTEM STATUS ================= */}

          <section className="system-status">

            <div>

              <span className="live-dot"></span>

              <strong>
                System Operational
              </strong>

              <span>
                All NexusHR services are running normally
              </span>

            </div>

            <div className="websocket-status">
              <span></span>
              WebSocket Connected
            </div>

          </section>

          <footer className="dashboard-footer">
            © 2026 NexusHR Enterprise HRMS
            <span>•</span>
            Real-Time Workforce Management
          </footer>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;