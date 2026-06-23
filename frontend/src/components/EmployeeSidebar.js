import React from "react";
import { Link } from "react-router-dom";

function EmployeeSidebar() {

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "250px",
        minHeight: "100vh"
      }}
    >
      <h3>NexusHR</h3>
      <hr />

      <Link
        to="/employee-dashboard"
        className="d-block text-white mb-3"
      >
        Dashboard
      </Link>

      <Link
        to="/attendance"
        className="d-block text-white mb-3"
      >
        My Attendance
      </Link>

      <Link
        to="/leave"
        className="d-block text-white mb-3"
      >
        Apply Leave
      </Link>

      <Link
        to="/notifications"
        className="d-block text-white mb-3"
      >
        Notifications
      </Link>
    </div>
  );
}

export default EmployeeSidebar;