import React, {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../services/ApiService";

function ForgotPassword() {

  const navigate =
    useNavigate();

  const [email,
    setEmail] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [message,
    setMessage] =
    useState("");

  const [error,
    setError] =
    useState("");

  const resetPassword =
    async () => {

      setMessage("");
      setError("");

      if (!email.trim()) {

        setError(
          "Please enter your email address."
        );

        return;

      }

      try {

        setLoading(true);

        await API.post(
          "/auth/forgot-password",
          {
            email
          }
        );

        setMessage(
          "Password reset link has been sent to your email."
        );

        setEmail("");

      } catch (error) {

        console.error(error);

        setError(
          error.response?.data ||
          "Unable to send reset link."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#2563eb,#7c3aed)"
      }}
    >

      <div
        className="card shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >

        {/* Header */}

        <div
          className="text-center text-white p-4"
          style={{
            background:
              "linear-gradient(135deg,#1e40af,#7c3aed)"
          }}
        >

          <div
            className="mb-3"
            style={{
              fontSize: "60px"
            }}
          >
            🔐
          </div>

          <h2 className="fw-bold">
            Forgot Password
          </h2>

          <p className="mb-0">
            Reset Your NexusHR Account Password
          </p>

        </div>

        {/* Body */}

        <div className="card-body p-4">

          {

            error &&

            <div className="alert alert-danger">

              {error}

            </div>

          }

          {

            message &&

            <div className="alert alert-success">

              {message}

            </div>

          }

          <div className="mb-4">

            <label className="form-label fw-bold">

              Email Address

            </label>

            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          <button
            className="btn btn-primary btn-lg w-100"
            disabled={loading}
            onClick={resetPassword}
          >

            {

              loading

                ?

                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Sending...
                </>

                :

                "Send Reset Link"

            }

          </button>

          <hr />

          <div className="text-center">

            <button
              className="btn btn-outline-secondary"
              onClick={() =>
                navigate("/")
              }
            >

              ← Back To Login

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;