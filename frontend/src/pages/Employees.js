import React, {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Employees() {

  const [employees, setEmployees] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadEmployees();

    const interval =
      setInterval(() => {

        loadEmployees();

      }, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadEmployees =
    async () => {

      try {

        const response =
          await API.get("/employees");

        setEmployees(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const deleteEmployee =
    async (id) => {

      if (
        !window.confirm(
          "Delete Employee?"
        )
      ) {
        return;
      }

      try {

        await API.delete(
          `/employees/${id}`
        );

        loadEmployees();

      } catch (error) {

        console.error(error);

      }

    };

  const filteredEmployees =
    employees.filter(
      (employee) =>

        employee.firstName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        employee.lastName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        employee.username
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        employee.department
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalSalary =
    employees.reduce(
      (sum, emp) =>
        sum +
        (emp.salary || 0),
      0
    );

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          marginLeft: "280px",
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

            <div className="card-body text-white d-flex justify-content-between align-items-center">

              <div>

                <h2>
                  👨‍💼 Employee Management
                </h2>

                <p className="mb-0">
                  Manage Employees &
                  Organization Workforce
                </p>

              </div>

              <Link
                to="/add-employee"
                className="btn btn-light"
              >
                + Add Employee
              </Link>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Employees
                  </h6>

                  <h2 className="text-primary">

                    {employees.length}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Active Employees
                  </h6>

                  <h2 className="text-success">

                    {
                      employees.filter(
                        e =>
                          e.status ===
                          "ACTIVE"
                      ).length
                    }

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Salary
                  </h6>

                  <h2 className="text-danger">

                    ₹{totalSalary}

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="Search Employee..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Employee Table */}

          <div className="card shadow border-0">

            <div className="card-body">

              {

                loading ?

                <div className="text-center">

                  <h4>
                    Loading...
                  </h4>

                </div>

                :

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

                      {

                        filteredEmployees.length > 0

                        ?

                        filteredEmployees.map(
                          (employee) => (

                            <tr
                              key={
                                employee.id
                              }
                            >

                              <td>
                                {employee.id}
                              </td>

                              <td>

                                <img
                                  src={
                                    employee.profileImage

                                    ?

                                    `https://nexushr-production-612e.up.railway.app/uploads/${employee.profileImage}`

                                    :

                                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                  }
                                  alt="profile"
                                  width="50"
                                  height="50"
                                  className="rounded-circle"
                                />

                              </td>

                              <td>

                                {
                                  employee.firstName
                                }
                                {" "}
                                {
                                  employee.lastName
                                }

                              </td>

                              <td>
                                {
                                  employee.username
                                }
                              </td>

                              <td>
                                {
                                  employee.department
                                }
                              </td>

                              <td>
                                {
                                  employee.designation
                                }
                              </td>

                              <td>
                                ₹
                                {
                                  employee.salary
                                }
                              </td>
<td>

  <span
    className={
      employee.status === "ACTIVE"
        ? "badge bg-success"
        : "badge bg-danger"
    }
  >
    {employee.status}
  </span>

</td>

<td>

  <i
    className="bi bi-pencil-square text-primary me-3"
    style={{
      cursor: "pointer",
      fontSize: "18px"
    }}
    title="Edit"
  />

  <i
    className="bi bi-trash-fill text-danger"
    style={{
      cursor: "pointer",
      fontSize: "18px"
    }}
    title="Delete"
    onClick={() =>
      deleteEmployee(employee.id)
    }
  />

</td>

                            </tr>

                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="9"
                            className="text-center"
                          >
                            No Employees Found
                          </td>

                        </tr>

                      }

                    </tbody>

                  </table>

                </div>

              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Employees;