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

  const dashboardRes =
    await API.get("/dashboard");

  const taskRes =
    await API.get("/tasks");

  const leaveRes =
    await API.get("/leave");

  setDashboard(
    dashboardRes.data
  );

  setTasks(
    taskRes.data
  );

  setLeaves(
    leaveRes.data
  );

} catch(error) {

  console.error(error);

}


};

const approveLeave = async(id) => {


try {

  await API.put(
    `/leave/manager-approve/${id}`
  );

  loadData();

} catch(error) {

  console.error(error);

}


};

const rejectLeave = async(id) => {


try {

  await API.put(
    `/leave/manager-reject/${id}`
  );

  loadData();

} catch(error) {

  console.error(error);

}


};

return (


<div className="d-flex">

  <Sidebar />

  <div
    className="flex-grow-1"
    style={{
      background:"#f4f7fe",
      minHeight:"100vh"
    }}
  >

    <Navbar />

    <div className="container-fluid p-4">

      {/* Hero Banner */}

      <div
        className="card border-0 shadow-lg mb-4"
        style={{
          background:
          "linear-gradient(135deg,#2563eb,#7c3aed)",
          borderRadius:"20px"
        }}
      >

        <div className="card-body text-white">

          <h2>
            Welcome Back Manager 👋
          </h2>

          <p>
            Manage Teams, Tasks,
            Projects and Leave Approvals
          </p>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="row g-4">

        <div className="col-md-3">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>👥 Team Members</h6>

              <h2 className="text-primary">
                {dashboard.totalEmployees || 0}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>📋 Pending Tasks</h6>

              <h2 className="text-warning">
                {dashboard.pendingTasks || 0}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>🌴 Pending Leaves</h6>

              <h2 className="text-danger">
                {dashboard.pendingLeaves || 0}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card border-0 shadow">

            <div className="card-body text-center">

              <h6>📁 Projects</h6>

              <h2 className="text-success">
                {dashboard.totalProjects || 0}
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* AI Workforce */}

      <div className="card shadow border-0 mt-4">

        <div className="card-body">

          <h4>
            🤖 AI Workforce Insights
          </h4>

          <div className="row mt-3">

            <div className="col-md-4">

              <div className="alert alert-danger">

                High Risk Employees

                <h3>
                  {dashboard.highRiskEmployees || 0}
                </h3>

              </div>

            </div>

            <div className="col-md-4">

              <div className="alert alert-warning">

                Medium Risk Employees

                <h3>
                  {dashboard.mediumRiskEmployees || 0}
                </h3>

              </div>

            </div>

            <div className="col-md-4">

              <div className="alert alert-success">

                Low Risk Employees

                <h3>
                  {dashboard.lowRiskEmployees || 0}
                </h3>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="row mt-4">

        <div className="col-md-3">

          <a
            href="/tasks"
            className="btn btn-primary w-100 p-3"
          >
            ➕ Assign Task
          </a>

        </div>

        <div className="col-md-3">

          <a
            href="/projects"
            className="btn btn-success w-100 p-3"
          >
            📁 Projects
          </a>

        </div>

        <div className="col-md-3">

          <a
            href="/leave-management"
            className="btn btn-warning w-100 p-3"
          >
            🌴 Leave Approval
          </a>

        </div>

        <div className="col-md-3">

          <a
            href="/reports"
            className="btn btn-danger w-100 p-3"
          >
            📊 Reports
          </a>

        </div>

      </div>

      {/* Team Tasks */}

      <div className="card shadow border-0 mt-4">

        <div className="card-body">

          <h4>
            📋 Team Tasks
          </h4>

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>

                <th>Task</th>
                <th>Employee</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {
                tasks.map(task => (

                  <tr key={task.id}>

                    <td>
                      {task.taskName}
                    </td>

                    <td>
                      {task.employeeName}
                    </td>

                    <td>
                      {task.status}
                    </td>

                  </tr>

                ))
              }

            </tbody>

          </table>

        </div>

      </div>

      {/* Leave Approval */}

      <div className="card shadow border-0 mt-4">

        <div className="card-body">

          <h4>
            🌴 Leave Approval
          </h4>

          <table className="table table-hover">

            <thead className="table-dark">

              <tr>

                <th>ID</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
                leaves
                .filter(
                  leave =>
                  leave.status === "PENDING"
                )
                .map(leave => (

                  <tr key={leave.id}>

                    <td>
                      {leave.employeeId}
                    </td>

                    <td>
                      {leave.reason}
                    </td>

                    <td>
                      {leave.status}
                    </td>

                    <td>

                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          approveLeave(
                            leave.id
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          rejectLeave(
                            leave.id
                          )
                        }
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


);

}

export default ManagerDashboard;
