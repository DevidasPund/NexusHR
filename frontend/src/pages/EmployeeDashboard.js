import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeDashboard() {

  const [attendance, setAttendance] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const employeeId =
        localStorage.getItem("employeeId");

      console.log(
        "Employee ID:",
        employeeId
      );

      if (!employeeId) {
        alert("Employee ID Not Found");
        return;
      }

      const response =
        await API.get(
          `/employees/${employeeId}`
        );

      console.log(
        "Profile Data:",
        response.data
      );

      setProfile(
        response.data
      );

      loadAttendance(
        employeeId
      );

      loadLeaves(
        employeeId
      );

      if (
        response.data.username
      ) {

        loadTasks(
          response.data.username
        );

      }

    } catch (error) {

      console.error(
        "Profile Error:",
        error
      );

    }
  };

  const loadAttendance =
    async (employeeId) => {

      try {

        const response =
          await API.get(
            `/attendance/employee/${employeeId}`
          );

        setAttendance(
          response.data
        );

      } catch (error) {

        console.error(error);

      }
    };

  const loadLeaves =
    async (employeeId) => {

      try {

        const response =
          await API.get(
            `/leave/employee/${employeeId}`
          );

        setLeaves(
          response.data
        );

      } catch (error) {

        console.error(error);

      }
    };

  const loadTasks =
    async (username) => {

      try {

        const response =
          await API.get(
            `/tasks/employee/${username}`
          );

        setTasks(
          response.data
        );

      } catch (error) {

        console.error(error);

      }
    };

  const completedTasks =
    tasks.filter(
      t => t.status === "COMPLETED"
    ).length;

  const pendingTasks =
    tasks.filter(
      t => t.status === "PENDING"
    ).length;

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />
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
        <div className="container-fluid p-4">

          <h2 className="fw-bold mb-4">
            Employee Dashboard
          </h2>

          <div className="row g-4">

            <div className="col-md-3">
              <div className="card shadow border-0 bg-primary text-white">
                <div className="card-body">
                  <h6>Total Attendance</h6>
                  <h2>{attendance.length}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0 bg-success text-white">
                <div className="card-body">
                  <h6>Completed Tasks</h6>
                  <h2>{completedTasks}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0 bg-warning text-dark">
                <div className="card-body">
                  <h6>Pending Tasks</h6>
                  <h2>{pendingTasks}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow border-0 bg-info text-white">
                <div className="card-body">
                  <h6>Salary</h6>
                  <h2>
                    ₹{profile.salary || 0}
                  </h2>
                </div>
              </div>
            </div>

          </div>
          

          <div className="card shadow mt-4 border-0">

            <div className="card-body">

              <h4 className="mb-3">
                My Profile
              </h4>

              <div className="row">

                <div className="col-md-6">
                  <p>
                    <strong>Name:</strong>{" "}
                    {profile.firstName}{" "}
                    {profile.lastName}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {profile.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {profile.phone}
                  </p>
                </div>

                <div className="col-md-6">

                  <p>
                    <strong>Department:</strong>{" "}
                    {profile.department}
                  </p>

                  <p>
                    <strong>Designation:</strong>{" "}
                    {profile.designation}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {profile.status}
                  </p>

                </div>

              </div>

            </div>

          </div>
          
{/* Employee Analytics */}

<div className="row g-4 mt-3">

  <div className="col-md-4">

    <div className="card shadow border-0 bg-primary text-white">

      <div className="card-body text-center">

        <h6>Attendance Score</h6>

        <h2>
          {profile.attendancePercentage || 0}%
        </h2>

      </div>

    </div>

  </div>
<div className="card shadow border-0 mt-4">

  <div className="card-body">

    <h4>🚀 Current Project</h4>

    <hr />

    <h5>
      {profile.currentProject || "No Project Assigned"}
    </h5>

  </div>

</div>
  <div className="col-md-4">

    <div className="card shadow border-0 bg-success text-white">

      <div className="card-body text-center">

        <h6>Performance Score</h6>

        <h2>
          {profile.performanceScore || 0}%
        </h2>

      </div>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card shadow border-0 bg-danger text-white">

      <div className="card-body text-center">

        <h6>Attrition Risk</h6>

        <h2>
          {profile.attritionRisk || "LOW"}
        </h2>

      </div>

    </div>

  </div>

</div>

<div className="row g-4 mt-2">

  <div className="col-md-4">

    <div className="card shadow border-0">

      <div className="card-body text-center">

        <h6>Current Projects</h6>

        <h2>
          {profile.projectCount || 0}
        </h2>

      </div>

    </div>

  </div>
<div className="card shadow border-0">

  <div className="card-body">

    <h5>
      Task Completion
    </h5>

    <div className="progress">

      <div
        className="progress-bar bg-success"
        style={{
          width:
            tasks.length > 0
              ? `${(
                  completedTasks /
                  tasks.length
                ) * 100}%`
              : "0%"
        }}
      />

    </div>

  </div>

</div>
  <div className="col-md-4">

    <div className="card shadow border-0">

      <div className="card-body text-center">

        <h6>Completed Tasks</h6>

       <h2>{completedTasks}</h2>
      </div>

    </div>

  </div>

  <div className="col-md-4">

    <div className="card shadow border-0">

      <div className="card-body text-center">

        <h6>Pending Tasks</h6>

        <h2>{pendingTasks}</h2>

      </div>

    </div>

  </div>

</div>

{/* AI Career Insights */}

<div className="card shadow border-0 mt-4">

  <div className="card-body">

    <h4>
      🤖 AI Career Insights
    </h4>

    <hr />

    <p>
      <strong>Attrition Risk:</strong>
      {" "}
      {profile.attritionRisk || "LOW"}
    </p>

    <p>
      <strong>Missing Skills:</strong>
      {" "}
      {profile.missingSkills || "None"}
    </p>

    <p>
      <strong>Recommended Training:</strong>
      {" "}
      React, Spring Boot, AWS, Microservices
    </p>

  </div>

</div>
          <div className="card shadow mt-4 border-0">

            <div className="card-body">

              <h4>
                My Tasks
              </h4>

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>Task</th>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {
                    tasks.length > 0 ?

                      tasks.map(task => (

                        <tr key={task.id}>

                          <td>
                            {task.taskName}
                          </td>

                          <td>
                            {task.projectName}
                          </td>

                          <td>
                            {task.priority}
                          </td>

                          <td>

                            <span
                              className={
                                task.status === "COMPLETED"
                                  ? "badge bg-success"
                                  : task.status === "IN_PROGRESS"
                                  ? "badge bg-primary"
                                  : "badge bg-warning"
                              }
                            >
                              {task.status}
                            </span>

                          </td>

                        </tr>

                      ))

                      :

                      <tr>

                        <td
                          colSpan="4"
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

          <div className="card shadow mt-4 border-0">

            <div className="card-body">

              <h4>
                My Leave Requests
              </h4>

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>
                    <th>Leave Type</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {
                    leaves.length > 0 ?

                      leaves.map(leave => (

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
                                leave.status === "APPROVED"
                                  ? "badge bg-success"
                                  : leave.status === "REJECTED"
                                  ? "badge bg-danger"
                                  : "badge bg-warning"
                              }
                            >
                              {leave.status}
                            </span>

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
  );
}

export default EmployeeDashboard;