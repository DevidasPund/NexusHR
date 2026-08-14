import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const role = (
    localStorage.getItem("role") || "EMPLOYEE"
  ).toUpperCase();

  const username =
    localStorage.getItem("username") || "User";

  const dashboardPath =
    role === "ADMIN"
      ? "/admin/dashboard"
      : role === "MANAGER"
      ? "/manager/dashboard"
      : "/employee/dashboard";

  const isActive = (path) => {
    if (path === dashboardPath) {
      return location.pathname === path;
    }

    return location.pathname === path;
  };

  const menuClass = (path) =>
    `sidebar-menu-item ${
      isActive(path) ? "active" : ""
    }`;

  return (
    <aside className="nexushr-sidebar">

      {/* =====================================================
          LOGO
      ====================================================== */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          HR.
        </div>

        <div className="logo-text">
          <strong>NexusHR</strong>
          <span>HRMS</span>
        </div>

      </div>

      {/* =====================================================
          USER PROFILE
      ====================================================== */}

      <div className="sidebar-profile">

        <div className="profile-image-wrapper">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="sidebar-profile-image"
          />

          <span className="online-dot"></span>

        </div>

        <div className="sidebar-user-name">
          {username}
        </div>

        <span className="sidebar-role">
          {role}
        </span>

      </div>

      {/* =====================================================
          MAIN NAVIGATION
      ====================================================== */}

      <nav className="sidebar-navigation">

        {/* DASHBOARD */}

        <Link
          to={dashboardPath}
          className={menuClass(dashboardPath)}
        >
          <span className="menu-icon">
            ▦
          </span>

          <span>
            Dashboard
          </span>
        </Link>


        {/* =================================================
            ADMIN MENU
        ================================================== */}

        {role === "ADMIN" && (
          <>
            <div className="sidebar-section-title">
              WORKFORCE
            </div>

            <Link
              to="/employees"
              className={menuClass("/employees")}
            >
              <span className="menu-icon">♟</span>
              <span>Employees</span>
            </Link>

            <Link
              to="/add-employee"
              className={menuClass("/add-employee")}
            >
              <span className="menu-icon">＋</span>
              <span>Add Employee</span>
            </Link>

            <Link
              to="/departments"
              className={menuClass("/departments")}
            >
              <span className="menu-icon">▦</span>
              <span>Departments</span>
            </Link>

            <Link
              to="/teams"
              className={menuClass("/teams")}
            >
              <span className="menu-icon">♟</span>
              <span>Teams</span>
            </Link>


            <div className="sidebar-section-title">
              OPERATIONS
            </div>

            <Link
              to="/admin-attendance"
              className={menuClass(
                "/admin-attendance"
              )}
            >
              <span className="menu-icon">◷</span>
              <span>Attendance</span>
            </Link>

            <Link
              to="/leave-management"
              className={menuClass(
                "/leave-management"
              )}
            >
              <span className="menu-icon">▣</span>
              <span>Leave Management</span>
            </Link>

            <Link
              to="/salary-management"
              className={menuClass(
                "/salary-management"
              )}
            >
              <span className="menu-icon">₹</span>
              <span>Payroll</span>
            </Link>


            <div className="sidebar-section-title">
              PROJECTS
            </div>

            <Link
              to="/projects"
              className={menuClass("/projects")}
            >
              <span className="menu-icon">▣</span>
              <span>Projects</span>
            </Link>

            <Link
              to="/tasks"
              className={menuClass("/tasks")}
            >
              <span className="menu-icon">✓</span>
              <span>Tasks</span>
            </Link>


            <div className="sidebar-section-title">
              AI & REPORTS
            </div>

            <Link
              to="/audit-logs"
              className={menuClass("/audit-logs")}
            >
              <span className="menu-icon">▤</span>
              <span>Audit Logs</span>
            </Link>

            <Link
              to="/reports"
              className={menuClass("/reports")}
            >
              <span className="menu-icon">▥</span>
              <span>Reports</span>
            </Link>

            <Link
              to="/notification-management"
              className={menuClass(
                "/notification-management"
              )}
            >
              <span className="menu-icon">♢</span>
              <span>Notifications</span>
            </Link>
          </>
        )}


        {/* =================================================
            MANAGER MENU
        ================================================== */}

        {role === "MANAGER" && (
          <>
            <div className="sidebar-section-title">
              TEAM MANAGEMENT
            </div>

            <Link
              to="/teams"
              className={menuClass("/teams")}
            >
              <span className="menu-icon">♟</span>
              <span>Team Members</span>
            </Link>

            <Link
              to="/leave-management"
              className={menuClass(
                "/leave-management"
              )}
            >
              <span className="menu-icon">▣</span>
              <span>Leave Management</span>
            </Link>


            <div className="sidebar-section-title">
              PROJECTS
            </div>

            <Link
              to="/projects"
              className={menuClass("/projects")}
            >
              <span className="menu-icon">▣</span>
              <span>Projects</span>
            </Link>

            <Link
              to="/tasks"
              className={menuClass("/tasks")}
            >
              <span className="menu-icon">✓</span>
              <span>Tasks</span>
            </Link>

            <Link
              to="/milestones"
              className={menuClass("/milestones")}
            >
              <span className="menu-icon">◆</span>
              <span>Milestones</span>
            </Link>


            <div className="sidebar-section-title">
              PERFORMANCE
            </div>

            <Link
              to="/performance"
              className={menuClass("/performance")}
            >
              <span className="menu-icon">★</span>
              <span>Performance</span>
            </Link>


            <div className="sidebar-section-title">
              AI INSIGHTS
            </div>

            <Link
              to="/ai-insights"
              className={menuClass(
                "/ai-insights"
              )}
            >
              <span className="menu-icon">✦</span>
              <span>AI Insights</span>
            </Link>

            <Link
              to="/attrition-risk"
              className={menuClass(
                "/attrition-risk"
              )}
            >
              <span className="menu-icon">!</span>
              <span>Attrition Risk</span>
            </Link>

            <Link
              to="/skill-gap-analysis"
              className={menuClass(
                "/skill-gap-analysis"
              )}
            >
              <span className="menu-icon">◇</span>
              <span>Skill Gap Analysis</span>
            </Link>

            <Link
              to="/reports"
              className={menuClass("/reports")}
            >
              <span className="menu-icon">▥</span>
              <span>Reports</span>
            </Link>

            <Link
              to="/notification-management"
              className={menuClass(
                "/notification-management"
              )}
            >
              <span className="menu-icon">♢</span>
              <span>Notifications</span>
            </Link>
          </>
        )}


        {/* =================================================
            EMPLOYEE MENU
        ================================================== */}

        {role === "EMPLOYEE" && (
          <>
            <div className="sidebar-section-title">
              MY WORK
            </div>

            <Link
              to="/employee-attendance"
              className={menuClass(
                "/employee-attendance"
              )}
            >
              <span className="menu-icon">◷</span>
              <span>My Attendance</span>
            </Link>

            <Link
              to="/face-attendance"
              className={menuClass(
                "/face-attendance"
              )}
            >
              <span className="menu-icon">▣</span>
              <span>Face Attendance</span>
            </Link>

            <Link
              to="/my-tasks"
              className={menuClass("/my-tasks")}
            >
              <span className="menu-icon">✓</span>
              <span>My Tasks</span>
            </Link>

            <Link
              to="/leave"
              className={menuClass("/leave")}
            >
              <span className="menu-icon">▣</span>
              <span>My Leaves</span>
            </Link>

            <Link
              to="/salary"
              className={menuClass("/salary")}
            >
              <span className="menu-icon">₹</span>
              <span>My Salary</span>
            </Link>

            <Link
              to="/employee-Notification"
              className={menuClass(
                "/employee-Notification"
              )}
            >
              <span className="menu-icon">♢</span>
              <span>Notifications</span>
            </Link>
          </>
        )}

      </nav>


      {/* =====================================================
          COMMON MENU
      ====================================================== */}

      <div className="sidebar-common">

        <Link
          to="/profile"
          className={menuClass("/profile")}
        >
          <span className="menu-icon">♙</span>
          <span>Profile</span>
        </Link>

        <Link
          to="/settings"
          className={menuClass("/settings")}
        >
          <span className="menu-icon">⚙</span>
          <span>Settings</span>
        </Link>

        <Link
          to="/change-password"
          className={menuClass(
            "/change-password"
          )}
        >
          <span className="menu-icon">▣</span>
          <span>Change Password</span>
        </Link>

      </div>


      {/* =====================================================
          AI CARD
      ====================================================== */}

      {(role === "ADMIN" ||
        role === "MANAGER") && (

        <div className="sidebar-ai-card">

          <div className="ai-icon">
            ✦
          </div>

          <div className="ai-title">
            AI Workforce
          </div>

          <div className="ai-text">
            Smart workforce insights
          </div>

          <div className="ai-status">
            <span></span>
            Real-time monitoring
          </div>

        </div>
      )}


      {/* =====================================================
          FOOTER
      ====================================================== */}

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