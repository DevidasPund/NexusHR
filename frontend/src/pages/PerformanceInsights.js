import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Performance() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadPerformance();

    const interval = setInterval(() => {
      loadPerformance();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const loadPerformance = async () => {

    try {

      const response =
        await API.get("/performance");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filteredEmployees =
    employees.filter(emp =>
      `${emp.firstName || ""} ${emp.lastName || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const topPerformers =
    employees.filter(
      emp => (emp.rating || 0) >= 85
    );

  const avgPerformance =
    employees.length > 0
      ? (
          employees.reduce(
            (sum, emp) =>
              sum + (emp.rating || 0),
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
                "linear-gradient(135deg,#10b981,#059669)",
              borderRadius: "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                ⭐ Performance Dashboard
              </h2>

              <p>
                Employee Performance Analytics
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Total Employees</h6>

                  <h2 className="text-primary">
                    {employees.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Top Performers</h6>

                  <h2 className="text-success">
                    {topPerformers.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Average Rating</h6>

                  <h2 className="text-warning">
                    {avgPerformance}%
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="🔍 Search Employee..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* Top Performers */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <h4 className="mb-3">
                🏆 Top Performers
              </h4>

              {
                topPerformers.length > 0 ?

                topPerformers.slice(0, 5).map(emp => (

                  <div
                    key={emp.id}
                    className="alert alert-success"
                  >

                    <strong>
                      {emp.firstName} {emp.lastName}
                    </strong>

                    {" "}achieved

                    <strong>
                      {" "} {emp.rating}%
                    </strong>

                    {" "}performance score.

                  </div>

                ))

                :

                <p>
                  No Top Performers Found
                </p>
              }

            </div>

          </div>

          {/* Performance Table */}

          <div className="card border-0 shadow">

            <div className="card-body">

              <h4>
                Team Performance
              </h4>

              {

                loading ?

                <h5>
                  Loading...
                </h5>

                :

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-dark">

                      <tr>

                        <th>ID</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Rating</th>
                        <th>Performance</th>
                        <th>Status</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        filteredEmployees.length > 0 ?

                        filteredEmployees.map(emp => (

                          <tr key={emp.id}>

                            <td>
                              {emp.id}
                            </td>

                            <td>

                              <strong>
                                {emp.firstName} {emp.lastName}
                              </strong>

                            </td>

                            <td>
                              {emp.department}
                            </td>

                            <td>
                              {emp.rating}%
                            </td>

                            <td>

                              <div className="progress">

                                <div
                                  className={
                                    emp.rating >= 85
                                      ? "progress-bar bg-success"
                                      : emp.rating >= 60
                                      ? "progress-bar bg-warning"
                                      : "progress-bar bg-danger"
                                  }
                                  style={{
                                    width: `${emp.rating}%`
                                  }}
                                >

                                  {emp.rating}%

                                </div>

                              </div>

                            </td>

                            <td>

                              {

                                emp.rating >= 85 ?

                                <span className="badge bg-success">
                                  Excellent
                                </span>

                                :

                                emp.rating >= 60 ?

                                <span className="badge bg-warning">
                                  Good
                                </span>

                                :

                                <span className="badge bg-danger">
                                  Needs Improvement
                                </span>

                              }

                            </td>

                          </tr>

                        ))

                        :

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center"
                          >

                            No Records Found

                          </td>

                        </tr>

                      }

                    </tbody>

                  </table>

                </div>

              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Performance;