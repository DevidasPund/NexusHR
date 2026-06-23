import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AIInsights() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {

    loadEmployees();

    const interval = setInterval(() => {

      loadEmployees();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadEmployees = async () => {

    try {

      const response =
        await API.get("/employees");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const highRisk =
    employees.filter(
      e => e.attritionRisk === "HIGH"
    ).length;

  const mediumRisk =
    employees.filter(
      e => e.attritionRisk === "MEDIUM"
    ).length;

  const lowRisk =
    employees.filter(
      e => e.attritionRisk === "LOW"
    ).length;

  const avgPerformance =
    employees.length > 0
      ? (
          employees.reduce(
            (sum, emp) =>
              sum + (emp.performanceScore || 0),
            0
          ) / employees.length
        ).toFixed(1)
      : 0;

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
              "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius:"20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                🤖 AI Workforce Intelligence
              </h2>

              <p>
                Real-Time Workforce Analytics
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4">

            <div className="col-md-3">

              <div className="card bg-danger text-white shadow">

                <div className="card-body text-center">

                  <h6>
                    ⚠ High Risk
                  </h6>

                  <h1>
                    {highRisk}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-warning shadow">

                <div className="card-body text-center">

                  <h6>
                    🧠 Medium Risk
                  </h6>

                  <h1>
                    {mediumRisk}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-success text-white shadow">

                <div className="card-body text-center">

                  <h6>
                    ⭐ Low Risk
                  </h6>

                  <h1>
                    {lowRisk}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-primary text-white shadow">

                <div className="card-body text-center">

                  <h6>
                    📈 Avg Performance
                  </h6>

                  <h1>
                    {avgPerformance}%
                  </h1>

                </div>

              </div>

            </div>

          </div>

          {/* Employee Analysis */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                Employee Intelligence
              </h4>

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>Name</th>
                    <th>Attendance</th>
                    <th>Performance</th>
                    <th>Risk</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    employees.map(emp => (

                      <tr key={emp.id}>

                        <td>
                          {emp.firstName}
                          {" "}
                          {emp.lastName}
                        </td>

                        <td>
                          {emp.attendancePercentage || 0}%
                        </td>

                        <td>
                          {emp.performanceScore || 0}%
                        </td>

                        <td>

                          <span
                            className={
                              emp.attritionRisk === "HIGH"
                              ? "badge bg-danger"
                              : emp.attritionRisk === "MEDIUM"
                              ? "badge bg-warning"
                              : "badge bg-success"
                            }
                          >

                            {emp.attritionRisk || "LOW"}

                          </span>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AIInsights;