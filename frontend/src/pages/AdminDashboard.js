import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/ApiService";


import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";
import {
  FaUsers,
  FaTasks,
  FaCalendarCheck,
  FaProjectDiagram,
  FaChartLine,
  FaClipboardList,
  FaUserCheck,
  FaBell,
  FaExclamationTriangle,
  FaCheckCircle
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

      initial={{ opacity: 0, y: 25 }}

      animate={{ opacity: 1, y: 0 }}

      whileHover={{
        scale: 1.03
      }}

    >

      <div
        className="card border-0 shadow-lg rounded-4 h-100"
      >

        <div className="card-body">

          <div className="d-flex justify-content-between">

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

              <small
                className="text-muted"
              >

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
const ManagerDashboard = () => {

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

        totalProjects: 0,

        pendingTasks: 0,
        completedTasks: 0,

        highRiskEmployees: 0,
        mediumRiskEmployees: 0,
        lowRiskEmployees: 0,

        totalSalary: 0

    });

    const [tasks, setTasks] = useState([]);

    const [leaves, setLeaves] = useState([]);

    const [employees, setEmployees] = useState([]);

    const [error, setError] = useState("");
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

const leaveData = [
  {
    name: "Pending",
    value: dashboard.pendingLeaves
  },
  {
    name: "Approved",
    value: dashboard.approvedLeaves
  }
];

const COLORS = [
  "#10B981",
  "#EF4444"
];

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");

            const [

                dashboardRes,

                taskRes,

                leaveRes,

                employeeRes

            ] = await Promise.all([

                API.get("/dashboard"),

                API.get("/tasks"),

                API.get("/leave"),

                API.get("/employees")

            ]);

            console.log("Dashboard", dashboardRes.data);

            setDashboard(dashboardRes.data || {});

            setTasks(taskRes.data || []);

            setLeaves(leaveRes.data || []);

            setEmployees(employeeRes.data || []);

        }

        catch (err) {

            console.error(err);

            setError("Unable to load dashboard.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>

                <Sidebar />

                <div className="main-content">

                    <Navbar />

                    <div className="container-fluid p-5">

                        <div className="text-center">

                            <div className="spinner-border text-primary mb-3" />

                            <h3>

                                Loading Manager Dashboard...

                            </h3>

                        </div>

                    </div>

                </div>

            </>

        );

    }

    if (error) {

        return (

            <>

                <Sidebar />

                <div className="main-content">

                    <Navbar />

                    <div className="container-fluid p-5">

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    </div>

                </div>

            </>

        );

    }
    const approveLeave = async (id) => {

    try {

        await API.put(`/leave/manager-approve/${id}`);

        loadDashboard();

    }

    catch(error){

        console.log(error);

    }

};

