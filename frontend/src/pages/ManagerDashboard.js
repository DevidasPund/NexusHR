import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ManagerDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const dashboardRes = await API.get("/dashboard");
      const taskRes = await API.get("/tasks");
      const leaveRes = await API.get("/leave");

      setDashboard(dashboardRes.data || {});
      setTasks(taskRes.data || []);
      setLeaves(leaveRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const approveLeave = async (id) => {
    try {
      await API.put(`/leave/manager-approve/${id}`);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectLeave = async (id) => {
    try {
      await API.put(`/leave/manager-reject/${id}`);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <div className="app-container">

  <Sidebar />

  <div className="main-content">

    <Navbar />

    ...
 

        <div className="container-fluid p-4">

          {/* Hero Section */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px"
            }}
          >
            <div className="card-body text-white">
              <h2 className="fw-bold">
                Welcome Back Manager 👋
              </h2>

              <p className="mb-0">
                Monitor team productivity,
                projects, attendance and leave
                approvals in real time.
              </p>
            </div>
          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="card border-0 shadow text-center">
                <div className="card-body">
                  <h6>👥 Team Members</h6>
                  <h2 className="text-primary">
                    {dashboard.totalEmployees || 0}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow text-center">
                <div className="card-body">
                  <h6>📋 Pending Tasks</h6>
                  <h2 className="text-warning">
                    {dashboard.pendingTasks || 0}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow text-center">
                <div className="card-body">
                  <h6>🌴 Pending Leaves</h6>
                  <h2 className="text-danger">
                    {dashboard.pendingLeaves || 0}
                  </h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow text-center">
                <div className="card-body">
                  <h6>📁 Projects</h6>
                  <h2 className="text-success">
                    {dashboard.totalProjects || 0}
                  </h2>
                </div>
              </div>
            </div>

          </div>

          {/* AI Workforce Insights */}

          <div className="card shadow border-0 mb-4">
            <div className="card-body">

              <h4 className="mb-4">
                🤖 AI Workforce Insights
              </h4>

              <div className="row">

                <div className="col-md-4">
                  <div className="alert alert-danger">
                    <h6>High Risk Employees</h6>
                    <h2>
                      {dashboard.highRiskEmployees || 0}
                    </h2>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="alert alert-warning">
                    <h6>Medium Risk Employees</h6>
                    <h2>
                      {dashboard.mediumRiskEmployees || 0}
                    </h2>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="alert alert-success">
                    <h6>Low Risk Employees</h6>
                    <h2>
                      {dashboard.lowRiskEmployees || 0}
                    </h2>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Quick Actions */}

          <div className="row mb-4">

            <div className="col-md-3">
              <a
                href="/tasks"
                className="text-decoration-none"
              >
                <div className="card shadow border-0 text-center p-4">
                  <h1>📋</h1>
                  <h5>Assign Tasks</h5>
                </div>
              </a>
            </div>

            <div className="col-md-3">
              <a
                href="/projects"
                className="text-decoration-none"
              >
                <div className="card shadow border-0 text-center p-4">
                  <h1>📁</h1>
                  <h5>Projects</h5>
                </div>
              </a>
            </div>

            <div className="col-md-3">
              <a
                href="/leave-management"
                className="text-decoration-none"
              >
                <div className="card shadow border-0 text-center p-4">
                  <h1>🌴</h1>
                  <h5>Leave Approval</h5>
                </div>
              </a>
            </div>

            <div className="col-md-3">
              <a
                href="/reports"
                className="text-decoration-none"
              >
                <div className="card shadow border-0 text-center p-4">
                  <h1>📊</h1>
                  <h5>Reports</h5>
                </div>
              </a>
            </div>

          </div>

          {/* Team Tasks */}

          <div className="card shadow border-0 mb-4">
            <div className="card-body">

              <h4>📋 Team Tasks</h4>

              <table className="table table-hover mt-3">

                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Task</th>
                    <th>Employee</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.taskName}</td>
                      <td>{task.employeeName}</td>
                      <td>
                        <span
                          className={
                            task.status === "COMPLETED"
                              ? "badge bg-success"
                              : "badge bg-warning"
                          }
                        >
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          </div>

          {/* Leave Approval */}

          <div className="card shadow border-0 mb-4">
            <div className="card-body">

              <h4>🌴 Leave Requests</h4>

              <table className="table table-hover mt-3">

                <thead className="table-dark">
                  <tr>
                    <th>Employee</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {leaves
                    .filter(
                      (leave) =>
                        leave.status === "PENDING"
                    )
                    .map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.employeeId}</td>
                        <td>{leave.reason}</td>
                        <td>{leave.status}</td>

                        <td>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() =>
                              approveLeave(leave.id)
                            }
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              rejectLeave(leave.id)
                            }
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}

                </tbody>

              </table>

            </div>
          </div>

          {/* Recent Activity */}

          <div className="card shadow border-0">
            <div className="card-body">

              <h4>🔔 Recent Activities</h4>

              <ul className="list-group mt-3">

                <li className="list-group-item">
                  New Employee Joined
                </li>

                <li className="list-group-item">
                  Project Assigned
                </li>

                <li className="list-group-item">
                  Leave Request Submitted
                </li>

                <li className="list-group-item">
                  Attendance Updated
                </li>

              </ul>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;