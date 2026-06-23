import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Tasks() {

  const [tasks, setTasks] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [projects, setProjects] =
    useState([]);
const [search, setSearch] =
useState("");
  const [task, setTask] =
    useState({
      taskName: "",
      employeeName: "",
      projectName: "",
      dueDate: "",
      priority: "HIGH",
      status: "PENDING"
    });

  useEffect(() => {

    loadTasks();
    loadEmployees();
    loadProjects();

  }, []);

  const loadTasks = async () => {

    try {

      const response =
        await API.get("/tasks");

      setTasks(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };
const totalTasks =
tasks.length;

const pendingTasks =
tasks.filter(
 t => t.status === "PENDING"
).length;

const progressTasks =
tasks.filter(
 t => t.status === "IN_PROGRESS"
).length;

const completedTasks =
tasks.filter(
 t => t.status === "COMPLETED"
).length;
  const loadEmployees = async () => {

    try {

      const response =
        await API.get("/employees");

      setEmployees(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  const loadProjects = async () => {

    try {

      const response =
        await API.get("/projects");

      setProjects(
        response.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  const assignTask =
    async () => {

      try {

        await API.post(
          "/tasks",
          task
        );

        alert(
          "Task Assigned Successfully"
        );

        setTask({
          taskName: "",
          employeeName: "",
          projectName: "",
          dueDate: "",
          priority: "HIGH",
          status: "PENDING"
        });

        loadTasks();

      } catch (error) {

        console.log(error);

      }
    };
const filteredTasks =
tasks.filter(
 (task) =>
 task.taskName
 ?.toLowerCase()
 .includes(
  search.toLowerCase()
 )
 ||
 task.employeeName
 ?.toLowerCase()
 .includes(
  search.toLowerCase()
 )
);
  const deleteTask =
    async (id) => {

      if (
        !window.confirm(
          "Delete Task?"
        )
      ) return;

      await API.delete(
        `/tasks/${id}`
      );

      loadTasks();
    };

  const updateStatus =
    async (
      id,
      status
    ) => {

      await API.put(
        `/tasks/${id}/status`,
        null,
        {
          params: {
            status
          }
        }
      );

      loadTasks();
    };

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">
<div className="row mb-4">

 <div className="col-md-3">
  <div className="card bg-primary text-white shadow border-0">
   <div className="card-body text-center">
    <h6>Total Tasks</h6>
    <h2>{totalTasks}</h2>
   </div>
  </div>
 </div>

 <div className="col-md-3">
  <div className="card bg-warning shadow border-0">
   <div className="card-body text-center">
    <h6>Pending</h6>
    <h2>{pendingTasks}</h2>
   </div>
  </div>
 </div>

 <div className="col-md-3">
  <div className="card bg-info text-white shadow border-0">
   <div className="card-body text-center">
    <h6>In Progress</h6>
    <h2>{progressTasks}</h2>
   </div>
  </div>
 </div>

 <div className="col-md-3">
  <div className="card bg-success text-white shadow border-0">
   <div className="card-body text-center">
    <h6>Completed</h6>
    <h2>{completedTasks}</h2>
   </div>
  </div>
 </div>

</div>
          <div className="card shadow mb-4">

            <div className="card-body">

              <h2>
                Task Management
              </h2>

              <input
                className="form-control mb-3"
                placeholder="Task Name"
                value={
                  task.taskName
                }
                onChange={(e) =>
                  setTask({
                    ...task,
                    taskName:
                      e.target.value
                  })
                }
              />
<input
 className="form-control mb-3"
 placeholder="Search Task or Employee..."
 value={search}
 onChange={(e)=>
  setSearch(
   e.target.value
  )
 }
/>
              <select
                className="form-control mb-3"
                value={
                  task.employeeName
                }
                onChange={(e) =>
                  setTask({
                    ...task,
                    employeeName:
                      e.target.value
                  })
                }
              >

                <option value="">
                  Select Employee
                </option>

                {
                  employees.map(
                    (emp) => (
                      <option
                        key={emp.id}
                        value={
                          emp.firstName +
                          " " +
                          emp.lastName
                        }
                      >
                        {
                          emp.firstName
                        }{" "}
                        {
                          emp.lastName
                        }
                        {" - "}
                        {
                          emp.department
                        }
                      </option>
                    )
                  )
                }

              </select>

              <select
                className="form-control mb-3"
                value={
                  task.projectName
                }
                onChange={(e) =>
                  setTask({
                    ...task,
                    projectName:
                      e.target.value
                  })
                }
              >

                <option value="">
                  Select Project
                </option>

                {
                  projects.map(
                    (project) => (
                      <option
                        key={
                          project.id
                        }
                        value={
                          project.projectName
                        }
                      >
                        {
                          project.projectName
                        }
                      </option>
                    )
                  )
                }

              </select>

              <input
                type="date"
                className="form-control mb-3"
                value={
                  task.dueDate
                }
                onChange={(e) =>
                  setTask({
                    ...task,
                    dueDate:
                      e.target.value
                  })
                }
              />

              <select
                className="form-control mb-3"
                value={
                  task.priority
                }
                onChange={(e) =>
                  setTask({
                    ...task,
                    priority:
                      e.target.value
                  })
                }
              >

                <option>
                  HIGH
                </option>

                <option>
                  MEDIUM
                </option>

                <option>
                  LOW
                </option>

              </select>

              <button
                className="btn btn-success"
                onClick={
                  assignTask
                }
              >
                Assign Task
              </button>

            </div>

          </div>

          <div className="card shadow">

            <div className="card-body">

              <h2>
                Task List
              </h2>

              <table className="table table-hover align-middle">

             <thead className="table-dark">

                  <tr>

                    <th>ID</th>
                    <th>Task</th>
                    <th>Employee</th>
                    <th>Project</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    tasks.map(
                      (task) => (

                        <tr
                          key={
                            task.id
                          }
                        >

                          <td>
                            {task.id}
                          </td>

                          <td>
                            {
                              task.taskName
                            }
                          </td>

                          <td>
                            {
                              task.employeeName
                            }
                          </td>

                          <td>
                            {
                              task.projectName
                            }
                          </td>

                          <td>
                            {
                              task.dueDate
                            }
                          </td>

                        <td>

 <span
  className={
   task.priority === "HIGH"
   ? "badge bg-danger"
   : task.priority === "MEDIUM"
   ? "badge bg-warning text-dark"
   : "badge bg-success"
  }
 >

  {task.priority}

 </span>

</td>

                          <td>

                            <select
                              value={
                                task.status
                              }
                              onChange={
                                (
                                  e
                                ) =>
                                  updateStatus(
                                    task.id,
                                    e.target.value
                                  )
                              }
                            >

                              <option>
                                PENDING
                              </option>

                              <option>
                                IN_PROGRESS
                              </option>

                              <option>
                                COMPLETED
                              </option>

                            </select>

                          </td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteTask(
                                  task.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      )
                    )
                  }

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Tasks;