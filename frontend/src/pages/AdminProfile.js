import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminProfile() {

  const [user, setUser] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        );

      const response =
        await API.get(
          `/employees/username/${username}`
        );

      setUser(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h4>Loading Profile...</h4>
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

          {/* Header */}

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
                👨‍💼 Admin Profile
              </h2>

              <p className="mb-0">
                Manage your account and system access
              </p>

            </div>
          </div>

          <div className="row">

            {/* Profile Card */}

            <div className="col-lg-4 mb-4">

              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "20px"
                }}
              >

                <div className="card-body text-center">

                  <img
                    src={
                      user.profileImage
                        ?
                        `https://nexushr-production-612e.up.railway.app/uploads/${user.profileImage}`
                        :
                        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="profile"
                    width="180"
                    height="180"
                    className="rounded-circle shadow mb-3"
                    style={{
                      objectFit: "cover",
                      border:
                        "5px solid #2563eb"
                    }}
                  />

                  <h3>
                    {user.firstName}
                    {" "}
                    {user.lastName}
                  </h3>

                  <p className="text-muted">
                    {user.email}
                  </p>

                  <span className="badge bg-danger fs-6">
                    ADMIN
                  </span>

                </div>

              </div>

            </div>

            {/* Details */}

            <div className="col-lg-8">

              <div
                className="card border-0 shadow-lg mb-4"
                style={{
                  borderRadius: "20px"
                }}
              >

                <div className="card-body">

                  <h4 className="mb-4">
                    Personal Information
                  </h4>

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <strong>First Name</strong>
                      <p>
                        {user.firstName || "-"}
                      </p>
                    </div>

                    <div className="col-md-6 mb-3">
                      <strong>Last Name</strong>
                      <p>
                        {user.lastName || "-"}
                      </p>
                    </div>

                    <div className="col-md-6 mb-3">
                      <strong>Email</strong>
                      <p>
                        {user.email || "-"}
                      </p>
                    </div>

                    <div className="col-md-6 mb-3">
                      <strong>Phone</strong>
                      <p>
                        {user.phone || "-"}
                      </p>
                    </div>

                    <div className="col-md-6 mb-3">
                      <strong>Department</strong>
                      <p>
                        {user.department || "-"}
                      </p>
                    </div>

                    <div className="col-md-6 mb-3">
                      <strong>Designation</strong>
                      <p>
                        {user.designation || "-"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* System Access */}

              <div
                className="card border-0 shadow-lg"
                style={{
                  borderRadius: "20px"
                }}
              >

                <div className="card-body">

                  <h4 className="mb-4">
                    🔐 Admin Permissions
                  </h4>

                  <div className="row">

                    <div className="col-md-6 mb-3">
                      ✅ Employee Management
                    </div>

                    <div className="col-md-6 mb-3">
                      ✅ Attendance Management
                    </div>

                    <div className="col-md-6 mb-3">
                      ✅ Leave Management
                    </div>

                    <div className="col-md-6 mb-3">
                      ✅ Payroll Management
                    </div>

                    <div className="col-md-6 mb-3">
                      ✅ Project Management
                    </div>

                    <div className="col-md-6 mb-3">
                      ✅ Team Management
                    </div>

                    <div className="col-md-6 mb-3">
                      ✅ Reports & Analytics
                    </div>

                    <div className="col-md-6 mb-3">
                      ✅ System Configuration
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminProfile;