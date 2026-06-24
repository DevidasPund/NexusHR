import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadProfile();

  }, []);

  const loadProfile = async () => {

    try {

      const username =
        localStorage.getItem("username");

      const response =
        await API.get(
          `/employees/username/${username}`
        );

      setProfile(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h3>Loading Profile...</h3>
      </div>
    );

  }

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background: "#f4f7fc",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          {/* Profile Header */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px"
            }}
          >

            <div className="card-body text-center text-white">

              <img
                src={
                  profile.profileImage
                    ? `http://localhost:8080/uploads/${profile.profileImage}`
                    : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                width="140"
                height="140"
                className="rounded-circle border border-4 border-white shadow"
                style={{
                  objectFit: "cover"
                }}
              />

              <h2 className="mt-3">
                {profile.firstName} {profile.lastName}
              </h2>

              <h5>
                {profile.designation}
              </h5>

              <p>
                {profile.department}
              </p>

              <span className="badge bg-light text-dark">
                {profile.role || "EMPLOYEE"}
              </span>

            </div>

          </div>

          {/* Stats */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Salary</h6>

                  <h3 className="text-success">
                    ₹{profile.salary || 0}
                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Status</h6>

                  <h3 className="text-primary">
                    {profile.status || "ACTIVE"}
                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Attendance</h6>

                  <h3 className="text-warning">
                    {profile.attendancePercentage || 0}%
                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Performance</h6>

                  <h3 className="text-info">
                    {profile.performanceScore || 0}%
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Profile Details */}

          <div className="row">

            <div className="col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>Personal Information</h4>

                  <hr />

                  <p>
                    <strong>Employee ID:</strong>{" "}
                    {profile.id}
                  </p>

                  <p>
                    <strong>First Name:</strong>{" "}
                    {profile.firstName}
                  </p>

                  <p>
                    <strong>Last Name:</strong>{" "}
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

                  <p>
                    <strong>Username:</strong>{" "}
                    {profile.username}
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>Employment Details</h4>

                  <hr />

                  <p>
                    <strong>Department:</strong>{" "}
                    {profile.department}
                  </p>

                  <p>
                    <strong>Designation:</strong>{" "}
                    {profile.designation}
                  </p>

                  <p>
                    <strong>Salary:</strong>{" "}
                    ₹{profile.salary}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {profile.status}
                  </p>

                  <p>
                    <strong>Attrition Risk:</strong>{" "}
                    {profile.attritionRisk || "LOW"}
                  </p>

                  <p>
                    <strong>Current Project:</strong>{" "}
                    {profile.currentProject || "N/A"}
                  </p>

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