import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {

  const [dashboard, setDashboard] =
    useState({});

  const username =
    localStorage.getItem("username");

  const role =
    localStorage.getItem("role");

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard =
    async () => {

      try {

        const response =
          await API.get("/dashboard");

        setDashboard(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "20px"
            }}
          >

            <div
              className="card-body text-center p-5"
            >

              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="profile"
                width="140"
                height="140"
                style={{
                  borderRadius: "50%",
                  border: "5px solid #0d6efd"
                }}
              />

              <h1 className="mt-3">
                {username}
              </h1>

              <span
                className="badge bg-danger fs-6"
              >
                {role}
              </span>

              <p className="text-muted mt-3">
                NexusHR System Administrator
              </p>

            </div>

          </div>

          <div className="row mt-4">

            <div className="col-md-3">

              <div
                className="card text-white shadow"
                style={{
                  background:
                    "linear-gradient(135deg,#667eea,#764ba2)"
                }}
              >

                <div className="card-body text-center">

                  <h6>Total Employees</h6>

                  <h2>
                    {
                      dashboard.totalEmployees || 0
                    }
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div
                className="card text-white shadow"
                style={{
                  background:
                    "linear-gradient(135deg,#11998e,#38ef7d)"
                }}
              >

                <div className="card-body text-center">

                  <h6>Departments</h6>

                  <h2>
                    {
                      dashboard.totalDepartments || 0
                    }
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div
                className="card text-white shadow"
                style={{
                  background:
                    "linear-gradient(135deg,#f7971e,#ffd200)"
                }}
              >

                <div className="card-body text-center">

                  <h6>Attendance</h6>

                  <h2>
                    {
                      dashboard.totalAttendance || 0
                    }
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div
                className="card text-white shadow"
                style={{
                  background:
                    "linear-gradient(135deg,#fc466b,#3f5efb)"
                }}
              >

                <div className="card-body text-center">

                  <h6>Total Salary</h6>

                  <h2>
                    ₹{
                      dashboard.totalSalary || 0
                    }
                  </h2>

                </div>

              </div>

            </div>

          </div>

          <div className="row mt-4">

            <div className="col-md-6">

              <div className="card shadow">

                <div className="card-body">

                  <h4>
                    👨‍💼 Admin Information
                  </h4>

                  <hr />

                  <p>
                    <strong>
                      Username :
                    </strong>
                    {" "}
                    {username}
                  </p>

                  <p>
                    <strong>
                      Role :
                    </strong>
                    {" "}
                    {role}
                  </p>

                  <p>
                    <strong>
                      Access :
                    </strong>
                    Full System Access
                  </p>

                  <p>
                    <strong>
                      Status :
                    </strong>
                    Active
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card shadow">

                <div className="card-body">

                  <h4>
                    📊 Admin Privileges
                  </h4>

                  <hr />

                  <ul>

                    <li>
                      Employee Management
                    </li>

                    <li>
                      Department Management
                    </li>

                    <li>
                      Attendance Tracking
                    </li>

                    <li>
                      Leave Approval
                    </li>

                    <li>
                      Payroll Management
                    </li>

                    <li>
                      Reports & Analytics
                    </li>

                    <li>
                      Notifications
                    </li>

                  </ul>

                </div>

              </div>

            </div>

          </div>

          <div className="card shadow mt-4">

            <div className="card-body">

              <h4>
                🚀 System Overview
              </h4>

              <hr />

              <div className="row text-center">

                <div className="col-md-3">
                  <h2 className="text-primary">
                    {
                      dashboard.activeEmployees || 0
                    }
                  </h2>
                  Active Employees
                </div>

                <div className="col-md-3">
                  <h2 className="text-success">
                    {
                      dashboard.pendingLeaves || 0
                    }
                  </h2>
                  Pending Leaves
                </div>

                <div className="col-md-3">
                  <h2 className="text-warning">
                    {
                      dashboard.approvedLeaves || 0
                    }
                  </h2>
                  Approved Leaves
                </div>

                <div className="col-md-3">
                  <h2 className="text-danger">
                    {
                      dashboard.totalAttendance || 0
                    }
                  </h2>
                  Attendance Today
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Profile;