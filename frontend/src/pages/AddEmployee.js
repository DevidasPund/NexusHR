import React, { useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AddEmployee() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState(null);

  const [employee, setEmployee] =
    useState({

      employeeCode:
        "EMP" +
        Date.now()
          .toString()
          .slice(-5),

      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",

      role: "EMPLOYEE",

      status: "ACTIVE"
    });

  const handleChange = (e) => {

    setEmployee({

      ...employee,

      [e.target.name]:
        e.target.value

    });

  };

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    setImage(file);

    if (file) {

      setPreview(
        URL.createObjectURL(file)
      );

    }
  };

  const saveEmployee =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        let imageName = "";

        if (image) {

          const formData =
            new FormData();

          formData.append(
            "file",
            image
          );

          const uploadResponse =
            await API.post(
              "/upload",
              formData,
              {
                headers: {
                  "Content-Type":
                    "multipart/form-data"
                }
              }
            );

          imageName =
            uploadResponse.data;
        }

        await API.post(
          "/employees",
          {
            ...employee,
            profileImage:
              imageName
          }
        );

        alert(
          `${employee.firstName} added successfully`
        );

        navigate(
          "/employees"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to add employee"
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

          {/* Header */}

          <div
            className="shadow-lg p-4 mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px",
              color: "white"
            }}
          >

            <h1>
              👨‍💼 Add Employee
            </h1>

            <p className="mb-0">
              Register new employee
              in NexusHR
            </p>

          </div>

          {/* Form */}

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "20px"
            }}
          >

            <div className="card-body p-4">

              <form
                onSubmit={
                  saveEmployee
                }
              >

                <div className="text-center mb-4">

                  <img
                    src={
                      preview ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="profile"
                    width="150"
                    height="150"
                    className="rounded-circle shadow"
                    style={{
                      objectFit:
                        "cover",
                      border:
                        "5px solid #2563eb"
                    }}
                  />

                </div>

                <div className="row">

                  <div className="col-md-6">
                    <label>
                      Employee Code
                    </label>
                    <input
                      className="form-control mb-3"
                      value={
                        employee.employeeCode
                      }
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      className="form-control mb-3"
                      value={
                        employee.username
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control mb-3"
                      value={
                        employee.firstName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control mb-3"
                      value={
                        employee.lastName
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control mb-3"
                      value={
                        employee.password
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control mb-3"
                      value={
                        employee.email
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      className="form-control mb-3"
                      value={
                        employee.phone
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      Department
                    </label>

                    <select
                      name="department"
                      className="form-control mb-3"
                      value={
                        employee.department
                      }
                      onChange={
                        handleChange
                      }
                      required
                    >
                      <option value="">
                        Select Department
                      </option>

                      <option value="IT">
                        IT
                      </option>

                      <option value="HR">
                        HR
                      </option>

                      <option value="Finance">
                        Finance
                      </option>

                      <option value="Marketing">
                        Marketing
                      </option>

                      <option value="Sales">
                        Sales
                      </option>

                    </select>

                  </div>

                  <div className="col-md-6">
                    <label>
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      className="form-control mb-3"
                      value={
                        employee.designation
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      Salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      className="form-control mb-3"
                      value={
                        employee.salary
                      }
                      onChange={
                        handleChange
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <label>
                      Role
                    </label>

                    <select
                      name="role"
                      className="form-control mb-3"
                      value={
                        employee.role
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="ADMIN">
                        ADMIN
                      </option>

                      <option value="MANAGER">
                        MANAGER
                      </option>

                      <option value="EMPLOYEE">
                        EMPLOYEE
                      </option>

                    </select>

                  </div>

                  <div className="col-md-6">
                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-control mb-3"
                      value={
                        employee.status
                      }
                      onChange={
                        handleChange
                      }
                    >
                      <option value="ACTIVE">
                        ACTIVE
                      </option>

                      <option value="INACTIVE">
                        INACTIVE
                      </option>

                    </select>

                  </div>

                  <div className="col-md-12">
                    <label>
                      Profile Photo
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      className="form-control mb-4"
                      onChange={
                        handleImage
                      }
                    />
                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg"
                  disabled={loading}
                >
                  {
                    loading
                    ?
                    "Saving..."
                    :
                    "💾 Save Employee"
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

export default AddEmployee;