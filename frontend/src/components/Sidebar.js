import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const role = localStorage.getItem("role") || "EMPLOYEE";
  const username = localStorage.getItem("username") || "User";

  const location = useLocation();

  const dashboardPath =
    role === "ADMIN"
      ? "/admin/dashboard"
      : role === "MANAGER"
      ? "/manager/dashboard"
      : "/employee/dashboard";

  const isActive = (path) => {
    return location.pathname === path ? "active-menu" : "";
  };

  const menuItem = (path, icon, label) => (
    <Link
      to={path}
      className={`sidebar-menu-item ${isActive(path)}`}
    >
      <span className="sidebar-icon">{icon}</span>
      <span>{label}</span>
    </Link>
  );

  return (
    <aside className="nexushr-sidebar">

      {/* ================= LOGO ================= */}

      <div className="sidebar-logo">
        <div className="logo-box">
          HR.
        </div>

        <div className="logo-text">
          <strong>NexusHR</strong>
          <small>HRMS</small>
        </div>
      </div>

      {/* ================= PROFILE ================= */}

      <div className="sidebar-profile">

        <div className="profile-image-wrapper">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="sidebar-profile-image"
          />

          <span className="online-dot"></span>
        </div>

        <h5>{username}</h5>

        <span className="role-badge">
          {role}
        </span>

      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="sidebar-navigation">

        {/* Dashboard */}

        {menuItem(
          dashboardPath,
          "▦",
          "Dashboard"
        )}

        {/* ================= ADMIN ================= */}

        {role === "ADMIN" && (
          <>
            <div className="sidebar-section-title">
              WORKFORCE
            </div>

            {menuItem(
              "/employees",
              "♟",
              "Employees"
            )}

            {menuItem(
              "/add-employee",
              "+",
              "Add Employee"
            )}

            {menuItem(
              "/departments",
              "▦",
              "Departments"
            )}

            {menuItem(
              "/teams",
              "♟",
              "Teams"
            )}

            <div className="sidebar-section-title">
              OPERATIONS
            </div>

            {menuItem(
              "/admin-attendance",
              "◷",
              "Attendance"
            )}

            {menuItem(
              "/leave-management",
              "▣",
              "Leave Management"
            )}

            {menuItem(
              "/salary-management",
              "₹",
              "Payroll"
            )}

            <div className="sidebar-section-title">
              PROJECTS
            </div>

            {menuItem(
              "/projects",
              "▰",
              "Projects"
            )}

            {menuItem(
              "/tasks",
              "✓",
              "Tasks"
            )}

            <div className="sidebar-section-title">
              AI & REPORTS
            </div>

            {menuItem(
              "/audit-logs",
              "▤",
              "Audit Logs"
            )}

            {menuItem(
              "/reports",
              "▥",
              "Reports"
            )}

            {menuItem(
              "/notification-management",
              "♧",
              "Notifications"
            )}
          </>
        )}

        {/* ================= MANAGER ================= */}

        {role === "MANAGER" && (
          <>
            <div className="sidebar-section-title">
              TEAM MANAGEMENT
            </div>

            {menuItem(
              "/teams",
              "♟",
              "Team Members"
            )}

            {menuItem(
              "/leave-management",
              "▣",
              "Leave Management"
            )}

            <div className="sidebar-section-title">
              PROJECTS
            </div>

            {menuItem(
              "/projects",
              "▰",
              "Projects"
            )}

            {menuItem(
              "/tasks",
              "✓",
              "Tasks"
            )}

            {menuItem(
              "/milestones",
              "◆",
              "Milestones"
            )}

            <div className="sidebar-section-title">
              PERFORMANCE
            </div>

            {menuItem(
              "/performance",
              "★",
              "Performance"
            )}

            <div className="sidebar-section-title">
              AI INSIGHTS
            </div>

            {menuItem(
              "/ai-insights",
              "✦",
              "AI Insights"
            )}

            {menuItem(
              "/attrition-risk",
              "!",
              "Attrition Risk"
            )}

            {menuItem(
              "/skill-gap-analysis",
              "◇",
              "Skill Gap Analysis"
            )}

            {menuItem(
              "/reports",
              "▥",
              "Reports"
            )}

            {menuItem(
              "/notification-management",
              "♧",
              "Notifications"
            )}
          </>
        )}

        {/* ================= EMPLOYEE ================= */}

        {role === "EMPLOYEE" && (
          <>
            <div className="sidebar-section-title">
              MY WORK
            </div>

            {menuItem(
              "/employee-attendance",
              "◷",
              "My Attendance"
            )}

            {menuItem(
              "/face-attendance",
              "▣",
              "Face Attendance"
            )}

            {menuItem(
              "/my-tasks",
              "✓",
              "My Tasks"
            )}

            {menuItem(
              "/leave",
              "▣",
              "My Leaves"
            )}

            {menuItem(
              "/salary",
              "₹",
              "My Salary"
            )}

            {menuItem(
              "/employee-Notification",
              "♧",
              "Notifications"
            )}
          </>
        )}

      </nav>

      {/* ================= COMMON MENU ================= */}

      <div className="sidebar-divider"></div>

      <div className="sidebar-common">

        {menuItem(
          "/profile",
          "♟",
          "Profile"
        )}

        {menuItem(
          "/settings",
          "⚙",
          "Settings"
        )}

        {menuItem(
          "/change-password",
          "▣",
          "Change Password"
        )}

      </div>

      {/* ================= AI WIDGET ================= */}

      <div className="ai-sidebar-card">

        <div className="ai-icon">
          ✦
        </div>

        <h6>
          AI Workforce
        </h6>

        <p>
          Smart workforce insights
        </p>

        <span>
          ● Real-time monitoring
        </span>

      </div>

      {/* ================= FOOTER ================= */}

      <div className="sidebar-footer">

        <strong>
          NexusHR Enterprise
        </strong>

        <span>
          HRMS v2.0
        </span>

        <small>
          © 2026 NexusHR
        </small>

      </div>

    </aside>
  );
}

export default Sidebar;