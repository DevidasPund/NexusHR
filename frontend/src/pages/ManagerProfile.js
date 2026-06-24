import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ManagerProfile() {

  const [manager, setManager] =
    useState({});

  const [teamCount, setTeamCount] =
    useState(0);

  const [projectCount, setProjectCount] =
    useState(0);

  const [pendingLeaves, setPendingLeaves] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadAllData();

    const interval =
      setInterval(() => {

        loadAllData();

      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadAllData = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        );

      const profileRes =
        await API.get(
          `/employees/username/${username}`
        );

      const employeeRes =
        await API.get(
          "/employees"
        );

      const projectRes =
        await API.get(
          "/projects"
        );

      const leaveRes =
        await API.get(
          "/leave"
        );

      setManager(
        profileRes.data
      );

      setTeamCount(
        employeeRes.data.length
      );

      setProjectCount(
        projectRes.data.length
      );

      setPendingLeaves(
        leaveRes.data.filter(
          leave =>
            leave.status ===
            "PENDING"
        ).length
      );

    } catch (error) {

      console.error(error);

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
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)"
            }}
          >

            <div className="card-body text-center text-white p-5">

              <img
                src={
                  manager.profileImage
                    ?
                    `https://nexushr-production-612e.up.railway.app/uploads/${manager.profileImage}`
                    :
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                width="170"
                height="170"
                className="rounded-circle border border-5 border-white shadow"
                style={{
                  objectFit: "cover"
                }}
              />

              <h2 className="mt-3">

                {manager.firstName}
                {" "}
                {manager.lastName}

              </h2>

              <h5>

                {manager.designation}

              </h5>

              <p>

                {manager.department}

              </p>

              <span className="badge bg-warning text-dark fs-6">

                MANAGER

              </span>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4">

            <div className="col-md-3">

              <div className="card bg-primary text-white shadow border-0">

                <div className="card-body text-center">

                  <h6>👥 Team Members</h6>

                  <h2>{teamCount}</h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-success text-white shadow border-0">

                <div className="card-body text-center">

                  <h6>📁 Projects</h6>

                  <h2>{projectCount}</h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-warning shadow border-0">

                <div className="card-body text-center">

                  <h6>🌴 Pending Leaves</h6>

                  <h2>{pendingLeaves}</h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-danger text-white shadow border-0">

                <div className="card-body text-center">

                  <h6>⭐ Rating</h6>

                  <h2>4.8</h2>

                </div>

              </div>

            </div>

          </div>

          {/* Details */}

          <div className="row mt-4">

            <div className="col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>
                    Personal Information
                  </h4>

                  <hr />

                  <p>
                    <strong>Name:</strong>
                    {" "}
                    {manager.firstName}
                    {" "}
                    {manager.lastName}
                  </p>

                  <p>
                    <strong>Email:</strong>
                    {" "}
                    {manager.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>
                    {" "}
                    {manager.phone}
                  </p>

                  <p>
                    <strong>Department:</strong>
                    {" "}
                    {manager.department}
                  </p>

                  <p>
                    <strong>Designation:</strong>
                    {" "}
                    {manager.designation}
                  </p>

                  <p>
                    <strong>Salary:</strong>
                    {" "}
                    ₹{manager.salary}
                  </p>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>
                    Team Overview
                  </h4>

                  <hr />

                  <p>
                    Team Members:
                    {" "}
                    {teamCount}
                  </p>

                  <p>
                    Active Projects:
                    {" "}
                    {projectCount}
                  </p>

                  <p>
                    Pending Leaves:
                    {" "}
                    {pendingLeaves}
                  </p>

                  <p>
                    Team Performance:
                    Excellent
                  </p>

                </div>

              </div>

              <div className="card shadow border-0 mt-4">

                <div className="card-body">

                  <h4>
                    🤖 AI Team Insights
                  </h4>

                  <hr />

                  <p>
                    Team Productivity:
                    High
                  </p>

                  <p>
                    Leave Requests:
                    {pendingLeaves}
                  </p>

                  <p>
                    Engagement Score:
                    Excellent
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

export default ManagerProfile;