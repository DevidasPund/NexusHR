import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function PayslipManagement() {

  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    year: new Date().getFullYear()
  });

  useEffect(() => {

    loadPayslips();
    loadEmployees();

    const interval = setInterval(() => {
      loadPayslips();
    }, 30000);

    return () => clearInterval(interval);

  }, []);

  const loadPayslips = async () => {

    try {

      const response =
        await API.get("/payslips");

      setPayslips(response.data);

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

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const generatePayslip = async () => {

    if (!formData.employeeId) {
      alert("Select Employee");
      return;
    }

    try {

      await API.post(
        "/payslips/generate",
        formData
      );

      alert(
        "Payslip Generated Successfully"
      );

      loadPayslips();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Generate Payslip"
      );

    }

  };

  const deletePayslip = async (id) => {

    if (
      !window.confirm(
        "Delete Payslip?"
      )
    ) {
      return;
    }

    try {

      await API.delete(
        `/payslips/${id}`
      );

      loadPayslips();

    } catch (error) {

      console.error(error);

    }

  };

  const downloadPayslip = (id) => {

    window.open(
      `${API.defaults.baseURL}/payslips/download/${id}`,
      "_blank"
    );

  };

  const filteredPayslips =
    payslips.filter(pay =>
      String(pay.employeeName || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const totalSalary =
    payslips.reduce(
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
                📄 Payslip Management
              </h2>

              <p>
                Employee Salary Payslip System
              </p>

            </div>

          </div>

          {/* KPI */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Payslips</h6>

                  <h2 className="text-primary">
                    {payslips.length}
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

                  <h6>Total Payroll</h6>

                  <h2 className="text-danger">
                    ₹{totalSalary}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Generate Payslip */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                Generate Payslip
              </h4>

              <div className="row g-3 mt-2">

                <div className="col-md-4">

                  <select
                    className="form-select"
                    name="employeeId"
                    value={formData.employeeId}
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
                          {emp.firstName} {emp.lastName}
                        </option>

                      ))
                    }

                  </select>

                </div>

                <div className="col-md-3">

                  <input
                    type="month"
                    className="form-control"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-3">

                  <input
                    type="number"
                    className="form-control"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-2">

                  <button
                    className="btn btn-primary w-100"
                    onClick={generatePayslip}
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
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* Table */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                Payslip Records
              </h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead className="table-dark">

                    <tr>

                      <th>ID</th>
                      <th>Employee</th>
                      <th>Month</th>
                      <th>Basic Salary</th>
                      <th>Net Salary</th>
                      <th>Actions</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredPayslips.map(pay => (

                        <tr key={pay.id}>

                          <td>{pay.id}</td>

                          <td>
                            {pay.employeeName}
                          </td>

                          <td>
                            {pay.month}
                          </td>

                          <td>
                            ₹{pay.basicSalary}
                          </td>

                          <td>

                            <span className="badge bg-success">

                              ₹{pay.netSalary}

                            </span>

                          </td>

                          <td>

                            <button
                              className="btn btn-primary btn-sm me-2"
                              onClick={() =>
                                downloadPayslip(pay.id)
                              }
                            >
                              Download
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deletePayslip(pay.id)
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

export default PayslipManagement;