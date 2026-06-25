import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const location = useLocation();

  const menuStyle = {
    color: "#d1d5db",
    textDecoration: "none",
    padding: "12px 18px",
    display: "block",
    borderRadius: "10px",
    marginBottom: "6px"
  };

  const activeStyle = {
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold"
  };

  const getStyle = (path) => ({
    ...menuStyle,
    ...(location.pathname === path ? activeStyle : {})
  });

  return (

    <div
      style={{
        width: "280px",
        minWidth: "280px",
        height: "100vh",
        background: "#0f172a",
        color: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >

      {/* Logo */}

      <div className="text-center py-4 border-bottom">

        <h2 className="fw-bold text-white">
          NexusHR
        </h2>

        <small className="text-info">
          Enterprise HRMS
        </small>

      </div>

      {/* User */}

      <div className="text-center py-4">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          width="80"
          height="80"
          className="rounded-circle border border-3 border-primary"
        />

        <h5 className="mt-3">
          {username}
        </h5>

        <span className="badge bg-primary">
          {role}
        </span>

      </div>

      {/* Menu */}

      <div
        className="px-3"
        style={{
          overflowY: "auto",
          flex: 1
        }}
      >
<h2 style={{ color: "red" }}>
  TEST SIDEBAR
</h2>
        <Link
          to={
            role === "ADMIN"
              ? "/admin/dashboard"
              : role === "MANAGER"
              ? "/manager/dashboard"
              : "/employee/dashboard"
          }
          style={getStyle("/employee/dashboard")}
        >
          📊 Dashboard
        </Link>

        {role === "ADMIN" && (
          <>

            <Link
              to="/employees"
              style={getStyle("/employees")}
            >
              👨‍💼 Employees
            </Link>

            <Link
              to="/add-employee"
              style={getStyle("/add-employee")}
            >
              ➕ Add Employee
            </Link>

            <Link
              to="/admin-attendance"
              style={getStyle("/admin-attendance")}
            >
              ⏰ Attendance
            </Link>

            <Link
              to="/leave-management"
              style={getStyle("/leave-management")}
            >
              🌴 Leave
            </Link>

            <Link
              to="/salary-management"
              style={getStyle("/salary-management")}
            >
              💰 Payroll
            </Link>

            <Link
              to="/projects"
              style={getStyle("/projects")}
            >
              📁 Projects
            </Link>

            <Link
              to="/tasks"
              style={getStyle("/tasks")}
            >
              ✅ Tasks
            </Link>

            <Link
              to="/reports"
              style={getStyle("/reports")}
            >
              📊 Reports
            </Link>

            <Link
              to="/notification-management"
              style={getStyle("/notification-management")}
            >
              🔔 Notifications
            </Link>

          </>
        )}

        {role === "MANAGER" && (
          <>

            <Link
              to="/teams"
              style={getStyle("/teams")}
            >
              👥 Team
            </Link>

            <Link
              to="/tasks"
              style={getStyle("/tasks")}
            >
              ✅ Tasks
            </Link>

            <Link
              to="/projects"
              style={getStyle("/projects")}
            >
              📁 Projects
            </Link>

            <Link
              to="/leave-management"
              style={getStyle("/leave-management")}
            >
              🌴 Leave Approval
            </Link>

            <Link
              to="/reports"
              style={getStyle("/reports")}
            >
              📊 Reports
            </Link>

            <Link
              to="/notification-management"
              style={getStyle("/notification-management")}
            >
              🔔 Notifications
            </Link>

          </>
        )}

        {role === "EMPLOYEE" && (
          <>

            <Link
              to="/employee-attendance"
              style={getStyle("/employee-attendance")}
            >
              ⏰ Attendance
            </Link>

            <Link
              to="/my-tasks"
              style={getStyle("/my-tasks")}
            >
              ✅ My Tasks
            </Link>

            <Link
              to="/leave"
              style={getStyle("/leave")}
            >
              🌴 Leave
            </Link>

            <Link
              to="/salary"
              style={getStyle("/salary")}
            >
              💰 Salary
            </Link>

            <Link
              to="/employee-notification"
              style={getStyle("/employee-notification")}
            >
              🔔 Notifications
            </Link>

          </>
        )}

      </div>

      {/* Bottom */}

      <div
        className="text-center p-3 border-top"
        style={{
          color: "#94a3b8",
          fontSize: "12px"
        }}
      >

        NexusHR Enterprise Suite

        <br />

        Version 2.0

      </div>

    </div>

  );

}

export default Sidebar;