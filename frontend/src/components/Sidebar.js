import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const location = useLocation();

  const activeStyle = {
    background: "linear-gradient(90deg,#2563eb,#7c3aed)",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: "600"
  };

  const menuStyle = {
    color: "#d1d5db",
    textDecoration: "none",
    padding: "12px 18px",
    display: "block",
    borderRadius: "12px",
    marginBottom: "6px"
  };

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

      <div
        style={{
          overflowY: "auto",
          flex: 1,
          padding: "10px"
        }}
      >

        {/* Dashboard */}

        <Link
          to={
            role === "ADMIN"
              ? "/admin/dashboard"
              : role === "MANAGER"
              ? "/manager/dashboard"
              : "/employee/dashboard"
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

        {/* ADMIN MENU */}

        {role === "ADMIN" && (
          <>
            <div className="text-info mt-3 mb-2 fw-bold">
              WORKFORCE
            </div>

            <Link to="/employees" style={menuStyle}>
              👨‍💼 Employees
            </Link>

            <Link to="/add-employee" style={menuStyle}>
              ➕ Add Employee
            </Link>

            <Link to="/departments" style={menuStyle}>
              🏢 Departments
            </Link>

            <Link to="/teams" style={menuStyle}>
              👥 Teams
            </Link>

            <div className="text-warning mt-4 mb-2 fw-bold">
              OPERATIONS
            </div>

            <Link to="/admin-attendance" style={menuStyle}>
              ⏰ Attendance
            </Link>

            <Link to="/leave-management" style={menuStyle}>
              🌴 Leave Approval
            </Link>

            <Link to="/salary-management" style={menuStyle}>
              💰 Payroll
            </Link>

            <div className="text-success mt-4 mb-2 fw-bold">
              PROJECTS
            </div>

            <Link to="/projects" style={menuStyle}>
              📁 Projects
            </Link>

            <Link to="/tasks" style={menuStyle}>
              ✅ Tasks
            </Link>

            <div className="text-danger mt-4 mb-2 fw-bold">
              REPORTS
            </div>

            <Link to="/reports" style={menuStyle}>
              📊 Reports
            </Link>

            <Link to="/notification-management" style={menuStyle}>
              🔔 Notifications
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
          style={menuStyle}
        >
          👤 Profile
        </Link>

        <Link
          to="/settings"
          style={menuStyle}
        >
          ⚙️ Settings
        </Link>

        <Link
          to="/change-password"
          style={menuStyle}
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
{role === "MANAGER" && (
  <>
    <div className="text-info mt-3 mb-2 fw-bold">
      TEAM MANAGEMENT
    </div>

    <Link to="/teams" style={menuStyle}>
      👥 Team Members
    </Link>

    <Link to="/tasks" style={menuStyle}>
      ✅ Team Tasks
    </Link>

    <Link to="/leave-management" style={menuStyle}>
      🌴 Leave Approval
    </Link>

    <div className="text-success mt-4 mb-2 fw-bold">
      PROJECTS
    </div>

    <Link to="/projects" style={menuStyle}>
      📁 Projects
    </Link>

    <Link to="/milestones" style={menuStyle}>
      📌 Milestones
    </Link>

    <div className="text-warning mt-4 mb-2 fw-bold">
      PERFORMANCE
    </div>

    <Link to="/performance" style={menuStyle}>
      ⭐ Performance
    </Link>

    <Link to="/reports" style={menuStyle}>
      📊 Reports
    </Link>

    <Link to="/notification-management" style={menuStyle}>
      🔔 Notifications
    </Link>
  </>
)}
{role === "EMPLOYEE" && (
  <>
    <div className="text-info mt-3 mb-2 fw-bold">
      MY WORKSPACE
    </div>

    <Link to="/employee-attendance" style={menuStyle}>
      ⏰ My Attendance
    </Link>

    <Link to="/my-tasks" style={menuStyle}>
      ✅ My Tasks
    </Link>

    <Link to="/leave" style={menuStyle}>
      🌴 My Leave
    </Link>

    <Link to="/salary" style={menuStyle}>
      💰 Salary
    </Link>

    <Link to="/employee-notification" style={menuStyle}>
      🔔 Notifications
    </Link>

    <Link to="/employee-profile" style={menuStyle}>
      👤 My Profile
    </Link>
  </>
)}
        <div
          className="mt-3 p-3 text-center"
          style={{
            borderRadius: "12px",
            background:
              "linear-gradient(135deg,#2563eb,#7c3aed)"
          }}
        >
          <h6 className="text-white">
            🤖 AI Workforce Insights
          </h6>

          <small className="text-light">
            Attrition & Skill Gap Analysis
          </small>
        </div>

      </div>

    </div>
  );
}

export default Sidebar;