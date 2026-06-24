import React, {
useEffect,
useState
} from "react";

import API from "../services/ApiService";

function Navbar() {

const [notificationCount,
setNotificationCount] =
useState(0);

const [username,
setUsername] =
useState("");

useEffect(() => {


const storedUsername =
  localStorage.getItem(
    "username"
  );

setUsername(
  storedUsername || ""
);

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

    const username =
      localStorage.getItem(
        "username"
      );

    if (!username) {
      return;
    }

    const response =
      await API.get(
        `/notifications/employee/${username}`
      );

    setNotificationCount(
      response.data.length
    );

  } catch (error) {

    console.error(
      "Notification Error",
      error
    );

  }

};


const logout = () => {


localStorage.clear();

window.location.href = "/";


};

return (


<nav
  className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4"
  style={{
    height: "70px"
  }}
>

  <div className="container-fluid">

    <h4
      className="fw-bold text-primary mb-0"
    >
      NexusHR
    </h4>

    <div className="d-flex align-items-center">

      <div
        className="position-relative me-4"
        style={{
          cursor: "pointer"
        }}
      >

        <span
          style={{
            fontSize: "28px"
          }}
        >
          🔔
        </span>

        {
          notificationCount > 0 && (

            <span
              className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-pill"
            >

              {notificationCount}

            </span>

          )
        }

      </div>

      <div className="text-end me-3">

        <div
          className="fw-bold"
        >
          {username}
        </div>

        <small
          className="text-muted"
        >
          Logged In
        </small>

      </div>

      <button
        className="btn btn-danger btn-sm"
        onClick={logout}
      >
        Logout
      </button>

    </div>

  </div>

</nav>


);

}

export default Navbar;