const rejectLeave = async (id) => {

    try {

        await API.put(`/leave/manager-reject/${id}`);

        loadDashboard();

    }

    catch(error){

        console.log(error);

    }

};

    return (

        <>

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="container-fluid p-4">
                  {/* ================= AI Insights ================= */}

<div className="row mt-4">

    {/* AI Summary */}

    <div className="col-lg-4 mb-4">

        <div
            className="card border-0 shadow-lg rounded-4 h-100"
            style={{
                background:"linear-gradient(135deg,#4F46E5,#7C3AED)",
                color:"white"
            }}
        >

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    🤖 AI Insights

                </h4>

                <div className="mb-3">

                    <small>Attendance Health</small>

                    <div className="progress mt-2">

                        <div
                            className="progress-bar bg-success"
                            style={{
                                width:`${dashboard.attendancePercentage}%`
                            }}
                        />

                    </div>

                    <small>

                        {dashboard.attendancePercentage.toFixed(1)} %

                    </small>

                </div>

                <hr/>

                <p>

                    🔴 High Risk :
                    <strong>

                        {" "}
                        {dashboard.highRiskEmployees}

                    </strong>

                </p>

                <p>

                    🟠 Medium Risk :
                    <strong>

                        {" "}
                        {dashboard.mediumRiskEmployees}

                    </strong>

                </p>

                <p>

                    🟢 Low Risk :
                    <strong>

                        {" "}
                        {dashboard.lowRiskEmployees}

                    </strong>

                </p>

                <hr/>

                <h6>

                    AI Recommendation

                </h6>

                {

                    dashboard.highRiskEmployees > 0 ?

                    <div className="alert alert-warning mt-3">

                        Review employees with high absenteeism
                        and pending tasks.

                    </div>

                    :

                    <div className="alert alert-success mt-3">

                        Workforce performance is healthy.

                    </div>

                }

            </div>

        </div>

    </div>

    {/* Employee Performance */}

    <div className="col-lg-4 mb-4">

        <div className="card border-0 shadow rounded-4 h-100">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    📈 Performance

                </h4>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Attendance</span>

                        <strong>

                            {dashboard.attendancePercentage.toFixed(0)}%

                        </strong>

                    </div>

                    <div className="progress mt-2">

                        <div
                            className="progress-bar bg-primary"
                            style={{
                                width:`${dashboard.attendancePercentage}%`
                            }}
                        />

                    </div>

                </div>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Projects</span>

                        <strong>

                            {dashboard.totalProjects}

                        </strong>

                    </div>

                </div>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Completed Tasks</span>

                        <strong>

                            {dashboard.completedTasks}

                        </strong>

                    </div>

                </div>

                <div>

                    <div className="d-flex justify-content-between">

                        <span>Pending Tasks</span>

                        <strong>

                            {dashboard.pendingTasks}

                        </strong>

                    </div>

                </div>

            </div>

        </div>

    </div>

    {/* Team Health */}

    <div className="col-lg-4 mb-4">

        <div className="card border-0 shadow rounded-4 h-100">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    👥 Team Health

                </h4>

                <div className="mb-3">

                    <h6>Total Employees</h6>

                    <h2>

                        {dashboard.totalEmployees}

                    </h2>

                </div>

                <div className="mb-3">

                    <h6>Active Employees</h6>

                    <h2 className="text-success">

                        {dashboard.activeEmployees}

                    </h2>

                </div>

                <div className="mb-3">

                    <h6>Present Today</h6>

                    <h2 className="text-primary">

                        {dashboard.presentToday}

                    </h2>

                </div>

                <div>

                    <h6>Absent Today</h6>

                    <h2 className="text-danger">

                        {dashboard.absentToday}

                    </h2>

                </div>

            </div>

        </div>

    </div>

</div>
{/* ================= Quick Actions ================= */}

<div className="row mt-4">

    <div className="col-lg-4 mb-4">

        <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    ⚡ Quick Actions

                </h4>

                <div className="d-grid gap-3">

                    <button className="btn btn-primary btn-lg">

                        ➕ Add Employee

                    </button>

                    <button className="btn btn-success btn-lg">

                        📅 Attendance

                    </button>

                    <button className="btn btn-warning btn-lg text-dark">

                        📁 Projects

                    </button>

                    <button className="btn btn-info btn-lg text-white">

                        📝 Leave Requests

                    </button>

                    <button className="btn btn-dark btn-lg">

                        📊 Reports

                    </button>

                </div>

            </div>

        </div>

    </div>

    {/* Notifications */}

    <div className="col-lg-4 mb-4">

        <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    🔔 Notifications

                </h4>

                <ul className="list-group list-group-flush">

                    <li className="list-group-item">

                        📝 {dashboard.pendingLeaves} Pending Leave Requests

                    </li>

                    <li className="list-group-item">

                        📋 {dashboard.pendingTasks} Pending Tasks

                    </li>

                    <li className="list-group-item">

                        🚨 {dashboard.highRiskEmployees} High Risk Employees

                    </li>

                    <li className="list-group-item">

                        👨‍💼 {dashboard.activeEmployees} Active Employees

                    </li>

                    <li className="list-group-item">

                        📊 Attendance {dashboard.attendancePercentage.toFixed(1)}%

                    </li>

                </ul>

            </div>

        </div>

    </div>

    {/* Recent Activity */}

    <div className="col-lg-4 mb-4">

        <div className="card shadow-lg border-0 rounded-4">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    🕒 Recent Activity

                </h4>

                <div className="timeline">

                    <p>

                        ✅ Dashboard Loaded Successfully

                    </p>

                    <p>

                        👥 Employees : {dashboard.totalEmployees}

                    </p>

                    <p>

                        📅 Present Today : {dashboard.presentToday}

                    </p>

                    <p>

                        📝 Pending Leaves : {dashboard.pendingLeaves}

                    </p>

                    <p>

                        📋 Pending Tasks : {dashboard.pendingTasks}

                    </p>

                    <p>

                        💰 Payroll : ₹{dashboard.totalSalary}

                    </p>

                </div>

            </div>

        </div>

    </div>

</div>
{/* ================= Top Performers & Department Statistics ================= */}

<div className="row mt-4">

    {/* Top Performers */}

    <div className="col-lg-7 mb-4">

        <div className="card border-0 shadow-lg rounded-4">

            <div className="card-header bg-white border-0 d-flex justify-content-between">

                <h4 className="fw-bold">

                    ⭐ Top Employees

                </h4>

                <span className="badge bg-primary">

                    {employees.length} Employees

                </span>

            </div>

            <div className="card-body">

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead>

                            <tr>

                                <th>Employee</th>

                                <th>Department</th>

                                <th>Designation</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                employees.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center p-4"
                                        >

                                            No Employees Found

                                        </td>

                                    </tr>

                                )

                                :

                                employees.slice(0,8).map(emp => (

                                    <tr key={emp.id}>

                                        <td>

                                            <div className="d-flex align-items-center">

                                                <div

                                                    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"

                                                    style={{
                                                        width:45,
                                                        height:45,
                                                        fontWeight:"bold"
                                                    }}

                                                >

                                                    {emp.firstName
                                                        ? emp.firstName.charAt(0)
                                                        : "E"}

                                                </div>

                                                <div>

                                                    <strong>

                                                        {emp.firstName} {emp.lastName}

                                                    </strong>

                                                    <br/>

                                                    <small className="text-muted">

                                                        {emp.email}

                                                    </small>

                                                </div>

                                            </div>

                                        </td>

                                        <td>

                                            {emp.department}

                                        </td>

                                        <td>

                                            {emp.designation}

                                        </td>

                                        <td>

                                            <span

                                                className={

                                                    emp.status === "ACTIVE"

                                                    ?

                                                    "badge bg-success"

                                                    :

                                                    "badge bg-danger"

                                                }

                                            >

                                                {emp.status}

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

    </div>

    {/* Department Statistics */}

    <div className="col-lg-5 mb-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    📊 Department Statistics

                </h4>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Total Departments</span>

                        <strong>

                            {dashboard.totalDepartments}

                        </strong>

                    </div>

                    <div className="progress mt-2">

                        <div

                            className="progress-bar bg-primary"

                            style={{

                                width:"100%"

                            }}

                        />

                    </div>

                </div>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Attendance</span>

                        <strong>

                            {dashboard.attendancePercentage.toFixed(1)}%

                        </strong>

                    </div>

                    <div className="progress mt-2">

                        <div

                            className="progress-bar bg-success"

                            style={{

                                width:`${dashboard.attendancePercentage}%`

                            }}

                        />

                    </div>

                </div>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Projects</span>

                        <strong>

                            {dashboard.totalProjects}

                        </strong>

                    </div>

                </div>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Completed Tasks</span>

                        <strong>

                            {dashboard.completedTasks}

                        </strong>

                    </div>

                </div>

                <div>

                    <div className="d-flex justify-content-between">

                        <span>Pending Tasks</span>

                        <strong>

                            {dashboard.pendingTasks}

                        </strong>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
{/* ================= Dashboard Bottom ================= */}

<div className="row mt-4">

    {/* Calendar */}

    <div className="col-lg-4 mb-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    📅 Today

                </h4>

                <h2>

                    {new Date().toLocaleDateString()}

                </h2>

                <h5 className="text-muted">

                    {new Date().toLocaleTimeString()}

                </h5>

                <hr/>

                <p>

                    ✔ Review Pending Leaves

                </p>

                <p>

                    ✔ Check Employee Attendance

                </p>

                <p>

                    ✔ Monitor Projects

                </p>

                <p>

                    ✔ Team Meeting

                </p>

            </div>

        </div>

    </div>

    {/* Project Progress */}

    <div className="col-lg-4 mb-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">

            <div className="card-body">

                <h4 className="fw-bold mb-4">

                    📈 Project Progress

                </h4>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Completed</span>

                        <strong>

                            {dashboard.completedTasks}

                        </strong>

                    </div>

                    <div className="progress mt-2">

                        <div

                            className="progress-bar bg-success"

                            style={{ width: "70%" }}

                        />

                    </div>

                </div>

                <div className="mb-4">

                    <div className="d-flex justify-content-between">

                        <span>Pending</span>

                        <strong>

                            {dashboard.pendingTasks}

                        </strong>

                    </div>

                    <div className="progress mt-2">

                        <div

                            className="progress-bar bg-warning"

                            style={{ width: "30%" }}

                        />

                    </div>

                </div>

                <div>

                    <div className="d-flex justify-content-between">

                        <span>Total Projects</span>

                        <strong>

                            {dashboard.totalProjects}

                        </strong>

                    </div>

                </div>

            </div>

        </div>

    </div>

    {/* Manager Profile */}

    <div className="col-lg-4 mb-4">

        <div className="card border-0 shadow-lg rounded-4 h-100">

            <div className="card-body text-center">

                <img

                    src="https://ui-avatars.com/api/?name=Manager"

                    alt="Manager"

                    className="rounded-circle mb-3"

                    width="100"

                    height="100"

                />

                <h4>

                    {localStorage.getItem("username")}

                </h4>

                <p className="text-muted">

                    Manager

                </p>

                <hr/>

                <div className="row">

                    <div className="col">

                        <h4>

                            {dashboard.totalEmployees}

                        </h4>

                        <small>

                            Employees

                        </small>

                    </div>

                    <div className="col">

                        <h4>

                            {dashboard.totalProjects}

                        </h4>

                        <small>

                            Projects

                        </small>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>

{/* ================= Footer ================= */}

<div className="card border-0 shadow rounded-4 mt-4 mb-4">

    <div className="card-body d-flex justify-content-between align-items-center flex-wrap">

        <div>

            <strong>

                NexusHR Enterprise HRMS

            </strong>

            <br/>

            <small>

                Manager Dashboard

            </small>

        </div>

        <div>

            <span className="badge bg-success">

                System Online

            </span>

        </div>

        <div>

            Last Updated :

            {new Date().toLocaleString()}

        </div>

    </div>

</div>
{/* Welcome Banner */}

<motion.div
    initial={{ opacity: 0, y: -25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-4 rounded-4 shadow mb-4"
    style={{
        background:
            "linear-gradient(135deg,#2563EB,#7C3AED)",
        color: "white"
    }}
>

    <div className="d-flex justify-content-between align-items-center flex-wrap">

        <div>

            <h2 className="fw-bold">

                Welcome Manager 👋

            </h2>

            <p className="mb-0">

                Manage employees, tasks, attendance,
                leaves and projects efficiently.

            </p>

        </div>

        <div className="text-end">

            <h5>

                NexusHR Enterprise

            </h5>

            <small>

                Workforce Management System

            </small>

        </div>

    </div>

</motion.div>

{/* KPI Cards */}

<div className="row g-4">

    <DashboardCard
        title="Employees"
        value={dashboard.totalEmployees}
        subtitle="Total Employees"
        icon={<FaUsers />}
        color="#2563EB"
    />

    <DashboardCard
        title="Active Employees"
        value={dashboard.activeEmployees}
        subtitle="Currently Active"
        icon={<FaUserCheck />}
        color="#10B981"
    />

    <DashboardCard
        title="Pending Tasks"
        value={dashboard.pendingTasks}
        subtitle="Need Attention"
        icon={<FaTasks />}
        color="#F97316"
    />

    <DashboardCard
        title="Projects"
        value={dashboard.totalProjects}
        subtitle="Running Projects"
        icon={<FaProjectDiagram />}
        color="#6366F1"
    />

    <DashboardCard
        title="Pending Leaves"
        value={dashboard.pendingLeaves}
        subtitle="Approval Required"
        icon={<FaClipboardList />}
        color="#EF4444"
    />

    <DashboardCard
        title="Attendance"
        value={dashboard.presentToday}
        subtitle="Present Today"
        icon={<FaCalendarCheck />}
        color="#14B8A6"
    />

    <DashboardCard
        title="Attendance %"
        value={dashboard.attendancePercentage}
        subtitle="Overall Attendance"
        icon={<FaChartLine />}
        color="#8B5CF6"
    />

    <DashboardCard
        title="Notifications"
        value={dashboard.pendingLeaves}
        subtitle="Pending Alerts"
        icon={<FaBell />}
        color="#EC4899"
    />

    <DashboardCard
        title="High Risk"
        value={dashboard.highRiskEmployees}
        subtitle="AI Prediction"
        icon={<FaExclamationTriangle />}
        color="#DC2626"
    />

    <DashboardCard
        title="Low Risk"
        value={dashboard.lowRiskEmployees}
        subtitle="Healthy Employees"
        icon={<FaCheckCircle />}
        color="#16A34A"
    />

    <DashboardCard
        title="Salary"
        value={dashboard.totalSalary}
        subtitle="Total Payroll"
        icon={<FaUsers />}
        color="#0EA5E9"
    />

    <DashboardCard
        title="Departments"
        value={dashboard.totalDepartments}
        subtitle="Organization"
        icon={<FaProjectDiagram />}
        color="#F59E0B"
    />

</div>

<div className="row mt-5">

    {/* Attendance Chart */}

    <div className="col-lg-6 mb-4">

        <div className="card shadow border-0 rounded-4">

            <div className="card-body">

                <h4 className="mb-4">

                    Attendance Overview

                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <BarChart
                        data={attendanceData}
                    >

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="name"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Bar
                            dataKey="value"
                            fill="#2563EB"
                            radius={[8,8,0,0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    </div>

    {/* Leave Chart */}

    <div className="col-lg-6 mb-4">

        <div className="card shadow border-0 rounded-4">

            <div className="card-body">

                <h4 className="mb-4">

                    Leave Statistics

                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={320}
                >

                    <PieChart>

                        <Pie

                            data={leaveData}

                            dataKey="value"

                            outerRadius={110}

                            label

                        >

                            {

                                leaveData.map(

                                    (entry,index)=>(

                                        <Cell

                                            key={index}

                                            fill={COLORS[index]}

                                        />

                                    )

                                )

                            }

                        </Pie>

                        <Tooltip/>

                        <Legend/>

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    </div>

</div>
{/* ===================== Recent Tasks ===================== */}

<div className="card shadow-lg border-0 rounded-4 mt-4">

    <div className="card-header bg-white border-0">

        <div className="d-flex justify-content-between align-items-center">

            <h4 className="fw-bold">

                📋 Recent Tasks

            </h4>

            <span className="badge bg-primary">

                {tasks.length} Tasks

            </span>

        </div>

    </div>

    <div className="card-body">

        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>Task</th>

                        <th>Employee</th>

                        <th>Project</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Due Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        tasks.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center text-muted p-5"
                                >

                                    No Tasks Found

                                </td>

                            </tr>

                        )

                        :

                        tasks.slice(0,8).map(task=>(

                            <tr key={task.id}>

                                <td>

                                    #{task.id}

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

                                        className={

                                            task.priority==="HIGH"

                                            ?

                                            "badge bg-danger"

                                            :

                                            task.priority==="MEDIUM"

                                            ?

                                            "badge bg-warning text-dark"

                                            :

                                            "badge bg-success"

                                        }

                                    >

                                        {task.priority}

                                    </span>

                                </td>

                                <td>

                                    <span

                                        className={

                                            task.status==="COMPLETED"

                                            ?

                                            "badge bg-success"

                                            :

                                            task.status==="IN_PROGRESS"

                                            ?

                                            "badge bg-info"

                                            :

                                            "badge bg-secondary"

                                        }

                                    >

                                        {task.status}

                                    </span>

                                </td>

                                <td>

                                    {task.dueDate}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    </div>

</div>
{/* ================= Leave Approval ================= */}

<div className="card shadow-lg border-0 rounded-4 mt-4">

    <div className="card-header bg-white border-0 d-flex justify-content-between">

        <h4 className="fw-bold">

            📝 Leave Approval

        </h4>

        <span className="badge bg-warning text-dark">

            {leaves.filter(l => l.status === "PENDING").length}

            Pending

        </span>

    </div>

    <div className="card-body">

        <div className="table-responsive">

            <table className="table table-hover align-middle">

                <thead>

                    <tr>

                        <th>Employee</th>

                        <th>Leave Type</th>

                        <th>Reason</th>

                        <th>From</th>

                        <th>To</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        leaves.filter(

                            leave => leave.status === "PENDING"

                        ).length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="text-center text-muted p-5"
                                >

                                    No Pending Leave Requests

                                </td>

                            </tr>

                        )

                        :

                        leaves

                        .filter(

                            leave => leave.status === "PENDING"

                        )

                        .slice(0,8)

                        .map(leave => (

                            <tr key={leave.id}>

                                <td>

                                    <div className="d-flex align-items-center">

                                        <div
                                            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                                            style={{
                                                width:45,
                                                height:45,
                                                fontWeight:"bold"
                                            }}
                                        >

                                            {leave.employeeName
                                                ? leave.employeeName.charAt(0)
                                                : "E"}

                                        </div>

                                        <div>

                                            <strong>

                                                {leave.employeeName || leave.employeeId}

                                            </strong>

                                        </div>

                                    </div>

                                </td>

                                <td>

                                    {leave.leaveType}

                                </td>

                                <td>

                                    {leave.reason}

                                </td>

                                <td>

                                    {leave.startDate}

                                </td>

                                <td>

                                    {leave.endDate}

                                </td>

                                <td>

                                    <span className="badge bg-warning text-dark">

                                        {leave.status}

                                    </span>

                                </td>

                                <td>

                                    <button

                                        className="btn btn-success btn-sm me-2"

                                        onClick={() => approveLeave(leave.id)}

                                    >

                                        Approve

                                    </button>

                                    <button

                                        className="btn btn-danger btn-sm"

                                        onClick={() => rejectLeave(leave.id)}

                                    >

                                        Reject

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    </div>

</div>

                </div>

            </div>

        </>

    );

};

export default ManagerDashboard;