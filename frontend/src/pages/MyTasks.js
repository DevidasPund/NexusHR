import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MyTasks() {

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {

    try {

      const username =
        localStorage.getItem("username");

      console.log("Username:", username);

      if (!username) {

        console.log("Username Missing");

        setLoading(false);
        return;
      }

      const response =
        await API.get(
          `/tasks/employee/${username}`
        );

      console.log(
        "Tasks:",
        response.data
      );

      setTasks(response.data);

    } catch (error) {

      console.error(
        "Task Load Error:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h3>Loading Tasks...</h3>
      </div>
    );
  }

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">
            📋 My Tasks
          </h2>

          <div className="card shadow border-0">

            <div className="card-body">

              <table className="table table-bordered table-hover">

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
                    tasks.length > 0 ?

                    tasks.map((task) => (

                      <tr key={task.id}>

                        <td>{task.id}</td>

                        <td>{task.taskName}</td>

                        <td>{task.projectName}</td>

                        <td>{task.dueDate}</td>

                        <td>

                          <span
                            className={
                              task.priority === "HIGH"
                                ? "badge bg-danger"
                                : task.priority === "MEDIUM"
                                ? "badge bg-warning"
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

                    ))

                    :

                    <tr>

                      <td
                        colSpan="6"
                        className="text-center"
                      >
                        No Tasks Assigned
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
  );
}

export default MyTasks;