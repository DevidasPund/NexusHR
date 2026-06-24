import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AIInsights() {

  const [employees, setEmployees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadEmployees();

    const interval =
      setInterval(() => {
        loadEmployees();
      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadEmployees =
    async () => {

      try {

        const response =
          await API.get("/employees");

        setEmployees(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  const filteredEmployees =
    employees.filter(emp =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const highRisk =
    employees.filter(
      emp =>
        emp.attritionRisk ===
        "HIGH"
    ).length;

  const mediumRisk =
    employees.filter(
      emp =>
        emp.attritionRisk ===
        "MEDIUM"
    ).length;

  const lowRisk =
    employees.filter(
      emp =>
        emp.attritionRisk ===
        "LOW"
    ).length;

  const avgPerformance =
    employees.length > 0
      ?
      (
        employees.reduce(
          (sum, emp) =>
            sum +
            (emp.performanceScore || 0),
          0
        ) / employees.length
      ).toFixed(1)
      :
      0;

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
                🤖 AI Workforce Intelligence
              </h2>

              <p className="mb-0">
                Real-Time Employee Analytics
                & Attrition Prediction
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4">

            <div className="col-md-3">

              <div
                className="card bg-danger text-white shadow border-0"
                style={{
                  height: "140px"
                }}
              >

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

              <div
                className="card bg-warning shadow border-0"
                style={{
                  height: "140px"
                }}
              >

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

              <div
                className="card bg-success text-white shadow border-0"
                style={{
                  height: "140px"
                }}
              >

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

              <div
                className="card bg-primary text-white shadow border-0"
                style={{
                  height: "140px"
                }}
              >

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

          {/* Search */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="Search Employee..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Employee Intelligence Table */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                Employee Intelligence
              </h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead className="table-dark">

                    <tr>

                      <th>Name</th>
                      <th>Department</th>
                      <th>Attendance</th>
                      <th>Performance</th>
                      <th>Risk</th>
                      <th>Skill Gap</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredEmployees
                        .map(emp => (

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
                                    ? "badge bg-warning text-dark"
                                    : "badge bg-success"
                                }
                              >

                                {emp.attritionRisk || "LOW"}

                              </span>

                            </td>

                            <td>

                              {
                                emp.missingSkills
                                  ?
                                  emp.missingSkills
                                  :
                                  "No Gap"
                              }

                            </td>

                          </tr>

                        ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          {/* AI Recommendations */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                💡 AI Recommendations
              </h4>

              <ul>

                <li>
                  High-risk employees should
                  receive engagement reviews.
                </li>

                <li>
                  Employees with attendance
                  below 75% require monitoring.
                </li>

                <li>
                  Skill gaps should be covered
                  through training programs.
                </li>

                <li>
                  Performance below 60%
                  requires manager feedback.
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AIInsights;