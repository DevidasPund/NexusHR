import React, { useEffect, useMemo, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [employees, setEmployees] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // =========================
  // REAL-TIME DATA
  // =========================

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
      const [dashboardResponse, employeeResponse] = await Promise.all([
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

  // =========================
  // DATE / TIME
  // =========================

  const dateText = currentTime.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const timeText = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const hour = currentTime.getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour >= 17) {
    greeting = "Good Evening";
  }

  // =========================
  // EMPLOYEE VALUES
  // =========================

  const totalEmployees =
    dashboard.totalEmployees ?? employees.length ?? 0;

  const activeEmployees =
    dashboard.activeEmployees ??
    employees.filter((e) => e.status === "ACTIVE").length;

  const pendingLeaves = dashboard.pendingLeaves ?? 0;

  const totalPayroll =
    dashboard.totalSalary ??
    employees.reduce((sum, employee) => {
      return sum + Number(employee.salary || 0);
    }, 0);

  const presentToday = dashboard.presentToday ?? 0;
  const absentToday = dashboard.absentToday ?? 0;
  const attendancePercentage = dashboard.attendancePercentage ?? 0;
  const approvedLeaves = dashboard.approvedLeaves ?? 0;

  // =========================
  // DEPARTMENT DISTRIBUTION
  // =========================

  const departmentData = useMemo(() => {
    const result = {};

    employees.forEach((employee) => {
      const department = employee.department || "Other";

      result[department] = (result[department] || 0) + 1;
    });

    return result;
  }, [employees]);

  const departmentLabels = Object.keys(departmentData);

  const departmentValues = Object.values(departmentData);

  const departmentChart = {
    labels: departmentLabels.length
      ? departmentLabels
      : ["No Data"],

    datasets: [
      {
        data: departmentValues.length
          ? departmentValues
          : [1],

        backgroundColor: [
          "#6366f1",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#06b6d4",
          "#8b5cf6",
          "#ec4899",
        ],

        borderWidth: 0,
      },
    ],
  };

  // =========================
  // ATTENDANCE CHART
  // =========================

  const attendanceChart = {
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
        label: "Present",

        data: [
          presentToday,
          Math.max(presentToday - 1, 0),
          presentToday + 1,
          presentToday,
          presentToday + 2,
          presentToday,
          presentToday,
        ],

        borderColor: "#6366f1",

        backgroundColor: "rgba(99,102,241,0.10)",

        fill: true,

        tension: 0.45,

        pointRadius: 4,

        pointBackgroundColor: "#6366f1",
      },

      {
        label: "Absent",

        data: [
          absentToday,
          absentToday + 1,
          absentToday,
          Math.max(absentToday - 1, 0),
          absentToday + 1,
          absentToday,
          absentToday,
        ],

        borderColor: "#ef4444",

        backgroundColor: "rgba(239,68,68,0.04)",

        fill: true,

        tension: 0.45,

        pointRadius: 4,

        pointBackgroundColor: "#ef4444",
      },
    ],
  };

  const attendanceOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",

        labels: {
          usePointStyle: true,

          padding: 20,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "#eef0f6",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // =========================
  // RECENT EMPLOYEES
  // =========================

  const recentEmployees = employees.slice(0, 5);

  // =========================
  // RENDER
  // =========================

  return (
    <div className="nexus-dashboard">

      {/* EXISTING SIDEBAR */}
      <Sidebar />

      <div className="nexus-main">

        {/* EXISTING NAVBAR */}
        <Navbar />

        {/* TOP HEADER */}
        <div className="nexus-top-header">

          <div>
            <h1>NexusHR Dashboard</h1>

            <p>
              Enterprise Workforce Management System
            </p>
          </div>

          <div className="header-right">

            <div className="realtime-status">
              <span></span>
              Real-time
            </div>

            <div className="header-date">
              {dateText}
            </div>

            <div className="admin-user">
              <div className="admin-avatar">
                A
              </div>

              <div>
                <strong>Admin</strong>
                <small>System Administrator</small>
              </div>
            </div>

          </div>

        </div>

        <main className="dashboard-content">

          {/* =========================
              WELCOME SECTION
          ========================= */}

          <section className="welcome-section">

            <div>

              <h2>
                {greeting}, Admin! 👋
              </h2>

              <p>
                Here's what's happening with your
                workforce today.
              </p>

              <div className="welcome-info">

                <span>
                  📅 {dateText}
                </span>

                <span>
                  🕐 {timeText}
                </span>

                <span>
                  🟢 Live Data
                </span>

              </div>

            </div>

            <div className="welcome-illustration">
              👨‍💼
            </div>

          </section>

          {/* =========================
              KPI CARDS
          ========================= */}

          <section className="kpi-grid">

            {/* TOTAL EMPLOYEES */}

            <div className="kpi-card purple">

              <div className="kpi-top">

                <div className="kpi-icon">
                  👥
                </div>

                <span className="trend positive">
                  ↑ 12.5%
                </span>

              </div>

              <h3>
                {loading ? "..." : totalEmployees}
              </h3>

              <p>Total Employees</p>

              <div className="mini-chart">
                ╱╲╱╲━━╱╲╱
              </div>

            </div>

            {/* ACTIVE EMPLOYEES */}

            <div className="kpi-card green">

              <div className="kpi-top">

                <div className="kpi-icon">
                  🟢
                </div>

                <span className="trend positive">
                  ↑ 8.2%
                </span>

              </div>

              <h3>
                {loading ? "..." : activeEmployees}
              </h3>

              <p>Active Employees</p>

              <div className="mini-chart green-chart">
                ━╱╲━━╱╲╱╲
              </div>

            </div>

            {/* PENDING LEAVES */}

            <div className="kpi-card orange">

              <div className="kpi-top">

                <div className="kpi-icon">
                  🌴
                </div>

                <span className="trend warning">
                  Pending
                </span>

              </div>

              <h3>
                {loading ? "..." : pendingLeaves}
              </h3>

              <p>Pending Leaves</p>

              <div className="mini-chart orange-chart">
                ━╲╱╲━━╲╱
              </div>

            </div>

            {/* PAYROLL */}

            <div className="kpi-card pink">

              <div className="kpi-top">

                <div className="kpi-icon">
                  💰
                </div>

                <span className="trend positive">
                  Monthly
                </span>

              </div>

              <h3>
                ₹
                {Number(totalPayroll).toLocaleString(
                  "en-IN"
                )}
              </h3>

              <p>Total Payroll</p>

              <div className="mini-chart pink-chart">
                ━╱╲╱╲━━╱╲
              </div>

            </div>

            {/* ATTENDANCE */}

            <div className="kpi-card blue">

              <div className="kpi-top">

                <div className="kpi-icon">
                  📊
                </div>

                <span className="trend positive">
                  ↑ 4.6%
                </span>

              </div>

              <h3>
                {attendancePercentage}%
              </h3>

              <p>Attendance Today</p>

              <div className="mini-chart blue-chart">
                ╱╲━━╱╲╱╲
              </div>

            </div>

          </section>

          {/* =========================
              SMALL SUMMARY CARDS
          ========================= */}

          <section className="small-kpi-grid">

            <div className="small-kpi">
              <div className="small-icon success">
                ✓
              </div>

              <div>
                <strong>{presentToday}</strong>
                <span>Present Today</span>
              </div>
            </div>

            <div className="small-kpi">
              <div className="small-icon danger">
                !
              </div>

              <div>
                <strong>{absentToday}</strong>
                <span>Absent Today</span>
              </div>
            </div>

            <div className="small-kpi">
              <div className="small-icon info">
                %
              </div>

              <div>
                <strong>{attendancePercentage}%</strong>
                <span>Attendance</span>
              </div>
            </div>

            <div className="small-kpi">
              <div className="small-icon purple-icon">
                ✓
              </div>

              <div>
                <strong>{approvedLeaves}</strong>
                <span>Approved Leaves</span>
              </div>
            </div>

          </section>

          {/* =========================
              ANALYTICS
          ========================= */}

          <section className="analytics-grid">

            {/* ATTENDANCE */}

            <div className="dashboard-card attendance-card">

              <div className="card-header">

                <div>
                  <h3>Attendance Overview</h3>

                  <p>
                    Employee attendance analytics
                  </p>
                </div>

                <select>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>

              </div>

              <div className="chart-container">
                <Line
                  data={attendanceChart}
                  options={attendanceOptions}
                />
              </div>

            </div>

            {/* DEPARTMENT */}

            <div className="dashboard-card department-card">

              <div className="card-header">

                <div>
                  <h3>
                    Department Distribution
                  </h3>

                  <p>
                    Current workforce distribution
                  </p>
                </div>

              </div>

              <div className="donut-wrapper">

                <Doughnut
                  data={departmentChart}
                  options={{
                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "72%",

                    plugins: {
                      legend: {
                        position: "bottom",

                        labels: {
                          usePointStyle: true,

                          padding: 15,
                        },
                      },
                    },
                  }}
                />

                <div className="donut-center">
                  <strong>{totalEmployees}</strong>
                  <span>Total</span>
                </div>

              </div>

            </div>

          </section>

          {/* =========================
              LOWER SECTION
          ========================= */}

          <section className="lower-grid">

            {/* RECENT EMPLOYEES */}

            <div className="dashboard-card employees-card">

              <div className="card-header">

                <div>
                  <h3>Recent Employees</h3>

                  <p>
                    Latest workforce members
                  </p>
                </div>

                <button>
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
                    </tr>
                  </thead>

                  <tbody>

                    {recentEmployees.length === 0 ? (

                      <tr>
                        <td
                          colSpan="4"
                          className="empty-row"
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
                                src={
                                  employee.profileImage
                                    ? `https://nexushr-production-bdec.up.railway.app/uploads/${employee.profileImage}`
                                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                }
                                alt=""
                              />

                              <div>

                                <strong>
                                  {employee.firstName}{" "}
                                  {employee.lastName}
                                </strong>

                                <small>
                                  {employee.email}
                                </small>

                              </div>

                            </div>

                          </td>

                          <td>
                            {employee.department ||
                              "—"}
                          </td>

                          <td>
                            {employee.designation ||
                              "—"}
                          </td>

                          <td>

                            <span
                              className={
                                employee.status ===
                                "ACTIVE"
                                  ? "status active"
                                  : "status inactive"
                              }
                            >
                              {employee.status ||
                                "UNKNOWN"}
                            </span>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>

            </div>

            {/* AI INSIGHTS */}

            <div className="dashboard-card ai-card">

              <div className="card-header">

                <div>
                  <h3>AI Insights</h3>

                  <p>
                    Workforce intelligence
                  </p>
                </div>

                <span className="ai-badge">
                  ✨ Powered by AI
                </span>

              </div>

              <div className="ai-list">

                <div className="ai-item green-ai">

                  <div className="ai-icon">
                    ↗
                  </div>

                  <div>
                    <strong>
                      High Performance
                    </strong>

                    <p>
                      {dashboard.topPerformers ??
                        0} employees are
                      performing above expectations
                    </p>
                  </div>

                </div>

                <div className="ai-item red-ai">

                  <div className="ai-icon">
                    ⚠
                  </div>

                  <div>
                    <strong>
                      Retention Risk
                    </strong>

                    <p>
                      {dashboard.highRiskEmployees ??
                        0} employees may be at
                      risk of leaving
                    </p>
                  </div>

                </div>

                <div className="ai-item blue-ai">

                  <div className="ai-icon">
                    💡
                  </div>

                  <div>
                    <strong>
                      Skill Gap
                    </strong>

                    <p>
                      {dashboard.topSkillGaps ||
                        "No major skill gaps detected"}
                    </p>
                  </div>

                </div>

              </div>

              <button className="ai-button">
                View AI Insights →
              </button>

            </div>

          </section>

          {/* =========================
              LEAVE + EVENTS
          ========================= */}

          <section className="bottom-grid">

            {/* LEAVE SUMMARY */}

            <div className="dashboard-card leave-card">

              <div className="card-header">

                <div>
                  <h3>Leave Summary</h3>

                  <p>
                    Employee leave overview
                  </p>
                </div>

              </div>

              <div className="leave-content">

                <div className="leave-circle">

                  <div>
                    <strong>
                      {pendingLeaves +
                        approvedLeaves}
                    </strong>

                    <span>
                      Total Leaves
                    </span>
                  </div>

                </div>

                <div className="leave-stats">

                  <div>
                    <strong>
                      {pendingLeaves}
                    </strong>

                    <span>Pending</span>
                  </div>

                  <div>
                    <strong>
                      {approvedLeaves}
                    </strong>

                    <span>Approved</span>
                  </div>

                  <div>
                    <strong>
                      {dashboard.rejectedLeaves ??
                        0}
                    </strong>

                    <span>Rejected</span>
                  </div>

                </div>

              </div>

            </div>

            {/* UPCOMING EVENTS */}

            <div className="dashboard-card events-card">

              <div className="card-header">

                <div>
                  <h3>Upcoming Events</h3>

                  <p>
                    Important HR activities
                  </p>
                </div>

                <button>
                  View Calendar
                </button>

              </div>

              <div className="events-list">

                <div className="event">

                  <div className="event-date">
                    <strong>15</strong>
                    <span>AUG</span>
                  </div>

                  <div>
                    <strong>
                      Independence Day
                    </strong>

                    <p>Office Holiday</p>
                  </div>

                </div>

                <div className="event">

                  <div className="event-date">
                    <strong>20</strong>
                    <span>AUG</span>
                  </div>

                  <div>
                    <strong>
                      Team Performance Review
                    </strong>

                    <p>Review Meeting</p>
                  </div>

                </div>

                <div className="event">

                  <div className="event-date">
                    <strong>25</strong>
                    <span>AUG</span>
                  </div>

                  <div>
                    <strong>
                      Payroll Processing
                    </strong>

                    <p>Monthly Payroll</p>
                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* =========================
              LIVE STATUS
          ========================= */}

          <div className="live-footer">

            <span className="live-dot"></span>

            <strong>
              NexusHR Live System
            </strong>

            <span>
              Database Connected
            </span>

            <span>
              API Connected
            </span>

            <span>
              Auto-refresh: 10 seconds
            </span>

          </div>

        </main>

      </div>
    </div>
  );
}

export default AdminDashboard;