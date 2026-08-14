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
  const [employees, setEmployees] = useState([]);
  const [time, setTime] = useState(new Date());

  /*
  ==========================================================
  REAL-TIME CLOCK
  ==========================================================
  */

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /*
  ==========================================================
  LOAD MANAGER DATA
  ==========================================================
  */

  useEffect(() => {
    loadData();

    const refresh = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(refresh);
  }, []);

  const loadData = async () => {
    try {
      const [
        dashboardResponse,
        taskResponse,
        leaveResponse,
        employeeResponse,
      ] = await Promise.allSettled([
        API.get("/dashboard"),
        API.get("/tasks"),
        API.get("/leave"),
        API.get("/employees"),
      ]);

      if (
        dashboardResponse.status === "fulfilled"
      ) {
        setDashboard(
          dashboardResponse.value.data || {}
        );
      }

      if (taskResponse.status === "fulfilled") {
        setTasks(
          Array.isArray(taskResponse.value.data)
            ? taskResponse.value.data
            : []
        );
      }

      if (leaveResponse.status === "fulfilled") {
        setLeaves(
          Array.isArray(leaveResponse.value.data)
            ? leaveResponse.value.data
            : []
        );
      }

      if (employeeResponse.status === "fulfilled") {
        setEmployees(
          Array.isArray(employeeResponse.value.data)
            ? employeeResponse.value.data
            : []
        );
      }
    } catch (error) {
      console.error(
        "Manager dashboard error:",
        error
      );
    }
  };

  /*
  ==========================================================
  LEAVE APPROVAL
  ==========================================================
  */

  const approveLeave = async (id) => {
    try {
      await API.put(
        `/leave/manager-approve/${id}`
      );

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectLeave = async (id) => {
    try {
      await API.put(
        `/leave/manager-reject/${id}`
      );

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  /*
  ==========================================================
  COUNTS
  ==========================================================
  */

  const teamMembers =
    Number(dashboard.totalEmployees) ||
    employees.length ||
    0;

  const activeEmployees =
    Number(dashboard.activeEmployees) ||
    employees.filter(
      (employee) =>
        String(employee.status || "")
          .toUpperCase() === "ACTIVE"
    ).length ||
    0;

  const pendingTasks =
    Number(dashboard.pendingTasks) ||
    tasks.filter(
      (task) =>
        String(task.status || "")
          .toUpperCase() === "PENDING"
    ).length ||
    0;

  const completedTasks =
    Number(dashboard.completedTasks) ||
    tasks.filter(
      (task) =>
        String(task.status || "")
          .toUpperCase() === "COMPLETED"
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

  const projects =
    Number(dashboard.totalProjects) || 0;

  /*
  ==========================================================
  ATTENDANCE
  ==========================================================
  */

  const presentToday =
    Number(dashboard.presentToday) || 0;

  const absentToday =
    Number(dashboard.absentToday) || 0;

  const attendancePercentage =
    Number(dashboard.attendancePercentage) ||
    (
      teamMembers > 0
        ? (presentToday / teamMembers) * 100
        : 0
    );

  /*
  ==========================================================
  TASK COMPLETION
  ==========================================================
  */

  const taskCompletion =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  /*
  ==========================================================
  TEAM STATUS CHART
  ==========================================================
  */

  const teamStatusData = {
    labels: [
      "Active",
      "Inactive",
      "On Leave",
    ],

    datasets: [
      {
        data: [
          activeEmployees,
          Math.max(
            teamMembers - activeEmployees,
            0
          ),
          pendingLeaves,
        ],

        backgroundColor: [
          "#173b24",
          "#d7ded9",
          "#f47b20",
        ],

        borderWidth: 0,

        hoverOffset: 5,
      },
    ],
  };

  const teamStatusOptions = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "68%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,

          pointStyle: "circle",

          padding: 16,

          color: "#6e796f",

          font: {
            size: 10,
          },
        },
      },
    },
  };

  /*
  ==========================================================
  ATTENDANCE CHART
  ==========================================================
  */

  const attendanceData = {
    labels: [
      "Present",
      "Absent",
      "Pending",
      "Completed",
    ],

    datasets: [
      {
        label: "Team Overview",

        data: [
          presentToday,
          absentToday,
          pendingTasks,
          completedTasks,
        ],

        backgroundColor: [
          "#173b24",
          "#eb5757",
          "#f47b20",
          "#45bd8a",
        ],

        borderRadius: 6,

        borderSkipped: false,
      },
    ],
  };

  const attendanceOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top",

        align: "start",

        labels: {
          usePointStyle: true,

          padding: 12,

          color: "#7a847d",

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

    scales: {
      y: {
        beginAtZero: true,

        grid: {
          color: "#edf0ed",
        },

        ticks: {
          color: "#9aa39d",

          font: {
            size: 9,
          },
        },
      },

      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#879189",

          font: {
            size: 9,
          },
        },
      },
    },
  };

  /*
  ==========================================================
  TOP EMPLOYEES
  ==========================================================
  */

  const topEmployees = useMemo(() => {
    return [...employees]
      .sort(
        (a, b) =>
          Number(
            b.performanceScore || 0
          ) -
          Number(
            a.performanceScore || 0
          )
      )
      .slice(0, 8);
  }, [employees]);

  /*
  ==========================================================
  PENDING LEAVES
  ==========================================================
  */

  const pendingLeaveRequests =
    leaves
      .filter(
        (leave) =>
          String(leave.status || "")
            .toUpperCase() === "PENDING"
      )
      .slice(0, 4);

  /*
  ==========================================================
  DATE / TIME
  ==========================================================
  */

  const dateText =
    time.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const timeText =
    time.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  /*
  ==========================================================
  IMAGE
  ==========================================================
  */

  const getEmployeeImage = (employee) => {
    if (employee?.profileImage) {
      return `https://nexushr-production-bdec.up.railway.app/uploads/${employee.profileImage}`;
    }

    return "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  };

  /*
  ==========================================================
  DASHBOARD UI
  ==========================================================
  */

  return (
    <div className="manager-dashboard">

      <Sidebar />

      <div className="manager-main">

        <Navbar />

        <div className="manager-content">

          {/* ================================================
              TOP HEADER
          ================================================= */}

          <div className="manager-top-header">

            <div className="manager-greeting">

              <div className="manager-profile-circle">
                👨‍💼
              </div>

              <div>

                <h2>
                  Good Morning, Manager
                </h2>

                <p>
                  Let's manage your team in one place.
                </p>

              </div>

            </div>

            <div className="manager-date-box">

              📅

              <span>
                {dateText}
              </span>

            </div>

          </div>

          {/* ================================================
              TOP KPI + ATTENDANCE
          ================================================= */}

          <div className="manager-top-grid">

            <div className="manager-kpi-column">

              {/* TEAM MEMBERS */}

              <div className="manager-kpi-card">

                <div className="kpi-icon">
                  👥
                </div>

                <div className="kpi-mini-chart green">
                  ╱╲╱╲━━╱╲╱
                </div>

                <h3>
                  {teamMembers.toLocaleString()}
                </h3>

                <p>
                  Team Members
                </p>

                <span className="kpi-percent green-text">
                  {activeEmployees} Active
                </span>

              </div>

              {/* PENDING TASKS */}

              <div className="manager-kpi-card">

                <div className="kpi-icon">
                  📋
                </div>

                <div className="kpi-mini-chart red">
                  ━╱╲╱╲━━╱╲
                </div>

                <h3>
                  {pendingTasks}
                </h3>

                <p>
                  Pending Tasks
                </p>

                <span className="kpi-percent red-text">
                  Need attention
                </span>

              </div>

              {/* LEAVES */}

              <div className="manager-kpi-card">

                <div className="kpi-icon">
                  🌴
                </div>

                <div className="kpi-mini-chart orange">
                  ╱╲━━╱╲╱╲
                </div>

                <h3>
                  {pendingLeaves}
                </h3>

                <p>
                  Pending Leaves
                </p>

                <span className="kpi-percent orange-text">
                  Awaiting approval
                </span>

              </div>

              {/* PROJECTS */}

              <div className="manager-kpi-card">

                <div className="kpi-icon">
                  📁
                </div>

                <div className="kpi-mini-chart green">
                  ━╱╲╱╲━━╱╲
                </div>

                <h3>
                  {projects}
                </h3>

                <p>
                  Projects
                </p>

                <span className="kpi-percent green-text">
                  Active projects
                </span>

              </div>

            </div>

            {/* ATTENDANCE CARD */}

            <div className="manager-attendance-card">

              <div className="attendance-card-header">

                <strong>
                  Your Team Attendance
                </strong>

                <span>
                  •••
                </span>

              </div>

              <div className="attendance-time">
                {timeText}
              </div>

              <div className="attendance-details">

                <div>

                  <span>
                    Attendance
                  </span>

                  <strong>
                    {attendancePercentage.toFixed(1)}%
                  </strong>

                </div>

                <div>

                  <span>
                    Present Today
                  </span>

                  <strong>
                    {presentToday}
                  </strong>

                </div>

                <div>

                  <span>
                    Absent Today
                  </span>

                  <strong>
                    {absentToday}
                  </strong>

                </div>

              </div>

              <div className="attendance-progress">

                <div
                  style={{
                    width: `${Math.min(
                      attendancePercentage,
                      100
                    )}%`,
                  }}
                />

              </div>

              <div className="attendance-buttons">

                <button className="break-button">
                  🌴 Team Leave
                </button>

                <button className="clock-button">
                  ✓ Attendance
                </button>

              </div>

            </div>

          </div>

          {/* ================================================
              CHART SECTION
          ================================================= */}

          <div className="manager-chart-grid">

            {/* ATTENDANCE */}

            <div className="manager-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Attendance Overview
                  </h3>

                  <p>
                    Team attendance analytics
                  </p>

                </div>

                <select>
                  <option>
                    Today
                  </option>

                  <option>
                    This Week
                  </option>

                  <option>
                    This Month
                  </option>
                </select>

              </div>

              <div className="manager-bar-chart">

                <Bar
                  data={attendanceData}
                  options={attendanceOptions}
                />

              </div>

            </div>

            {/* TEAM STATUS */}

            <div className="manager-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Team Status
                  </h3>

                  <p>
                    Current team workforce
                  </p>

                </div>

                <span>
                  •••
                </span>

              </div>

              <div className="team-doughnut">

                <Doughnut
                  data={teamStatusData}
                  options={teamStatusOptions}
                />

                <div className="doughnut-center">

                  <strong>
                    {teamMembers}
                  </strong>

                  <span>
                    Team
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* ================================================
              TOP PERFORMANCE
          ================================================= */}

          <div className="manager-panel performance-panel">

            <div className="panel-header">

              <div>

                <h3>
                  Top Performance Employees
                </h3>

                <p>
                  Highest performing team members
                </p>

              </div>

              <span>
                •••
              </span>

            </div>

            <div className="performance-list">

              {topEmployees.length === 0 ? (

                <div className="no-performance">
                  No performance data available
                </div>

              ) : (

                topEmployees.map(
                  (employee, index) => {

                    const score =
                      Number(
                        employee.performanceScore
                      ) || 0;

                    return (
                      <div
                        className="performance-person"
                        key={employee.id}
                      >

                        <div
                          className={`performance-image ${
                            index % 3 === 0
                              ? "border-green"
                              : index % 3 === 1
                              ? "border-orange"
                              : "border-blue"
                          }`}
                        >

                          <img
                            src={getEmployeeImage(
                              employee
                            )}
                            alt=""
                          />

                        </div>

                        <strong>
                          {employee.firstName}{" "}
                          {employee.lastName}
                        </strong>

                        <span>
                          {score > 0
                            ? `${score}%`
                            : "N/A"}
                        </span>

                      </div>
                    );
                  }
                )

              )}

            </div>

          </div>

          {/* ================================================
              LOWER SECTION
          ================================================= */}

          <div className="manager-bottom-grid">

            {/* TASKS */}

            <div className="manager-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Team Tasks
                  </h3>

                  <p>
                    Latest team activities
                  </p>

                </div>

                <a href="/tasks">
                  View All →
                </a>

              </div>

              <div className="task-list">

                {tasks.slice(0, 5).map(
                  (task) => (

                    <div
                      className="task-row"
                      key={task.id}
                    >

                      <div className="task-icon">
                        📋
                      </div>

                      <div className="task-info">

                        <strong>
                          {task.taskName ||
                            "Team Task"}
                        </strong>

                        <span>
                          {task.employeeName ||
                            "Employee"}
                        </span>

                      </div>

                      <span
                        className={`task-status ${
                          String(
                            task.status || ""
                          ).toUpperCase() ===
                          "COMPLETED"
                            ? "completed"
                            : "pending"
                        }`}
                      >
                        {task.status ||
                          "PENDING"}
                      </span>

                    </div>

                  )
                )}

                {tasks.length === 0 && (
                  <div className="empty-state">
                    No team tasks available
                  </div>
                )}

              </div>

            </div>

            {/* LEAVE APPROVAL */}

            <div className="manager-panel">

              <div className="panel-header">

                <div>

                  <h3>
                    Leave Requests
                  </h3>

                  <p>
                    Pending team approvals
                  </p>

                </div>

                <a href="/leave-management">
                  View All →
                </a>

              </div>

              <div className="leave-list">

                {pendingLeaveRequests.length ===
                0 ? (

                  <div className="empty-state">
                    ✓ No pending leave requests
                  </div>

                ) : (

                  pendingLeaveRequests.map(
                    (leave) => (

                      <div
                        className="leave-row"
                        key={leave.id}
                      >

                        <div className="leave-avatar">
                          👤
                        </div>

                        <div className="leave-info">

                          <strong>
                            Employee #
                            {leave.employeeId}
                          </strong>

                          <span>
                            {leave.reason ||
                              "Leave request"}
                          </span>

                        </div>

                        <button
                          className="approve"
                          onClick={() =>
                            approveLeave(
                              leave.id
                            )
                          }
                        >
                          ✓
                        </button>

                        <button
                          className="reject"
                          onClick={() =>
                            rejectLeave(
                              leave.id
                            )
                          }
                        >
                          ×
                        </button>

                      </div>

                    )
                  )

                )}

              </div>

            </div>

          </div>

          {/* ================================================
              REAL TIME
          ================================================= */}

          <div className="manager-realtime">

            <span className="real-dot"></span>

            <strong>
              Real-time dashboard connected
            </strong>

            <span>
              Data automatically refreshed every
              10 seconds
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ManagerDashboard;