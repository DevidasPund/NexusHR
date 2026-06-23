import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {

    try {

      const response = await API.get("/employees");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/employees/${id}`);

      loadEmployees();

    } catch (error) {

      console.error(error);
    }
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      employee.username?.toLowerCase().includes(search.toLowerCase()) ||
      employee.department?.toLowerCase().includes(search.toLowerCase())
  );

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
            className="shadow-lg mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px",
              color: "white",
              padding: "30px"
            }}
          >

            <div className="d-flex justify-content-between align-items-center">

              <div>

                <h1 className="fw-bold">
                  Employee Management 👨‍💼
                </h1>

                <p className="mb-0">
                  Manage Employees, Departments & Payroll
                </p>

              </div>

              <a
                href="/add-employee"
                className="btn btn-light btn-lg"
              >
                + Add Employee
              </a>

            </div>

          </div>

          {/* Statistics */}

          <div className="row mb-4">

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Total Employees</h6>

                  <h2 className="text-primary">
                    {employees.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Active Employees</h6>

                  <h2 className="text-success">

                    {
                      employees.filter(
                        e => e.status === "ACTIVE"
                      ).length
                    }

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Departments</h6>

                  <h2 className="text-warning">

                    {
                      [...new Set(
                        employees.map(
                          e => e.department
                        )
                      )].length
                    }

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Total Salary</h6>

                  <h2 className="text-danger">

                    ₹{
                      employees.reduce(
                        (total, emp) =>
                          total + (emp.salary || 0),
                        0
                      )
                    }

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="🔍 Search Employee..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* Employee Table */}

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "20px"
            }}
          >

            <div className="card-body">

              {loading ? (

                <h4 className="text-center">
                  Loading Employees...
                </h4>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-dark">

                      <tr>

                        <th>ID</th>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Actions</th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredEmployees.map((employee) => (

                        <tr key={employee.id}>

                          <td>
                            {employee.id}
                          </td>

                          <td>

                            <img
                              src={
                                employee.profileImage
                                  ? `http://localhost:8080/uploads/${employee.profileImage}`
                                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                              }
                              alt="profile"
                              width="55"
                              height="55"
                              style={{
                                borderRadius: "50%",
                                objectFit: "cover",
                                border:
                                  "3px solid #2563eb"
                              }}
                            />

                          </td>

                          <td>

                            <strong>

                              {employee.firstName}
                              {" "}
                              {employee.lastName}

                            </strong>

                          </td>

                          <td>
                            {employee.username}
                          </td>

                          <td>
                            {employee.department}
                          </td>

                          <td>
                            {employee.designation}
                          </td>

                          <td>
                            ₹{employee.salary}
                          </td>

                          <td>

                            <span
                              className={
                                employee.status === "ACTIVE"
                                  ? "badge bg-success p-2"
                                  : "badge bg-danger p-2"
                              }
                            >
                              {employee.status}
                            </span>

                          </td>

                          <td>

                            <a
                              href={`/edit-employee/${employee.id}`}
                              className="btn btn-warning btn-sm me-2"
                            >
                              ✏ Edit
                            </a>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteEmployee(employee.id)
                              }
                            >
                              🗑 Delete
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Employees;