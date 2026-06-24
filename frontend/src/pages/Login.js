import React, {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../services/ApiService";

function Login() {

  const navigate =
    useNavigate();

  const [username,
    setUsername] =
    useState("");

  const [password,
    setPassword] =
    useState("");

  const [showPassword,
    setShowPassword] =
    useState(false);

  const [loading,
    setLoading] =
    useState(false);

  const [error,
    setError] =
    useState("");

  const login =
    async () => {

      setError("");

      if (
        !username.trim() ||
        !password.trim()
      ) {

        setError(
          "Please enter username and password"
        );

        return;

      }

      try {

        setLoading(true);

        const response =
          await API.post(
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

        if (
          response.data.token
        ) {

          localStorage.setItem(
            "token",
            response.data.token
          );

        }

        if (
          response.data.role ===
          "ADMIN"
        ) {

          navigate(
            "/admin/dashboard"
          );

        } else if (
          response.data.role ===
          "MANAGER"
        ) {

          navigate(
            "/manager/dashboard"
          );

        } else {

          navigate(
            "/employee/dashboard"
          );

        }

      } catch (error) {

        console.error(error);

        setError(
          "Invalid Username or Password"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleKeyPress =
    (e) => {

      if (
        e.key === "Enter"
      ) {

        login();

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

        {/* Left Section */}

        <div
          className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center"
        >

          <div className="text-white p-5">

            <h1
              className="display-2 fw-bold"
            >
              NexusHR
            </h1>

            <h4 className="mb-4">

              Enterprise Workforce
              Management Platform

            </h4>

            <div className="mt-5">

              <h5>
                ✅ Employee Management
              </h5>

              <h5>
                ✅ Attendance Tracking
              </h5>

              <h5>
                ✅ Leave Management
              </h5>

              <h5>
                ✅ Payroll Management
              </h5>

              <h5>
                ✅ Project Tracking
              </h5>

              <h5>
                ✅ AI Workforce Insights
              </h5>

            </div>

          </div>

        </div>

        {/* Login Section */}

        <div
          className="col-lg-6 d-flex justify-content-center align-items-center"
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

                <h2 className="fw-bold text-white">

                  Welcome Back

                </h2>

                <p className="text-light">

                  Login To NexusHR

                </p>

              </div>

              {

                error &&

                <div className="alert alert-danger">

                  {error}

                </div>

              }

              {/* Username */}

              <div className="mb-3">

                <label className="text-white mb-2">

                  Username

                </label>

                <input
                  autoFocus
                  type="text"
                  className="form-control"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  onKeyDown={
                    handleKeyPress
                  }
                  style={{
                    borderRadius: "15px",
                    height: "50px"
                  }}
                />

              </div>

              {/* Password */}

              <div className="mb-3">

                <label className="text-white mb-2">

                  Password

                </label>

                <div className="input-group">

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
                    onKeyDown={
                      handleKeyPress
                    }
                    style={{
                      borderRadius:
                        "15px 0 0 15px",
                      height: "50px"
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
                        : "👁️"
                    }

                  </button>

                </div>

              </div>

              {/* Forgot Password */}

              <div className="text-end mb-4">

                <Link
                  to="/forgot-password"
                  className="text-white text-decoration-none"
                >

                  Forgot Password?

                </Link>

              </div>

              {/* Login Button */}

              <button
                className="btn w-100 text-white"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                  borderRadius: "15px",
                  height: "55px",
                  fontWeight: "600",
                  fontSize: "18px"
                }}
                onClick={login}
                disabled={loading}
              >

                {

                  loading

                    ?

                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                      />
                      Logging In...
                    </>

                    :

                    "🚀 Login"

                }

              </button>

              <div className="text-center mt-4">

                <small className="text-light">

                  🔒 Secure Enterprise HRMS

                </small>

              </div>

              <div className="text-center mt-2">

                <small className="text-light">

                  © 2026 NexusHR

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