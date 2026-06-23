import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function PerformanceInsights() {

  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {

    loadEmployees();

    const interval =
      setInterval(() => {

        loadEmployees();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadEmployees = async () => {

    try {

      const response =
        await API.get("/employees");

      setEmployees(
        response.data
      );

    } catch(error) {

      console.error(error);

    }

  };

  const topPerformers =
    employees.filter(
      emp =>
      (emp.performanceScore || 0) >= 85
    );

  const lowPerformers =
    employees.filter(
      emp =>
      (emp.performanceScore || 0) < 60
    );

  const avgPerformance =
    employees.length > 0
      ?
      (
        employees.reduce(
          (sum, emp) =>
          sum +
          (emp.performanceScore || 0),
          0
        ) /
        employees.length
      ).toFixed(1)
      :
      0;

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background:"#f4f7fe",
          minHeight:"100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          {/* Hero */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
              "linear-gradient(135deg,#10b981,#059669)",
              borderRadius:"20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                ⭐ Performance Insights
              </h2>

              <p>
                Real-Time Employee
                Performance Analytics
              </p>

            </div>

          </div>

          {/* KPI */}

          <div className="row g-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Top Performers
                  </h6>

                  <h1 className="text-success">
                    {topPerformers.length}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Low Performers
                  </h6>

                  <h1 className="text-danger">
                    {lowPerformers.length}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Average Score
                  </h6>

                  <h1 className="text-primary">
                    {avgPerformance}%
                  </h1>

                </div>

              </div>

            </div>

          </div>

          {/* Leaderboard */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                🏆 Top Performers
              </h4>

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>Name</th>
                    <th>Department</th>
                    <th>Performance</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    topPerformers.map(emp => (

                      <tr key={emp.id}>

                        <td>
                          {emp.firstName}
                          {" "}
                          {emp.lastName}
                        </td>

                        <td>
                          {emp.department}
                        </td>

                        <td>

                          <div
                            className="progress"
                          >

                            <div
                              className=
                              "progress-bar bg-success"
                              style={{
                                width:
                                `${emp.performanceScore}%`
                              }}
                            >
                              {emp.performanceScore}%
                            </div>

                          </div>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          </div>

          {/* Low Performers */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                📉 Improvement Needed
              </h4>

              {
                lowPerformers.map(emp => (

                  <div
                    key={emp.id}
                    className=
                    "alert alert-warning"
                  >

                    <strong>

                      {emp.firstName}
                      {" "}
                      {emp.lastName}

                    </strong>

                    {" "}
                    requires coaching and
                    performance improvement.

                  </div>

                ))
              }

            </div>

          </div>

          {/* AI Promotion Suggestions */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                🚀 Promotion Candidates
              </h4>

              {
                topPerformers.map(emp => (

                  <div
                    key={emp.id}
                    className=
                    "alert alert-success"
                  >

                    <strong>

                      {emp.firstName}
                      {" "}
                      {emp.lastName}

                    </strong>

                    {" "}
                    is eligible for promotion
                    based on performance.

                  </div>

                ))
              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default PerformanceInsights;