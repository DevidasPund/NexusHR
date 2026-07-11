import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

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

        highRiskEmployees: 0,
        mediumRiskEmployees: 0,
        lowRiskEmployees: 0,

        pendingTasks: 0,
        completedTasks: 0,
        totalProjects: 0

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);

            const response = await API.get("/dashboard");

            console.log(response.data);

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <>
                <Sidebar />

                <div className="main-content">

                    <Navbar />

                    <div className="container-fluid p-5 text-center">

                        <div className="spinner-border text-primary"></div>

                        <h3 className="mt-3">
                            Loading Manager Dashboard...
                        </h3>

                    </div>

                </div>

            </>

        );

    }

    return (

        <>

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="container-fluid mt-4">

                    <h2 className="fw-bold mb-4">

                        👨‍💼 Manager Dashboard

                    </h2>

                    <div className="row g-4">

                        <StatCard
                            title="Employees"
                            value={dashboard.totalEmployees}
                            color="primary"
                            icon="👨‍💼"
                        />

                        <StatCard
                            title="Active Employees"
                            value={dashboard.activeEmployees}
                            color="success"
                            icon="🟢"
                        />

                        <StatCard
                            title="Departments"
                            value={dashboard.totalDepartments}
                            color="warning"
                            icon="🏢"
                        />

                        <StatCard
                            title="Attendance"
                            value={dashboard.totalAttendance}
                            color="info"
                            icon="📅"
                        />

                        <StatCard
                            title="Present Today"
                            value={dashboard.presentToday}
                            color="success"
                            icon="✅"
                        />

                        <StatCard
                            title="Absent Today"
                            value={dashboard.absentToday}
                            color="danger"
                            icon="❌"
                        />

                        <StatCard
                            title="Pending Leaves"
                            value={dashboard.pendingLeaves}
                            color="warning"
                            icon="📝"
                        />

                        <StatCard
                            title="Approved Leaves"
                            value={dashboard.approvedLeaves}
                            color="success"
                            icon="✔"
                        />

                        <StatCard
                            title="Projects"
                            value={dashboard.totalProjects}
                            color="dark"
                            icon="📁"
                        />

                        <StatCard
                            title="Pending Tasks"
                            value={dashboard.pendingTasks}
                            color="secondary"
                            icon="📌"
                        />

                        <StatCard
                            title="Completed Tasks"
                            value={dashboard.completedTasks}
                            color="primary"
                            icon="🎯"
                        />

                        <StatCard
                            title="Attendance %"
                            value={`${dashboard.attendancePercentage.toFixed(2)} %`}
                            color="info"
                            icon="📈"
                        />

                    </div>

                </div>

            </div>

        </>

    );

}

function StatCard({

    title,
    value,
    color,
    icon

}) {

    return (

        <div className="col-lg-3 col-md-6">

            <div className={`card border-0 shadow bg-${color} text-white`}>

                <div className="card-body">

                    <div className="d-flex justify-content-between">

                        <div>

                            <h6>{title}</h6>

                            <h2>{value}</h2>

                        </div>

                        <div
                            style={{
                                fontSize: "40px"
                            }}
                        >

                            {icon}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ManagerDashboard;