import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Team() {

const [teams, setTeams] = useState([]);
const [employees, setEmployees] = useState([]);
const [projects, setProjects] = useState([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(false);

const [team, setTeam] = useState({
teamName: "",
teamLead: "",
projectName: "",
members: []
});

useEffect(() => {
loadTeams();
loadEmployees();
loadProjects();
}, []);

const loadTeams = async () => {
try {
const response = await API.get("/teams");
setTeams(response.data);
} catch (error) {
console.error(error);
}
};

const loadEmployees = async () => {
try {
const response = await API.get("/employees");
setEmployees(response.data);
} catch (error) {
console.error(error);
}
};

const loadProjects = async () => {
try {
const response = await API.get("/projects");
setProjects(response.data);
} catch (error) {
console.error(error);
}
};

const createTeam = async (e) => {


e.preventDefault();
setLoading(true);

try {

  await API.post("/teams", team);

  alert("Team Created Successfully");

  setTeam({
    teamName: "",
    teamLead: "",
    projectName: "",
    members: []
  });

  loadTeams();

} catch (error) {

  console.error(error);

} finally {

  setLoading(false);
}


};

const deleteTeam = async (id) => {


try {

  await API.delete(`/teams/${id}`);
  loadTeams();

} catch (error) {

  console.error(error);
}


};

const memberSelect = (employeeName) => {


if (team.members.includes(employeeName)) {

  setTeam({
    ...team,
    members: team.members.filter(
      member => member !== employeeName
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

const filteredTeams = teams.filter(
t =>
t.teamName
?.toLowerCase()
.includes(search.toLowerCase())
);

return (


<div className="d-flex">

  <Sidebar />

  <div className="flex-grow-1">

    <Navbar />

    <div className="container-fluid p-4">

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h6>Total Teams</h6>
              <h2>{teams.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h6>Employees</h6>
              <h2>{employees.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning shadow">
            <div className="card-body">
              <h6>Projects</h6>
              <h2>{projects.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body">
              <h6>Members</h6>
              <h2>
                {teams.reduce(
                  (sum, t) =>
                    sum +
                    (t.members?.length || 0),
                  0
                )}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow p-4 mb-4">

        <h3>👥 Create Team</h3>

        <form onSubmit={createTeam}>

          <input
            className="form-control mb-3"
            placeholder="Team Name"
            value={team.teamName}
            onChange={(e) =>
              setTeam({
                ...team,
                teamName: e.target.value
              })
            }
          />

          <select
            className="form-control mb-3"
            value={team.teamLead}
            onChange={(e) =>
              setTeam({
                ...team,
                teamLead: e.target.value
              })
            }
          >

            <option value="">
              Select Team Lead
            </option>

            {employees.map(emp => (

              <option
                key={emp.id}
                value={
                  emp.firstName +
                  " " +
                  emp.lastName
                }
              >
                {emp.firstName} {emp.lastName}
              </option>

            ))}

          </select>

          <select
            className="form-control mb-3"
            value={team.projectName}
            onChange={(e) =>
              setTeam({
                ...team,
                projectName: e.target.value
              })
            }
          >

            <option value="">
              Select Project
            </option>

            {projects.map(project => (

              <option
                key={project.id}
                value={project.projectName}
              >
                {project.projectName}
              </option>

            ))}

          </select>

          <div className="card p-3 mb-3">

            <h5>Team Members</h5>

            {employees.map(emp => {

              const employeeName =
                emp.firstName +
                " " +
                emp.lastName;

              return (

                <div
                  className="form-check"
                  key={emp.id}
                >

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

              );
            })}

          </div>

          <button
            className="btn btn-primary"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Team"}
          </button>

        </form>

      </div>

      <input
        className="form-control mb-4"
        placeholder="Search Team..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <div className="row">

        {filteredTeams.map(team => (

          <div
            className="col-md-6 mb-4"
            key={team.id}
          >

            <div className="card shadow border-0">

              <div className="card-body">

                <h4>{team.teamName}</h4>

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

                <span className="badge bg-primary">
                  {team.members?.length}
                  {" "}Members
                </span>

                <hr />

                {team.members?.map(
                  (member, index) => (

                    <span
                      key={index}
                      className="badge bg-secondary me-2 mb-2"
                    >
                      {member}
                    </span>

                  )
                )}

                <br />

                <button
                  className="btn btn-danger btn-sm mt-3"
                  onClick={() =>
                    deleteTeam(team.id)
                  }
                >
                  Delete Team
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>

</div>


);
}

export default Team;
