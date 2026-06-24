import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ChangePassword() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const getPasswordStrength = () => {

    const password = formData.newPassword;

    if (password.length < 6)
      return {
        text: "Weak",
        color: "danger"
      };

    if (
      password.length >= 6 &&
      password.length < 10
    )
      return {
        text: "Medium",
        color: "warning"
      };

    return {
      text: "Strong",
      color: "success"
    };

  };

  const changePassword = async (e) => {

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

      setLoading(true);

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

      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

      navigate(
        "/employee-dashboard"
      );

    } catch (error) {

      console.error(error);

      alert(
        error?.response?.data ||
        "Failed To Change Password"
      );

    } finally {

      setLoading(false);

    }

  };

  const strength =
    getPasswordStrength();

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

        <div className="container py-5">

          <div className="row justify-content-center">

            <div className="col-lg-6">

              <div className="card border-0 shadow-lg">

                <div
                  className="card-header text-white"
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#7c3aed)"
                  }}
                >

                  <h3 className="mb-0">
                    🔐 Change Password
                  </h3>

                </div>

                <div className="card-body p-4">

                  <form
                    onSubmit={
                      changePassword
                    }
                  >

                    {/* Current Password */}

                    <div className="mb-3">

                      <label className="form-label fw-bold">
                        Current Password
                      </label>

                      <div className="input-group">

                        <input
                          type={
                            showOld
                              ? "text"
                              : "password"
                          }
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

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setShowOld(
                              !showOld
                            )
                          }
                        >
                          {showOld
                            ? "🙈"
                            : "👁"}
                        </button>

                      </div>

                    </div>

                    {/* New Password */}

                    <div className="mb-3">

                      <label className="form-label fw-bold">
                        New Password
                      </label>

                      <div className="input-group">

                        <input
                          type={
                            showNew
                              ? "text"
                              : "password"
                          }
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

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setShowNew(
                              !showNew
                            )
                          }
                        >
                          {showNew
                            ? "🙈"
                            : "👁"}
                        </button>

                      </div>

                      {formData.newPassword && (

                        <small
                          className={`text-${strength.color}`}
                        >

                          Password Strength:
                          {" "}
                          {strength.text}

                        </small>

                      )}

                    </div>

                    {/* Confirm Password */}

                    <div className="mb-4">

                      <label className="form-label fw-bold">
                        Confirm Password
                      </label>

                      <div className="input-group">

                        <input
                          type={
                            showConfirm
                              ? "text"
                              : "password"
                          }
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

                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            setShowConfirm(
                              !showConfirm
                            )
                          }
                        >
                          {showConfirm
                            ? "🙈"
                            : "👁"}
                        </button>

                      </div>

                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={
                        loading
                      }
                    >

                      {loading
                        ? "Updating..."
                        : "Update Password"}

                    </button>

                  </form>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ChangePassword;