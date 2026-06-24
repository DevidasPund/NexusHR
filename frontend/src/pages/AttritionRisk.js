import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AttritionRisk() {

  const [employees, setEmployees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadData();

    const interval =
      setInterval(() => {
        loadData();
      }, 10000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadData = async () => {

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
      emp =>
        emp.attritionRisk === "HIGH"
    );

  const mediumRisk =
    employees.filter(
      emp =>
        emp.attritionRisk === "MEDIUM"
    );

  const lowRisk =
    employees.filter(
      emp =>
        emp.attritionRisk === "LOW"
    );

  const filteredEmployees =
    highRisk.filter(emp =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const avgAttendance =
    highRisk.length > 0
      ?
      (
        highRisk.reduce(
          (sum, emp) =>
            sum +
            (emp.attendancePercentage || 0),
          0
        ) / highRisk.length
      ).toFixed(1)
      :
      0;

  const avgPerformance =
    highRisk.length > 0
      ?
      (
        highRisk.reduce(
          (sum, emp) =>
            sum +
            (emp.performanceScore || 0),
          0
        ) / highRisk.length
      ).toFixed(1)
      :
      0;

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: "280px",
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
                "linear-gradient(135deg,#ef4444,#dc2626)",
              borderRadius: "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                ⚠ Attrition Risk Analysis
              </h2>

              <p className="mb-0">
                AI Prediction of Employees
                Likely to Leave
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
                    High Risk
                  </h6>

                  <h1>
                    {highRisk.length}
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
                    Medium Risk
                  </h6>

                  <h1>
                    {mediumRisk.length}
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
                    Low Risk
                  </h6>

                  <h1>
                    {lowRisk.length}
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
                    Avg Performance
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

          {/* High Risk Employees */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                High Risk Employees
              </h4>

              <div className="table-responsive">

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
                      filteredEmployees.length > 0
                        ?

                        filteredEmployees.map(
                          emp => (

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

                                <span className="badge bg-danger">

                                  HIGH RISK

                                </span>

                              </td>

                            </tr>

                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center"
                          >
                            No High Risk Employees
                          </td>

                        </tr>

                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

          {/* Analytics */}

          <div className="row g-4 mt-2">

            <div className="col-md-6">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h5>
                    Average Attendance
                  </h5>

                  <h2 className="text-warning">
                    {avgAttendance}%
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h5>
                    Average Performance
                  </h5>

                  <h2 className="text-primary">
                    {avgPerformance}%
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* AI Recommendations */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                💡 AI Recommendations
              </h4>

              {
                highRisk.map(emp => (

                  <div
                    key={emp.id}
                    className="alert alert-warning"
                  >

                    <strong>

                      {emp.firstName}
                      {" "}
                      {emp.lastName}

                    </strong>

                    {" "}
                    requires immediate manager review.
                    Low attendance and performance
                    indicate a high probability of attrition.

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