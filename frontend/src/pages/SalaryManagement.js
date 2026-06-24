import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function SalaryManagement() {

  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [salary, setSalary] = useState({
    employeeId: "",
    employeeName: "",
    department: "",
    basicSalary: "",
    bonus: "",
    deduction: "",
    status: "PAID"
  });

  useEffect(() => {

    loadSalaries();

    const interval = setInterval(() => {
      loadSalaries();
    }, 30000);

    return () => clearInterval(interval);

  }, []);

  const loadSalaries = async () => {

    try {

      const response =
        await API.get("/salary");

      setSalaries(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setSalary({
      ...salary,
      [e.target.name]: e.target.value
    });

  };

  const saveSalary = async (e) => {

    e.preventDefault();

    try {

      const netSalary =
        Number(salary.basicSalary) +
        Number(salary.bonus) -
        Number(salary.deduction);

      await API.post(
        "/salary",
        {
          ...salary,
          netSalary
        }
      );

      alert(
        "Salary Saved Successfully"
      );

      setSalary({
        employeeId: "",
        employeeName: "",
        department: "",
        basicSalary: "",
        bonus: "",
        deduction: "",
        status: "PAID"
      });

      loadSalaries();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Save Salary"
      );

    }

  };

  const deleteSalary = async (id) => {

    if (
      !window.confirm(
        "Delete Salary Record?"
      )
    ) {
      return;
    }

    try {

      await API.delete(
        `/salary/${id}`
      );

      loadSalaries();

    } catch (error) {

      console.error(error);

    }

  };

  const downloadPayslip = (id) => {

    window.open(
      `${API.defaults.baseURL}/salary/payslip/${id}`
    );

  };

  const filteredSalaries =
    salaries.filter((item) =>
      item.employeeName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const totalPayroll =
    salaries.reduce(
      (sum, item) =>
        sum + (item.netSalary || 0),
      0
    );

  const paidEmployees =
    salaries.filter(
      (s) =>
        s.status === "PAID"
    ).length;

  const averageSalary =
    salaries.length > 0
      ? Math.round(
          totalPayroll /
            salaries.length
        )
      : 0;

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
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius:
                "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                💰 Payroll Management
              </h2>

              <p>
                Manage Employee
                Salaries & Payslips
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>
                    Total Payroll
                  </h6>

                  <h3 className="text-primary">

                    ₹{totalPayroll.toLocaleString()}

                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>
                    Employees Paid
                  </h6>

                  <h3 className="text-success">

                    {paidEmployees}

                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>
                    Salary Records
                  </h6>

                  <h3 className="text-warning">

                    {salaries.length}

                  </h3>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>
                    Average Salary
                  </h6>

                  <h3 className="text-danger">

                    ₹{averageSalary.toLocaleString()}

                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Add Salary */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <h4>
                Add Salary Record
              </h4>

              <hr />

              <form
                onSubmit={
                  saveSalary
                }
              >

                <div className="row g-3">

                  <div className="col-md-3">

                    <input
                      type="text"
                      name="employeeId"
                      className="form-control"
                      placeholder="Employee ID"
                      value={
                        salary.employeeId
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  <div className="col-md-3">

                    <input
                      type="text"
                      name="employeeName"
                      className="form-control"
                      placeholder="Employee Name"
                      value={
                        salary.employeeName
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  <div className="col-md-3">

                    <input
                      type="text"
                      name="department"
                      className="form-control"
                      placeholder="Department"
                      value={
                        salary.department
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-3">

                    <select
                      name="status"
                      className="form-select"
                      value={
                        salary.status
                      }
                      onChange={
                        handleChange
                      }
                    >

                      <option value="PAID">
                        PAID
                      </option>

                      <option value="PENDING">
                        PENDING
                      </option>

                    </select>

                  </div>

                  <div className="col-md-4">

                    <input
                      type="number"
                      name="basicSalary"
                      className="form-control"
                      placeholder="Basic Salary"
                      value={
                        salary.basicSalary
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      type="number"
                      name="bonus"
                      className="form-control"
                      placeholder="Bonus"
                      value={
                        salary.bonus
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                  <div className="col-md-4">

                    <input
                      type="number"
                      name="deduction"
                      className="form-control"
                      placeholder="Deduction"
                      value={
                        salary.deduction
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                </div>

                <button
                  type="submit"
                  className="btn btn-success mt-3"
                >
                  Save Salary
                </button>

              </form>

            </div>

          </div>

          {/* Search */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search Employee"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Salary Table */}

          <div className="card border-0 shadow">

            <div className="card-body">

              <h4>
                Payroll Records
              </h4>

              {loading ? (

                <h5 className="text-center">
                  Loading...
                </h5>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead className="table-dark">

                      <tr>

                        <th>ID</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Basic</th>
                        <th>Bonus</th>
                        <th>Deduction</th>
                        <th>Net Salary</th>
                        <th>Status</th>
                        <th>Payslip</th>
                        <th>Action</th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredSalaries.map(
                        (item) => (

                          <tr
                            key={item.id}
                          >

                            <td>
                              {item.id}
                            </td>

                            <td>
                              {
                                item.employeeName
                              }
                            </td>

                            <td>
                              {
                                item.department
                              }
                            </td>

                            <td>
                              ₹
                              {
                                item.basicSalary
                              }
                            </td>

                            <td>
                              ₹
                              {
                                item.bonus
                              }
                            </td>

                            <td>
                              ₹
                              {
                                item.deduction
                              }
                            </td>

                            <td>
                              ₹
                              {
                                item.netSalary
                              }
                            </td>

                            <td>

                              <span
                                className={
                                  item.status ===
                                  "PAID"
                                    ? "badge bg-success"
                                    : "badge bg-warning"
                                }
                              >

                                {
                                  item.status
                                }

                              </span>

                            </td>

                            <td>

                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() =>
                                  downloadPayslip(
                                    item.id
                                  )
                                }
                              >
                                📄 Download
                              </button>

                            </td>

                            <td>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deleteSalary(
                                    item.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </td>

                          </tr>

                        )
                      )}

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

export default SalaryManagement;