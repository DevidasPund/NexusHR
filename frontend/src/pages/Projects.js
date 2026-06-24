import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Projects() {

  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const [project, setProject] = useState({
    projectName: "",
    clientName: "",
    managerName: "",
    startDate: "",
    endDate: "",
    status: "PLANNING"
  });

  useEffect(() => {

    loadProjects();

    const interval = setInterval(() => {
      loadProjects();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const loadProjects = async () => {

    try {

      const response =
        await API.get("/projects");

      setProjects(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const saveProject = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/projects",
        project
      );

      alert("Project Created Successfully");

      setProject({
        projectName: "",
        clientName: "",
        managerName: "",
        startDate: "",
        endDate: "",
        status: "PLANNING"
      });

      loadProjects();

    } catch (error) {

      console.error(error);

      alert("Failed To Create Project");

    }

  };

  const deleteProject = async (id) => {

    if (!window.confirm("Delete Project?")) {
      return;
    }

    try {

      await API.delete(
        `/projects/${id}`
      );

      loadProjects();

    } catch (error) {

      console.error(error);

    }

  };

  const filteredProjects =
    projects.filter(project =>
      project.projectName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

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
                📁 Project Management
              </h2>

              <p>
                Manage Company Projects & Teams
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Projects</h6>

                  <h2 className="text-primary">
                    {projects.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Planning</h6>

                  <h2 className="text-warning">

                    {
                      projects.filter(
                        p => p.status === "PLANNING"
                      ).length
                    }

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>In Progress</h6>

                  <h2 className="text-info">

                    {
                      projects.filter(
                        p => p.status === "IN_PROGRESS"
                      ).length
                    }

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Completed</h6>

                  <h2 className="text-success">

                    {
                      projects.filter(
                        p => p.status === "COMPLETED"
                      ).length
                    }

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Create Project */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>Create New Project</h4>

              <form onSubmit={saveProject}>

                <div className="row g-3">

                  <div className="col-md-4">

                    <input
                      className="form-control"
                      placeholder="Project Name"
                      value={project.projectName}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          projectName: e.target.value
                        })
                      }
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      className="form-control"
                      placeholder="Client Name"
                      value={project.clientName}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          clientName: e.target.value
                        })
                      }
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      className="form-control"
                      placeholder="Manager Name"
                      value={project.managerName}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          managerName: e.target.value
                        })
                      }
                    />

                  </div>

                  <div className="col-md-3">

                    <input
                      type="date"
                      className="form-control"
                      value={project.startDate}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          startDate: e.target.value
                        })
                      }
                    />

                  </div>

                  <div className="col-md-3">

                    <input
                      type="date"
                      className="form-control"
                      value={project.endDate}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          endDate: e.target.value
                        })
                      }
                    />

                  </div>

                  <div className="col-md-3">

                    <select
                      className="form-select"
                      value={project.status}
                      onChange={(e) =>
                        setProject({
                          ...project,
                          status: e.target.value
                        })
                      }
                    >

                      <option value="PLANNING">
                        Planning
                      </option>

                      <option value="IN_PROGRESS">
                        In Progress
                      </option>

                      <option value="COMPLETED">
                        Completed
                      </option>

                    </select>

                  </div>

                  <div className="col-md-3">

                    <button
                      className="btn btn-success w-100"
                    >
                      Create Project
                    </button>

                  </div>

                </div>

              </form>

            </div>

          </div>

          {/* Search */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <input
                className="form-control"
                placeholder="🔍 Search Project"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* Projects Table */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>Projects List</h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead className="table-dark">

                    <tr>

                      <th>ID</th>
                      <th>Project</th>
                      <th>Client</th>
                      <th>Manager</th>
                      <th>Start</th>
                      <th>End</th>
                      <th>Status</th>
                      <th>Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {

                      filteredProjects.length > 0 ?

                      filteredProjects.map(project => (

                        <tr key={project.id}>

                          <td>{project.id}</td>

                          <td>{project.projectName}</td>

                          <td>{project.clientName}</td>

                          <td>{project.managerName}</td>

                          <td>{project.startDate}</td>

                          <td>{project.endDate}</td>

                          <td>

                            <span
                              className={
                                project.status === "COMPLETED"
                                  ? "badge bg-success"
                                  : project.status === "IN_PROGRESS"
                                  ? "badge bg-primary"
                                  : "badge bg-warning text-dark"
                              }
                            >
                              {project.status}
                            </span>

                          </td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteProject(project.id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))

                      :

                      <tr>

                        <td
                          colSpan="8"
                          className="text-center"
                        >
                          No Projects Found
                        </td>

                      </tr>

                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Projects;