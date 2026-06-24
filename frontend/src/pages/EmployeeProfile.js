import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeProfile() {

  const [employee,
    setEmployee] =
    useState({});

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    loadProfile();

    const interval =
      setInterval(() => {

        loadProfile();

      }, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadProfile =
    async () => {

      try {

        const username =
          localStorage.getItem(
            "username"
          );

        const response =
          await API.get(
            `/employees/username/${username}`
          );

        setEmployee(
          response.data
        );

      } catch (error) {

        console.error(
          "Profile Load Error",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  if (loading) {

    return (

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >

        <h3>
          Loading Profile...
        </h3>

      </div>

    );

  }

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: "280px",
          background: "#f4f7fe",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          {/* Hero Section */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "20px"
            }}
          >

            <div
              className="text-center text-white p-5"
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#7c3aed)"
              }}
            >

              <img
                src={
                  employee.profileImage

                    ?

                    `https://nexushr-production-612e.up.railway.app/uploads/${employee.profileImage}`

                    :

                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                width="150"
                height="150"
                className="rounded-circle border border-4 border-white shadow"
                style={{
                  objectFit: "cover"
                }}
              />

              <h2 className="mt-3">

                {employee.firstName}
                {" "}
                {employee.lastName}

              </h2>

              <h5>

                {employee.designation}

              </h5>

              <p>

                {employee.department}

              </p>

              <span className="badge bg-success">

                {employee.status || "ACTIVE"}

              </span>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Salary
                  </h6>

                  <h2 className="text-success">

                    ₹{employee.salary || 0}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Performance
                  </h6>

                  <h2 className="text-primary">

                    {employee.performanceScore || 0}%

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Attendance
                  </h6>

                  <h2 className="text-warning">

                    {employee.attendancePercentage || 0}%

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Projects
                  </h6>

                  <h2 className="text-info">

                    {employee.projectCount || 0}

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Profile Details */}

          <div className="row">

            <div className="col-md-6 mb-4">

              <div className="card shadow border-0 h-100">

                <div className="card-body">

                  <h4>
                    👤 Personal Information
                  </h4>

                  <hr />

                  <p>
                    <strong>Name :</strong>
                    {" "}
                    {employee.firstName}
                    {" "}
                    {employee.lastName}
                  </p>

                  <p>
                    <strong>Email :</strong>
                    {" "}
                    {employee.email}
                  </p>

                  <p>
                    <strong>Phone :</strong>
                    {" "}
                    {employee.phone}
                  </p>

                  <p>
                    <strong>Username :</strong>
                    {" "}
                    {employee.username}
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6 mb-4">

              <div className="card shadow border-0 h-100">

                <div className="card-body">

                  <h4>
                    💼 Employment Details
                  </h4>

                  <hr />

                  <p>
                    <strong>Employee ID :</strong>
                    {" "}
                    {employee.id}
                  </p>

                  <p>
                    <strong>Department :</strong>
                    {" "}
                    {employee.department}
                  </p>

                  <p>
                    <strong>Designation :</strong>
                    {" "}
                    {employee.designation}
                  </p>

                  <p>
                    <strong>Status :</strong>
                    {" "}
                    {employee.status}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Current Project */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                🚀 Current Project
              </h4>

              <hr />

              <h5>

                {
                  employee.currentProject ||
                  "No Project Assigned"
                }

              </h5>

            </div>

          </div>

          {/* Skills */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                🛠 Skills
              </h4>

              <hr />

              <p>

                {
                  employee.skills ||
                  "No Skills Added"
                }

              </p>

            </div>

          </div>

          {/* AI Insights */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                🤖 AI Career Insights
              </h4>

              <hr />

              <p>

                <strong>
                  Attrition Risk:
                </strong>

                {" "}

                {employee.attritionRisk || "LOW"}

              </p>

              <p>

                <strong>
                  Missing Skills:
                </strong>

                {" "}

                {employee.missingSkills || "None"}

              </p>

              <p>

                <strong>
                  Recommended Learning:
                </strong>

                {" "}

                React.js, Spring Boot,
                PostgreSQL, AWS

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default EmployeeProfile;