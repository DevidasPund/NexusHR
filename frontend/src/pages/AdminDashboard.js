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
  const [currentTime, setCurrentTime] = useState(new Date());

  /*
   * =========================================================
   * REAL-TIME DATA
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
      const [dashboardResponse, employeeResponse] =
        await Promise.all([
          API.get("/dashboard"),
          API.get("/employees"),
        ]);

      setDashboard(dashboardResponse.data || {});
      setEmployees(employeeResponse.data || []);
    } catch (error) {
      console.error("Dashboard loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * CALCULATED REAL-TIME VALUES
   * =========================================================
   */

  const totalEmployees =
    Number(dashboard.totalEmployees) || employees.length || 0;

  const activeEmployees =
    Number(dashboard.activeEmployees) ||
    employees.filter(
      (employee) =>
        String(employee.status || "").toUpperCase() === "ACTIVE"
    ).length ||
    0;

  const pendingLeaves =
    Number(dashboard.pendingLeaves) || 0;

  const approvedLeaves =
    Number(dashboard.approvedLeaves) || 0;

  const presentToday =
    Number(dashboard.presentToday) || 0;

  const absentToday =
    Number(dashboard.absentToday) || 0;

  const totalSalary =
    Number(dashboard.totalSalary) || 0;

  const attendancePercentage =
    Number(dashboard.attendancePercentage) || 0;

  /*
   * =========================================================
   * GENDER DATA
   *
   * If backend provides gender, it will be used.
   * Otherwise values remain 0 instead of inventing data.
   * =========================================================
   */

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

    return {
      male,
      female,
    };
  }, [employees, dashboard]);

  /*
   * =========================================================
   * TOP PERFORMERS
   * =========================================================
   */

  const topPerformers = useMemo(() => {
    return [...employees]
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
  }, [employees]);

  /*
   * If no performanceScore exists, show recent employees.
   */
  const displayPerformers =
    topPerformers.length > 0
      ? topPerformers
      : employees.slice(0, 8);

  /*
   * =========================================================
   * ATTENDANCE CHART
   *
   * Uses backend monthly data when available.
   * =========================================================
   */

  const attendanceOverview =
    dashboard.attendanceOverview ||
    dashboard.monthlyAttendance ||
    [];

  const attendanceValues = [
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
  ].map((month, index) => {
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

  /*
   * If backend doesn't provide monthly data,
   * show current employee count as the first value.
   */
  if (
    attendanceValues.every((value) => value === 0) &&
    totalEmployees > 0
  ) {
    attendanceValues[0] = presentToday || totalEmployees;
  }

  /*
   * =========================================================
   * BAR CHART
   * =========================================================
   */

  const attendanceChartData = {
    labels: [
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
    ],

    datasets: [
      {
        label: "Attendance",

        data: attendanceValues,

        backgroundColor: "#173b24",

        borderRadius: 6,

        borderSkipped: false,

        barThickness: 21,
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
          color: "#9aa39d",

          font: {
            size: 10,
          },
        },
      },

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#7e8a82",

          font: {
            size: 10,
          },
        },
      },
    },
  };

  /*
   * =========================================================
   * GENDER DOUGHNUT
   * =========================================================
   */

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

          font: {
            size: 10,
          },
        },
      },

      tooltip: {
        backgroundColor: "#173b24",

        padding: 10,

        cornerRadius: 8,
      },
    },
  };

  /*
   * =========================================================
   * PROFILE IMAGE
   * =========================================================
   */

  const getProfileImage = (employee) => {
    if (employee.profileImage) {
      return `https://nexushr-production-bdec.up.railway.app/uploads/${employee.profileImage}`;
    }

    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  };

  /*
   * =========================================================
   * PERFORMANCE SCORE
   * =========================================================
   */

  const getPerformanceScore = (employee, index) => {
    if (
      employee.performanceScore !== null &&
      employee.performanceScore !== undefined
    ) {
      return Number(employee.performanceScore);
    }

    if (
      employee.attendancePercentage !== null &&
      employee.attendancePercentage !== undefined
    ) {
      return Number(employee.attendancePercentage);
    }

    /*
     * No score supplied by backend.
     * Display "-" rather than fake performance data.
     */
    return null;
  };

  /*
   * =========================================================
   * DATE / TIME
   * =========================================================
   */

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

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-border text-success"></div>

        <p>
          Loading NexusHR Dashboard...
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
    <div className="nexus-dashboard">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />

      <div className="dashboard-main">

        {/* ===================================================
            TOP NAVBAR
        =================================================== */}

        <Navbar />

        <main className="dashboard-content">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="dashboard-header">

            <div className="header-left">

              <h1>
                Good Morning, Admin
                <span className="wave">
                  👋
                </span>
              </h1>

              <p>
                Let's manage your employees in one place.
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
              MAIN DASHBOARD GRID
          ================================================= */}

          <section className="main-dashboard-grid">

            {/* ===============================================
                LEFT KPI AREA
            =============================================== */}

            <div className="kpi-area">

              {/* TOTAL EMPLOYEES */}

              <div className="image-kpi-card">

                <div className="kpi-card-top">

                  <div className="image-kpi-icon">
                    👥
                  </div>

                  <span className="image-kpi-trend green">
                    +12% ↑
                  </span>

                </div>

                <h2>
                  {totalEmployees.toLocaleString()}
                </h2>

                <p>
                  Total Employees
                </p>

                <div className="mini-sparkline green-spark">
                  ╱╲╱╲━━╱╲╱╲
                </div>

              </div>

              {/* NEW / ACTIVE EMPLOYEES */}

              <div className="image-kpi-card">

                <div className="kpi-card-top">

                  <div className="image-kpi-icon">
                    👤
                  </div>

                  <span className="image-kpi-trend red">
                    Active
                  </span>

                </div>

                <h2>
                  {activeEmployees.toLocaleString()}
                </h2>

                <p>
                  Active Employees
                </p>

                <div className="mini-sparkline red-spark">
                  ╱╲━━╱╲╱╲
                </div>

              </div>

              {/* JOB APPLICANTS / PENDING LEAVES */}

              <div className="image-kpi-card">

                <div className="kpi-card-top">

                  <div className="image-kpi-icon">
                    📋
                  </div>

                  <span className="image-kpi-trend orange">
                    Pending
                  </span>

                </div>

                <h2>
                  {pendingLeaves}
                </h2>

                <p>
                  Pending Leaves
                </p>

                <div className="mini-sparkline orange-spark">
                  ╱╲╱╲━━╱╲
                </div>

              </div>

              {/* PAYROLL */}

              <div className="image-kpi-card">

                <div className="kpi-card-top">

                  <div className="image-kpi-icon">
                    ₹
                  </div>

                  <span className="image-kpi-trend green">
                    Monthly
                  </span>

                </div>

                <h2>
                  ₹
                  {totalSalary.toLocaleString(
                    "en-IN"
                  )}
                </h2>

                <p>
                  Total Payroll
                </p>

                <div className="mini-sparkline purple-spark">
                  ╱╲━━╱╲╱╲
                </div>

              </div>

            </div>

            {/* ===============================================
                ATTENDANCE TIME CARD
            =============================================== */}

            <div className="attendance-time-card">

              <div className="attendance-card-header">

                <strong>
                  Your Attendance
                </strong>

                <span>
                  •••
                </span>

              </div>

              <div className="live-time">
                {formattedTime}
              </div>

              <div className="attendance-info">

                <div>
                  <span>
                    Break Time:
                  </span>

                  <strong>
                    01:00 PM - 01:45 PM
                  </strong>
                </div>

                <div>
                  <span>
                    Target Hours:
                  </span>

                  <strong>
                    08:15 H (Per Day)
                  </strong>
                </div>

              </div>

              <div className="attendance-buttons">

                <button className="break-button">
                  Break ↩
                </button>

                <button className="clock-button">
                  Clock Out →
                </button>

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

                  <h3>
                    Attendance Overview
                  </h3>

                  <div className="chart-legend">

                    <span>
                      <i className="dot dark-green"></i>
                      On Time
                    </span>

                    <span>
                      <i className="dot orange"></i>
                      Late In
                    </span>

                    <span>
                      <i className="dot red"></i>
                      Absent
                    </span>

                  </div>

                </div>

                <select defaultValue="2026">
                  <option>2026</option>
                  <option>2025</option>
                  <option>2024</option>
                </select>

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

                  <h3>
                    Gender By Employees
                  </h3>

                </div>

                <span className="three-dots">
                  •••
                </span>

              </div>

              <div className="gender-chart-wrapper">

                <Doughnut
                  data={genderChartData}
                  options={genderChartOptions}
                />

                <div className="gender-center">

                  <strong>
                    {genderData.male +
                      genderData.female}
                  </strong>

                  <span>
                    Employees
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              TOP PERFORMANCE EMPLOYEES
          ================================================= */}

          <section className="reference-card top-performance-card">

            <div className="reference-card-header">

              <h3>
                Top Performance Employees
              </h3>

              <span className="three-dots">
                •••
              </span>

            </div>

            <div className="performance-list">

              {displayPerformers.length === 0 ? (

                <div className="no-performance">
                  No employee records available
                </div>

              ) : (

                displayPerformers.map(
                  (employee, index) => {

                    const score =
                      getPerformanceScore(
                        employee,
                        index
                      );

                    return (
                      <div
                        className="performance-person"
                        key={
                          employee.id ||
                          index
                        }
                      >

                        <div className="performance-avatar">

                          <img
                            src={getProfileImage(
                              employee
                            )}
                            alt={
                              employee.firstName ||
                              "Employee"
                            }
                          />

                        </div>

                        <strong>
                          {employee.firstName || ""}
                          {" "}
                          {employee.lastName || ""}
                        </strong>

                        <span>
                          {score !== null
                            ? `${score}%`
                            : "N/A"}
                        </span>

                      </div>
                    );
                  }
                )

              )}

            </div>

          </section>

          {/* =================================================
              REAL-TIME SUMMARY
          ================================================= */}

          <section className="bottom-summary">

            <div className="summary-card">

              <div className="summary-icon green">
                ✓
              </div>

              <div>

                <strong>
                  {presentToday}
                </strong>

                <span>
                  Present Today
                </span>

              </div>

            </div>

            <div className="summary-card">

              <div className="summary-icon red">
                !
              </div>

              <div>

                <strong>
                  {absentToday}
                </strong>

                <span>
                  Absent Today
                </span>

              </div>

            </div>

            <div className="summary-card">

              <div className="summary-icon blue">
                %
              </div>

              <div>

                <strong>
                  {attendancePercentage}%
                </strong>

                <span>
                  Attendance
                </span>

              </div>

            </div>

            <div className="summary-card">

              <div className="summary-icon orange">
                🏢
              </div>

              <div>

                <strong>
                  {dashboard.totalDepartments ||
                    0}
                </strong>

                <span>
                  Departments
                </span>

              </div>

            </div>

          </section>

          {/* =================================================
              REAL-TIME STATUS
          ================================================= */}

          <div className="real-time-status">

            <div>

              <span className="real-time-dot"></span>

              <strong>
                Real-Time Dashboard
              </strong>

              <span>
                Data automatically refreshes every 10 seconds
              </span>

            </div>

            <span className="connected">
              ● Connected
            </span>

          </div>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="dashboard-footer">

            © 2026 NexusHR Enterprise HRMS

            <span>
              •
            </span>

            Real-Time Workforce Management

          </footer>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;