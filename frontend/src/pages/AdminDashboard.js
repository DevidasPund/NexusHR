import React, { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import API from "../services/ApiService";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const REFRESH_MS = 10000;

const STATUS = {
  PRESENT: "PRESENT",
  LATE: "LATE",
  ABSENT: "ABSENT",
  WFH: "WFH",
  ON_LEAVE: "ON_LEAVE",
};

const toArray = (value) => {
  if (Array.isArray(value)) return value;

  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.content)) return value.content;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.results)) return value.results;

  return [];
};

const numberValue = (...values) => {
  for (const value of values) {
    if (value === null || value === undefined || value === "") continue;

    const number = Number(value);

    if (!Number.isNaN(number)) {
      return number;
    }
  }

  return 0;
};

const formatNumber = (value) => {
  return new Intl.NumberFormat("en-IN").format(numberValue(value));
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(numberValue(value));
};

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getEmployeeName = (employee) => {
  if (!employee) return "Unknown";

  if (employee.name) return employee.name;

  if (employee.fullName) return employee.fullName;

  if (employee.employeeName) return employee.employeeName;

  const firstName =
    employee.firstName ||
    employee.firstname ||
    employee.first_name ||
    "";

  const lastName =
    employee.lastName ||
    employee.lastname ||
    employee.last_name ||
    "";

  const fullName = `${firstName} ${lastName}`.trim();

  if (fullName) return fullName;

  return employee.email || `Employee #${employee.id || employee.employeeId || "-"}`;
};

const getEmployeeId = (employee) => {
  return (
    employee?.id ??
    employee?.employeeId ??
    employee?.employeeID ??
    employee?.employee_id
  );
};

const getStatus = (record) => {
  if (!record) return "";

  return String(
    record.status ||
      record.attendanceStatus ||
      record.leaveStatus ||
      ""
  ).toUpperCase();
};

const getDateValue = (record) => {
  return (
    record?.attendanceDate ||
    record?.date ||
    record?.checkInDate ||
    record?.createdAt ||
    record?.createdDate
  );
};

const isSameDate = (date1, date2 = new Date()) => {
  if (!date1) return false;

  const first = new Date(date1);
  const second = new Date(date2);

  if (
    Number.isNaN(first.getTime()) ||
    Number.isNaN(second.getTime())
  ) {
    return false;
  }

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
};

