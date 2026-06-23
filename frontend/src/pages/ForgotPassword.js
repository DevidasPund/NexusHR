import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import "./Login.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const resetPassword = async () => {
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await API.post("/auth/forgot-password", { email });
      setMessage("If your email is registered, a reset link has been sent.");
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Unable to request password reset. Please try again."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card shadow-lg">
        <div className="card-body login-hero text-center rounded-top">
          <h2>Reset Password</h2>
          <p>Get a password reset link for your NexusHR account</p>
        </div>

        <div className="card-body p-4">
          <div className="mb-4">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && <div className="login-error mb-3">{error}</div>}
          {message && (
            <div className="text-success mb-3">{message}</div>
          )}

          <button
            className="btn btn-primary login-button mb-3"
            onClick={resetPassword}
          >
            Send Reset Link
          </button>

          <div className="login-footer text-center small">
            Remembered your password?{' '}
            <button className="btn btn-link p-0" onClick={() => navigate("/")}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
