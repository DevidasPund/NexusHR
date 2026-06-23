import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AttritionRisk() {

  const [employees, setEmployees] =
    useState([]);

  useEffect(() => {

    loadData();

    const interval =
      setInterval(() => {

        loadData();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadData = async () => {

    try {

      const response =
        await API.get("/employees");

      setEmployees(
        response.data.filter(
          emp =>
          emp.attritionRisk === "HIGH"
        )
      );

    } catch(error) {

      console.error(error);

    }

  };

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
              "linear-gradient(135deg,#ef4444,#dc2626)",
              borderRadius:"20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                ⚠ Attrition Risk Analysis
              </h2>

              <p>
                Employees likely to leave
                the organization
              </p>

            </div>

          </div>

          {/* Summary */}

          <div className="row g-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    High Risk Employees
                  </h6>

                  <h1 className="text-danger">
                    {employees.length}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Avg Attendance
                  </h6>

                  <h1 className="text-warning">

                    {
                      employees.length > 0
                      ?
                      (
                        employees.reduce(
                          (sum, emp) =>
                          sum +
                          (emp.attendancePercentage || 0),
                          0
                        ) /
                        employees.length
                      ).toFixed(1)
                      :
                      0
                    }%

                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Avg Performance
                  </h6>

                  <h1 className="text-primary">

                    {
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
                      0
                    }%

                  </h1>

                </div>

              </div>

            </div>

          </div>

          {/* Employee Table */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                High Risk Employees
              </h4>

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>Name</th>
                    <th>Department</th>
                    <th>Attendance</th>
                    <th>Performance</th>
                    <th>Risk Score</th>
                    <th>Status</th>

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
                          {emp.department}
                        </td>

                        <td>
                          {emp.attendancePercentage || 0}%
                        </td>

                        <td>
                          {emp.performanceScore || 0}%
                        </td>

                        <td>
                          {emp.attritionScore || 0}
                        </td>

                        <td>

                          <span
                            className=
                            "badge bg-danger"
                          >
                            HIGH RISK
                          </span>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          </div>

          {/* AI Recommendations */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                💡 AI Recommendations
              </h4>

              {
                employees.map(emp => (

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
                    needs manager attention.
                    Attendance and
                    performance are below
                    expected levels.

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

export default AttritionRisk;