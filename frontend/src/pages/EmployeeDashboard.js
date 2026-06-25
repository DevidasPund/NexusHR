import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeDashboard() {

  const [loading, setLoading] =
    useState(true);

  const [profile, setProfile] =
    useState({});

  const [attendance, setAttendance] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [leaves, setLeaves] =
    useState([]);

  useEffect(() => {

    loadDashboard();

    const interval =
      setInterval(() => {

        loadDashboard();

      }, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadDashboard =
    async () => {

      try {

        const username =
          localStorage.getItem(
            "username"
          );

        const profileRes =
          await API.get(
            `/employees/username/${username}`
          );

        const employee =
          profileRes.data;

        setProfile(employee);

        const attendanceRes =
          await API.get(
            `/attendance/employee/${employee.id}`
          );

        setAttendance(
          attendanceRes.data
        );

        const leaveRes =
          await API.get(
            `/leave/employee/${employee.id}`
          );

        setLeaves(
          leaveRes.data
        );

        const taskRes =
          await API.get(
            `/tasks/employee/${username}`
          );

        setTasks(
          taskRes.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const completedTasks =
    tasks.filter(
      t =>
        t.status ===
        "COMPLETED"
    ).length;

  const pendingTasks =
    tasks.filter(
      t =>
        t.status ===
        "PENDING"
    ).length;

  if (loading) {

    return (

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >

        <h3>
          Loading Dashboard...
        </h3>

      </div>

    );

  }

  return (

   <div className="app-container">

  <Sidebar />

  <div className="main-content">

    <Navbar />

    
  

        <div className="container-fluid p-4">

          {/* Welcome */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                👋 Welcome,
                {" "}
                {profile.firstName}
              </h2>

              <h5>
                {profile.designation}
              </h5>

              <p>
                {profile.department}
              </p>

            </div>

          </div>

          {/* KPI */}

          <div className="row g-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Attendance
                  </h6>

                  <h2 className="text-primary">
                    {attendance.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Completed Tasks
                  </h6>

                  <h2 className="text-success">
                    {completedTasks}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Pending Tasks
                  </h6>

                  <h2 className="text-warning">
                    {pendingTasks}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Salary
                  </h6>

                  <h2 className="text-success">
                    ₹{profile.salary || 0}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Analytics */}

          <div className="row g-4 mt-2">

            <div className="col-md-4">

              <div className="card bg-primary text-white shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Attendance %
                  </h6>

                  <h2>
                    {profile.attendancePercentage || 0}%
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card bg-success text-white shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Performance
                  </h6>

                  <h2>
                    {profile.performanceScore || 0}%
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card bg-danger text-white shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Attrition Risk
                  </h6>

                  <h2>
                    {profile.attritionRisk || "LOW"}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Current Project */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                🚀 Current Project
              </h4>

              <hr />

              <h5>
                {
                  profile.currentProject ||
                  "No Project Assigned"
                }
              </h5>

            </div>

          </div>

          {/* Profile */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                My Profile
              </h4>

              <hr />

              <div className="row">

                <div className="col-md-6">

                  <p>
                    <strong>Name:</strong>
                    {" "}
                    {profile.firstName}
                    {" "}
                    {profile.lastName}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    {" "}
                    {profile.email}
                  </p>

                </div>

                <div className="col-md-6">

                  <p>
                    <strong>Department:</strong>
                    {" "}
                    {profile.department}
                  </p>

                  <p>
                    <strong>Designation:</strong>
                    {" "}
                    {profile.designation}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Tasks */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                My Tasks
              </h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead className="table-dark">

                    <tr>

                      <th>Task</th>
                      <th>Project</th>
                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      tasks.length > 0

                        ?

                        tasks.map(task => (

                          <tr key={task.id}>

                            <td>
                              {task.taskName}
                            </td>

                            <td>
                              {task.projectName}
                            </td>

                            <td>
                              {task.status}
                            </td>

                          </tr>

                        ))

                        :

                        <tr>

                          <td
                            colSpan="3"
                            className="text-center"
                          >
                            No Tasks Found
                          </td>

                        </tr>

                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          {/* Leaves */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                My Leave Requests
              </h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead className="table-dark">

                    <tr>

                      <th>Type</th>
                      <th>Reason</th>
                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      leaves.length > 0

                        ?

                        leaves.map(leave => (

                          <tr key={leave.id}>

                            <td>
                              {leave.leaveType}
                            </td>

                            <td>
                              {leave.reason}
                            </td>

                            <td>
                              {leave.status}
                            </td>

                          </tr>

                        ))

                        :

                        <tr>

                          <td
                            colSpan="3"
                            className="text-center"
                          >
                            No Leave Requests Found
                          </td>

                        </tr>

                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default EmployeeDashboard;