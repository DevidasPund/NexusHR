import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "active-menu"
      : "";

  return (

    <div
      className="sidebar text-white shadow"
      style={{
        width: "300px",
        minWidth: "300px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#0f172a,#1e293b)"
      }}
    >

      {/* Logo */}

      <div className="text-center py-4">

        <h1
          className="fw-bold"
          style={{
            fontSize: "3rem"
          }}
        >
          NexusHR
        </h1>

        <small className="text-info">
          Enterprise HRMS
        </small>

      </div>

      {/* Profile */}

      <div className="text-center mb-4">

        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt=""
          width="90"
          height="90"
          style={{
            borderRadius: "50%",
            border: "3px solid #3b82f6"
          }}
        />

        <h5 className="mt-3">
          {username}
        </h5>

        <span className="badge bg-primary">
          {role}
        </span>

      </div>

      <hr style={{borderColor:"#374151"}} />

      {/* Dashboard */}

      <Link
        className={`nav-link text-white px-4 py-3 ${isActive(
          role === "ADMIN"
            ? "/admin/dashboard"
            : role === "MANAGER"
            ? "/manager/dashboard"
            : "/employee/dashboard"
        )}`}
        to={
          role === "ADMIN"
            ? "/admin/dashboard"
            : role === "MANAGER"
            ? "/manager/dashboard"
            : "/employee/dashboard"
        }
      >
        📊 Dashboard
      </Link>

      {/* ADMIN */}

      {role === "ADMIN" && (

        <>

          <div className="px-4 mt-4 text-info">
            WORKFORCE
          </div>

          <Link className="nav-link text-white px-4 py-2" to="/employees">
            👨‍💼 Employees
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/add-employee">
            ➕ Add Employee
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/departments">
            🏢 Departments
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/teams">
            👥 Teams
          </Link>

          <div className="px-4 mt-4 text-warning">
            OPERATIONS
          </div>

          <Link className="nav-link text-white px-4 py-2" to="/admin-attendance">
            ⏰ Attendance
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/leave-management">
            🌴 Leave Approval
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/salary-management">
            💰 Payroll
          </Link>

          <div className="px-4 mt-4 text-success">
            PROJECTS
          </div>

          <Link className="nav-link text-white px-4 py-2" to="/projects">
            📁 Projects
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/tasks">
            ✅ Tasks
          </Link>

          <div className="px-4 mt-4 text-danger">
            AI & REPORTS
          </div>

          <Link className="nav-link text-white px-4 py-2" to="/audit-logs">
            📋 Audit Logs
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/reports">
            📊 Reports
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/notification-management">
            🔔 Notifications
          </Link>

        </>

      )}

      {/* MANAGER */}

      {role === "MANAGER" && (

        <>

          <div className="px-4 mt-4 text-info">
            TEAM MANAGEMENT
          </div>

          <Link className="nav-link text-white px-4 py-2" to="/teams">
            👥 Team Members
          </Link>

          

          <Link className="nav-link text-white px-4 py-2" to="/leave-management">
            🌴 Leave Approval
          </Link>

          <div className="px-4 mt-4 text-success">
            PROJECTS
          </div>

          <Link className="nav-link text-white px-4 py-2" to="/projects">
            📁 Projects
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/tasks">
            ✅ Tasks
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/milestones">
            📌 Milestones
          </Link>

          <div className="px-4 mt-4 text-warning">
            PERFORMANCE
          </div>

          <Link className="nav-link text-white px-4 py-2" to="/performance">
            ⭐ Performance
          </Link>

          
          <div className="px-4 mt-4 text-danger">
            AI INSIGHTS
          </div>

          <Link className="nav-link text-white px-4 py-2" to="/ai-insights">
            🤖 AI Insights
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/attrition-risk">
            ⚠ Attrition Risk
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/skill-gap-analysis">
            🧠 Skill Gap Analysis
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/reports">
            📊 Reports
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/notification-management">
            🔔 Notifications
          </Link>

        </>

      )}

      {/* EMPLOYEE */}

      {role === "EMPLOYEE" && (

        <>

          <Link className="nav-link text-white px-4 py-2" to="/employee-attendance">
            ⏰ My Attendance
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/face-attendance">
            📷 Face Attendance
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/my-tasks">
            ✅ My Tasks
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/leave">
            🌴 My Leaves
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/salary">
            💰 My Salary
          </Link>

          <Link className="nav-link text-white px-4 py-2" to="/employee-Notification">
            🔔 Notifications
          </Link>

        </>

      )}

      <hr style={{borderColor:"#374151"}} />

      {/* Common */}

      <Link className="nav-link text-white px-4 py-2" to="/profile">
        👤 Profile
      </Link>

      <Link className="nav-link text-white px-4 py-2" to="/settings">
        ⚙ Settings
      </Link>

      <Link className="nav-link text-white px-4 py-2" to="/change-password">
        🔒 Change Password
      </Link>

      {/* AI Widget */}

      <div
        className="m-3 p-3 rounded"
        style={{
          background:
            "linear-gradient(135deg,#2563eb,#7c3aed)"
        }}
      >

        <h6>
          🤖 AI Workforce Insights
        </h6>

        <small>
          Attrition Monitoring
        </small>

        <br />

        <small>
          Skill Gap Analysis
        </small>

      </div>

      {/* Footer */}

      <div
        className="text-center p-3"
        style={{
          background:
            "rgba(255,255,255,0.05)"
        }}
      >

        <small className="text-info">
          NexusHR Enterprise Suite
        </small>

        <br />

        <small className="text-light">
          Version 2.0
        </small>

      </div>

    </div>
  );
}

export default Sidebar;