import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function NotificationManagement() {

  const [notifications, setNotifications] =
    useState([]);

  const [employees, setEmployees] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [receiver, setReceiver] =
    useState("ALL");

  useEffect(() => {

    loadNotifications();
    loadEmployees();

    const interval =
      setInterval(() => {

        loadNotifications();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadNotifications = async () => {

    try {

      const response =
        await API.get("/notifications");

      setNotifications(response.data);

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

  const sendNotification = async () => {

    try {

      await API.post(
        "/notifications",
        {
          title,
          message,
          sender: "ADMIN",
          receiver
        }
      );

      alert(
        "Notification Sent Successfully"
      );

      setTitle("");
      setMessage("");
      setReceiver("ALL");

      loadNotifications();

    } catch (error) {

      console.error(error);

    }

  };

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

          {/* Header */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius:"20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                🔔 Notification Center
              </h2>

              <p>
                Real-Time Employee
                Communication System
              </p>

            </div>

          </div>

          {/* Analytics */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Notifications
                  </h6>

                  <h1 className="text-primary">

                    {
                      notifications.length
                    }

                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Employees
                  </h6>

                  <h1 className="text-success">

                    {
                      employees.length
                    }

                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Today
                  </h6>

                  <h4>

                    {
                      new Date()
                      .toLocaleDateString()
                    }

                  </h4>

                </div>

              </div>

            </div>

          </div>

          {/* Send Notification */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                📢 Send Notification
              </h4>

              <hr />

              <input
                className="form-control mb-3"
                placeholder="Enter Title"
                value={title}
                onChange={(e)=>
                  setTitle(
                    e.target.value
                  )
                }
              />

              <textarea
                className="form-control mb-3"
                rows="4"
                placeholder="Enter Message"
                value={message}
                onChange={(e)=>
                  setMessage(
                    e.target.value
                  )
                }
              />

              <select
                className="form-select mb-3"
                value={receiver}
                onChange={(e)=>
                  setReceiver(
                    e.target.value
                  )
                }
              >

                <option value="ALL">

                  📢 All Employees

                </option>

                {
                  employees.map(emp => (

                    <option
                      key={emp.id}
                      value={
                        emp.username
                      }
                    >

                      {emp.firstName}
                      {" "}
                      {emp.lastName}

                    </option>

                  ))
                }

              </select>

              <button
                className=
                "btn btn-primary"
                onClick={
                  sendNotification
                }
              >

                Send Notification

              </button>

            </div>

          </div>

          {/* Notification History */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                📜 Notification History
              </h4>

              <table
                className=
                "table table-hover"
              >

                <thead
                  className=
                  "table-dark"
                >

                  <tr>

                    <th>ID</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    notifications.map(
                      n => (

                      <tr
                        key={n.id}
                      >

                        <td>
                          {n.id}
                        </td>

                        <td>
                          {n.title}
                        </td>

                        <td>
                          {n.message}
                        </td>

                        <td>
                          {n.sender}
                        </td>

                        <td>
                          {n.receiver}
                        </td>

                        <td>

                          <span
                            className=
                            "badge bg-success"
                          >

                            {
                              n.status
                            }

                          </span>

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

    </div>

  );
}

export default NotificationManagement;