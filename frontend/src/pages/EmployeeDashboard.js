import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {

    const [attendance, setAttendance] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [leaves, setLeaves] = useState([]);
    const [profile, setProfile] = useState({});

    useEffect(() => {

        loadProfile();

        const interval = setInterval(() => {
            loadProfile();
        }, 10000);

        return () => clearInterval(interval);

    }, []);

    const loadProfile = async () => {

        try {

            const employeeId =
                localStorage.getItem("employeeId");

            if (!employeeId) {
                console.error("Employee ID not found");
                return;
            }

            const response =
                await API.get(`/employees/${employeeId}`);

            setProfile(response.data);

            await Promise.all([
                loadAttendance(employeeId),
                loadLeaves(employeeId)
            ]);

            if (response.data.username) {
                await loadTasks(response.data.username);
            }

        } catch (error) {

            console.error(
                "Employee dashboard error:",
                error
            );

        }
    };

    const loadAttendance = async (employeeId) => {

        try {

            const response =
                await API.get(
                    `/attendance/employee/${employeeId}`
                );

            setAttendance(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "Attendance error:",
                error
            );

        }
    };

    const loadLeaves = async (employeeId) => {

        try {

            const response =
                await API.get(
                    `/leave/employee/${employeeId}`
                );

            setLeaves(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "Leave error:",
                error
            );

        }
    };

    const loadTasks = async (username) => {

        try {

            const response =
                await API.get(
                    `/tasks/employee/${username}`
                );

            setTasks(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "Task error:",
                error
            );

        }
    };

    const completedTasks =
        tasks.filter(
            task => task.status === "COMPLETED"
        ).length;

    const pendingTasks =
        tasks.filter(
            task =>
                task.status === "PENDING" ||
                task.status === "IN_PROGRESS"
        ).length;

    const attendancePercentage =
        Number(
            profile.attendancePercentage || 0
        );

    const performanceScore =
        Number(
            profile.performanceScore || 0
        );

    const salary =
        Number(
            profile.salary || 0
        );

    const taskCompletion =
        tasks.length > 0
            ? Math.round(
                (completedTasks / tasks.length) * 100
            )
            : 0;

    const attritionRisk =
        profile.attritionRisk || "LOW";

    const riskClass =
        attritionRisk === "HIGH"
            ? "risk-high"
            : attritionRisk === "MEDIUM"
                ? "risk-medium"
                : "risk-low";

    const profileImage =
        profile.profileImage
            ? `https://nexushr-production-bdec.up.railway.app/uploads/${profile.profileImage}`
            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

    const today =
        new Date().toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    return (

        <div className="employee-app">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <main className="employee-main">

                <Navbar />

                <div className="employee-content">

                    {/* TOP HEADER */}

                    <div className="employee-header">

                        <div>

                            <h1>
                                Employee Dashboard
                            </h1>

                            <p>
                                Enterprise Workforce Management System
                            </p>

                        </div>

                        <div className="employee-date">
                            📅 {today}
                        </div>

                    </div>


                    {/* WELCOME BANNER */}

                    <section className="employee-hero">

                        <div className="hero-info">

                            <img
                                src={profileImage}
                                alt="Employee"
                                className="hero-avatar"
                            />

                            <div>

                                <h2>
                                    Good Morning,{" "}
                                    {profile.firstName || "Employee"} 👋
                                </h2>

                                <p>
                                    Let's manage your work in one place.
                                </p>

                                <div className="hero-tags">

                                    <span>
                                        👤 {profile.designation || "Employee"}
                                    </span>

                                    <span>
                                        🏢 {profile.department || "Department"}
                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="real-time">

                            <span></span>

                            Real-time

                        </div>

                    </section>


                    {/* KPI */}

                    <section className="employee-kpis">

                        <div className="kpi-card">

                            <div className="kpi-top">

                                <div className="kpi-icon attendance">
                                    ✓
                                </div>

                                <span className="trend green">
                                    Live
                                </span>

                            </div>

                            <h2>
                                {attendancePercentage}%
                            </h2>

                            <p>
                                Attendance
                            </p>

                            <small>
                                Current attendance
                            </small>

                            <div className="mini-chart blue">
                                ╱╲╱╲━━╱╲
                            </div>

                        </div>


                        <div className="kpi-card">

                            <div className="kpi-top">

                                <div className="kpi-icon completed">
                                    ✓
                                </div>

                                <span className="trend green">
                                    Active
                                </span>

                            </div>

                            <h2>
                                {completedTasks}
                            </h2>

                            <p>
                                Completed Tasks
                            </p>

                            <small>
                                Tasks completed
                            </small>

                            <div className="mini-chart green">
                                ━╱╲╱╲━━
                            </div>

                        </div>


                        <div className="kpi-card">

                            <div className="kpi-top">

                                <div className="kpi-icon pending">
                                    !
                                </div>

                                <span className="trend orange">
                                    Attention
                                </span>

                            </div>

                            <h2>
                                {pendingTasks}
                            </h2>

                            <p>
                                Pending Tasks
                            </p>

                            <small>
                                Need attention
                            </small>

                            <div className="mini-chart orange">
                                ━╲╱╲━━╱
                            </div>

                        </div>


                        <div className="kpi-card">

                            <div className="kpi-top">

                                <div className="kpi-icon salary">
                                    ₹
                                </div>

                                <span className="trend purple">
                                    Monthly
                                </span>

                            </div>

                            <h2>
                                ₹{salary.toLocaleString("en-IN")}
                            </h2>

                            <p>
                                Monthly Salary
                            </p>

                            <small>
                                Current salary
                            </small>

                            <div className="mini-chart purple">
                                ╱╲━━╱╲
                            </div>

                        </div>

                    </section>


                    {/* ATTENDANCE + PERFORMANCE */}

                    <section className="analytics-grid">

                        <div className="dashboard-card">

                            <div className="card-heading">

                                <div>

                                    <h3>
                                        Attendance Overview
                                    </h3>

                                    <p>
                                        Your attendance analytics
                                    </p>

                                </div>

                                <button>
                                    Today ▾
                                </button>

                            </div>

                            <div className="attendance-chart">

                                <div className="chart-grid">

                                    <span>100%</span>
                                    <span>75%</span>
                                    <span>50%</span>
                                    <span>25%</span>
                                    <span>0%</span>

                                </div>

                                <div className="attendance-bars">

                                    {[
                                        "Mon",
                                        "Tue",
                                        "Wed",
                                        "Thu",
                                        "Fri",
                                        "Sat",
                                        "Sun"
                                    ].map(
                                        (day, index) => (

                                            <div
                                                className="bar-column"
                                                key={day}
                                            >

                                                <div
                                                    className="bar"
                                                    style={{
                                                        height:
                                                            index === 0
                                                                ? `${Math.max(attendancePercentage, 8)}%`
                                                                : `${Math.max(attendancePercentage * (0.7 + index * 0.04), 5)}%`
                                                    }}
                                                ></div>

                                                <span>
                                                    {day}
                                                </span>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                            <div className="chart-legend">

                                <span>
                                    <i className="dot present"></i>
                                    Attendance
                                </span>

                                <span>
                                    <i className="dot absent"></i>
                                    Absent
                                </span>

                            </div>

                        </div>


                        {/* PERFORMANCE */}

                        <div className="dashboard-card performance-card">

                            <div className="card-heading">

                                <div>

                                    <h3>
                                        Performance
                                    </h3>

                                    <p>
                                        Current performance score
                                    </p>

                                </div>

                                <span className="live-badge">
                                    ● Live
                                </span>

                            </div>

                            <div className="performance-circle">

                                <div
                                    className="circle-progress"
                                    style={{
                                        "--progress":
                                            `${Math.min(
                                                performanceScore,
                                                100
                                            ) * 3.6}deg`
                                    }}
                                >

                                    <div className="circle-inner">

                                        <strong>
                                            {performanceScore}%
                                        </strong>

                                        <span>
                                            Score
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="performance-label">
                                Current Performance
                            </div>

                        </div>

                    </section>


                    {/* LOWER CARDS */}

                    <section className="lower-grid">

                        {/* PROFILE */}

                        <div className="dashboard-card">

                            <div className="card-heading">

                                <h3>
                                    👤 My Profile
                                </h3>

                                <a href="/profile">
                                    View All →
                                </a>

                            </div>

                            <div className="profile-row">

                                <img
                                    src={profileImage}
                                    alt="Profile"
                                />

                                <div>

                                    <h4>
                                        {profile.firstName}{" "}
                                        {profile.lastName}
                                    </h4>

                                    <p>
                                        {profile.designation}
                                    </p>

                                </div>

                            </div>

                            <div className="profile-info">

                                <div>
                                    <span>Email</span>
                                    <strong>
                                        {profile.email || "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Phone</span>
                                    <strong>
                                        {profile.phone || "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Department</span>
                                    <strong>
                                        {profile.department || "N/A"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Status</span>
                                    <strong className="active-text">
                                        {profile.status || "ACTIVE"}
                                    </strong>
                                </div>

                            </div>

                        </div>


                        {/* TASKS */}

                        <div className="dashboard-card">

                            <div className="card-heading">

                                <h3>
                                    ✅ My Tasks
                                </h3>

                                <a href="/my-tasks">
                                    View All →
                                </a>

                            </div>

                            <div className="task-stat">

                                <div className="task-stat-box green-box">

                                    <strong>
                                        {completedTasks}
                                    </strong>

                                    <span>
                                        Completed
                                    </span>

                                </div>

                                <div className="task-stat-box orange-box">

                                    <strong>
                                        {pendingTasks}
                                    </strong>

                                    <span>
                                        Pending
                                    </span>

                                </div>

                            </div>

                            <div className="task-progress">

                                <div>

                                    <span>
                                        Task Completion
                                    </span>

                                    <strong>
                                        {taskCompletion}%
                                    </strong>

                                </div>

                                <div className="progress-track">

                                    <div
                                        className="progress-value"
                                        style={{
                                            width:
                                                `${taskCompletion}%`
                                        }}
                                    ></div>

                                </div>

                            </div>

                        </div>


                        {/* AI */}

                        <div className="dashboard-card">

                            <div className="card-heading">

                                <h3>
                                    🤖 AI Workforce
                                </h3>

                                <span className="ai-badge">
                                    AI
                                </span>

                            </div>

                            <div className="risk-section">

                                <span>
                                    Attrition Risk
                                </span>

                                <strong
                                    className={riskClass}
                                >
                                    {attritionRisk}
                                </strong>

                            </div>

                            <p className="risk-description">

                                {attritionRisk === "HIGH"
                                    ? "High risk detected. Review your career insights."
                                    : attritionRisk === "MEDIUM"
                                        ? "Moderate risk. Continue improving your performance."
                                        : "Your current attrition risk is low."}

                            </p>

                            <div className="skill-info">

                                <span>
                                    Missing Skills
                                </span>

                                <strong>
                                    {profile.missingSkills || "None"}
                                </strong>

                            </div>

                        </div>

                    </section>


                    {/* PROJECT */}

                    <section className="dashboard-card project-card">

                        <div className="card-heading">

                            <div>

                                <h3>
                                    🚀 Current Project
                                </h3>

                                <p>
                                    Your assigned project
                                </p>

                            </div>

                            <span className="project-count">
                                {profile.projectCount || 0} Projects
                            </span>

                        </div>

                        <div className="project-content">

                            <div className="project-icon">
                                📁
                            </div>

                            <div>

                                <h3>
                                    {profile.currentProject ||
                                        "No Project Assigned"}
                                </h3>

                                <p>
                                    {profile.currentProject
                                        ? "Currently assigned project"
                                        : "No project has been assigned yet."}
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* RECENT TASKS */}

                    <section className="dashboard-card table-card">

                        <div className="card-heading">

                            <h3>
                                📋 Recent Tasks
                            </h3>

                            <a href="/my-tasks">
                                View All →
                            </a>

                        </div>

                        <div className="table-responsive">

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

                                    {tasks.length > 0 ? (

                                        tasks.slice(0, 5).map(
                                            task => (

                                                <tr key={task.id}>

                                                    <td>
                                                        {task.taskName}
                                                    </td>

                                                    <td>
                                                        {task.projectName}
                                                    </td>

                                                    <td>
                                                        <span className="priority">
                                                            {task.priority}
                                                        </span>
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                task.status ===
                                                                    "COMPLETED"
                                                                    ? "status completed-status"
                                                                    : task.status ===
                                                                        "IN_PROGRESS"
                                                                        ? "status progress-status"
                                                                        : "status pending-status"
                                                            }
                                                        >
                                                            {task.status}
                                                        </span>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="empty-row"
                                            >
                                                No Tasks Found
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>


                    {/* LEAVES */}

                    <section className="dashboard-card table-card">

                        <div className="card-heading">

                            <h3>
                                🌴 My Leave Requests
                            </h3>

                            <a href="/leave">
                                View All →
                            </a>

                        </div>

                        <div className="table-responsive">

                            <table>

                                <thead>

                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {leaves.length > 0 ? (

                                        leaves.slice(0, 5).map(
                                            leave => (

                                                <tr key={leave.id}>

                                                    <td>
                                                        {leave.leaveType}
                                                    </td>

                                                    <td>
                                                        {leave.reason}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={
                                                                leave.status ===
                                                                    "APPROVED"
                                                                    ? "status completed-status"
                                                                    : leave.status ===
                                                                        "REJECTED"
                                                                        ? "status rejected-status"
                                                                        : "status pending-status"
                                                            }
                                                        >
                                                            {leave.status}
                                                        </span>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="3"
                                                className="empty-row"
                                            >
                                                No Leave Requests Found
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>


                    {/* REAL TIME */}

                    <div className="sync-bar">

                        <span className="sync-dot"></span>

                        <strong>
                            Real-time data synchronized
                        </strong>

                        <span>
                            Dashboard automatically refreshes every 10 seconds
                        </span>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default EmployeeDashboard;