import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Payroll() {

  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [payroll, setPayroll] = useState({
    employeeId: "",
    basicSalary: "",
    bonus: "",
    deduction: ""
  });

  useEffect(() => {

    loadPayrolls();
    loadEmployees();

    const interval = setInterval(() => {
      loadPayrolls();
    }, 30000);

    return () => clearInterval(interval);

  }, []);

  const loadPayrolls = async () => {

    try {

      const response =
        await API.get("/payroll");

      setPayrolls(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const loadEmployees = async () => {

    try {

      const response =
        await API.get("/employees");

      setEmployees(response.data);

    } catch (error) {

      console.error(error);

    }

  };

  const handleChange = (e) => {

    setPayroll({
      ...payroll,
      [e.target.name]: e.target.value
    });

  };

  const savePayroll = async () => {

    try {

      await API.post(
        "/payroll",
        payroll
      );

      alert(
        "Payroll Generated Successfully"
      );

      setPayroll({
        employeeId: "",
        basicSalary: "",
        bonus: "",
        deduction: ""
      });

      loadPayrolls();

    } catch (error) {

      console.error(error);

      alert("Payroll Creation Failed");

    }

  };

  const deletePayroll = async (id) => {

    if (
      !window.confirm(
        "Delete Payroll Record?"
      )
    ) {
      return;
    }

    try {

      await API.delete(
        `/payroll/${id}`
      );

      loadPayrolls();

    } catch (error) {

      console.error(error);

    }

  };

  const filteredPayrolls =
    payrolls.filter(pay =>
      String(pay.employeeName || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const totalPayroll =
    payrolls.reduce(
      (sum, p) =>
        sum + (p.netSalary || 0),
      0
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
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius: "20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                💰 Payroll Management
              </h2>

              <p>
                Employee Salary &
                Payroll Processing
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Payrolls</h6>

                  <h2 className="text-primary">
                    {payrolls.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Employees</h6>

                  <h2 className="text-success">
                    {employees.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Salary</h6>

                  <h2 className="text-danger">
                    ₹{totalPayroll}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Generate Payroll */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                Generate Payroll
              </h4>

              <div className="row g-3 mt-2">

                <div className="col-md-3">

                  <select
                    className="form-select"
                    name="employeeId"
                    value={payroll.employeeId}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select Employee
                    </option>

                    {
                      employees.map(emp => (

                        <option
                          key={emp.id}
                          value={emp.id}
                        >
                          {emp.firstName}
                          {" "}
                          {emp.lastName}
                        </option>

                      ))
                    }

                  </select>

                </div>

                <div className="col-md-3">

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Basic Salary"
                    name="basicSalary"
                    value={payroll.basicSalary}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-2">

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Bonus"
                    name="bonus"
                    value={payroll.bonus}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-2">

                  <input
                    type="number"
                    className="form-control"
                    placeholder="Deduction"
                    name="deduction"
                    value={payroll.deduction}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-2">

                  <button
                    className="btn btn-primary w-100"
                    onClick={savePayroll}
                  >
                    Generate
                  </button>

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

          {/* Payroll Table */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                Payroll Records
              </h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead className="table-dark">

                    <tr>

                      <th>ID</th>
                      <th>Employee</th>
                      <th>Basic</th>
                      <th>Bonus</th>
                      <th>Deduction</th>
                      <th>Net Salary</th>
                      <th>Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredPayrolls.map(pay => (

                        <tr key={pay.id}>

                          <td>{pay.id}</td>

                          <td>
                            {pay.employeeName}
                          </td>

                          <td>
                            ₹{pay.basicSalary}
                          </td>

                          <td>
                            ₹{pay.bonus}
                          </td>

                          <td>
                            ₹{pay.deduction}
                          </td>

                          <td>

                            <span className="badge bg-success">

                              ₹{pay.netSalary}

                            </span>

                          </td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deletePayroll(
                                  pay.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))
                    }

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Payroll;