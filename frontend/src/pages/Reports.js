import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Reports() {

  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadReports();

    const interval = setInterval(() => {
      loadReports();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadReports = async () => {

    try {

      const response = await API.get("/dashboard");

      setDashboard(response.data);

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

          {/* Header */}

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

              <p className="mb-0">
                Real-Time Workforce Intelligence Dashboard
              </p>

            </div>
          </div>

          {loading ? (

            <div className="text-center mt-5">

              <div
                className="spinner-border text-primary"
                role="status"
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
                  <div className="card bg-primary text-white border-0 shadow">
                    <div className="card-body text-center">
                      <h6>Total Employees</h6>
                      <h2>{dashboard.totalEmployees || 0}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-success text-white border-0 shadow">
                    <div className="card-body text-center">
                      <h6>Active Employees</h6>
                      <h2>{dashboard.activeEmployees || 0}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-warning border-0 shadow">
                    <div className="card-body text-center">
                      <h6>Departments</h6>
                      <h2>{dashboard.totalDepartments || 0}</h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="card bg-danger text-white border-0 shadow">
                    <div className="card-body text-center">
                      <h6>Total Salary</h6>
                      <h2>
                        ₹
                        {dashboard.totalSalary?.toLocaleString() || 0}
                      </h2>
                    </div>
                  </div>
                </div>

              </div>

              {/* Attendance */}

              <div className="row g-4 mb-4">

                <div className="col-md-6">

                  <div className="card shadow border-0 h-100">

                    <div className="card-body">

                      <h4 className="mb-4">
                        📅 Attendance Analytics
                      </h4>

                      <div className="mb-3">

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
                              width: `${dashboard.attendancePercentage || 0}%`
                            }}
                          >
                            {dashboard.attendancePercentage || 0}%
                          </div>

                        </div>

                      </div>

                      <div className="row text-center mt-4">

                        <div className="col-6">

                          <h5 className="text-success">
                            {dashboard.presentToday || 0}
                          </h5>

                          <small>Present Today</small>

                        </div>

                        <div className="col-6">

                          <h5 className="text-danger">
                            {dashboard.absentToday || 0}
                          </h5>

                          <small>Absent Today</small>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="card shadow border-0 h-100">

                    <div className="card-body">

                      <h4 className="mb-4">
                        🌴 Leave Analytics
                      </h4>

                      <div className="row text-center">

                        <div className="col-6">

                          <h2 className="text-warning">
                            {dashboard.pendingLeaves || 0}
                          </h2>

                          <p>Pending Leaves</p>

                        </div>

                        <div className="col-6">

                          <h2 className="text-success">
                            {dashboard.approvedLeaves || 0}
                          </h2>

                          <p>Approved Leaves</p>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* AI Analytics */}

              <div className="card shadow border-0 mb-4">

                <div className="card-body">

                  <h4>
                    🤖 AI Workforce Insights
                  </h4>

                  <hr />

                  <div className="row">

                    <div className="col-md-3">

                      <div className="alert alert-danger">

                        <strong>
                          High Risk Employees
                        </strong>

                        <h3>
                          {dashboard.highRiskEmployees || 0}
                        </h3>

                      </div>

                    </div>

                    <div className="col-md-3">

                      <div className="alert alert-warning">

                        <strong>
                          Medium Risk
                        </strong>

                        <h3>
                          {dashboard.mediumRiskEmployees || 0}
                        </h3>

                      </div>

                    </div>

                    <div className="col-md-3">

                      <div className="alert alert-success">

                        <strong>
                          Low Risk
                        </strong>

                        <h3>
                          {dashboard.lowRiskEmployees || 0}
                        </h3>

                      </div>

                    </div>

                    <div className="col-md-3">

                      <div className="alert alert-info">

                        <strong>
                          Avg Performance
                        </strong>

                        <h3>
                          {dashboard.averagePerformance || 0}%
                        </h3>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Performance */}

              <div className="card shadow border-0 mb-4">

                <div className="card-body">

                  <h4>
                    ⭐ Performance Summary
                  </h4>

                  <div className="row text-center mt-4">

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

              {/* Skill Gap */}

              <div className="card shadow border-0 mb-4">

                <div className="card-body">

                  <h4>
                    🎯 Top Skill Gaps
                  </h4>

                  <hr />

                  <h5 className="text-danger">
                    {dashboard.topSkillGaps || "No Data Available"}
                  </h5>

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
                      className="btn btn-danger btn-lg"
                      onClick={exportPdf}
                    >
                      PDF Report
                    </button>

                    <button
                      className="btn btn-success btn-lg"
                      onClick={exportExcel}
                    >
                      Excel Report
                    </button>

                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => window.print()}
                    >
                      Print Report
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