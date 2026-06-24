import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
  useParams,
  useNavigate
} from "react-router-dom";

function EditEmployee() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [employee, setEmployee] =
    useState({

      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",
      role: "EMPLOYEE",
      status: "ACTIVE"

    });

  useEffect(() => {

    loadEmployee();

  }, []);

  const loadEmployee =
    async () => {

      try {

        const response =
          await API.get(
            `/employees/${id}`
          );

        setEmployee(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const handleChange =
    (e) => {

      setEmployee({

        ...employee,

        [e.target.name]:
          e.target.value

      });

    };

  const updateEmployee =
    async (e) => {

      e.preventDefault();

      try {

        setSaving(true);

        await API.put(
          `/employees/${id}`,
          employee
        );

        alert(
          "Employee Updated Successfully"
        );

        navigate(
          "/employees"
        );

      } catch (error) {

        console.error(error);

        alert(
          "Update Failed"
        );

      } finally {

        setSaving(false);

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
          Loading Employee...
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
                ✏️ Edit Employee
              </h2>

              <p className="mb-0">
                Update Employee Information
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
                  updateEmployee
                }
              >

                <div className="row">

                  <div className="col-md-6 mb-3">

                    <label>
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={
                        employee.firstName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={
                        employee.lastName
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={
                        employee.email
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>
                      Phone
                    </label>

                    <input
                      type="text"
                      name="phone"
                      className="form-control"
                      value={
                        employee.phone
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>
                      Department
                    </label>

                    <select
                      name="department"
                      className="form-control"
                      value={
                        employee.department
                      }
                      onChange={
                        handleChange
                      }
                    >

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

                  <div className="col-md-6 mb-3">

                    <label>
                      Designation
                    </label>

                    <input
                      type="text"
                      name="designation"
                      className="form-control"
                      value={
                        employee.designation
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-6 mb-3">

                    <label>
                      Salary
                    </label>

                    <input
                      type="number"
                      name="salary"
                      className="form-control"
                      value={
                        employee.salary
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-3 mb-3">

                    <label>
                      Role
                    </label>

                    <select
                      name="role"
                      className="form-control"
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

                  <div className="col-md-3 mb-3">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-control"
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

                </div>

                <div className="mt-4">

                  <button
                    type="submit"
                    className="btn btn-primary me-3"
                    disabled={saving}
                  >

                    {
                      saving
                        ? "Updating..."
                        : "💾 Update Employee"
                    }

                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      navigate(
                        "/employees"
                      )
                    }
                  >

                    Cancel

                  </button>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default EditEmployee;