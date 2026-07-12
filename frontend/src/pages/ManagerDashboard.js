import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts";
import {
    FaUsers,
    FaUserCheck,
    FaBuilding,
    FaMoneyBillWave,
    FaClipboardCheck,
    FaTasks,
    FaProjectDiagram,
    FaChartLine,
    FaExclamationTriangle,
    FaBell
} from "react-icons/fa";

const DashboardCard = ({
    title,
    value,
    icon,
    color,
    subtitle
}) => {

    return (

        <motion.div
            className="col-xl-3 col-lg-4 col-md-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                scale: 1.05
            }}
            transition={{
                duration: .3
            }}
        >

            <div className="card border-0 shadow-lg rounded-4 h-100">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center">

                        <div>

                            <small className="text-secondary">

                                {title}

                            </small>

                            <h2
                                className="fw-bold mt-2"
                                style={{
                                    color: color
                                }}
                            >

                                <CountUp
                                    end={Number(value)}
                                    duration={2}
                                />

                            </h2>

                            <small className="text-muted">

                                {subtitle}

                            </small>

                        </div>

                        <div
                            style={{
                                fontSize: 45,
                                color: color
                            }}
                        >

                            {icon}

                        </div>

                    </div>

                </div>

            </div>

        </motion.div>

    );

};

function ManagerDashboard() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({

        totalEmployees: 0,

        activeEmployees: 0,

        totalDepartments: 0,

        totalAttendance: 0,

        presentToday: 0,

        absentToday: 0,

        attendancePercentage: 0,

        pendingLeaves: 0,

        approvedLeaves: 0,

        totalSalary: 0,

        totalProjects: 0,

        pendingTasks: 0,

        completedTasks: 0,

        highRiskEmployees: 0,

        mediumRiskEmployees: 0,

        lowRiskEmployees: 0,

        averagePerformance: 0

    });

    const [employees, setEmployees] = useState([]);

    const [tasks, setTasks] = useState([]);

    const [leaves, setLeaves] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const [
                dashboardRes,
                employeeRes,
                taskRes,
                leaveRes
            ] = await Promise.all([

                API.get("/dashboard"),

                API.get("/employees"),

                API.get("/tasks"),

                API.get("/leave")

            ]);

            setDashboard(dashboardRes.data);

            setEmployees(employeeRes.data);

            setTasks(taskRes.data);

            setLeaves(leaveRes.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="app-container">

                <Sidebar />

                <div className="main-content">

                    <Navbar />

                    <div className="container-fluid p-5 text-center">

                        <div className="spinner-border text-primary"></div>

                        <h3 className="mt-4">

                            Loading Manager Dashboard...

                        </h3>

                    </div>

                </div>

            </div>

        );

    }
const attendanceData = [
    {
        name: "Present",
        value: dashboard.presentToday
    },
    {
        name: "Absent",
        value: dashboard.absentToday
    }
];

const taskData = [
    {
        name: "Pending",
        value: dashboard.pendingTasks
    },
    {
        name: "Completed",
        value: dashboard.completedTasks
    }
];

const COLORS = [
    "#22C55E",
    "#EF4444"
];
    return (

        <div className="app-container">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="container-fluid p-4">

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: -20
                        }}

                        animate={{
                            opacity: 1,
                            y: 0
                        }}

                        className="rounded-4 p-4 mb-4"

                        style={{

                            background:
                                "linear-gradient(135deg,#2563EB,#7C3AED)",

                            color: "#fff"

                        }}

                    >

                        <h1 className="fw-bold">

                            👨‍💼 Manager Dashboard

                        </h1>

                        <p className="mb-0">

                            Welcome back! Manage employees, projects, tasks,
                            attendance and AI insights from one place.

                        </p>

                    </motion.div>
