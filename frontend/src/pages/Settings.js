import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {

  const username =
    localStorage.getItem("username");

  const [settings, setSettings] =
    useState({
      darkMode: false,
      emailNotifications: true,
      smsNotifications: false,
      taskAlerts: true,
      leaveAlerts: true,
      attendanceAlerts: true
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadSettings();

  }, []);

  const loadSettings =
    async () => {

      try {

        const response =
          await API.get(
            `/settings/${username}`
          );

        setSettings(
          response.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  const saveSettings =
    async () => {

      try {

        await API.put(
          `/settings/${username}`,
          settings
        );

        alert(
          "Settings Saved Successfully"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Unable To Save Settings"
        );
      }
    };

  const handleToggle =
    (field) => {

      setSettings({

        ...settings,

        [field]:
          !settings[field]

      });
    };

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h3>
          Loading Settings...
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
              borderRadius:
                "20px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)"
            }}
          >

            <div className="card-body text-white">

              <h2>
                ⚙ Settings Center
              </h2>

              <p className="mb-0">
                Manage your NexusHR
                account preferences
              </p>

            </div>

          </div>

          {/* Account Card */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                👤 Account Information
              </h4>

              <hr />

              <h6>
                Username:
                {" "}
                {username}
              </h6>

              <h6>
                Role:
                {" "}
                {
                  localStorage.getItem(
                    "role"
                  )
                }
              </h6>

            </div>

          </div>

          {/* Preferences */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                🔔 Notification Preferences
              </h4>

              <hr />

              <div className="row">

                <div className="col-md-6">

                  <div className="form-check form-switch mb-4">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        settings.emailNotifications
                      }
                      onChange={() =>
                        handleToggle(
                          "emailNotifications"
                        )
                      }
                    />

                    <label
                      className="form-check-label"
                    >
                      📧 Email Notifications
                    </label>

                  </div>

                  <div className="form-check form-switch mb-4">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        settings.smsNotifications
                      }
                      onChange={() =>
                        handleToggle(
                          "smsNotifications"
                        )
                      }
                    />

                    <label>
                      📱 SMS Notifications
                    </label>

                  </div>

                  <div className="form-check form-switch mb-4">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        settings.taskAlerts
                      }
                      onChange={() =>
                        handleToggle(
                          "taskAlerts"
                        )
                      }
                    />

                    <label>
                      📋 Task Alerts
                    </label>

                  </div>

                </div>

                <div className="col-md-6">

                  <div className="form-check form-switch mb-4">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        settings.leaveAlerts
                      }
                      onChange={() =>
                        handleToggle(
                          "leaveAlerts"
                        )
                      }
                    />

                    <label>
                      🌴 Leave Alerts
                    </label>

                  </div>

                  <div className="form-check form-switch mb-4">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        settings.attendanceAlerts
                      }
                      onChange={() =>
                        handleToggle(
                          "attendanceAlerts"
                        )
                      }
                    />

                    <label>
                      ⏰ Attendance Reminders
                    </label>

                  </div>

                  <div className="form-check form-switch mb-4">

                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        settings.darkMode
                      }
                      onChange={() =>
                        handleToggle(
                          "darkMode"
                        )
                      }
                    />

                    <label>
                      🌙 Dark Mode
                    </label>

                  </div>

                </div>

              </div>

              <button
                className="btn btn-primary btn-lg"
                onClick={
                  saveSettings
                }
              >

                Save Settings

              </button>

            </div>

          </div>

          {/* Quick Actions */}

          <div className="row mt-4">

            <div className="col-md-4">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h5>
                    🔒 Security
                  </h5>

                  <a
                    href="/change-password"
                    className="btn btn-danger"
                  >
                    Change Password
                  </a>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h5>
                    👤 Profile
                  </h5>

                  <a
                    href="/profile"
                    className="btn btn-success"
                  >
                    View Profile
                  </a>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h5>
                    🔔 Notifications
                  </h5>

                  <a
                    href="/notifications"
                    className="btn btn-warning"
                  >
                    Open Notifications
                  </a>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Settings;