import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Team() {

  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [team, setTeam] = useState({
    teamName: "",
    teamLead: "",
    projectName: "",
    members: []
  });

  useEffect(() => {

    loadData();

    const interval = setInterval(() => {
      loadTeams();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadData = async () => {

    await Promise.all([
      loadTeams(),
      loadEmployees(),
      loadProjects()
    ]);

    setLoading(false);

  };

  const loadTeams = async () => {

    try {

      const response =
        await API.get("/teams");

      setTeams(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadEmployees = async () => {

    try {

      const response =
        await API.get("/employees");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadProjects = async () => {

    try {

      const response =
        await API.get("/projects");

      setProjects(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const createTeam = async (e) => {

    e.preventDefault();

    if (
      !team.teamName ||
      !team.teamLead ||
      !team.projectName
    ) {

      alert(
        "Please fill all required fields"
      );

      return;

    }

    try {

      setSaving(true);

      await API.post(
        "/teams",
        team
      );

      alert(
        "Team Created Successfully"
      );

      setTeam({
        teamName: "",
        teamLead: "",
        projectName: "",
        members: []
      });

      loadTeams();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Create Team"
      );

    } finally {

      setSaving(false);

    }

  };

  const deleteTeam = async (id) => {

    if (
      !window.confirm(
        "Delete Team?"
      )
    ) return;

    try {

      await API.delete(
        `/teams/${id}`
      );

      loadTeams();

    } catch (error) {

      console.error(error);

    }

  };

  const memberSelect = (
    employeeName
  ) => {

    if (
      team.members.includes(
        employeeName
      )
    ) {

      setTeam({

        ...team,

        members:
          team.members.filter(
            member =>
              member !== employeeName
          )

      });

    } else {

      setTeam({

        ...team,

        members: [
          ...team.members,
          employeeName
        ]

      });

    }

  };

  const filteredTeams =
    teams.filter(
      (t) =>

        t.teamName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        t.teamLead
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        t.projectName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalTeams =
    teams.length;

  const totalEmployees =
    employees.length;

  const totalProjects =
    projects.length;

  const totalMembers =
    teams.reduce(
      (sum, t) =>
        sum +
        (t.members?.length || 0),
      0
    );

  if (loading) {

    return (

      <div className="text-center mt-5">

        <h3>
          Loading Teams...
        </h3>

      </div>

    );

  }

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background:
            "#f4f7fe",
          minHeight:
            "100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          {/* Header */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius:
                "20px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)"
            }}
          >

            <div className="card-body text-white">

              <h2>
                👥 Team Management
              </h2>

              <p>
                Create Teams,
                Assign Members &
                Manage Projects
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Teams
                  </h6>

                  <h2 className="text-primary">
                    {totalTeams}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Employees
                  </h6>

                  <h2 className="text-success">
                    {totalEmployees}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Projects
                  </h6>

                  <h2 className="text-warning">
                    {totalProjects}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Team Members
                  </h6>

                  <h2 className="text-danger">
                    {totalMembers}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Create Team */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                Create Team
              </h4>

              <hr />

              <form
                onSubmit={
                  createTeam
                }
              >

                <input
                  className="form-control mb-3"
                  placeholder="Team Name"
                  value={team.teamName}
                  onChange={(e) =>
                    setTeam({
                      ...team,
                      teamName:
                        e.target.value
                    })
                  }
                />

                <select
                  className="form-select mb-3"
                  value={team.teamLead}
                  onChange={(e) =>
                    setTeam({
                      ...team,
                      teamLead:
                        e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Team Lead
                  </option>

                  {employees.map(
                    (emp) => (

                      <option
                        key={emp.id}
                        value={`${emp.firstName} ${emp.lastName}`}
                      >

                        {emp.firstName}
                        {" "}
                        {emp.lastName}

                      </option>

                    )
                  )}

                </select>

                <select
                  className="form-select mb-3"
                  value={team.projectName}
                  onChange={(e) =>
                    setTeam({
                      ...team,
                      projectName:
                        e.target.value
                    })
                  }
                >

                  <option value="">
                    Select Project
                  </option>

                  {projects.map(
                    (project) => (

                      <option
                        key={project.id}
                        value={project.projectName}
                      >

                        {project.projectName}

                      </option>

                    )
                  )}

                </select>

                <div className="card p-3 mb-3">

                  <h5>
                    Team Members
                  </h5>

                  <div className="row">

                    {employees.map(
                      (emp) => {

                        const employeeName =
                          `${emp.firstName} ${emp.lastName}`;

                        return (

                          <div
                            className="col-md-4"
                            key={emp.id}
                          >

                            <div className="form-check">

                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                  team.members.includes(
                                    employeeName
                                  )
                                }
                                onChange={() =>
                                  memberSelect(
                                    employeeName
                                  )
                                }
                              />

                              <label className="form-check-label">

                                {employeeName}

                              </label>

                            </div>

                          </div>

                        );

                      }
                    )}

                  </div>

                </div>

                <button
                  className="btn btn-primary"
                  disabled={saving}
                >

                  {saving
                    ? "Creating..."
                    : "Create Team"}

                </button>

              </form>

            </div>

          </div>

          {/* Search */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <input
                className="form-control"
                placeholder="Search Team, Lead or Project..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Team List */}

          <div className="row">

            {filteredTeams.map(
              (team) => (

                <div
                  className="col-md-6 mb-4"
                  key={team.id}
                >

                  <div className="card shadow border-0 h-100">

                    <div className="card-body">

                      <h4>
                        {team.teamName}
                      </h4>

                      <p>

                        👨‍💼 Lead:
                        <strong>
                          {" "}
                          {team.teamLead}
                        </strong>

                      </p>

                      <p>

                        📁 Project:
                        <strong>
                          {" "}
                          {team.projectName}
                        </strong>

                      </p>

                      <span className="badge bg-primary mb-3">

                        {team.members?.length || 0}
                        {" "}Members

                      </span>

                      <hr />

                      {team.members?.map(
                        (
                          member,
                          index
                        ) => (

                          <span
                            key={index}
                            className="badge bg-secondary me-2 mb-2"
                          >

                            {member}

                          </span>

                        )
                      )}

                      <div className="mt-3">

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteTeam(
                              team.id
                            )
                          }
                        >

                          Delete Team

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Team;