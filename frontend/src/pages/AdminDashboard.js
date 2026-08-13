import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut, Line } from "react-chartjs-2";

import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
    loadEmployees();

    const interval = setInterval(() => {
      loadDashboard();
      loadEmployees();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await API.get("/dashboard");
      setDashboard(response.data || {});
    } catch (error) {
      console.error("Dashboard API Error:", error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await API.get("/employees");

      setEmployees(
        Array.isArray(response.data) ? response.data : []
      );

      setLoading(false);
    } catch (error) {
      console.error("Employees API Error:", error);
      setEmployees([]);
      setLoading(false);
    }
  };

  /*
   * Department / HR analytics chart
   */
  const chartData = {
    labels: [
      "Employees",
      "Attendance",
      "Pending Leaves",
      "Approved Leaves",
      "Departments",
    ],

    datasets: [
      {
        label: "NexusHR Analytics",

        data: [
          dashboard.totalEmployees || 0,
          dashboard.totalAttendance || 0,
          dashboard.pendingLeaves || 0,
          dashboard.approvedLeaves || 0,
          dashboard.totalDepartments || 0,
        ],

        backgroundColor: [
          "#2563eb",
          "#16a34a",
          "#f59e0b",
          "#06b6d4",
          "#8b5cf6",
        ],

        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  /*
   * Attendance chart
   */
  const attendanceData = {
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
          dashboard.mondayAttendance || 0,
          dashboard.tuesdayAttendance || 0,
          dashboard.wednesdayAttendance || 0,
          dashboard.thursdayAttendance || 0,
          dashboard.fridayAttendance || 0,
          dashboard.saturdayAttendance || 0,
          dashboard.sundayAttendance || 0,
        ],

        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.08)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  /*
   * Employee status
   */
  const activeEmployees =
    dashboard.activeEmployees ??
    employees.filter(
      (employee) =>
        employee.status?.toUpperCase() === "ACTIVE"
    ).length;

  const inactiveEmployees =
    dashboard.inactiveEmployees ??
    employees.filter(
      (employee) =>
        employee.status?.toUpperCase() !== "ACTIVE"
    ).length;

  const employeeStatusData = {
    labels: ["Active", "Inactive"],

    datasets: [
      {
        data: [
          activeEmployees || 0,
          inactiveEmployees || 0,
        ],

        backgroundColor: [
          "#16a34a",
          "#ef4444",
        ],

        borderWidth: 0,
      },
    ],
  };

  const recentEmployees = employees.slice(0, 6);

  return (
    <div className="nexus-dashboard">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="nexus-main">

        {/* NAVBAR */}
        <Navbar />

        <div className="nexus-content">

          {/* TOP HEADER */}
          <div className="dashboard-top">

            <div>
              <h2>
                Good Morning, Admin 👋
              </h2>

              <p>
                Let's manage your employees in one place.
              </p>
            </div>

            <div className="dashboard-date">
              📅{" "}
              {new Date().toLocaleDateString(
                "en-IN",
                {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
            </div>

          </div>

          {/* KPI CARDS */}
          <div className="kpi-grid">

            {/* Employees */}
            <div className="kpi-card blue">

              <div className="kpi-top">
                <div className="kpi-icon">
                  👥
                </div>

                <span className="kpi-trend">
                  +12%
                </span>
              </div>

              <h3>
                {dashboard.totalEmployees ||
                  employees.length ||
                  0}
              </h3>

              <p>
                Total Employees
              </p>

              <div className="mini-line blue-line">
                ━╱╲╱╲━━╱╲╱
              </div>

            </div>

            {/* Active */}
            <div className="kpi-card green">

              <div className="kpi-top">
                <div className="kpi-icon">
                  🟢
                </div>

                <span className="kpi-trend">
                  +8%
                </span>
              </div>

              <h3>
                {activeEmployees || 0}
              </h3>

              <p>
                Active Employees
              </p>

              <div className="mini-line green-line">
                ━╱╲━━╱╲╱╲
              </div>

            </div>

            {/* Leaves */}
            <div className="kpi-card orange">

              <div className="kpi-top">
                <div className="kpi-icon">
                  🌴
                </div>

                <span className="kpi-trend orange-text">
                  Pending
                </span>
              </div>

              <h3>
                {dashboard.pendingLeaves || 0}
              </h3>

              <p>
                Pending Leaves
              </p>

              <div className="mini-line orange-line">
                ━╲╱╲━━╲╱╲
              </div>

            </div>

            {/* Payroll */}
            <div className="kpi-card purple">

              <div className="kpi-top">
                <div className="kpi-icon">
                  💰
                </div>

                <span className="kpi-trend">
                  Monthly
                </span>
              </div>

              <h3>
                ₹
                {Number(
                  dashboard.totalSalary || 0
                ).toLocaleString("en-IN")}
              </h3>

              <p>
                Total Payroll
              </p>

              <div className="mini-line purple-line">
                ━╱╲╱━━╱╲╱
              </div>

            </div>

          </div>

          {/* SECOND STAT ROW */}
          <div className="small-stat-grid">

            <div className="small-stat">
              <span className="small-icon green-bg">
                ✓
              </span>

              <div>
                <strong>
                  {dashboard.presentToday || 0}
                </strong>

                <small>
                  Present Today
                </small>
              </div>
            </div>

            <div className="small-stat">
              <span className="small-icon red-bg">
                !
              </span>

              <div>
                <strong>
                  {dashboard.absentToday || 0}
                </strong>

                <small>
                  Absent Today
                </small>
              </div>
            </div>

            <div className="small-stat">
              <span className="small-icon blue-bg">
                %
              </span>

              <div>
                <strong>
                  {dashboard.attendancePercentage ||
                    0}
                  %
                </strong>

                <small>
                  Attendance
                </small>
              </div>
            </div>

            <div className="small-stat">
              <span className="small-icon purple-bg">
                ✓
              </span>

              <div>
                <strong>
                  {dashboard.approvedLeaves || 0}
                </strong>

                <small>
                  Approved Leaves
                </small>
              </div>
            </div>

          </div>

          {/* CHART SECTION */}
          <div className="chart-grid">

            {/* Attendance */}
            <div className="dashboard-card chart-card">

              <div className="card-header">

                <div>
                  <h3>
                    Attendance Overview
                  </h3>

                  <p>
                    Employee attendance analytics
                  </p>
                </div>

                <select>
                  <option>
                    2026
                  </option>

                  <option>
                    2025
                  </option>
                </select>

              </div>

              <div className="chart-container">

                <Bar
                  data={chartData}
                  options={{
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
                          color: "#edf0f5",
                        },
                      },

                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                  }}
                />

              </div>

            </div>

            {/* Employee Status */}
            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <h3>
                    Employees Status
                  </h3>

                  <p>
                    Current workforce status
                  </p>
                </div>

              </div>

              <div className="donut-container">

                <Doughnut
                  data={employeeStatusData}
                  options={{
                    responsive: true,

                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },

                    cutout: "70%",
                  }}
                />

                <div className="donut-center">
                  <strong>
                    {employees.length}
                  </strong>

                  <span>
                    Employees
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* SECOND CHART ROW */}
          <div className="chart-grid">

            <div className="dashboard-card">

              <div className="card-header">

                <div>
                  <h3>
                    HR Analytics
                  </h3>

                  <p>
                    Workforce performance
                  </p>
                </div>

              </div>

              <div className="chart-container">

                <Line
                  data={attendanceData}
                  options={{
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
                      },

                      x: {
                        grid: {
                          display: false,
                        },
                      },
                    },
                  }}
                />

              </div>

            </div>

            {/* AI INSIGHTS */}
            <div className="dashboard-card ai-card">

              <div className="ai-header">
                🤖
                <div>
                  <h3>
                    AI Workforce Insights
                  </h3>

                  <p>
                    Smart HR analytics
                  </p>
                </div>
              </div>

              <div className="ai-stat danger">
                <span>
                  High Attrition Risk
                </span>

                <strong>
                  {dashboard.highRiskEmployees || 0}
                </strong>
              </div>

              <div className="ai-stat warning">
                <span>
                  Medium Risk
                </span>

                <strong>
                  {dashboard.mediumRiskEmployees || 0}
                </strong>
              </div>

              <div className="ai-stat success">
                <span>
                  Low Risk
                </span>

                <strong>
                  {dashboard.lowRiskEmployees || 0}
                </strong>
              </div>

              <div className="performance-box">

                <span>
                  Average Performance
                </span>

                <strong>
                  {dashboard.averagePerformance || 0}%
                </strong>

              </div>

            </div>

          </div>

          {/* TOP PERFORMANCE */}
          <div className="dashboard-card">

            <div className="card-header">

              <div>
                <h3>
                  ⭐ Top Performance Employees
                </h3>

                <p>
                  Your highest performing workforce
                </p>
              </div>

              <button className="view-btn">
                View All
              </button>

            </div>

            <div className="performance-list">

              {recentEmployees.length === 0 ? (

                <div className="empty-state">
                  No employees found
                </div>

              ) : (

                recentEmployees.map((emp) => (

                  <div
                    className="performance-person"
                    key={emp.id}
                  >

                    <img
                      src={
                        emp.profileImage
                          ? `https://nexushr-production-bdec.up.railway.app/uploads/${emp.profileImage}`
                          : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      }
                      alt={`${emp.firstName} ${emp.lastName}`}
                    />

                    <strong>
                      {emp.firstName}{" "}
                      {emp.lastName}
                    </strong>

                    <span>
                      {emp.performanceScore ||
                        emp.attendancePercentage ||
                        0}
                      %
                    </span>

                  </div>

                ))

              )}

            </div>

          </div>

          {/* RECENT EMPLOYEES */}
          <div className="dashboard-card employee-card">

            <div className="card-header">

              <div>
                <h3>
                  Recent Employees
                </h3>

                <p>
                  Latest employees added to NexusHR
                </p>
              </div>

              <button className="view-btn">
                View All
              </button>

            </div>

            {loading ? (

              <div className="loading-state">
                Loading employees...
              </div>

            ) : employees.length === 0 ? (

              <div className="empty-state">
                No employees found.
              </div>

            ) : (

              <div className="employee-table-wrapper">

                <table className="employee-table">

                  <thead>

                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Status</th>
                      <th>Attendance</th>
                      <th>Risk</th>
                    </tr>

                  </thead>

                  <tbody>

                    {employees
                      .slice(0, 6)
                      .map((emp) => (

                        <tr key={emp.id}>

                          <td>

                            <div className="employee-name">

                              <img
                                src={
                                  emp.profileImage
                                    ? `https://nexushr-production-bdec.up.railway.app/uploads/${emp.profileImage}`
                                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                }
                                alt=""
                              />

                              <div>
                                <strong>
                                  {emp.firstName}{" "}
                                  {emp.lastName}
                                </strong>

                                <small>
                                  {emp.email}
                                </small>
                              </div>

                            </div>

                          </td>

                          <td>
                            {emp.department || "—"}
                          </td>

                          <td>
                            {emp.designation || "—"}
                          </td>

                          <td>

                            <span
                              className={`status-badge ${
                                emp.status?.toUpperCase() ===
                                "ACTIVE"
                                  ? "active"
                                  : "inactive"
                              }`}
                            >
                              {emp.status || "UNKNOWN"}
                            </span>

                          </td>

                          <td>

                            <div className="attendance-cell">

                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  style={{
                                    width: `${
                                      emp.attendancePercentage ||
                                      0
                                    }%`,
                                  }}
                                />
                              </div>

                              <span>
                                {emp.attendancePercentage ||
                                  0}
                                %
                              </span>

                            </div>

                          </td>

                          <td>

                            <span
                              className={`risk-badge ${
                                emp.attritionRisk ===
                                "HIGH"
                                  ? "high"
                                  : emp.attritionRisk ===
                                    "MEDIUM"
                                  ? "medium"
                                  : "low"
                              }`}
                            >
                              {emp.attritionRisk ||
                                "LOW"}
                            </span>

                          </td>

                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* FOOTER STATUS */}
          <div className="system-status">

            <div>
              🟢
              <strong>
                System Operational
              </strong>
            </div>

            <div>
              🗄️
              PostgreSQL Connected
            </div>

            <div>
              ⚡
              Real-Time Updates
            </div>

            <div>
              🔔
              WebSocket Ready
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;