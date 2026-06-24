import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeNotification() {

  const [notifications,
    setNotifications] =
    useState([]);

  const [reply,
    setReply] =
    useState({});

  const [loading,
    setLoading] =
    useState(true);

  const username =
    localStorage.getItem(
      "username"
    );

  useEffect(() => {

    loadNotifications();

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
    `/notifications/receiver/${username}`
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

  const sendReply =
    async (id) => {

      if (
        !reply[id] ||
        reply[id].trim() === ""
      ) {

        alert(
          "Please Enter Reply"
        );

        return;

      }

      try {

        await API.post(
          "/notifications/reply",
          {
            notificationId: id,
            sender: username,
            message: reply[id]
          }
        );

        alert(
          "Reply Sent Successfully"
        );

        setReply({

          ...reply,

          [id]: ""

        });

      } catch (error) {

        console.error(error);

        alert(
          "Failed To Send Reply"
        );

      }

    };

  if (loading) {

    return (

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >

        <h3>
          Loading Notifications...
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
                🔔 Employee Notifications
              </h2>

              <p className="mb-0">
                Real-Time Messages From
                Admin & Managers
              </p>

            </div>

          </div>

          {/* Summary Cards */}

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
                    Username
                  </h6>

                  <h2 className="text-success">

                    {username}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Status
                  </h6>

                  <h2>

                    🟢 Active

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Notifications */}

          {

            notifications.length > 0

              ?

              notifications.map(
                (notification) => (

                  <div
                    key={
                      notification.id
                    }
                    className="card shadow border-0 mb-4"
                    style={{
                      borderRadius: "15px"
                    }}
                  >

                    <div className="card-body">

                      <div className="d-flex justify-content-between align-items-center">

                        <h5 className="fw-bold">

                          {
                            notification.title
                          }

                        </h5>

                        <span className="badge bg-primary">

                          {
                            notification.sender
                          }

                        </span>

                      </div>

                      <hr />

                      <p>

                        {
                          notification.message
                        }

                      </p>

                      <div className="mb-3">

                        <small className="text-muted">

                          Receiver :
                          {" "}
                          {
                            notification.receiver
                          }

                        </small>

                      </div>

                      <div className="mt-3">

                        <label className="form-label">

                          Reply Message

                        </label>

                        <textarea
                          className="form-control"
                          rows="3"
                          placeholder="Type Your Reply..."
                          value={
                            reply[
                              notification.id
                            ] || ""
                          }
                          onChange={(e) =>
                            setReply({

                              ...reply,

                              [notification.id]:
                                e.target.value

                            })
                          }
                        />

                        <button
                          className="btn btn-primary mt-3"
                          disabled={
                            !reply[
                              notification.id
                            ]
                          }
                          onClick={() =>
                            sendReply(
                              notification.id
                            )
                          }
                        >

                          📤 Send Reply

                        </button>

                      </div>

                    </div>

                  </div>

                )
              )

              :

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h4>
                    📭 No Notifications Found
                  </h4>

                  <p className="text-muted">

                    You currently have
                    no messages from
                    Admin or Manager.

                  </p>

                </div>

              </div>

          }

        </div>

      </div>

    </div>

  );

}

export default EmployeeNotification;