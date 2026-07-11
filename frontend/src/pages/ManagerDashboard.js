import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ManagerDashboard() {

  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    pendingTasks: 0,
    pendingLeaves: 0,
    totalProjects: 0,
    highRiskEmployees: 0,
    mediumRiskEmployees: 0,
    lowRiskEmployees: 0
  });

  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    setLoading(true);

    try {

      const dashboardReq = API.get("/dashboard").catch(() => ({ data: {} }));
      const tasksReq = API.get("/tasks").catch(() => ({ data: [] }));
      const leaveReq = API.get("/leave").catch(() => ({ data: [] }));

      const [dashboardRes, taskRes, leaveRes] =
        await Promise.all([
          dashboardReq,
          tasksReq,
          leaveReq
        ]);

      setDashboard({
        totalEmployees: dashboardRes.data.totalEmployees || 0,
        pendingTasks: dashboardRes.data.pendingTasks || 0,
        pendingLeaves: dashboardRes.data.pendingLeaves || 0,
        totalProjects: dashboardRes.data.totalProjects || 0,
        highRiskEmployees: dashboardRes.data.highRiskEmployees || 0,
        mediumRiskEmployees: dashboardRes.data.mediumRiskEmployees || 0,
        lowRiskEmployees: dashboardRes.data.lowRiskEmployees || 0
      });

      setTasks(taskRes.data || []);
      setLeaves(leaveRes.data || []);

    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  };

  const approveLeave = async (id) => {
    await API.put(`/leave/manager-approve/${id}`);
    loadDashboard();
  };

  const rejectLeave = async (id) => {
    await API.put(`/leave/manager-reject/${id}`);
    loadDashboard();
  };

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="container p-5 text-center">
            <h3>Loading Dashboard...</h3>
          </div>
        </div>
      </>
    );
  }

  return (

    <div className="app-container">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="container-fluid p-4">

          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h6>Employees</h6>
                  <h2>{dashboard.totalEmployees}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h6>Pending Tasks</h6>
                  <h2>{dashboard.pendingTasks}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h6>Pending Leaves</h6>
                  <h2>{dashboard.pendingLeaves}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow text-center">
                <div className="card-body">
                  <h6>Projects</h6>
                  <h2>{dashboard.totalProjects}</h2>
                </div>
              </div>
            </div>

          </div>

          <div className="card shadow mb-4">

            <div className="card-header">
              <h4>Tasks</h4>
            </div>

            <div className="card-body">

              <table className="table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Task</th>
                    <th>Employee</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {tasks.map(task => (

                    <tr key={task.id}>
                      <td>{task.id}</td>
                      <td>{task.taskName}</td>
                      <td>{task.employeeName}</td>
                      <td>{task.status}</td>
                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          <div className="card shadow">

            <div className="card-header">
              <h4>Leave Requests</h4>
            </div>

            <div className="card-body">

              <table className="table">

                <thead>

                  <tr>
                    <th>Employee</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {leaves
                    .filter(l => l.status === "PENDING")
                    .map(l => (

                      <tr key={l.id}>

                        <td>{l.employeeId}</td>
                        <td>{l.reason}</td>
                        <td>{l.status}</td>

                        <td>

                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => approveLeave(l.id)}
                          >
                            Approve
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => rejectLeave(l.id)}
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

        </div>

      </div>

    </div>

  );

}

export default ManagerDashboard;