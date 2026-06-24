
import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Reports() {

  const [dashboard, setDashboard] = useState({});
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadReports();

    const interval = setInterval(() => {
      loadReports();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const loadReports = async () => {

    try {

      const dashboardRes =
        await API.get("/dashboard");

      setDashboard(dashboardRes.data);

      try {

        const deptRes =
          await API.get("/departments");

        setDepartments(deptRes.data);

      } catch (e) {

        setDepartments([]);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const exportPdf = () => {

    window.open(
      "https://nexushr-production-612e.up.railway.app/reports/pdf",
      "_blank"
    );

  };

  const exportExcel = () => {

    window.open(
      "https://nexushr-production-612e.up.railway.app/reports/excel",
      "_blank"
    );

  };

  const averageSalary =
    dashboard.totalEmployees > 0
      ? Math.round(
          (dashboard.totalSalary || 0) /
          dashboard.totalEmployees
        )
      : 0;

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background: "#f4f7fe",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                📊 HR Reports & Analytics
              </h2>

              <p>
                Real-Time Workforce Intelligence Dashboard
              </p>

            </div>

          </div>

          {loading ? (

            <div className="text-center mt-5">

              <div
                className="spinner-border text-primary"
              />

              <h5 className="mt-3">
                Loading Reports...
              </h5>

            </div>

          ) : (

            <>

              {/* KPI Cards */}

              <div className="row g-4 mb-4">

                <div className="col-md-3">

                  <div
                    className="card text-white border-0 shadow"
                    style={{
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)"
                    }}
                  >

                    <div className="card-body text-center">

                      <h6>Total Employees</h6>

                      <h2>
                        {dashboard.totalEmployees || 0}
                      </h2>

                    </div>

                  </div>

                </div>

                <div className="col-md-3">

                  <div
                    className="card text-white border-0 shadow"
                    style={{
                      background:
                        "linear-gradient(135deg,#16a34a,#22c55e)"
                    }}
                  >

                    <div className="card-body text-center">

                      <h6>Active Employees</h6>

                      <h2>
                        {dashboard.activeEmployees || 0}
                      </h2>

                    </div>

                  </div>

                </div>

                <div className="col-md-3">

                  <div
                    className="card border-0 shadow"
                    style={{
                      background:
                        "linear-gradient(135deg,#f59e0b,#fbbf24)"
                    }}
                  >

                    <div className="card-body text-center">

                      <h6>Departments</h6>

                      <h2>
                        {dashboard.totalDepartments || 0}
                      </h2>

                    </div>

                  </div>

                </div>

                <div className="col-md-3">

                  <div
                    className="card text-white border-0 shadow"
                    style={{
                      background:
                        "linear-gradient(135deg,#9333ea,#7c3aed)"
                    }}
                  >

                    <div className="card-body text-center">

                      <h6>Average Salary</h6>

                      <h2>
                        ₹{averageSalary}
                      </h2>

                    </div>

                  </div>

                </div>

              </div>

              {/* Attendance + Leave */}

              <div className="row g-4 mb-4">

                <div className="col-md-6">

                  <div className="card shadow border-0 h-100">

                    <div className="card-body">

                      <h4>
                        📅 Attendance Analytics
                      </h4>

                      <div className="mt-3">

                        <div className="d-flex justify-content-between">

                          <span>
                            Attendance Percentage
                          </span>

                          <strong>
                            {dashboard.attendancePercentage || 0}%
                          </strong>

                        </div>

                        <div className="progress mt-2">

                          <div
                            className="progress-bar bg-success"
                            style={{
                              width:
                                `${dashboard.attendancePercentage || 0}%`
                            }}
                          />

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="card shadow border-0 h-100">

                    <div className="card-body">

                      <h4>
                        🌴 Leave Analytics
                      </h4>

                      <div className="row text-center mt-4">

                        <div className="col-6">

                          <h2 className="text-warning">
                            {dashboard.pendingLeaves || 0}
                          </h2>

                          <p>Pending</p>

                        </div>

                        <div className="col-6">

                          <h2 className="text-success">
                            {dashboard.approvedLeaves || 0}
                          </h2>

                          <p>Approved</p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Department Summary */}

              <div className="card shadow border-0 mb-4">

                <div className="card-body">

                  <h4>
                    🏢 Department Summary
                  </h4>

                  <table className="table table-hover mt-3">

                    <thead className="table-dark">

                      <tr>

                        <th>Department</th>
                        <th>Employees</th>

                      </tr>

                    </thead>

                    <tbody>

                      {departments.map((dept) => (

                        <tr key={dept.id}>

                          <td>
                            {dept.departmentName}
                          </td>

                          <td>
                            {dept.employeeCount || 0}
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

              {/* AI Insights */}

              <div className="card shadow border-0 mb-4">

                <div className="card-body">

                  <h4>
                    🤖 AI Workforce Insights
                  </h4>

                </div>

              </div>

              {/* Performance */}

              <div className="card shadow border-0 mb-4">

                <div className="card-body">

                  <h4>
                    ⭐ Performance Summary
                  </h4>

                  <div className="row text-center mt-3">

                    <div className="col-md-4">

                      <h2 className="text-success">
                        {dashboard.topPerformers || 0}
                      </h2>

                      <p>Top Performers</p>

                    </div>

                    <div className="col-md-4">

                      <h2 className="text-primary">
                        {dashboard.averagePerformers || 0}
                      </h2>

                      <p>Average Performers</p>

                    </div>

                    <div className="col-md-4">

                      <h2 className="text-danger">
                        {dashboard.lowPerformers || 0}
                      </h2>

                      <p>Low Performers</p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Export */}

              <div className="card shadow border-0">

                <div className="card-body">

                  <h4>
                    📄 Export Reports
                  </h4>

                  <div className="d-flex gap-3 mt-3">

                    <button
                      className="btn btn-danger"
                      onClick={exportPdf}
                    >
                      📄 Export PDF
                    </button>

                    <button
                      className="btn btn-success"
                      onClick={exportExcel}
                    >
                      📊 Export Excel
                    </button>

                    <button
                      className="btn btn-dark"
                      onClick={() => window.print()}
                    >
                      🖨 Print
                    </button>

                  </div>

                </div>

              </div>

            </>

          )}

        </div>

      </div>

    </div>

  );

}

export default Reports;