const getInitials = (name) => {
  if (!name) return "?";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const getLeaveStatusClass = (status) => {
  const value = String(status || "").toUpperCase();

  if (value === "APPROVED") return "bg-success";
  if (value === "REJECTED") return "bg-danger";
  if (value === "PENDING") return "bg-warning text-dark";
  if (value === "PENDING_ADMIN") return "bg-info text-dark";

  return "bg-secondary";
};

const getAttendanceStatusClass = (status) => {
  const value = String(status || "").toUpperCase();

  if (value === "PRESENT") return "bg-success";
  if (value === "LATE") return "bg-warning text-dark";
  if (value === "ABSENT") return "bg-danger";
  if (value === "WFH") return "bg-info text-dark";
  if (value === "ON_LEAVE") return "bg-primary";

  return "bg-secondary";
};

const getLeaveEmployeeId = (leave) => {
  return (
    leave?.employeeId ??
    leave?.employee?.id ??
    leave?.employeeID
  );
};

const getPerformanceScore = (performance) => {
  return numberValue(
    performance?.overallScore,
    performance?.overall,
    performance?.score,
    performance?.kpiScore
  );
};

function AdminDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [employees, setEmployees] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState({});
  const [attendanceToday, setAttendanceToday] = useState([]);
  const [attendanceMonth, setAttendanceMonth] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [performances, setPerformances] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");

  /*
   * -------------------------------------------------------
   * LIVE CLOCK
   * -------------------------------------------------------
   */

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /*
   * -------------------------------------------------------
   * LOAD DASHBOARD DATA
   * -------------------------------------------------------
   */

  const loadDashboardData = useCallback(async (manual = false) => {
    if (manual) {
      setRefreshing(true);
    }

    try {
      const requests = {
        dashboard: API.get("/dashboard"),
        employees: API.get("/employees"),
        attendanceSummary: API.get("/attendance/summary"),
        attendanceToday: API.get("/attendance/today"),
        attendanceMonth: API.get("/attendance/month"),
        leaves: API.get("/leave"),
        departments: API.get("/departments"),
        notifications: API.get("/notifications"),
        performances: API.get("/performance"),
      };

      const results = await Promise.allSettled(
        Object.entries(requests).map(async ([key, request]) => {
          const response = await request;
          return [key, response.data];
        })
      );

      const data = {};

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          const [key, value] = result.value;
          data[key] = value;
        }
      });

      /*
       * At least one backend request succeeded.
       */
      const successfulRequests = results.filter(
        (result) => result.status === "fulfilled"
      ).length;

      if (successfulRequests > 0) {
        setBackendOnline(true);
        setErrorMessage("");
      } else {
        setBackendOnline(false);
        setErrorMessage(
          "Unable to connect to the NexusHR backend."
        );
      }

      /*
       * Store backend responses.
       */
      setDashboard(data.dashboard || {});

      setEmployees(
        toArray(data.employees)
      );

      setAttendanceSummary(
        data.attendanceSummary || {}
      );

      setAttendanceToday(
        toArray(data.attendanceToday)
      );

      setAttendanceMonth(
        toArray(data.attendanceMonth)
      );

      setLeaves(
        toArray(data.leaves)
      );

      setDepartments(
        toArray(data.departments)
      );

      setNotifications(
        toArray(data.notifications)
      );

      setPerformances(
        toArray(data.performances)
      );

      setLastUpdated(new Date());
    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );

      setBackendOnline(false);

      setErrorMessage(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load dashboard data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  /*
   * Initial load + automatic refresh every 10 seconds.
   */

  useEffect(() => {
    loadDashboardData();

    const interval = setInterval(() => {
      loadDashboardData();
    }, REFRESH_MS);

    return () => {
      clearInterval(interval);
    };
  }, [loadDashboardData]);

  /*
   * -------------------------------------------------------
   * DERIVED EMPLOYEE DATA
   * -------------------------------------------------------
   */

  const totalEmployees = useMemo(() => {
    return numberValue(
      dashboard?.totalEmployees,
      dashboard?.employeeCount,
      employees.length
    );
  }, [dashboard, employees]);

  const activeEmployees = useMemo(() => {
    const directValue = dashboard?.activeEmployees;

    if (
      directValue !== undefined &&
      directValue !== null
    ) {
      return numberValue(directValue);
    }

    return employees.filter((employee) => {
      const status = String(
        employee?.status ||
          employee?.employmentStatus ||
          ""
      ).toUpperCase();

      return (
        employee?.active === true ||
        status === "ACTIVE" ||
        status === "PRESENT"
      );
    }).length;
  }, [dashboard, employees]);

  const inactiveEmployees = useMemo(() => {
    const directValue = dashboard?.inactiveEmployees;

    if (
      directValue !== undefined &&
      directValue !== null
    ) {
      return numberValue(directValue);
    }

    if (totalEmployees > 0) {
      return Math.max(
        totalEmployees - activeEmployees,
        0
      );
    }

    return 0;
  }, [
    dashboard,
    totalEmployees,
    activeEmployees,
  ]);

  /*
   * -------------------------------------------------------
   * ATTENDANCE
   * -------------------------------------------------------
   */

  const attendancePresentToday = useMemo(() => {
    const direct = numberValue(
      dashboard?.presentToday,
      dashboard?.presentEmployees,
      attendanceSummary?.presentToday,
      attendanceSummary?.present
    );

    if (direct > 0) {
      return direct;
    }

    return attendanceToday.filter((record) => {
      const status = getStatus(record);

      return (
        status === STATUS.PRESENT ||
        status === STATUS.LATE ||
        status === STATUS.WFH
      );
    }).length;
  }, [
    dashboard,
    attendanceSummary,
    attendanceToday,
  ]);

  const attendanceLateToday = useMemo(() => {
    const direct = numberValue(
      dashboard?.lateToday,
      attendanceSummary?.lateToday,
      attendanceSummary?.late
    );

    if (direct > 0) {
      return direct;
    }

    return attendanceToday.filter(
      (record) =>
        getStatus(record) === STATUS.LATE
    ).length;
  }, [
    dashboard,
    attendanceSummary,
    attendanceToday,
  ]);

  const attendanceWFHToday = useMemo(() => {
    const direct = numberValue(
      dashboard?.wfhToday,
      attendanceSummary?.wfhToday,
      attendanceSummary?.wfh
    );

    if (direct > 0) {
      return direct;
    }

    return attendanceToday.filter(
      (record) =>
        getStatus(record) === STATUS.WFH
    ).length;
  }, [
    dashboard,
    attendanceSummary,
    attendanceToday,
  ]);

  const absentToday = useMemo(() => {
    const direct =
      dashboard?.absentToday ??
      attendanceSummary?.absentToday ??
      attendanceSummary?.absent;

    if (
      direct !== undefined &&
      direct !== null
    ) {
      return numberValue(direct);
    }

    if (totalEmployees <= 0) {
      return 0;
    }

    const leaveCount = leaves.filter(
      (leave) => {
        const status = String(
          leave?.status || ""
        ).toUpperCase();

        return (
          status === "APPROVED" &&
          (
            isSameDate(leave?.startDate) ||
            isSameDate(leave?.fromDate) ||
            isSameDate(leave?.leaveDate)
          )
        );
      }
    ).length;

    return Math.max(
      totalEmployees -
        attendancePresentToday -
        leaveCount,
      0
    );
  }, [
    dashboard,
    attendanceSummary,
    totalEmployees,
    attendancePresentToday,
    leaves,
  ]);

  const onLeaveToday = useMemo(() => {
    const direct =
      dashboard?.onLeaveToday ??
      dashboard?.leaveToday ??
      attendanceSummary?.onLeaveToday;

    if (
      direct !== undefined &&
      direct !== null
    ) {
      return numberValue(direct);
    }

    return leaves.filter((leave) => {
      const status = String(
        leave?.status || ""
      ).toUpperCase();

      if (status !== "APPROVED") {
        return false;
      }

      return (
        isSameDate(leave?.startDate) ||
        isSameDate(leave?.fromDate) ||
        isSameDate(leave?.leaveDate) ||
        isSameDate(leave?.date)
      );
    }).length;
  }, [
    dashboard,
    attendanceSummary,
    leaves,
  ]);

  const attendancePercentage = useMemo(() => {
    const direct =
      dashboard?.attendancePercentage ??
      dashboard?.attendanceRate ??
      attendanceSummary?.attendancePercentage ??
      attendanceSummary?.attendanceRate;

    if (
      direct !== undefined &&
      direct !== null
    ) {
      return Math.min(
        100,
        Math.max(0, numberValue(direct))
      );
    }

    if (totalEmployees <= 0) {
      return 0;
    }

    return Math.min(
      100,
      Math.round(
        (attendancePresentToday /
          totalEmployees) *
          100
      )
    );
  }, [
    dashboard,
    attendanceSummary,
    attendancePresentToday,
    totalEmployees,
  ]);

  /*
   * -------------------------------------------------------
   * LEAVE DATA
   * -------------------------------------------------------
   */

  const pendingLeaves = useMemo(() => {
    const direct =
      dashboard?.pendingLeaves ??
      dashboard?.pendingLeaveRequests;

    if (
      direct !== undefined &&
      direct !== null
    ) {
      return numberValue(direct);
    }

    return leaves.filter((leave) => {
      const status = String(
        leave?.status || ""
      ).toUpperCase();

      return (
        status === "PENDING" ||
        status === "PENDING_ADMIN"
      );
    }).length;
  }, [dashboard, leaves]);

  const approvedLeaves = useMemo(() => {
    const direct = dashboard?.approvedLeaves;

    if (
      direct !== undefined &&
      direct !== null
    ) {
      return numberValue(direct);
    }

    return leaves.filter(
      (leave) =>
        String(
          leave?.status || ""
        ).toUpperCase() === "APPROVED"
    ).length;
  }, [dashboard, leaves]);

  const rejectedLeaves = useMemo(() => {
    const direct = dashboard?.rejectedLeaves;

    if (
      direct !== undefined &&
      direct !== null
    ) {
      return numberValue(direct);
    }

    return leaves.filter(
      (leave) =>
        String(
          leave?.status || ""
        ).toUpperCase() === "REJECTED"
    ).length;
  }, [dashboard, leaves]);

  /*
   * -------------------------------------------------------
   * PAYROLL
   * -------------------------------------------------------
   */

  const monthlyPayroll = useMemo(() => {
    return numberValue(
      dashboard?.monthlyPayroll,
      dashboard?.payroll,
      dashboard?.totalPayroll,
      dashboard?.monthlySalary
    );
  }, [dashboard]);

  /*
   * -------------------------------------------------------
   * DEPARTMENTS
   * -------------------------------------------------------
   */

  const departmentCount = useMemo(() => {
    return numberValue(
      dashboard?.departmentCount,
      departments.length
    );
  }, [dashboard, departments]);

  /*
   * -------------------------------------------------------
   * ATTENDANCE TREND
   * -------------------------------------------------------
   */

  const attendanceTrend = useMemo(() => {
    const map = {};

    attendanceMonth.forEach((record) => {
      const rawDate = getDateValue(record);

      if (!rawDate) return;

      const date = new Date(rawDate);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      const key = date.toISOString().split("T")[0];

      if (!map[key]) {
        map[key] = {
          date,
          present: 0,
          late: 0,
          absent: 0,
          wfh: 0,
          total: 0,
        };
      }

      const status = getStatus(record);

      if (
        status === STATUS.PRESENT
      ) {
        map[key].present += 1;
      }

      if (
        status === STATUS.LATE
      ) {
        map[key].late += 1;
      }

      if (
        status === STATUS.ABSENT
      ) {
        map[key].absent += 1;
      }

      if (
        status === STATUS.WFH
      ) {
        map[key].wfh += 1;
      }

      map[key].total += 1;
    });

    return Object.values(map)
      .sort(
        (a, b) =>
          a.date.getTime() -
          b.date.getTime()
      )
      .slice(-7);
  }, [attendanceMonth]);

  const attendanceChartData = useMemo(() => {
    return {
      labels: attendanceTrend.map(
        (item) =>
          item.date.toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
            }
          )
      ),

      datasets: [
        {
          label: "Present",
          data: attendanceTrend.map(
            (item) =>
              item.present
          ),
          borderWidth: 1,
        },
        {
          label: "Late",
          data: attendanceTrend.map(
            (item) =>
              item.late
          ),
          borderWidth: 1,
        },
        {
          label: "WFH",
          data: attendanceTrend.map(
            (item) =>
              item.wfh
          ),
          borderWidth: 1,
        },
      ],
    };
  }, [attendanceTrend]);

  /*
   * -------------------------------------------------------
   * ACTIVE / INACTIVE CHART
   * -------------------------------------------------------
   */

  const workforceChartData = useMemo(() => {
    return {
      labels: [
        "Active",
        "Inactive",
      ],

      datasets: [
        {
          label: "Employees",
          data: [
            activeEmployees,
            inactiveEmployees,
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [
    activeEmployees,
    inactiveEmployees,
  ]);

  /*
   * -------------------------------------------------------
   * RECENT EMPLOYEES
   * -------------------------------------------------------
   */

  const recentEmployees = useMemo(() => {
    return [...employees]
      .sort((a, b) => {
        const dateA =
          new Date(
            a?.createdAt ||
              a?.createdDate ||
              0
          ).getTime();

        const dateB =
          new Date(
            b?.createdAt ||
              b?.createdDate ||
              0
          ).getTime();

        return dateB - dateA;
      })
      .slice(0, 8);
  }, [employees]);

  /*
   * -------------------------------------------------------
   * LIVE ATTENDANCE
   * -------------------------------------------------------
   */

  const liveAttendance = useMemo(() => {
    const employeeMap = new Map();

    employees.forEach((employee) => {
      const id = getEmployeeId(employee);

      if (id !== undefined && id !== null) {
        employeeMap.set(
          String(id),
          employee
        );
      }
    });

    return attendanceToday
      .map((record) => {
        const employeeId =
          record?.employeeId ??
          record?.employeeID ??
          record?.employee?.id;

        const employee =
          employeeMap.get(
            String(employeeId)
          ) ||
          record?.employee;

        return {
          ...record,
          employee,
          employeeId,
        };
      })
      .slice(0, 15);
  }, [
    attendanceToday,
    employees,
  ]);

  /*
   * -------------------------------------------------------
   * PERFORMANCE
   * -------------------------------------------------------
   */

  const topPerformers = useMemo(() => {
    return [...performances]
      .sort(
        (a, b) =>
          getPerformanceScore(b) -
          getPerformanceScore(a)
      )
      .slice(0, 5);
  }, [performances]);

  /*
   * -------------------------------------------------------
   * RECENT LEAVES
   * -------------------------------------------------------
   */

  const recentLeaves = useMemo(() => {
    return [...leaves]
      .sort((a, b) => {
        const dateA = new Date(
          a?.createdAt ||
            a?.createdDate ||
            a?.startDate ||
            0
        ).getTime();

        const dateB = new Date(
          b?.createdAt ||
            b?.createdDate ||
            b?.startDate ||
            0
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 6);
  }, [leaves]);

  /*
   * -------------------------------------------------------
   * NOTIFICATIONS
   * -------------------------------------------------------
   */

  const recentNotifications = useMemo(() => {
    return [...notifications]
      .sort((a, b) => {
        const dateA =
          new Date(
            a?.createdAt ||
              a?.createdDate ||
              a?.timestamp ||
              0
          ).getTime();

        const dateB =
          new Date(
            b?.createdAt ||
              b?.createdDate ||
              b?.timestamp ||
              0
          ).getTime();

        return dateB - dateA;
      })
      .slice(0, 6);
  }, [notifications]);

  /*
   * -------------------------------------------------------
   * RISK CALCULATION
   * -------------------------------------------------------
   */

  const workforceRisk = useMemo(() => {
    const risks = [];

    if (attendancePercentage < 70) {
      risks.push({
        title: "Low attendance",
        message:
          "Overall attendance is below 70%.",
        level: "High",
      });
    } else if (attendancePercentage < 85) {
      risks.push({
        title: "Attendance requires attention",
        message:
          "Attendance is below the recommended 85%.",
        level: "Medium",
      });
    }

    if (pendingLeaves > 5) {
      risks.push({
        title: "Pending leave requests",
        message:
          `${pendingLeaves} leave requests need review.`,
        level: "Medium",
      });
    }

    if (inactiveEmployees > 0) {
      risks.push({
        title: "Inactive employees",
        message:
          `${inactiveEmployees} employee(s) are marked inactive.`,
        level: "Low",
      });
    }

    if (risks.length === 0) {
      risks.push({
        title: "Workforce looks healthy",
        message:
          "No major workforce risks detected from current backend data.",
        level: "Low",
      });
    }

    return risks.slice(0, 4);
  }, [
    attendancePercentage,
    pendingLeaves,
    inactiveEmployees,
  ]);

  /*
   * -------------------------------------------------------
   * DASHBOARD CARD
   * -------------------------------------------------------
   */

  const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    className = "",
  }) => {
    return (
      <div
        className={`card border-0 shadow-sm h-100 ${className}`}
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <div className="text-muted small mb-2">
                {title}
              </div>

              <h3 className="fw-bold mb-1">
                {value}
              </h3>

              <div className="small text-muted">
                {subtitle}
              </div>
            </div>

            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "48px",
                height: "48px",
                background:
                  "rgba(13, 110, 253, 0.10)",
                fontSize: "22px",
              }}
            >
              {icon}
            </div>
          </div>
        </div>
      </div>
    );
  };

  /*
   * -------------------------------------------------------
   * PAGE
   * -------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="container-fluid py-5">
        <div className="d-flex justify-content-center align-items-center">
          <div className="text-center">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
            />

            <h5>
              Loading NexusHR Admin Dashboard...
            </h5>

            <p className="text-muted mb-0">
              Fetching real data from the backend.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-4"
      style={{
        background: "#f7f8fc",
        minHeight: "100vh",
      }}
    >
      {/* ==================================================
          HEADER
      =================================================== */}

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">
            Admin Dashboard
          </h2>

          <p className="text-muted mb-0">
            NexusHR workforce management overview
          </p>
        </div>

        <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
          <div className="text-end">
            <div className="fw-semibold">
              {currentTime.toLocaleTimeString(
                "en-IN",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }
              )}
            </div>

            <div className="small text-muted">
              {currentTime.toLocaleDateString(
                "en-IN",
                {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={() =>
              loadDashboardData(true)
            }
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Refreshing
              </>
            ) : (
              <>
                ↻ Refresh
              </>
            )}
          </button>
        </div>
      </div>

      {/* ==================================================
          BACKEND STATUS
      =================================================== */}

      <div
        className={`alert ${
          backendOnline
            ? "alert-success"
            : "alert-danger"
        } d-flex flex-wrap justify-content-between align-items-center`}
      >
        <div>
          <strong>
            {backendOnline
              ? "● Backend Connected"
              : "● Backend Offline"}
          </strong>

          <span className="ms-2">
            {backendOnline
              ? "Live data is being loaded from NexusHR backend."
              : errorMessage ||
                "Backend connection failed."}
          </span>
        </div>

        <div className="small">
          Last updated:{" "}
          {lastUpdated
            ? lastUpdated.toLocaleTimeString(
                "en-IN"
              )
            : "-"}
        </div>
      </div>

      {/* ==================================================
          KPI CARDS
      =================================================== */}

      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Total Employees"
            value={formatNumber(
              totalEmployees
            )}
            subtitle="Employees in backend"
            icon="👥"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Present Today"
            value={formatNumber(
              attendancePresentToday
            )}
            subtitle={`${attendancePercentage}% attendance`}
            icon="✓"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Pending Leaves"
            value={formatNumber(
              pendingLeaves
            )}
            subtitle="Requests requiring action"
            icon="📋"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Monthly Payroll"
            value={formatCurrency(
              monthlyPayroll
            )}
            subtitle="Current backend value"
            icon="₹"
          />
        </div>
      </div>

      {/* ==================================================
          SECONDARY KPI CARDS
      =================================================== */}

      <div className="row g-4 mb-4">
        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Active Employees"
            value={formatNumber(
              activeEmployees
            )}
            subtitle={`${inactiveEmployees} inactive`}
            icon="🟢"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Late Today"
            value={formatNumber(
              attendanceLateToday
            )}
            subtitle="Late attendance records"
            icon="⏰"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="WFH Today"
            value={formatNumber(
              attendanceWFHToday
            )}
            subtitle="Work from home"
            icon="🏠"
          />
        </div>

        <div className="col-xl-3 col-md-6">
          <StatCard
            title="Departments"
            value={formatNumber(
              departmentCount
            )}
            subtitle="Departments in system"
            icon="🏢"
          />
        </div>
      </div>

      {/* ==================================================
          TODAY ATTENDANCE
      =================================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h5 className="fw-bold mb-1">
                Today's Attendance
              </h5>

              <p className="text-muted small mb-0">
                Live attendance summary from backend
              </p>
            </div>

            <span className="badge bg-success">
              LIVE
            </span>
          </div>

          <div className="row g-3">
            <div className="col-md-2">
              <div className="p-3 bg-light rounded">
                <div className="small text-muted">
                  Present
                </div>
                <h4 className="fw-bold text-success mb-0">
                  {attendancePresentToday}
                </h4>
              </div>
            </div>

            <div className="col-md-2">
              <div className="p-3 bg-light rounded">
                <div className="small text-muted">
                  Late
                </div>
                <h4 className="fw-bold text-warning mb-0">
                  {attendanceLateToday}
                </h4>
              </div>
            </div>

            <div className="col-md-2">
              <div className="p-3 bg-light rounded">
                <div className="small text-muted">
                  Absent
                </div>
                <h4 className="fw-bold text-danger mb-0">
                  {absentToday}
                </h4>
              </div>
            </div>

            <div className="col-md-2">
              <div className="p-3 bg-light rounded">
                <div className="small text-muted">
                  WFH
                </div>
                <h4 className="fw-bold text-info mb-0">
                  {attendanceWFHToday}
                </h4>
              </div>
            </div>

            <div className="col-md-2">
              <div className="p-3 bg-light rounded">
                <div className="small text-muted">
                  On Leave
                </div>
                <h4 className="fw-bold text-primary mb-0">
                  {onLeaveToday}
                </h4>
              </div>
            </div>

            <div className="col-md-2">
              <div className="p-3 bg-light rounded">
                <div className="small text-muted">
                  Attendance
                </div>
                <h4 className="fw-bold mb-0">
                  {attendancePercentage}%
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          CHARTS
      =================================================== */}

      <div className="row g-4 mb-4">
        <div className="col-xl-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="fw-bold mb-1">
                    Attendance Trend
                  </h5>

                  <p className="text-muted small mb-0">
                    Last available attendance records
                  </p>
                </div>

                <span className="badge bg-light text-dark">
                  Backend Data
                </span>
              </div>

              <div
                style={{
                  height: "320px",
                }}
              >
                {attendanceTrend.length > 0 ? (
                  <Bar
                    data={attendanceChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            precision: 0,
                          },
                        },
                      },
                    }}
                  />
                ) : (
                  <div className="h-100 d-flex justify-content-center align-items-center text-muted">
                    No attendance trend data available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-1">
                Workforce
              </h5>

              <p className="text-muted small mb-4">
                Active vs inactive employees
              </p>

              <div
                style={{
                  height: "320px",
                }}
              >
                <Bar
                  data={workforceChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0,
                        },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          LIVE ATTENDANCE TABLE
      =================================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-1">
                Live Attendance Monitor
              </h5>

              <p className="text-muted small mb-0">
                Today's attendance records
              </p>
            </div>

            <span className="badge bg-success">
              Auto refresh: 10 sec
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Employee</th>
                  <th>Employee ID</th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {liveAttendance.length > 0 ? (
                  liveAttendance.map(
                    (record, index) => {
                      const employeeName =
                        getEmployeeName(
                          record.employee
                        );

                      return (
                        <tr
                          key={
                            record.id ||
                            `${record.employeeId}-${index}`
                          }
                        >
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center"
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  background:
                                    "#eef2ff",
                                  fontSize:
                                    "12px",
                                  fontWeight:
                                    "700",
                                }}
                              >
                                {getInitials(
                                  employeeName
                                )}
                              </div>

                              <div>
                                <div className="fw-semibold">
                                  {employeeName}
                                </div>

                                {record.employee
                                  ?.email && (
                                  <div className="small text-muted">
                                    {
                                      record
                                        .employee
                                        .email
                                    }
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          <td>
                            {record.employeeId ||
                              record.employeeID ||
                              "-"}
                          </td>

                          <td>
                            {formatDate(
                              record.attendanceDate ||
                                record.date
                            )}
                          </td>

                          <td>
                            {formatTime(
                              record.checkInTime
                            )}
                          </td>

                          <td>
                            {formatTime(
                              record.checkOutTime
                            )}
                          </td>

                          <td>
                            <span
                              className={`badge ${getAttendanceStatusClass(
                                getStatus(
                                  record
                                )
                              )}`}
                            >
                              {getStatus(
                                record
                              ) || "UNKNOWN"}
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center text-muted py-5"
                    >
                      No attendance records available
                      for today.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==================================================
          RECENT EMPLOYEES + LEAVE
      =================================================== */}

      <div className="row g-4 mb-4">
        <div className="col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1">
                    Recent Employees
                  </h5>

                  <p className="text-muted small mb-0">
                    Employees from the backend
                  </p>
                </div>

                <span className="badge bg-primary">
                  {employees.length}
                </span>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentEmployees.length > 0 ? (
                      recentEmployees.map(
                        (employee, index) => {
                          const name =
                            getEmployeeName(
                              employee
                            );

                          const status =
                            employee?.status ||
                            employee?.employmentStatus ||
                            (employee?.active ===
                            false
                              ? "INACTIVE"
                              : "ACTIVE");

                          return (
                            <tr
                              key={
                                getEmployeeId(
                                  employee
                                ) ||
                                index
                              }
                            >
                              <td>
                                <div className="d-flex align-items-center gap-2">
                                  <div
                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                      width:
                                        "34px",
                                      height:
                                        "34px",
                                      background:
                                        "#f1f3f5",
                                      fontSize:
                                        "11px",
                                      fontWeight:
                                        "700",
                                    }}
                                  >
                                    {getInitials(
                                      name
                                    )}
                                  </div>

                                  <div>
                                    <div className="fw-semibold">
                                      {name}
                                    </div>

                                    <div className="small text-muted">
                                      ID:{" "}
                                      {getEmployeeId(
                                        employee
                                      ) || "-"}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td>
                                {employee?.departmentName ||
                                  employee
                                    ?.department
                                    ?.name ||
                                  employee?.department ||
                                  "-"}
                              </td>

                              <td>
                                {employee?.role ||
                                  employee?.designation ||
                                  "-"}
                              </td>

                              <td>
                                <span
                                  className={`badge ${
                                    String(
                                      status
                                    ).toUpperCase() ===
                                    "ACTIVE"
                                      ? "bg-success"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {String(
                                    status
                                  ).toUpperCase()}
                                </span>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-muted py-5"
                        >
                          No employee data available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1">
                    Leave Requests
                  </h5>

                  <p className="text-muted small mb-0">
                    Latest leave activity
                  </p>
                </div>

                <span className="badge bg-warning text-dark">
                  {pendingLeaves} Pending
                </span>
              </div>

              <div>
                {recentLeaves.length > 0 ? (
                  recentLeaves.map(
                    (leave, index) => {
                      const employeeId =
                        getLeaveEmployeeId(
                          leave
                        );

                      const employee =
                        employees.find(
                          (item) =>
                            String(
                              getEmployeeId(
                                item
                              )
                            ) ===
                            String(
                              employeeId
                            )
                        );

                      const employeeName =
                        leave?.employeeName ||
                        getEmployeeName(
                          employee
                        );

                      return (
                        <div
                          key={
                            leave?.id ||
                            index
                          }
                          className="border-bottom py-3"
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <div className="fw-semibold">
                                {employeeName}
                              </div>

                              <div className="small text-muted">
                                {leave?.leaveType ||
                                  leave?.type ||
                                  "Leave"}
                              </div>
                            </div>

                            <span
                              className={`badge ${getLeaveStatusClass(
                                leave?.status
                              )}`}
                            >
                              {leave?.status ||
                                "UNKNOWN"}
                            </span>
                          </div>

                          <div className="small text-muted mt-2">
                            {formatDate(
                              leave?.startDate ||
                                leave?.fromDate ||
                                leave?.leaveDate
                            )}

                            {" → "}

                            {formatDate(
                              leave?.endDate ||
                                leave?.toDate ||
                                leave?.leaveDate
                            )}
                          </div>
                        </div>
                      );
                    }
                  )
                ) : (
                  <div className="text-center text-muted py-5">
                    No leave records available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          LEAVE SUMMARY
      =================================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">
            Leave Summary
          </h5>

          <div className="row g-3">
            <div className="col-md-4">
              <div className="p-4 rounded bg-warning bg-opacity-10">
                <div className="text-muted small">
                  Pending
                </div>

                <h3 className="fw-bold text-warning mb-0">
                  {pendingLeaves}
                </h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 rounded bg-success bg-opacity-10">
                <div className="text-muted small">
                  Approved
                </div>

                <h3 className="fw-bold text-success mb-0">
                  {approvedLeaves}
                </h3>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 rounded bg-danger bg-opacity-10">
                <div className="text-muted small">
                  Rejected
                </div>

                <h3 className="fw-bold text-danger mb-0">
                  {rejectedLeaves}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          PERFORMANCE
      =================================================== */}

      <div className="row g-4 mb-4">
        <div className="col-xl-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="fw-bold mb-1">
                    Top Performers
                  </h5>

                  <p className="text-muted small mb-0">
                    Latest performance records
                  </p>
                </div>

                <span className="badge bg-primary">
                  Performance
                </span>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Employee</th>
                      <th>Review Month</th>
                      <th>KPI</th>
                      <th>Overall</th>
                    </tr>
                  </thead>

                  <tbody>
                    {topPerformers.length > 0 ? (
                      topPerformers.map(
                        (performance, index) => {
                          const score =
                            getPerformanceScore(
                              performance
                            );

                          const employee =
                            employees.find(
                              (item) =>
                                String(
                                  getEmployeeId(
                                    item
                                  )
                                ) ===
                                String(
                                  performance?.employeeId
                                )
                            );

                          const employeeName =
                            performance?.employeeName ||
                            getEmployeeName(
                              employee
                            );

                          return (
                            <tr
                              key={
                                performance?.id ||
                                index
                              }
                            >
                              <td className="fw-semibold">
                                {employeeName}
                              </td>

                              <td>
                                {performance?.reviewMonth ||
                                  "-"}
                              </td>

                              <td>
                                {numberValue(
                                  performance?.kpiScore
                                )}
                              </td>

                              <td>
                                <span className="fw-bold">
                                  {score}
                                </span>
                              </td>
                            </tr>
                          );
                        }
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center text-muted py-5"
                        >
                          No performance records available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            WORKFORCE RISK
        =================================================== */}

        <div className="col-xl-5">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-1">
                Workforce Risk
              </h5>

              <p className="text-muted small mb-3">
                Calculated from current backend data
              </p>

              {workforceRisk.map(
                (risk, index) => (
                  <div
                    key={index}
                    className="border rounded p-3 mb-3"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <strong>
                        {risk.title}
                      </strong>

                      <span
                        className={`badge ${
                          risk.level === "High"
                            ? "bg-danger"
                            : risk.level ===
                              "Medium"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {risk.level}
                      </span>
                    </div>

                    <div className="small text-muted mt-2">
                      {risk.message}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          DEPARTMENTS
      =================================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-1">
                Departments
              </h5>

              <p className="text-muted small mb-0">
                Departments currently available in the backend
              </p>
            </div>

            <span className="badge bg-primary">
              {departments.length}
            </span>
          </div>

          {departments.length > 0 ? (
            <div className="row g-3">
              {departments.map(
                (department, index) => {
                  const departmentName =
                    department?.name ||
                    department?.departmentName ||
                    department?.title ||
                    `Department ${index + 1}`;

                  return (
                    <div
                      className="col-xl-3 col-md-4 col-sm-6"
                      key={
                        department?.id ||
                        index
                      }
                    >
                      <div className="border rounded p-3 h-100">
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="rounded-circle d-flex align-items-center justify-content-center"
                            style={{
                              width: "42px",
                              height: "42px",
                              background:
                                "#f1f3f5",
                            }}
                          >
                            🏢
                          </div>

                          <div>
                            <div className="fw-semibold">
                              {departmentName}
                            </div>

                            <div className="small text-muted">
                              ID:{" "}
                              {department?.id ||
                                "-"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          ) : (
            <div className="text-center text-muted py-4">
              No department records available.
            </div>
          )}
        </div>
      </div>

      {/* ==================================================
          NOTIFICATIONS
      =================================================== */}

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-1">
                Recent HR Activity
              </h5>

              <p className="text-muted small mb-0">
                Notifications stored by the backend
              </p>
            </div>

            <span className="badge bg-info text-dark">
              Notifications
            </span>
          </div>

          {recentNotifications.length > 0 ? (
            recentNotifications.map(
              (notification, index) => (
                <div
                  key={
                    notification?.id ||
                    index
                  }
                  className="border-bottom py-3"
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <div className="fw-semibold">
                        {notification?.title ||
                          "HR Notification"}
                      </div>

                      <div className="small text-muted mt-1">
                        {notification?.message ||
                          "No message available."}
                      </div>
                    </div>

                    <div className="small text-muted text-nowrap ms-3">
                      {formatDate(
                        notification?.createdAt ||
                          notification?.createdDate ||
                          notification?.timestamp
                      )}
                    </div>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="text-center text-muted py-5">
              No notifications available.
            </div>
          )}
        </div>
      </div>

      {/* ==================================================
          SYSTEM INFORMATION
      =================================================== */}

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="row g-4">
            <div className="col-md-3">
              <div className="small text-muted">
                Backend
              </div>

              <div className="fw-semibold">
                NexusHR Railway API
              </div>
            </div>

            <div className="col-md-3">
              <div className="small text-muted">
                Refresh interval
              </div>

              <div className="fw-semibold">
                10 seconds
              </div>
            </div>

            <div className="col-md-3">
              <div className="small text-muted">
                Employees loaded
              </div>

              <div className="fw-semibold">
                {employees.length}
              </div>
            </div>

            <div className="col-md-3">
              <div className="small text-muted">
                Attendance records
              </div>

              <div className="fw-semibold">
                {attendanceToday.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          FOOTER
      =================================================== */}

      <div className="text-center text-muted small mt-4">
        NexusHR Admin Dashboard • Data synchronized
        with backend
      </div>
    </div>
  );
}

export default AdminDashboard;