<div className="row g-4">

    <DashboardCard
        title="Total Employees"
        value={dashboard.totalEmployees}
        subtitle="Registered Employees"
        color="#2563EB"
        icon={<FaUsers />}
    />

    <DashboardCard
        title="Active Employees"
        value={dashboard.activeEmployees}
        subtitle="Currently Active"
        color="#10B981"
        icon={<FaUserCheck />}
    />

    <DashboardCard
        title="Departments"
        value={dashboard.totalDepartments}
        subtitle="Organization Units"
        color="#F59E0B"
        icon={<FaBuilding />}
    />

    <DashboardCard
        title="Present Today"
        value={dashboard.presentToday}
        subtitle="Attendance Today"
        color="#06B6D4"
        icon={<FaClipboardCheck />}
    />

    <DashboardCard
        title="Pending Tasks"
        value={dashboard.pendingTasks}
        subtitle="Awaiting Completion"
        color="#F97316"
        icon={<FaTasks />}
    />

    <DashboardCard
        title="Projects"
        value={dashboard.totalProjects}
        subtitle="Running Projects"
        color="#8B5CF6"
        icon={<FaProjectDiagram />}
    />

    <DashboardCard
        title="Attendance %"
        value={dashboard.attendancePercentage.toFixed(1)}
        subtitle="Overall Attendance"
        color="#0EA5E9"
        icon={<FaChartLine />}
    />

    <DashboardCard
        title="Pending Leaves"
        value={dashboard.pendingLeaves}
        subtitle="Approval Required"
        color="#EF4444"
        icon={<FaBell />}
    />

    <DashboardCard
        title="High Risk"
        value={dashboard.highRiskEmployees}
        subtitle="Attrition Risk"
        color="#DC2626"
        icon={<FaExclamationTriangle />}
    />

    <DashboardCard
        title="Medium Risk"
        value={dashboard.mediumRiskEmployees}
        subtitle="Need Attention"
        color="#F59E0B"
        icon={<FaExclamationTriangle />}
    />

    <DashboardCard
        title="Low Risk"
        value={dashboard.lowRiskEmployees}
        subtitle="Healthy Workforce"
        color="#22C55E"
        icon={<FaUserCheck />}
    />

    <DashboardCard
        title="Total Salary"
        value={dashboard.totalSalary}
        subtitle="Monthly Payroll"
        color="#14B8A6"
        icon={<FaMoneyBillWave />}
    />

</div>




<div className="row mt-5">

    {/* Attendance Chart */}

    <div className="col-lg-6 mb-4">

        <div className="card border-0 shadow rounded-4">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    Attendance Overview

                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <PieChart>

                        <Pie
                            data={attendanceData}
                            dataKey="value"
                            outerRadius={110}
                            label
                        >

                            {attendanceData.map((entry, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    </div>

    {/* Task Chart */}

    <div className="col-lg-6 mb-4">

        <div className="card border-0 shadow rounded-4">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    Task Analytics

                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <BarChart
                        data={taskData}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar
                            dataKey="value"
                            radius={[8,8,0,0]}
                            fill="#2563EB"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    </div>

</div>

<div className="row mt-4">

    {/* AI Insights */}

    <div className="col-lg-8 mb-4">

        <div className="card border-0 shadow rounded-4">

            <div className="card-body">

                <h3 className="fw-bold mb-4">

                    🤖 AI Workforce Insights

                </h3>

                <div className="row">

                    <div className="col-md-4">

                        <div
                            className="p-3 rounded-4 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg,#ef4444,#dc2626)"
                            }}
                        >

                            <h5>High Risk</h5>

                            <h2>

                                {dashboard.highRiskEmployees}

                            </h2>

                            <small>

                                Employees likely to resign

                            </small>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="p-3 rounded-4 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg,#f59e0b,#d97706)"
                            }}
                        >

                            <h5>Medium Risk</h5>

                            <h2>

                                {dashboard.mediumRiskEmployees}

                            </h2>

                            <small>

                                Monitor closely

                            </small>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="p-3 rounded-4 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg,#22c55e,#16a34a)"
                            }}
                        >

                            <h5>Low Risk</h5>

                            <h2>

                                {dashboard.lowRiskEmployees}

                            </h2>

                            <small>

                                Stable employees

                            </small>

                        </div>

                    </div>

                </div>

                <hr />

                <div className="row mt-3">

                    <div className="col-md-6">

                        <div className="alert alert-success">

                            <h6>

                                Average Performance

                            </h6>

                            <h3>

                                {dashboard.averagePerformance}

                                %

                            </h3>

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="alert alert-warning">

                            <h6>

                                Attendance Rate

                            </h6>

                            <h3>

                                {dashboard.attendancePercentage.toFixed(1)}

                                %

                            </h3>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

    {/* Manager Summary */}

    <div className="col-lg-4 mb-4">

        <div className="card border-0 shadow rounded-4">

            <div className="card-body">

                <h3 className="fw-bold mb-4">

                    📋 Manager Summary

                </h3>

                <table className="table">

                    <tbody>

                        <tr>

                            <td>Total Employees</td>

                            <td>

                                <strong>

                                    {dashboard.totalEmployees}

                                </strong>

                            </td>

                        </tr>

                        <tr>

                            <td>Projects</td>

                            <td>

                                <strong>

                                    {dashboard.totalProjects}

                                </strong>

                            </td>

                        </tr>

                        <tr>

                            <td>Pending Tasks</td>

                            <td>

                                <strong>

                                    {dashboard.pendingTasks}

                                </strong>

                            </td>

                        </tr>

                        <tr>

                            <td>Pending Leaves</td>

                            <td>

                                <strong>

                                    {dashboard.pendingLeaves}

                                </strong>

                            </td>

                        </tr>

                        <tr>

                            <td>Monthly Payroll</td>

                            <td>

                                <strong>

                                    ₹

                                    {dashboard.totalSalary.toLocaleString()}

                                </strong>

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </div>

