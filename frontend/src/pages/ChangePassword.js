import React, { useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ChangePassword() {

  const [loading, setLoading] =
    useState(false);

  const [showOldPassword, setShowOldPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [data, setData] =
    useState({

      oldPassword: "",
      newPassword: "",
      confirmPassword: ""

    });

  const username =
    localStorage.getItem("username");

  const handleChange =
    (e) => {

      setData({

        ...data,

        [e.target.name]:
          e.target.value

      });

    };

  const changePassword =
    async (e) => {

      e.preventDefault();

      if (
        data.newPassword !==
        data.confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }

      if (
        data.newPassword.length < 6
      ) {

        alert(
          "Password must be at least 6 characters"
        );

        return;
      }

      try {

        setLoading(true);

        const response =
          await API.post(
            "/auth/change-password",
            {

              username,

              oldPassword:
                data.oldPassword,

              newPassword:
                data.newPassword

            }
          );

        alert(
          response.data
        );

        setData({

          oldPassword: "",
          newPassword: "",
          confirmPassword: ""

        });

      } catch (error) {

        console.error(error);

        alert(
          error?.response?.data ||
          "Password change failed"
        );

      } finally {

        setLoading(false);

      }

    };

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
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                🔒 Change Password
              </h2>

              <p className="mb-0">
                Update your account password securely
              </p>

            </div>

          </div>

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "20px"
            }}
          >

            <div className="card-body p-4">

              <form
                onSubmit={
                  changePassword
                }
              >

                <div className="mb-3">

                  <label>
                    Username
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    value={username || ""}
                    disabled
                  />

                </div>

                <div className="mb-3">

                  <label>
                    Current Password
                  </label>

                  <input
                    type={
                      showOldPassword
                        ? "text"
                        : "password"
                    }
                    name="oldPassword"
                    className="form-control"
                    value={
                      data.oldPassword
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>
                    New Password
                  </label>

                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    name="newPassword"
                    className="form-control"
                    value={
                      data.newPassword
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <div className="mb-4">

                  <label>
                    Confirm Password
                  </label>

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    className="form-control"
                    value={
                      data.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={loading}
                >

                  {
                    loading
                      ? "Updating..."
                      : "🔒 Update Password"
                  }

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ChangePassword;