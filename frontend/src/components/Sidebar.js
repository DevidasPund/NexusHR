import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const location = useLocation();

  const dashboardPath =
    role === "ADMIN"
      ? "/admin/dashboard"
      : role === "MANAGER"
      ? "/manager/dashboard"
      : "/employee/dashboard";

  const menuStyle = {
    color: "#d1d5db",
    textDecoration: "none",
    padding: "12px 18px",
    display: "block",
    borderRadius: "10px",
    marginBottom: "6px",
    transition: "0.3s"
  };

  const activeStyle = {
    background: "#2563eb",
    color: "#ffffff",
    fontWeight: "bold"
  };

  const getStyle = (path) => ({
    ...menuStyle,
    ...(location.pathname === path ? activeStyle : {})
  });

  return (

    <div className="sidebar">

      {/* Logo */}

      <div
        className="text-center py-4 border-bottom"
        style={{
          borderColor: "#1e293b"
        }}
      >

        <h2 className="fw-bold text-white">
          NexusHR
        </h2>

        <small
          style={{
            color: "#94a3b8"
          }}
        >
          Enterprise HRMS
        </small>

      </div>

      {/* User */}

      <div className="text-center py-4">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Profile"
          width="90"
          height="90"
          className="rounded-circle border border-3 border-primary"
        />

        <h5 className="mt-3 text-white">
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
          flex: 1,
          overflowY: "auto"
        }}
      >

        <Link
          to={dashboardPath}
          style={getStyle(dashboardPath)}
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
              to="/departments"
              style={getStyle("/departments")}
            >
              🏢 Departments
            </Link>

            <Link
              to="/admin-attendance"
              style={getStyle("/admin-attendance")}
            >
              📅 Attendance
            </Link>

            <Link
              to="/leave-management"
              style={getStyle("/leave-management")}
            >
              🌴 Leave Management
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

            <Link
              to="/settings"
              style={getStyle("/settings")}
            >
              ⚙ Settings
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

            <Link
              to="/manager-profile"
              style={getStyle("/manager-profile")}
            >
              👤 My Profile
            </Link>

            <Link
              to="/settings"
              style={getStyle("/settings")}
            >
              ⚙ Settings
            </Link>

          </>
        )}

        {role === "EMPLOYEE" && (
          <>

            <Link
              to="/employee-attendance"
              style={getStyle("/employee-attendance")}
            >
              📅 Attendance
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
              🌴 My Leave
            </Link>

            <Link
              to="/salary"
              style={getStyle("/salary")}
            >
              💰 Salary
            </Link>

            <Link
              to="/employee-profile"
              style={getStyle("/employee-profile")}
            >
              👤 My Profile
            </Link>

            <Link
              to="/employee-notification"
              style={getStyle("/employee-notification")}
            >
              🔔 Notifications
            </Link>

            <Link
              to="/settings"
              style={getStyle("/settings")}
            >
              ⚙ Settings
            </Link>

          </>
        )}

      </div>

      {/* Footer */}

      <div
        className="text-center py-3"
        style={{
          borderTop: "1px solid #1e293b",
          color: "#94a3b8",
          fontSize: "12px"
        }}
      >

        <strong>NexusHR Enterprise</strong>

        <br />

        Version 2.0

      </div>

    </div>

  );

}

export default Sidebar;