import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [activeProjects, setActiveProjects] = useState(0);

  const [project, setProject] = useState({
    projectName: "",
    clientName: "",
    status: "ACTIVE",
    startDate: "",
    endDate: ""
  });

  const loadProjects = async () => {

    try {

      const response =
        await API.get("/project/all");

      console.log(response.data);

      if (Array.isArray(response.data)) {

        setProjects(response.data);

      } else {

        setProjects([]);
      }

      const active =
        await API.get(
          "/project/active-count"
        );

      setActiveProjects(
        active.data || 0
      );

    } catch (error) {

      console.error(error);

      setProjects([]);
    }
  };

  useEffect(() => {

    loadProjects();

    const interval =
      setInterval(
        loadProjects,
        5000
      );

    return () =>
      clearInterval(interval);

  }, []);

  const createProject =
    async () => {

      try {

        await API.post(
          "/project/create",
          project
        );

        setProject({
          projectName: "",
          clientName: "",
          status: "ACTIVE",
          startDate: "",
          endDate: ""
        });

        loadProjects();

      } catch (error) {

        console.error(error);
      }
    };

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="container-fluid p-4">

        <h2>
          Project Management
        </h2>

        <div className="row mt-4">

          <div className="col-md-4">

            <div className="card shadow text-center p-4">

              <h5>
                Active Projects
              </h5>

              <h1 className="text-success">
                {activeProjects}
              </h1>

            </div>

          </div>

          <div className="col-md-4">

            <div className="card shadow text-center p-4">

              <h5>
                Total Projects
              </h5>

              <h1 className="text-primary">
                {projects.length}
              </h1>

            </div>

          </div>

        </div>

        <div className="card shadow p-4 mt-4">

          <h4>
            Create Project
          </h4>

          <div className="row">

            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Project Name"
                value={project.projectName}
                onChange={(e) =>
                  setProject({
                    ...project,
                    projectName:
                      e.target.value
                  })
                }
              />

            </div>

            <div className="col-md-3">

              <input
                className="form-control"
                placeholder="Client Name"
                value={project.clientName}
                onChange={(e) =>
                  setProject({
                    ...project,
                    clientName:
                      e.target.value
                  })
                }
              />

            </div>

            <div className="col-md-2">

              <select
                className="form-control"
                value={project.status}
                onChange={(e) =>
                  setProject({
                    ...project,
                    status:
                      e.target.value
                  })
                }
              >

                <option>
                  ACTIVE
                </option>

                <option>
                  COMPLETED
                </option>

              </select>

            </div>

            <div className="col-md-2">

              <input
                type="date"
                className="form-control"
                value={project.startDate}
                onChange={(e) =>
                  setProject({
                    ...project,
                    startDate:
                      e.target.value
                  })
                }
              />

            </div>

            <div className="col-md-2">

              <input
                type="date"
                className="form-control"
                value={project.endDate}
                onChange={(e) =>
                  setProject({
                    ...project,
                    endDate:
                      e.target.value
                  })
                }
              />

            </div>

          </div>

          <button
            className="btn btn-primary mt-3"
            onClick={createProject}
          >
            Create Project
          </button>

        </div>

        <div className="card shadow mt-4">

          <div className="card-body">

            <h4>
              All Projects
            </h4>

            <table className="table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Project</th>

                  <th>Client</th>

                  <th>Status</th>

                  <th>Start Date</th>

                  <th>End Date</th>

                </tr>

              </thead>

              <tbody>

                {Array.isArray(projects) &&
                  projects.map((p) => (

                  <tr key={p.id}>

                    <td>
                      {p.id}
                    </td>

                    <td>
                      {p.projectName}
                    </td>

                    <td>
                      {p.clientName}
                    </td>

                    <td>

                      <span
                        className={
                          p.status ===
                          "ACTIVE"
                            ? "badge bg-success"
                            : "badge bg-secondary"
                        }
                      >
                        {p.status}
                      </span>

                    </td>

                    <td>
                      {p.startDate}
                    </td>

                    <td>
                      {p.endDate}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Projects;