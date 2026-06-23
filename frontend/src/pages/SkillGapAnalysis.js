import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function SkillGapAnalysis() {

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

      setEmployees(response.data);

    } catch(error) {

      console.error(error);

    }

  };

  const skillGapEmployees =
    employees.filter(
      emp =>
      emp.missingSkills &&
      emp.missingSkills !== ""
    );

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

          {/* Hero Banner */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
              "linear-gradient(135deg,#f59e0b,#f97316)",
              borderRadius:"20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                🧠 Skill Gap Analysis
              </h2>

              <p>
                AI identifies missing skills
                and recommends training
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Employees With Gaps
                  </h6>

                  <h1 className="text-danger">
                    {skillGapEmployees.length}
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

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

            <div className="col-md-4">

              <div className="card shadow border-0">

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

          {/* Skill Gap Table */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                Employee Skill Analysis
              </h4>

              <table className="table table-hover">

                <thead className="table-dark">

                  <tr>

                    <th>Name</th>
                    <th>Department</th>
                    <th>Current Skills</th>
                    <th>Missing Skills</th>
                    <th>Training</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    skillGapEmployees.map(emp => (

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
                          {emp.skills}
                        </td>

                        <td>

                          <span className="badge bg-danger">

                            {emp.missingSkills}

                          </span>

                        </td>

                        <td>

                          <span className="badge bg-primary">

                            Recommended Training

                          </span>

                        </td>

                      </tr>

                    ))
                  }

                </tbody>

              </table>

            </div>

          </div>

          {/* AI Suggestions */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <h4>
                🤖 AI Training Suggestions
              </h4>

              {
                skillGapEmployees.map(emp => (

                  <div
                    key={emp.id}
                    className="alert alert-info"
                  >

                    <strong>

                      {emp.firstName}
                      {" "}
                      {emp.lastName}

                    </strong>

                    {" "}
                    should complete training in

                    {" "}
                    {emp.missingSkills}

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

export default SkillGapAnalysis;