</div>

<div className="row mt-4">

    {/* Recent Tasks */}

    <div className="col-lg-8 mb-4">

        <div className="card border-0 shadow rounded-4">

            <div className="card-header bg-white border-0">

                <h4 className="fw-bold">

                    📋 Recent Tasks

                </h4>

            </div>

            <div className="card-body table-responsive">

                <table className="table table-hover align-middle">

                    <thead className="table-light">

                        <tr>

                            <th>ID</th>

                            <th>Task</th>

                            <th>Employee</th>

                            <th>Project</th>

                            <th>Status</th>

                            <th>Priority</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            tasks.slice(0,8).map(task=>(

                                <tr key={task.id}>

                                    <td>

                                        {task.id}

                                    </td>

                                    <td>

                                        {task.taskName}

                                    </td>

                                    <td>

                                        {task.employeeName}

                                    </td>

                                    <td>

                                        {task.projectName}

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                task.status==="COMPLETED"
                                                ?"bg-success"
                                                :"bg-warning text-dark"
                                            }`}
                                        >

                                            {task.status}

                                        </span>

                                    </td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                task.priority==="HIGH"
                                                ?"bg-danger"
                                                :task.priority==="MEDIUM"
                                                ?"bg-warning text-dark"
                                                :"bg-info"
                                            }`}
                                        >

                                            {task.priority}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    </div>

    {/* Pending Leaves */}

    <div className="col-lg-4 mb-4">

        <div className="card border-0 shadow rounded-4">

            <div className="card-header bg-white border-0">

                <h4 className="fw-bold">

                    🌴 Leave Requests

                </h4>

            </div>

            <div className="card-body">

                {

                    leaves.length===0?

                    (

                        <div className="text-center text-muted py-5">

                            <h5>

                                No Pending Leaves

                            </h5>

                        </div>

                    )

                    :

                    (

                        leaves.slice(0,5).map(leave=>(

                            <div
                                key={leave.id}
                                className="border rounded-3 p-3 mb-3"
                            >

                                <h6>

                                    Employee ID :

                                    {" "}

                                    {leave.employeeId}

                                </h6>

                                <p className="mb-1">

                                    {leave.reason}

                                </p>

                                <span className="badge bg-warning text-dark">

                                    {leave.status}

                                </span>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    </div>

</div>

{/* Top Employees */}

<div className="card border-0 shadow rounded-4 mt-4">

    <div className="card-header bg-white border-0">

        <h4 className="fw-bold">

            ⭐ Top Performing Employees

        </h4>

    </div>

    <div className="card-body">

        <div className="table-responsive">

            <table className="table table-hover">

                <thead className="table-light">

                    <tr>

                        <th>Name</th>

                        <th>Department</th>

                        <th>Performance</th>

                        <th>Attendance</th>

                        <th>Risk</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        employees

                        .sort((a,b)=>

                            b.performanceScore-a.performanceScore

                        )

                        .slice(0,5)

                        .map(emp=>(

                            <tr key={emp.id}>

                                <td>

                                    {emp.firstName}

                                    {" "}

                                    {emp.lastName}

                                </td>

                                <td>

                                    {emp.department}

                                </td>

                                <td>

                                    {emp.performanceScore}%

                                </td>

                                <td>

                                    {emp.attendancePercentage}%

                                </td>

                                <td>

                                    <span
                                        className={`badge ${
                                            emp.attritionRisk==="LOW"
                                            ?"bg-success"
                                            :emp.attritionRisk==="MEDIUM"
                                            ?"bg-warning text-dark"
                                            :"bg-danger"
                                        }`}
                                    >

                                        {emp.attritionRisk}

                                    </span>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    </div>

</div>

{/* Employee Performance */}

<div className="row mt-4">

    <div className="col-lg-6 mb-4">

        <div className="card border-0 shadow rounded-4">

            <div className="card-header bg-white border-0">

                <h4 className="fw-bold">

                    📈 Employee Performance

                </h4>

            </div>

            <div className="card-body">

                {

                    employees
                    .slice(0,6)
                    .map(emp=>(

                        <div
                            key={emp.id}
                            className="mb-4"
                        >

                            <div className="d-flex justify-content-between">

                                <strong>

                                    {emp.firstName} {emp.lastName}

                                </strong>

                                <strong>

                                    {emp.performanceScore}%

                                </strong>

                            </div>

                            <div className="progress mt-2">

                                <div

                                    className="progress-bar bg-success"

                                    style={{

                                        width:`${emp.performanceScore}%`

                                    }}

                                >

                                    {emp.performanceScore}%

                                </div>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    </div>

    {/* Quick Actions */}

    <div className="col-lg-6 mb-4">

        <div className="card border-0 shadow rounded-4">

            <div className="card-header bg-white border-0">

                <h4 className="fw-bold">

                    ⚡ Quick Actions

                </h4>

            </div>

            <div className="card-body">

                <div className="d-grid gap-3">

                    <button className="btn btn-primary btn-lg">

                        ➕ Add New Employee

                    </button>

                    <button className="btn btn-success btn-lg">

                        📁 Create Project

                    </button>

                    <button className="btn btn-warning btn-lg">

                        ✅ Assign Task

                    </button>

                    <button className="btn btn-info btn-lg text-white">

                        📊 Generate Report

                    </button>

                    <button className="btn btn-danger btn-lg">

                        🌴 Approve Leave

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

{/* Recent Activity */}

<div className="card border-0 shadow rounded-4 mt-4">

    <div className="card-header bg-white border-0">

        <h4 className="fw-bold">

            🕒 Recent Activity

        </h4>

    </div>

    <div className="card-body">

        <ul className="list-group list-group-flush">

            <li className="list-group-item">

                ✅ Employee joined the organization.

            </li>

            <li className="list-group-item">

                📁 New project assigned.

            </li>

            <li className="list-group-item">

                📝 Task status updated.

            </li>

            <li className="list-group-item">

                🌴 Leave request submitted.

            </li>

            <li className="list-group-item">

                📊 Attendance updated.

            </li>

        </ul>

    </div>

</div>

{/* Footer */}

<div className="text-center mt-5 mb-3 text-muted">

    <hr />

    <h6>

        NexusHR Enterprise Management System

    </h6>

    <small>

        Version 2.0 • Built with React, Spring Boot & PostgreSQL

    </small>

</div>

</div>

</div>

</div>


    );

}

export default ManagerDashboard;