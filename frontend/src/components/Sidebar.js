import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

/* =========================================================
   NAVIGATION CONFIGURATION
   ========================================================= */

const navigation = {
  ADMIN: [
    {
      section: "MAIN",
      items: [
        {
          label: "Dashboard",
          path: "/admin/dashboard",
          icon: "⌂",
        },
        {
          label: "Employees",
          path: "/employees",
          icon: "👥",
        },
        {
          label: "Departments",
          path: "/departments",
          icon: "▦",
        },
      ],
    },

    {
      section: "PEOPLE",
      items: [
        {
          label: "Attendance",
          path: "/attendance",
          icon: "◷",
        },
        {
          label: "Leave Management",
          path: "/leave",
          icon: "▣",
        },
        {
          label: "Performance",
          path: "/performance",
          icon: "★",
        },
      ],
    },

    {
      section: "WORK",
      items: [
        {
          label: "Tasks",
          path: "/tasks",
          icon: "✓",
        },
        {
          label: "Notifications",
          path: "/notifications",
          icon: "♢",
        },
      ],
    },
  ],

  MANAGER: [
    {
      section: "MAIN",
      items: [
        {
          label: "Dashboard",
          path: "/manager/dashboard",
          icon: "⌂",
        },
        {
          label: "My Team",
          path: "/employees",
          icon: "👥",
        },
      ],
    },

    {
      section: "TEAM MANAGEMENT",
      items: [
        {
          label: "Attendance",
          path: "/attendance",
          icon: "◷",
        },
        {
          label: "Leave Requests",
          path: "/leave",
          icon: "▣",
        },
        {
          label: "Performance",
          path: "/performance",
          icon: "★",
        },
        {
          label: "Tasks",
          path: "/tasks",
          icon: "✓",
        },
      ],
    },

    {
      section: "COMMUNICATION",
      items: [
        {
          label: "Notifications",
          path: "/notifications",
          icon: "♢",
        },
      ],
    },
  ],

  EMPLOYEE: [
    {
      section: "MAIN",
      items: [
        {
          label: "Dashboard",
          path: "/employee/dashboard",
          icon: "⌂",
        },
      ],
    },

    {
      section: "MY WORK",
      items: [
        {
          label: "My Attendance",
          path: "/attendance",
          icon: "◷",
        },
        {
          label: "My Leave",
          path: "/leave",
          icon: "▣",
        },
        {
          label: "My Tasks",
          path: "/tasks",
          icon: "✓",
        },
        {
          label: "My Performance",
          path: "/performance",
          icon: "★",
        },
      ],
    },

    {
      section: "COMMUNICATION",
      items: [
        {
          label: "Notifications",
          path: "/notifications",
          icon: "♢",
        },
      ],
    },
  ],
};

/* =========================================================
   ROLE HELPERS
   ========================================================= */

const normalizeRole = (role) => {
  const value = String(role || "")
    .trim()
    .toUpperCase();

  if (
    value.includes("ADMIN")
  ) {
    return "ADMIN";
  }

  if (
    value.includes("MANAGER")
  ) {
    return "MANAGER";
  }

  if (
    value.includes("EMPLOYEE") ||
    value.includes("USER")
  ) {
    return "EMPLOYEE";
  }

  return "EMPLOYEE";
};

const getStoredRole = () => {
  return (
    localStorage.getItem("role") ||
    localStorage.getItem("userRole") ||
    localStorage.getItem("user_role") ||
    "EMPLOYEE"
  );
};

