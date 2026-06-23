import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/ApiService";

function Register() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "EMPLOYEE"
  });

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  };

  const register = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        user
      );

      alert(
        "Registration Successful"
      );

      navigate("/");

    } catch(error) {

      console.error(
        "Register Error",
        error
      );

      alert(
        "Registration Failed"
      );
    }
  };

  return (

    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center"
      style={{
        background:
        "linear-gradient(135deg,#0d6efd,#6610f2)"
      }}
    >

      <div
        className="card shadow-lg border-0 p-4"
        style={{
          width: "450px",
          borderRadius: "20px"
        }}
      >

        <div className="text-center mb-4">

          <h1 className="fw-bold text-primary">
            NexusHR
          </h1>

          <p className="text-muted">
            Employee Registration
          </p>

        </div>

        <form onSubmit={register}>

          <div className="mb-3">

            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter Username"
              value={user.username}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={user.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>

        </form>

        <div className="text-center mt-3">

          Already have an account?

          <Link
            to="/"
            className="ms-2"
          >
            Login
          </Link>

        </div>

      </div>

    </div>

  );
}

export default Register;