import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const location = useLocation();

  const activeStyle = {
    background: "linear-gradient(90deg,#2563eb,#7c3aed)",
    color: "#fff",
    fontWeight: "600",
    borderRadius: "12px"
  };

  const menuStyle = {
    color: "#d1d5db",
    textDecoration: "none",
    padding: "12px 18px",
    display: "block",
    borderRadius: "12px",
    marginBottom: "6px",
    transition: "all 0.3s ease"
  };

  const getMenuStyle = (path) => ({
    ...menuStyle,
    ...(location.pathname === path
      ? activeStyle
      : {})
  });

  return (
    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0
      }}
    >
      {/* Logo */}

      <div
        className="text-center p-4"
        style={{
          borderBottom: "1px solid #1e293b"
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontWeight: "800"
          }}
        >
          NexusHR
        </h1>

        <small style={{ color: "#38bdf8" }}>
          Enterprise HRMS
        </small>
      </div>

      {/* Profile */}

      <div className="text-center py-4">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          width="90"
          height="90"
          style={{
            borderRadius: "50%",
            border: "4px solid #3b82f6"
          }}
        />

        <h5 className="mt-3 text-white">
          {username}
        </h5>

        <span className="badge bg-primary px-3 py-2">
          {role}
        </span>
      </div>

      {/* Menu */}

      <div
        style={{
          overflowY: "auto",
          flex: 1,
          padding: "10px"
        }}
      >
        <Link
          to={
            role === "ADMIN"
              ? "/admin/dashboard"
              : role === "MANAGER"
              ? "/manager/dashboard"
              : "/employee-dashboard"
          }
          style={{
            ...menuStyle,
            ...(location.pathname.includes("dashboard")
              ? activeStyle
              : {})
          }}
        >
          📊 Dashboard
        </Link>

        {/* ADMIN */}

        {role === "ADMIN" && (
          <>
            <div className="text-info mt-3 mb-2 fw-bold">
              WORKFORCE
            </div>

            <Link
              to="/employees"
              style={getMenuStyle("/employees")}
            >
              👨‍💼 Employees
            </Link>

            <Link
              to="/add-employee"
              style={getMenuStyle("/add-employee")}
            >
              ➕ Add Employee
            </Link>

            <Link
              to="/departments"
              style={getMenuStyle("/departments")}
            >
              🏢 Departments
            </Link>

            <Link
              to="/teams"
              style={getMenuStyle("/teams")}
            >
              👥 Teams
            </Link>

            <div className="text-warning mt-4 mb-2 fw-bold">
              OPERATIONS
            </div>

            <Link
              to="/admin-attendance"
              style={getMenuStyle("/admin-attendance")}
            >
              ⏰ Attendance
            </Link>

            <Link
              to="/leave-management"
              style={getMenuStyle("/leave-management")}
            >
              🌴 Leave Approval
            </Link>

            <Link
              to="/salary-management"
              style={getMenuStyle("/salary-management")}
            >
              💰 Payroll
            </Link>

            <div className="text-success mt-4 mb-2 fw-bold">
              PROJECTS
            </div>

            <Link
              to="/projects"
              style={getMenuStyle("/projects")}
            >
              📁 Projects
            </Link>

            <Link
              to="/tasks"
              style={getMenuStyle("/tasks")}
            >
              ✅ Tasks
            </Link>

            <div className="text-danger mt-4 mb-2 fw-bold">
              REPORTS
            </div>

            <Link
              to="/reports"
              style={getMenuStyle("/reports")}
            >
              📊 Reports
            </Link>

            <Link
              to="/notification-management"
              style={getMenuStyle("/notification-management")}
            >
              🔔 Notifications
            </Link>
          </>
        )}

        {/* MANAGER */}

        {role === "MANAGER" && (
          <>
            <div className="text-info mt-3 mb-2 fw-bold">
              TEAM MANAGEMENT
            </div>

            <Link
              to="/teams"
              style={getMenuStyle("/teams")}
            >
              👥 Team Members
            </Link>

            <Link
              to="/tasks"
              style={getMenuStyle("/tasks")}
            >
              ✅ Team Tasks
            </Link>

            <Link
              to="/leave-management"
              style={getMenuStyle("/leave-management")}
            >
              🌴 Leave Approval
            </Link>

            <div className="text-success mt-4 mb-2 fw-bold">
              PROJECTS
            </div>

            <Link
              to="/projects"
              style={getMenuStyle("/projects")}
            >
              📁 Projects
            </Link>

            <Link
              to="/milestones"
              style={getMenuStyle("/milestones")}
            >
              📌 Milestones
            </Link>

            <div className="text-warning mt-4 mb-2 fw-bold">
              PERFORMANCE
            </div>

            <Link
              to="/performance"
              style={getMenuStyle("/performance")}
            >
              ⭐ Performance
            </Link>

            <Link
              to="/reports"
              style={getMenuStyle("/reports")}
            >
              📊 Reports
            </Link>

            <Link
              to="/notification-management"
              style={getMenuStyle("/notification-management")}
            >
              🔔 Notifications
            </Link>
          </>
        )}

        {/* EMPLOYEE */}

        {role === "EMPLOYEE" && (
          <>
            <div className="text-info mt-3 mb-2 fw-bold">
              MY WORKSPACE
            </div>

            <Link
              to="/employee-attendance"
              style={getMenuStyle("/employee-attendance")}
            >
              ⏰ My Attendance
            </Link>

            <Link
              to="/my-tasks"
              style={getMenuStyle("/my-tasks")}
            >
              ✅ My Tasks
            </Link>

            <Link
              to="/leave"
              style={getMenuStyle("/leave")}
            >
              🌴 My Leave
            </Link>

            <Link
              to="/salary"
              style={getMenuStyle("/salary")}
            >
              💰 Salary
            </Link>

            <Link
              to="/employee-notification"
              style={getMenuStyle("/employee-notification")}
            >
              🔔 Notifications
            </Link>

            <Link
              to="/employee-profile"
              style={getMenuStyle("/employee-profile")}
            >
              👤 My Profile
            </Link>
          </>
        )}
      </div>

      {/* Bottom Section */}

      <div
        style={{
          borderTop: "1px solid #1e293b",
          padding: "15px"
        }}
      >
        <Link
          to="/profile"
          style={getMenuStyle("/profile")}
        >
          👤 Profile
        </Link>

        <Link
          to="/settings"
          style={getMenuStyle("/settings")}
        >
          ⚙️ Settings
        </Link>

        <Link
          to="/change-password"
          style={getMenuStyle("/change-password")}
        >
          🔒 Change Password
        </Link>

        <button
          className="btn btn-danger w-100 mt-3"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>

        <div
          className="mt-3 p-3 text-center"
          style={{
            borderRadius: "12px",
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)"
          }}
        >
          <h6 className="text-white fw-bold">
            🤖 AI Workforce
          </h6>

          <div className="text-light small">
            • Attrition Prediction
          </div>

          <div className="text-light small">
            • Skill Gap Analysis
          </div>

          <div className="text-light small">
            • Performance Insights
          </div>
        </div>

        <div
          className="text-center mt-3"
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
    </div>
  );
}

export default Sidebar;