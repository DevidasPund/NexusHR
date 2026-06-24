import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function NotificationManagement() {

  const [notifications,
    setNotifications] =
    useState([]);

  const [employees,
    setEmployees] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  const [search,
    setSearch] =
    useState("");

  const [title,
    setTitle] =
    useState("");

  const [message,
    setMessage] =
    useState("");

  const [receiver,
    setReceiver] =
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

  const loadNotifications =
    async () => {

      try {

        const response =
          await API.get(
            "/notifications"
          );

        setNotifications(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const loadEmployees =
    async () => {

      try {

        const response =
          await API.get(
            "/employees"
          );

        setEmployees(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

  const sendNotification =
    async () => {

      if (
        !title ||
        !message
      ) {

        alert(
          "Please Enter Title And Message"
        );

        return;

      }

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

        alert(
          "Failed To Send Notification"
        );

      }

    };

  const deleteNotification =
    async (id) => {

      if (
        !window.confirm(
          "Delete Notification?"
        )
      ) {
        return;
      }

      try {

        await API.delete(
          `/notifications/${id}`
        );

        loadNotifications();

      } catch (error) {

        console.error(error);

      }

    };

  const filteredNotifications =
    notifications.filter(
      (n) =>
        n.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        n.message
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        n.receiver
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

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
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius:
                "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                🔔 Notification Center
              </h2>

              <p className="mb-0">
                Employee Communication System
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Notifications
                  </h6>

                  <h2 className="text-primary">
                    {notifications.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Employees
                  </h6>

                  <h2 className="text-success">
                    {employees.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Date
                  </h6>

                  <h5>
                    {
                      new Date()
                      .toLocaleDateString()
                    }
                  </h5>

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

              <div className="row">

                <div className="col-md-6">

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Notification Title"
                    value={title}
                    onChange={(e) =>
                      setTitle(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-6">

                  <select
                    className="form-select mb-3"
                    value={receiver}
                    onChange={(e) =>
                      setReceiver(
                        e.target.value
                      )
                    }
                  >

                    <option value="ALL">
                      📢 All Employees
                    </option>

                    {
                      employees.map(
                        (emp) => (

                          <option
                            key={emp.id}
                            value={
                              emp.username
                            }
                          >

                            {
                              emp.firstName
                            }{" "}
                            {
                              emp.lastName
                            }

                          </option>

                        )
                      )
                    }

                  </select>

                </div>

              </div>

              <textarea
                rows="4"
                className="form-control mb-3"
                placeholder="Notification Message"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
              />

              <button
                className="btn btn-primary"
                onClick={
                  sendNotification
                }
              >
                Send Notification
              </button>

            </div>

          </div>

          {/* Search */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search Notification"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* History */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                📜 Notification History
              </h4>

              {

                loading

                ?

                <h5>
                  Loading...
                </h5>

                :

                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead className="table-dark">

                      <tr>

                        <th>ID</th>
                        <th>Title</th>
                        <th>Message</th>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Status</th>
                        <th>Action</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        filteredNotifications.length > 0

                        ?

                        filteredNotifications.map(
                          (n) => (

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

                                <span className="badge bg-success">

                                  {
                                    n.status ||
                                    "SENT"
                                  }

                                </span>

                              </td>

                              <td>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    deleteNotification(
                                      n.id
                                    )
                                  }
                                >
                                  Delete
                                </button>

                              </td>

                            </tr>

                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="7"
                            className="text-center"
                          >
                            No Notifications Found
                          </td>

                        </tr>

                      }

                    </tbody>

                  </table>

                </div>

              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default NotificationManagement;