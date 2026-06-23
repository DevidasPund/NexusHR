import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";

function ChangePassword() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const changePassword =
    async (e) => {

      e.preventDefault();

      if (
        formData.newPassword !==
        formData.confirmPassword
      ) {

        alert(
          "New Password and Confirm Password do not match"
        );

        return;
      }

      try {

        const employeeId =
          localStorage.getItem(
            "employeeId"
          );

        await API.put(
          `/auth/change-password/${employeeId}`,
          {
            oldPassword:
              formData.oldPassword,

            newPassword:
              formData.newPassword
          }
        );

        alert(
          "Password Changed Successfully"
        );

        navigate(
          "/employee/dashboard"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed To Change Password"
        );

      }

    };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow border-0">

            <div className="card-header bg-primary text-white">

              <h3 className="mb-0">
                🔐 Change Password
              </h3>

            </div>

            <div className="card-body">

              <form
                onSubmit={
                  changePassword
                }
              >

                <div className="mb-3">

                  <label>
                    Current Password
                  </label>

                  <input
                    type="password"
                    name="oldPassword"
                    className="form-control"
                    value={
                      formData.oldPassword
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
                    type="password"
                    name="newPassword"
                    className="form-control"
                    value={
                      formData.newPassword
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <div className="mb-3">

                  <label>
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    value={
                      formData.confirmPassword
                    }
                    onChange={
                      handleChange
                    }
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Update Password
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