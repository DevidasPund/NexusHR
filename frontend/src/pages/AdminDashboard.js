import React, { useCallback, useEffect, useMemo, useState } from "react";
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

import "./AdminDashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");

  // =========================================================
  // LOAD REAL-TIME DATA
  // =========================================================

  const loadData = useCallback(async () => {
    try {
      const [dashboardResponse, employeeResponse] = await Promise.all([
        API.get("/dashboard"),
        API.get("/employees"),
      ]);

      setDashboard(dashboardResponse.data || {});
      setEmployees(
        Array.isArray(employeeResponse.data)
          ? employeeResponse.data
          : []
      );

      setLastUpdated(new Date());
      setConnectionStatus("Connected");
    } catch (error) {
      console.error("Dashboard loading error:", error);
      setConnectionStatus("Disconnected");
    } finally {
      setLoading(false);
    }
  }, []);

  // =========================================================
  // REAL-TIME REFRESH + LIVE CLOCK
  // =========================================================

  useEffect(() => {
    loadData();

    // Refresh backend data every 10 seconds
    const dataInterval = setInterval(loadData, 10000);

    // Live clock
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(dataInterval);
      clearInterval(clockInterval);
    };
  }, [loadData]);

  // =========================================================
  // REAL-TIME CALCULATED VALUES
  // =========================================================

  const totalEmployees = useMemo(() => {
    if (dashboard.totalEmployees !== undefined) {
      return Number(dashboard.totalEmployees) || 0;
    }

    return employees.length;
  }, [dashboard, employees]);

  const activeEmployees = useMemo(() => {
    if (dashboard.activeEmployees !== undefined) {
      return Number(dashboard.activeEmployees) || 0;
    }

    return employees.filter(
      (employee) =>
        String(employee.status || "").toUpperCase() === "ACTIVE"
    ).length;
  }, [dashboard, employees]);

  const inactiveEmployees = useMemo(() => {
    if (dashboard.inactiveEmployees !== undefined) {
      return Number(dashboard.inactiveEmployees) || 0;
    }

    return Math.max(totalEmployees - activeEmployees, 0);
  }, [dashboard, totalEmployees, activeEmployees]);

  const pendingLeaves =
    Number(dashboard.pendingLeaves) || 0;

  const approvedLeaves =
    Number(dashboard.approvedLeaves) || 0;

  const presentToday =
    Number(dashboard.presentToday) || 0;

  const absentToday =
    Number(dashboard.absentToday) || 0;

  const onLeaveToday =
    Number(dashboard.onLeaveToday) || 0;

  const lateToday =
    Number(dashboard.lateToday) || 0;

  const totalSalary =
    Number(dashboard.totalSalary) || 0;

  const attendancePercentage =
    Number(dashboard.attendancePercentage) || 0;

  const totalDepartments =
    Number(dashboard.totalDepartments) || 0;

  // =========================================================
  // GENDER DATA
  // =========================================================

  const genderData = useMemo(() => {
    let male = 0;
    let female = 0;

    employees.forEach((employee) => {
      const gender = String(
        employee.gender || employee.sex || ""
      ).toLowerCase();

      if (gender === "male" || gender === "m") {
        male++;
      }

      if (gender === "female" || gender === "f") {
        female++;
      }
    });

    if (dashboard.maleEmployees !== undefined) {
      male = Number(dashboard.maleEmployees) || 0;
    }

    if (dashboard.femaleEmployees !== undefined) {
      female = Number(dashboard.femaleEmployees) || 0;
    }

    return { male, female };
  }, [employees, dashboard]);

  // =========================================================
  // TOP PERFORMERS
  // =========================================================

  const topPerformers = useMemo(() => {
    return employees
      .filter(
        (employee) =>
          employee.performanceScore !== null &&
          employee.performanceScore !== undefined
      )
      .sort(
        (a, b) =>
          Number(b.performanceScore) -
          Number(a.performanceScore)
      )
      .slice(0, 5);
  }, [employees]);

  // =========================================================
  // ATTENDANCE MONTHLY DATA
  // =========================================================

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
    "Dec",
  ];

  const attendanceOverview =
    dashboard.attendanceOverview ||
    dashboard.monthlyAttendance ||
    [];

  const attendanceValues = months.map((month, index) => {
    const item = attendanceOverview[index];

    if (typeof item === "number") {
      return item;
    }

    if (item && typeof item === "object") {
      return (
        Number(item.present) ||
        Number(item.onTime) ||
        Number(item.attendance) ||
        0
      );
    }

    return 0;
  });

  // =========================================================
  // ATTENDANCE BAR CHART
  // =========================================================

  const attendanceChartData = {
    labels: months,

    datasets: [
      {
        label: "Attendance",
        data: attendanceValues,
        backgroundColor: "#173b24",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const attendanceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#173b24",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
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
          color: "#7e8a82",
        },
      },

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#7e8a82",
        },
      },
    },
  };

  // =========================================================
  // GENDER DOUGHNUT
  // =========================================================

  const genderChartData = {
    labels: ["Male", "Female"],

    datasets: [
      {
        data: [
          genderData.male,
          genderData.female,
        ],

        backgroundColor: [
          "#173b24",
          "#ff7117",
        ],

        borderWidth: 0,
        hoverOffset: 5,
      },
    ],
  };

  const genderChartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    cutout: "68%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18,
          color: "#637066",
        },
      },
    },
  };

  // =========================================================
  // PROFILE IMAGE
  // =========================================================

  const getProfileImage = (employee) => {
    if (employee.profileImage) {
      return `https://nexushr-production-bdec.up.railway.app/uploads/${employee.profileImage}`;
    }

    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  };

  // =========================================================
  // DATE / TIME
  // =========================================================

  const formattedDate = currentTime.toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = currentTime.toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }
  );

  const lastUpdatedTime =
    lastUpdated.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-success"></div>

        <p>Loading NexusHR Dashboard...</p>
      </div>
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <div className="nexus-dashboard">

      <Sidebar />

      <div className="dashboard-main">

        <Navbar />

        <main className="dashboard-content">

          {/* HEADER */}

          <div className="dashboard-header">

            <div className="header-left">

              <h1>
                Good Morning, Admin
                <span className="wave">👋</span>
              </h1>

              <p>
                Here's what's happening across your
                workforce today.
              </p>

            </div>

            <div className="header-date">

              <span className="calendar-icon">
                📅
              </span>

              {formattedDate}

            </div>

          </div>

          {/* =================================================
              KPI CARDS
          ================================================= */}

          <section className="dashboard-kpi-grid">

            {/* TOTAL EMPLOYEES */}

            <div className="dashboard-kpi-card">

              <div className="dashboard-kpi-icon">
                👥
              </div>

              <div className="dashboard-kpi-content">

                <span>Total Employees</span>

                <strong>
                  {totalEmployees.toLocaleString()}
                </strong>

                <small>
                  Workforce size
                </small>

              </div>

            </div>

            {/* ACTIVE */}

            <div className="dashboard-kpi-card">

              <div className="dashboard-kpi-icon green">
                🟢
              </div>

              <div className="dashboard-kpi-content">

                <span>Active Employees</span>

                <strong>
                  {activeEmployees.toLocaleString()}
                </strong>

                <small>
                  {inactiveEmployees} inactive
                </small>

              </div>

            </div>

            {/* PENDING LEAVES */}

            <div className="dashboard-kpi-card">

              <div className="dashboard-kpi-icon orange">
                🏖️
              </div>

              <div className="dashboard-kpi-content">

                <span>Pending Leaves</span>

                <strong>
                  {pendingLeaves}
                </strong>

                <small>
                  {approvedLeaves} approved
                </small>

              </div>

            </div>

            {/* PAYROLL */}

            <div className="dashboard-kpi-card">

              <div className="dashboard-kpi-icon purple">
                ₹
              </div>

              <div className="dashboard-kpi-content">

                <span>Monthly Payroll</span>

                <strong>
                  ₹{totalSalary.toLocaleString("en-IN")}
                </strong>

                <small>
                  Current payroll
                </small>

              </div>

            </div>

          </section>

          {/* =================================================
              LIVE ATTENDANCE
          ================================================= */}

          <section className="live-attendance-section">

            <div className="section-title">

              <div>
                <h2>Today's Attendance</h2>
                <p>Live workforce attendance status</p>
              </div>

              <div className="live-indicator">
                <span></span>
                LIVE
              </div>

            </div>

            <div className="attendance-status-grid">

              <div className="attendance-status-card present">
                <span>✓</span>
                <strong>{presentToday}</strong>
                <small>Present</small>
              </div>

              <div className="attendance-status-card late">
                <span>⏰</span>
                <strong>{lateToday}</strong>
                <small>Late</small>
              </div>

              <div className="attendance-status-card absent">
                <span>!</span>
                <strong>{absentToday}</strong>
                <small>Absent</small>
              </div>

              <div className="attendance-status-card leave">
                <span>🏖️</span>
                <strong>{onLeaveToday}</strong>
                <small>On Leave</small>
              </div>

              <div className="attendance-status-card percentage">
                <span>%</span>
                <strong>{attendancePercentage}%</strong>
                <small>Attendance Rate</small>
              </div>

            </div>

          </section>

          {/* =================================================
              ANALYTICS
          ================================================= */}

          <section className="analytics-row">

            {/* ATTENDANCE */}

            <div className="reference-card attendance-reference">

              <div className="reference-card-header">

                <div>
                  <h3>Attendance Overview</h3>

                  <p>
                    Monthly attendance statistics
                  </p>
                </div>

                <span className="live-badge">
                  Live
                </span>

              </div>

              <div className="reference-chart">
                <Bar
                  data={attendanceChartData}
                  options={attendanceChartOptions}
                />
              </div>

            </div>

            {/* GENDER */}

            <div className="reference-card gender-reference">

              <div className="reference-card-header">

                <div>
                  <h3>Employees by Gender</h3>

                  <p>
                    Current employee distribution
                  </p>
                </div>

              </div>

              <div className="gender-chart-wrapper">

                <Doughnut
                  data={genderChartData}
                  options={genderChartOptions}
                />

                <div className="gender-center">

                  <strong>
                    {totalEmployees}
                  </strong>

                  <span>
                    Employees
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              TOP PERFORMERS
          ================================================= */}

          <section className="reference-card top-performance-card">

            <div className="reference-card-header">

              <div>
                <h3>Top Performance Employees</h3>

                <p>
                  Based on available performance data
                </p>
              </div>

            </div>

            <div className="performance-list">

              {topPerformers.length === 0 ? (

                <div className="no-performance">
                  No performance data available.
                </div>

              ) : (

                topPerformers.map((employee, index) => {

                  const score =
                    Number(employee.performanceScore) || 0;

                  return (
                    <div
                      className="performance-person"
                      key={employee.id || index}
                    >

                      <div className="performance-rank">
                        #{index + 1}
                      </div>

                      <div className="performance-avatar">

                        <img
                          src={getProfileImage(employee)}
                          alt="Employee"
                        />

                      </div>

                      <div className="performance-info">

                        <strong>
                          {employee.firstName || ""}
                          {" "}
                          {employee.lastName || ""}
                        </strong>

                        <span>
                          {employee.department ||
                            "Employee"}
                        </span>

                      </div>

                      <div className="performance-score">
                        {score}%
                      </div>

                    </div>
                  );
                })

              )}

            </div>

          </section>

          {/* =================================================
              LIVE CLOCK / ADMIN ATTENDANCE
          ================================================= */}

          <section className="admin-live-card">

            <div>

              <span className="live-indicator">
                <span></span>
                LIVE
              </span>

              <h3>Admin Attendance</h3>

              <p>
                Current system time
              </p>

            </div>

            <div className="admin-live-time">
              {formattedTime}
            </div>

          </section>

          {/* =================================================
              REAL-TIME STATUS
          ================================================= */}

          <div className="real-time-status">

            <div>

              <span
                className={
                  connectionStatus === "Connected"
                    ? "real-time-dot"
                    : "real-time-dot disconnected"
                }
              ></span>

              <strong>
                {connectionStatus}
              </strong>

              <span>
                Last updated: {lastUpdatedTime}
              </span>

            </div>

            <button onClick={loadData}>
              ↻ Refresh
            </button>

          </div>

          {/* FOOTER */}

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