import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {

  const username =
    localStorage.getItem("username");

  const role =
    localStorage.getItem("role");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [settings, setSettings] =
    useState({
      darkMode: false,
      emailNotifications: true,
      smsNotifications: false,
      taskAlerts: true,
      leaveAlerts: true,
      attendanceAlerts: true,
      language: "English",
      theme: "Blue",
      autoLogout: false
    });

  useEffect(() => {

    loadSettings();

    const interval =
      setInterval(() => {

        loadSettings();

      }, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadSettings =
    async () => {

      try {

        const response =
          await API.get(
            `/settings/${username}`
          );

        if (response.data) {

          setSettings({
            ...settings,
            ...response.data
          });

        }

      } catch (error) {

        console.log(
          "Settings Load Error",
          error
        );

      } finally {

        setLoading(false);

      }

    };

  const saveSettings =
    async () => {

      try {

        setSaving(true);

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

      } finally {

        setSaving(false);

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

  const handleChange =
    (e) => {

      setSettings({

        ...settings,

        [e.target.name]:
          e.target.value

      });

    };

  if (loading) {

    return (

      <div className="d-flex justify-content-center align-items-center vh-100">

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
                Manage Account Preferences,
                Notifications & Security
              </p>

            </div>

          </div>

          {/* Account Info */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                👤 Account Information
              </h4>

              <hr />

              <div className="row">

                <div className="col-md-6">

                  <p>
                    <strong>
                      Username :
                    </strong>
                    {" "}
                    {username}
                  </p>

                </div>

                <div className="col-md-6">

                  <p>
                    <strong>
                      Role :
                    </strong>
                    {" "}
                    {role}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Notification Settings */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                🔔 Notification Settings
              </h4>

              <hr />

              <div className="row">

                <div className="col-md-6">

                  <div className="form-check form-switch mb-3">

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

                    <label>
                      📧 Email Notifications
                    </label>

                  </div>

                  <div className="form-check form-switch mb-3">

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

                  <div className="form-check form-switch mb-3">

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

                  <div className="form-check form-switch mb-3">

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

                  <div className="form-check form-switch mb-3">

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
                      ⏰ Attendance Alerts
                    </label>

                  </div>

                  <div className="form-check form-switch mb-3">

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

            </div>

          </div>

          {/* Preferences */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                🎨 Preferences
              </h4>

              <hr />

              <div className="row">

                <div className="col-md-6">

                  <label className="mb-2">
                    Language
                  </label>

                  <select
                    name="language"
                    className="form-select"
                    value={
                      settings.language
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option>
                      English
                    </option>

                    <option>
                      Hindi
                    </option>

                    <option>
                      Marathi
                    </option>

                  </select>

                </div>

                <div className="col-md-6">

                  <label className="mb-2">
                    Theme
                  </label>

                  <select
                    name="theme"
                    className="form-select"
                    value={
                      settings.theme
                    }
                    onChange={
                      handleChange
                    }
                  >

                    <option>
                      Blue
                    </option>

                    <option>
                      Purple
                    </option>

                    <option>
                      Green
                    </option>

                    <option>
                      Dark
                    </option>

                  </select>

                </div>

              </div>

              <div className="form-check form-switch mt-4">

                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={
                    settings.autoLogout
                  }
                  onChange={() =>
                    handleToggle(
                      "autoLogout"
                    )
                  }
                />

                <label>
                  🔒 Auto Logout
                </label>

              </div>

            </div>

          </div>

          {/* Save */}

          <div className="text-center mb-4">

            <button
              className="btn btn-primary btn-lg px-5"
              onClick={
                saveSettings
              }
              disabled={saving}
            >

              {
                saving
                ?
                "Saving..."
                :
                "Save Settings"
              }

            </button>

          </div>

          {/* Quick Actions */}

          <div className="row">

            <div className="col-md-4">

              <div className="card shadow border-0">

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

              <div className="card shadow border-0">

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

              <div className="card shadow border-0">

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