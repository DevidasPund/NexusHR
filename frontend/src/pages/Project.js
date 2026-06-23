import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Projects() {

  const [projects,
         setProjects] =
         useState([]);

  const [project,
         setProject] =
         useState({

    projectName: "",
    clientName: "",
    managerName: "",
    startDate: "",
    endDate: "",
    status: "PLANNING"

  });

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects =
  async () => {

    try {

      const response =
      await API.get(
        "/projects"
      );

      setProjects(
        response.data
      );

    } catch(error){

      console.error(error);
    }
  };

  const saveProject =
  async(e)=>{

    e.preventDefault();

    try{

      await API.post(
        "/projects",
        project
      );

      alert(
        "Project Created"
      );

      loadProjects();

      setProject({

        projectName:"",
        clientName:"",
        managerName:"",
        startDate:"",
        endDate:"",
        status:"PLANNING"

      });

    }catch(error){

      console.error(error);
    }
  };

  return(

    <div className="d-flex">

      <Sidebar/>

      <div className="flex-grow-1">

        <Navbar/>

        <div className="container-fluid p-4">

          <div className="card shadow p-4">

            <h2>
              Project Management
            </h2>

            <form
              onSubmit={
                saveProject
              }
            >

              <input
                className=
                "form-control mb-3"
                placeholder=
                "Project Name"
                value={
                  project.projectName
                }
                onChange={(e)=>
                  setProject({

                    ...project,

                    projectName:
                    e.target.value

                  })
                }
              />

              <input
                className=
                "form-control mb-3"
                placeholder=
                "Client Name"
                value={
                  project.clientName
                }
                onChange={(e)=>
                  setProject({

                    ...project,

                    clientName:
                    e.target.value

                  })
                }
              />

              <input
                className=
                "form-control mb-3"
                placeholder=
                "Manager Name"
                value={
                  project.managerName
                }
                onChange={(e)=>
                  setProject({

                    ...project,

                    managerName:
                    e.target.value

                  })
                }
              />

              <input
                type="date"
                className=
                "form-control mb-3"
                value={
                  project.startDate
                }
                onChange={(e)=>
                  setProject({

                    ...project,

                    startDate:
                    e.target.value

                  })
                }
              />

              <input
                type="date"
                className=
                "form-control mb-3"
                value={
                  project.endDate
                }
                onChange={(e)=>
                  setProject({

                    ...project,

                    endDate:
                    e.target.value

                  })
                }
              />

              <select
                className=
                "form-control mb-3"
                value={
                  project.status
                }
                onChange={(e)=>
                  setProject({

                    ...project,

                    status:
                    e.target.value

                  })
                }
              >

                <option>
                  PLANNING
                </option>

                <option>
                  IN_PROGRESS
                </option>

                <option>
                  COMPLETED
                </option>

              </select>

              <button
                className=
                "btn btn-success"
              >
                Create Project
              </button>

            </form>

          </div>

          <div
            className=
            "card shadow mt-4 p-4"
          >

            <h3>
              Projects List
            </h3>

            <table
              className=
              "table table-bordered"
            >

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Manager</th>
                  <th>Status</th>

                </tr>

              </thead>

              <tbody>

                {
                  projects.map(
                  (p)=>(
                  <tr
                    key={p.id}
                  >

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
                      {p.managerName}
                    </td>

                    <td>
                      {p.status}
                    </td>

                  </tr>
                ))
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Projects;