/* =========================================================
   SIDEBAR COMPONENT
   ========================================================= */

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [role, setRole] =
    useState(
      normalizeRole(
        getStoredRole()
      )
    );

  const [username, setUsername] =
    useState(
      localStorage.getItem(
        "username"
      ) ||
        localStorage.getItem(
          "name"
        ) ||
        "User"
    );

  /* =======================================================
     SYNC USER INFORMATION
     ======================================================= */

  useEffect(() => {
    const updateUser = () => {
      setRole(
        normalizeRole(
          getStoredRole()
        )
      );

      setUsername(
        localStorage.getItem(
          "username"
        ) ||
          localStorage.getItem(
            "name"
          ) ||
          "User"
      );
    };

    updateUser();

    window.addEventListener(
      "storage",
      updateUser
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateUser
      );
    };
  }, []);

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const menuGroups = useMemo(() => {
    return (
      navigation[role] ||
      navigation.EMPLOYEE
    );
  }, [role]);

  /* =======================================================
     ACTIVE ROUTE
     ======================================================= */

  const isActiveRoute = (
    path
  ) => {
    if (
      location.pathname ===
      path
    ) {
      return true;
    }

    return (
      location.pathname.startsWith(
        `${path}/`
      )
    );
  };

  /* =======================================================
     LOGOUT
     ======================================================= */

  const handleLogout = () => {
    const confirmed =
      window.confirm(
        "Are you sure you want to logout?"
      );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "userRole"
    );

    localStorage.removeItem(
      "user_role"
    );

    localStorage.removeItem(
      "username"
    );

    localStorage.removeItem(
      "name"
    );

    localStorage.removeItem(
      "email"
    );

    localStorage.removeItem(
      "employeeId"
    );

    localStorage.removeItem(
      "employeeID"
    );

    localStorage.removeItem(
      "userId"
    );

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  };

  /* =======================================================
     CLOSE MOBILE SIDEBAR
     ======================================================= */

  const handleNavigation =
    () => {
      if (
        window.innerWidth <=
        900
      ) {
        setMobileOpen(false);
      }
    };

  /* =======================================================
     ROLE LABEL
     ======================================================= */

  const roleLabel = {
    ADMIN: "Administrator",
    MANAGER: "Manager",
    EMPLOYEE: "Employee",
  };

  /* =======================================================
     USER INITIALS
     ======================================================= */

  const userInitials =
    String(username || "U")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(
        (part) =>
          part[0]
      )
      .join("")
      .toUpperCase();

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <>
      {/* ===================================================
          MOBILE MENU BUTTON
          =================================================== */}

      <button
        type="button"
        className="sidebar-mobile-toggle"
        onClick={() =>
          setMobileOpen(
            !mobileOpen
          )
        }
        aria-label="Toggle navigation"
      >
        {mobileOpen
          ? "×"
          : "☰"}
      </button>

      {/* ===================================================
          MOBILE OVERLAY
          =================================================== */}

      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setMobileOpen(
              false
            )
          }
        />
      )}

      {/* ===================================================
          SIDEBAR
          =================================================== */}

      <aside
        className={`
          nexus-sidebar
          ${collapsed
            ? "sidebar-collapsed"
            : ""}
          ${mobileOpen
            ? "sidebar-mobile-open"
            : ""}
        `}
      >

        {/* =================================================
            BRAND
            ================================================= */}

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            N
          </div>

          {!collapsed && (
            <div className="sidebar-brand-text">

              <strong>
                NexusHR
              </strong>

              <span>
                HR Management
              </span>

            </div>
          )}

        </div>

        {/* =================================================
            COLLAPSE BUTTON
            ================================================= */}

        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {collapsed
            ? "›"
            : "‹"}
        </button>

        {/* =================================================
            USER PROFILE
            ================================================= */}

        <div className="sidebar-user">

          <div className="sidebar-avatar">
            {userInitials}
          </div>

          {!collapsed && (
            <div className="sidebar-user-info">

              <strong>
                {username}
              </strong>

              <span>
                {roleLabel[
                  role
                ] ||
                  "Employee"}
              </span>

            </div>
          )}

        </div>

        {/* =================================================
            NAVIGATION
            ================================================= */}

        <nav className="sidebar-navigation">

          {menuGroups.map(
            (
              group
            ) => (

              <div
                className="sidebar-section"
                key={
                  group.section
                }
              >

                {!collapsed && (
                  <div className="sidebar-section-title">
                    {group.section}
                  </div>
                )}

                <div className="sidebar-menu">

                  {group.items.map(
                    (
                      item
                    ) => {

                      const active =
                        isActiveRoute(
                          item.path
                        );

                      return (
                        <NavLink
                          key={
                            item.path
                          }
                          to={
                            item.path
                          }
                          onClick={
                            handleNavigation
                          }
                          className={`
                            sidebar-link
                            ${
                              active
                                ? "sidebar-link-active"
                                : ""
                            }
                          `}
                          title={
                            collapsed
                              ? item.label
                              : undefined
                          }
                        >

                          <span className="sidebar-link-icon">
                            {item.icon}
                          </span>

                          {!collapsed && (
                            <span className="sidebar-link-label">
                              {
                                item.label
                              }
                            </span>
                          )}

                          {!collapsed &&
                            active && (
                              <span className="sidebar-active-indicator" />
                            )}

                        </NavLink>
                      );
                    }
                  )}

                </div>

              </div>
            )
          )}

        </nav>

        {/* =================================================
            SIDEBAR BOTTOM
            ================================================= */}

        <div className="sidebar-bottom">

          {/* Status */}

          {!collapsed && (
            <div className="sidebar-system-status">

              <span className="sidebar-status-dot" />

              <div>

                <strong>
                  System Online
                </strong>

                <small>
                  NexusHR services active
                </small>

              </div>

            </div>
          )}

          {/* Logout */}

          <button
            type="button"
            className="sidebar-logout"
            onClick={
              handleLogout
            }
            title={
              collapsed
                ? "Logout"
                : undefined
            }
          >

            <span className="sidebar-logout-icon">
              ↪
            </span>

            {!collapsed && (
              <span>
                Logout
              </span>
            )}

          </button>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;