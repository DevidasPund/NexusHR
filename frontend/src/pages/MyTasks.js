import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MyTasks() {

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadTasks();

    const interval =
      setInterval(() => {

        loadTasks();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadTasks = async () => {

    try {

      const username =
        localStorage.getItem(
          "username"
        );

      const response =
        await API.get(
          `/tasks/employee/${username}`
        );

      setTasks(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filteredTasks =
    tasks.filter(
      task =>
        task.taskName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        task.projectName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const completedTasks =
    tasks.filter(
      t => t.status === "COMPLETED"
    ).length;

  const pendingTasks =
    tasks.filter(
      t => t.status === "PENDING"
    ).length;

  const inProgressTasks =
    tasks.filter(
      t =>
        t.status ===
        "IN_PROGRESS"
    ).length;

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
                📋 My Tasks
              </h2>

              <p>
                Manage Assigned Tasks
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

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

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    In Progress
                  </h6>

                  <h2 className="text-primary">
                    {inProgressTasks}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

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

          </div>

          {/* Search */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search Task"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Task Table */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                Assigned Tasks
              </h4>

              {loading ? (

                <h5>
                  Loading...
                </h5>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead className="table-dark">

                      <tr>

                        <th>ID</th>
                        <th>Task</th>
                        <th>Project</th>
                        <th>Due Date</th>
                        <th>Priority</th>
                        <th>Status</th>

                      </tr>

                    </thead>

                    <tbody>

                      {
                        filteredTasks.length > 0
                        ?

                        filteredTasks.map(
                          task => (

                            <tr key={task.id}>

                              <td>
                                {task.id}
                              </td>

                              <td>
                                {task.taskName}
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

                                <span
                                  className={
                                    task.status === "COMPLETED"
                                      ? "badge bg-success"
                                      : task.status === "IN_PROGRESS"
                                      ? "badge bg-primary"
                                      : "badge bg-secondary"
                                  }
                                >
                                  {task.status}
                                </span>

                              </td>

                            </tr>

                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center"
                          >
                            No Tasks Found
                          </td>

                        </tr>

                      }

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MyTasks;