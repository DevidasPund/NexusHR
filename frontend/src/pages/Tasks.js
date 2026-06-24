import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [task, setTask] = useState({
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

    const interval = setInterval(() => {
      loadTasks();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadTasks = async () => {

    try {

      const response =
        await API.get("/tasks");

      setTasks(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

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

  const assignTask = async () => {

    if (
      !task.taskName ||
      !task.employeeName ||
      !task.projectName ||
      !task.dueDate
    ) {

      alert("Please fill all fields");
      return;

    }

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

      console.error(error);

    }

  };

  const deleteTask = async (id) => {

    if (
      !window.confirm(
        "Delete this task?"
      )
    ) {
      return;
    }

    try {

      await API.delete(
        `/tasks/${id}`
      );

      loadTasks();

    } catch (error) {

      console.error(error);

    }

  };

  const updateStatus = async (
    id,
    status
  ) => {

    try {

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

    } catch (error) {

      console.error(error);

    }

  };

  const filteredTasks =
    tasks.filter(
      (t) =>
        t.taskName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        t.employeeName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        t.projectName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalTasks =
    tasks.length;

  const pendingTasks =
    tasks.filter(
      t =>
        t.status === "PENDING"
    ).length;

  const progressTasks =
    tasks.filter(
      t =>
        t.status === "IN_PROGRESS"
    ).length;

  const completedTasks =
    tasks.filter(
      t =>
        t.status === "COMPLETED"
    ).length;

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h3>
          Loading Tasks...
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
          background: "#f4f7fe",
          minHeight: "100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)"
            }}
          >

            <div className="card-body text-white">

              <h2>
                📋 Task Management
              </h2>

              <p>
                Assign, Monitor &
                Track Employee Tasks
              </p>

            </div>

          </div>

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Tasks
                  </h6>

                  <h2 className="text-primary">
                    {totalTasks}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Pending
                  </h6>

                  <h2 className="text-warning">
                    {pendingTasks}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    In Progress
                  </h6>

                  <h2 className="text-info">
                    {progressTasks}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Completed
                  </h6>

                  <h2 className="text-success">
                    {completedTasks}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                Assign New Task
              </h4>

              <hr />

              <div className="row">

                <div className="col-md-6 mb-3">

                  <input
                    className="form-control"
                    placeholder="Task Name"
                    value={task.taskName}
                    onChange={(e) =>
                      setTask({
                        ...task,
                        taskName:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="col-md-6 mb-3">

                  <select
                    className="form-select"
                    value={task.employeeName}
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

                    {employees.map(
                      emp => (
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

                </div>

                <div className="col-md-4 mb-3">

                  <select
                    className="form-select"
                    value={task.projectName}
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

                    {projects.map(
                      project => (
                        <option
                          key={project.id}
                          value={project.projectName}
                        >
                          {project.projectName}
                        </option>
                      )
                    )}

                  </select>

                </div>

                <div className="col-md-4 mb-3">

                  <input
                    type="date"
                    className="form-control"
                    value={task.dueDate}
                    onChange={(e) =>
                      setTask({
                        ...task,
                        dueDate:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="col-md-4 mb-3">

                  <select
                    className="form-select"
                    value={task.priority}
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

                </div>

              </div>

              <button
                className="btn btn-primary"
                onClick={assignTask}
              >
                Assign Task
              </button>

            </div>

          </div>

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between mb-3">

                <h4>
                  Task List
                </h4>

                <input
                  className="form-control w-25"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="table-responsive">

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

                    {filteredTasks.map(
                      task => (

                        <tr
                          key={task.id}
                        >

                          <td>
                            {task.id}
                          </td>

                          <td>
                            {task.taskName}
                          </td>

                          <td>
                            {task.employeeName}
                          </td>

                          <td>
                            {task.projectName}
                          </td>

                          <td>
                            {task.dueDate}
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
                              className="form-select"
                              value={task.status}
                              onChange={(e) =>
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
                    )}

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

export default Tasks;