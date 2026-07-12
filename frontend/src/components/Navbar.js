import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date();

      setCurrentTime(
        now.toLocaleString()
      );

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const logout = () => {

    if (window.confirm("Are you sure you want to logout?")) {

      localStorage.clear();

      navigate("/");

    }

  };

  const openProfile = () => {

    if (role === "ADMIN") {

      navigate("/employee-profile");

    } else if (role === "MANAGER") {

      navigate("/manager-profile");

    } else {

      navigate("/employee-profile");

    }

  };

  return (

    <nav
      className="navbar navbar-expand-lg bg-white shadow-sm px-4 mb-4 rounded-3"
    >

      <div className="container-fluid">

        <div>

          <h3 className="fw-bold mb-0">

            NexusHR Dashboard

          </h3>

          <small className="text-muted">

            Enterprise Workforce Management System

          </small>

        </div>

        <div className="ms-auto d-flex align-items-center">

          <div className="text-end me-4">

            <div className="fw-semibold">

              👋 Welcome,

              {" "}

              {username}

            </div>

            <small className="text-muted">

              {role}

            </small>

          </div>

          <div className="text-end me-4">

            <small className="text-muted">

              {currentTime}

            </small>

          </div>

          <button
            className="btn btn-outline-primary me-2"
            onClick={openProfile}
          >

            👤 Profile

          </button>

          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => navigate("/settings")}
          >

            ⚙ Settings

          </button>

          <button
            className="btn btn-danger"
            onClick={logout}
          >

            🚪 Logout

          </button>

        </div>

      </div>

    </nav>

  );

}

export default Navbar;