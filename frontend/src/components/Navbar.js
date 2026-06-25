import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm px-4"
      style={{ height: "70px" }}
    >
      <h1 style={{ color: "red", fontSize: "40px" }}>
  TEST NAVBAR
</h1>
      <div className="ms-auto d-flex align-items-center">

        <span className="me-3 fw-semibold">
          👤 {username}
        </span>

        <span className="badge bg-primary me-3">
          {role}
        </span>

        <button
          className="btn btn-outline-primary me-2"
          onClick={() => navigate("/employee-profile")}
        >
          Profile
        </button>

        <button
          className="btn btn-outline-secondary me-2"
          onClick={() => navigate("/settings")}
        >
          Settings
        </button>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;