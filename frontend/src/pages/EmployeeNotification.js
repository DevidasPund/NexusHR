import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeNotification() {

  const [notifications, setNotifications] =
    useState([]);

  const [reply, setReply] =
    useState({});

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
            `/notifications/employee/${username}`
          );

        setNotifications(
          response.data
        );

      } catch(error){

        console.error(error);

      }
  };

  const sendReply =
    async(id) => {

      try {

        await API.post(
          "/notifications/reply",
          {
            notificationId:id,
            sender:username,
            message:reply[id]
          }
        );

        alert(
          "Reply Sent"
        );

        setReply({
          ...reply,
          [id]:""
        });

      } catch(error){

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
                🔔 Employee Notifications
              </h2>

              <p>
                Real-Time Messages
                From Admin & Manager
              </p>

            </div>

          </div>

          {
            notifications.length > 0 ?

            notifications.map(
              (n) => (

              <div
                key={n.id}
                className=
                "card shadow border-0 mb-3"
              >

                <div className="card-body">

                  <div className=
                  "d-flex justify-content-between">

                    <h5>
                      {n.title}
                    </h5>

                    <span
                     className=
                     "badge bg-primary"
                    >
                      {n.sender}
                    </span>

                  </div>

                  <hr />

                  <p>
                    {n.message}
                  </p>

                  <small
                    className=
                    "text-muted"
                  >
                    Receiver :
                    {n.receiver}
                  </small>

                  <div className="mt-3">

                    <textarea
                      className=
                      "form-control"
                      rows="2"
                      placeholder=
                      "Reply to Admin/Manager"
                      value={
                        reply[n.id] || ""
                      }
                      onChange={(e)=>
                        setReply({
                          ...reply,
                          [n.id]:
                          e.target.value
                        })
                      }
                    />

                    <button
                      className=
                      "btn btn-primary mt-2"
                      onClick={() =>
                        sendReply(
                          n.id
                        )
                      }
                    >

                      Send Reply

                    </button>

                  </div>

                </div>

              </div>

            ))

            :

            <div
              className=
              "alert alert-info"
            >

              No Notifications Found

            </div>
          }

        </div>

      </div>

    </div>

  );
}

export default EmployeeNotification;