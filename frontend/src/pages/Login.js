import React, { useState } from "react";
import API from "../services/ApiService";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword,
          setShowPassword] =
    useState(false);

  const [loading,
          setLoading] =
    useState(false);

  const login = async () => {

    if (!username || !password) {

      alert(
        "Please Enter Username and Password"
      );

      return;
    }

    try {

      setLoading(true);

 const response = await API.post(
  "/auth/login",
  {
    username,
    password
  }
);

localStorage.setItem(
  "employeeId",
  response.data.id
);

localStorage.setItem(
  "username",
  response.data.username
);

localStorage.setItem(
  "role",
  response.data.role
);

localStorage.setItem(
  "employeeName",
  response.data.employeeName
);

console.log(
  "Saved Employee ID:",
  response.data.id
);

      alert("Login Successful");

      if (
        response.data.role === "ADMIN"
      ) {

        navigate(
          "/admin/dashboard"
        );

      } else if (
        response.data.role === "MANAGER"
      ) {

        navigate(
          "/manager/dashboard"
        );

      } else {

        navigate(
          "/employee-dashboard"
        );
      }

    } catch (error) {

      console.error(error);

      alert(
        "Invalid Username or Password"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#2563eb)"
      }}
    >

      <div className="row min-vh-100">

        {/* Left Side */}

        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center"
        >

          <div className="text-white p-5">

            <h1
              className="display-3 fw-bold"
            >
              NexusHR
            </h1>

            <h4 className="mb-4">

              Smart Workforce
              Management Platform

            </h4>

            <div className="mt-4">

              <h5>
                ✅ Employee Management
              </h5>

              <h5>
                ✅ Attendance Tracking
              </h5>

              <h5>
                ✅ Payroll Management
              </h5>

              <h5>
                ✅ Performance Reviews
              </h5>

              <h5>
                ✅ AI Workforce Insights
              </h5>

              <h5>
                ✅ Recruitment System
              </h5>

            </div>

          </div>

        </div>

        {/* Login Card */}

        <div
          className="col-lg-6 d-flex align-items-center justify-content-center"
        >

          <div
            className="card border-0 shadow-lg"
            style={{
              width: "450px",
              borderRadius: "25px",
              background:
                "rgba(255,255,255,0.12)",
              backdropFilter:
                "blur(20px)"
            }}
          >

            <div className="card-body p-5">

              <div className="text-center mb-4">

                <h2
                  className="fw-bold text-white"
                >
                  Welcome Back
                </h2>

                <p className="text-light">

                  Login to NexusHR

                </p>

              </div>

              {/* Username */}

              <div className="mb-3">

                <label className="text-white">

                  Username

                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  style={{
                    borderRadius: "15px"
                  }}
                />

              </div>

              {/* Password */}

              <div className="mb-3">

                <label className="text-white">

                  Password

                </label>

                <div
                  className="input-group"
                >

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    className="form-control"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    style={{
                      borderRadius:
                        "15px 0 0 15px"
                    }}
                  />

                  <button
                    className="btn btn-light"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >

                    {
                      showPassword
                        ? "🙈"
                        : "👁"
                    }

                  </button>

                </div>

              </div>

              <div
                className="d-flex justify-content-between mb-4"
              >

                <div>

                  <input
                    type="checkbox"
                  />

                  <span
                    className="text-white ms-2"
                  >

                    Remember Me

                  </span>

                </div>

                <a
                  href="/forgot-password"
                  className="text-white"
                >

                  Forgot Password?

                </a>

              </div>

              {/* Login Button */}

              <button
                className="btn w-100 text-white"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                  borderRadius: "15px",
                  height: "50px",
                  fontWeight: "bold"
                }}
                onClick={login}
                disabled={loading}
              >

                {
                  loading
                  ?
                  "Logging In..."
                  :
                  "Login"
                }

              </button>

              <div
                className="text-center mt-4"
              >

                <small
                  className="text-light"
                >

                  🔒 Secure HRMS Portal

                </small>

              </div>

              <div
                className="text-center mt-2"
              >

                <small
                  className="text-light"
                >

                  © 2026 NexusHR Enterprise

                </small>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;