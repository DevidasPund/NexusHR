import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function SkillGapAnalysis() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadEmployees();

    const interval = setInterval(() => {
      loadEmployees();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const loadEmployees = async () => {

    try {

      const response =
        await API.get("/employees");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const skillGapEmployees =
    employees.filter(
      emp =>
        emp.missingSkills &&
        emp.missingSkills.trim() !== ""
    );

  const filteredEmployees =
    skillGapEmployees.filter(emp =>
      `${emp.firstName} ${emp.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const totalDepartments =
    new Set(
      skillGapEmployees.map(
        emp => emp.department
      )
    ).size;

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
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#f59e0b,#ea580c)"
            }}
          >

            <div className="card-body text-white">

              <h2 className="fw-bold">
                🧠 Skill Gap Analysis
              </h2>

              <p className="mb-0">
                AI Powered Employee Skill Assessment &
                Training Recommendations
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>
                    Employees With Skill Gaps
                  </h6>

                  <h1 className="text-danger">
                    {skillGapEmployees.length}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>
                    Training Required
                  </h6>

                  <h1 className="text-warning">
                    {skillGapEmployees.length}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>
                    Departments Affected
                  </h6>

                  <h1 className="text-primary">
                    {totalDepartments}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>
                    AI Recommendations
                  </h6>

                  <h1 className="text-success">
                    {skillGapEmployees.length}
                  </h1>

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

          {/* Skill Gap Table */}

          <div className="card border-0 shadow-lg">

            <div className="card-body">

              <h4 className="mb-3">
                Employee Skill Analysis
              </h4>

              {loading ? (

                <div className="text-center">

                  <h5>
                    Loading Data...
                  </h5>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-dark">

                      <tr>

                        <th>Name</th>
                        <th>Department</th>
                        <th>Current Skills</th>
                        <th>Missing Skills</th>
                        <th>Training Recommendation</th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredEmployees.length > 0 ? (

                        filteredEmployees.map(emp => (

                          <tr key={emp.id}>

                            <td>

                              <strong>
                                {emp.firstName} {emp.lastName}
                              </strong>

                            </td>

                            <td>
                              {emp.department}
                            </td>

                            <td>

                              <span className="badge bg-success">

                                {emp.skills || "N/A"}

                              </span>

                            </td>

                            <td>

                              <span className="badge bg-danger">

                                {emp.missingSkills}

                              </span>

                            </td>

                            <td>

                              <span className="badge bg-primary">

                                Training Required

                              </span>

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="5"
                            className="text-center"
                          >

                            No Skill Gaps Found

                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

          {/* AI Suggestions */}

          <div className="card border-0 shadow mt-4">

            <div className="card-body">

              <h4 className="mb-3">
                🤖 AI Training Recommendations
              </h4>

              {skillGapEmployees.length > 0 ? (

                skillGapEmployees.map(emp => (

                  <div
                    key={emp.id}
                    className="alert alert-info"
                  >

                    <strong>
                      {emp.firstName} {emp.lastName}
                    </strong>

                    {" "}should complete training in{" "}

                    <strong>
                      {emp.missingSkills}
                    </strong>

                    {" "}to improve productivity and performance.

                  </div>

                ))

              ) : (

                <div className="alert alert-success">

                  🎉 No skill gaps detected across employees.

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default SkillGapAnalysis;