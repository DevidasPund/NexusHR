import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Salary() {

  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {

    try {

      const employeeId =
        localStorage.getItem("employeeId");

      const response =
        await API.get(
          `/employees/${employeeId}`
        );

      setEmployee(
        response.data
      );

    } catch (error) {

      console.error(
        "Salary Load Error",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  const basicSalary =
    employee.salary || 0;

  const bonus =
    Math.round(
      basicSalary * 0.10
    );

  const deduction =
    Math.round(
      basicSalary * 0.02
    );

  const netSalary =
    basicSalary +
    bonus -
    deduction;

  const downloadPayslip = () => {

    const doc =
      new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "NexusHR Payslip",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Employee ID : ${employee.id}`,
      20,
      40
    );

    doc.text(
      `Name : ${employee.firstName || ""} ${employee.lastName || ""}`,
      20,
      50
    );

    doc.text(
      `Department : ${employee.department || ""}`,
      20,
      60
    );

    doc.text(
      `Designation : ${employee.designation || ""}`,
      20,
      70
    );

    doc.text(
      `Email : ${employee.email || ""}`,
      20,
      80
    );

    doc.line(
      20,
      90,
      190,
      90
    );

    doc.text(
      `Basic Salary : ₹${basicSalary}`,
      20,
      110
    );

    doc.text(
      `Bonus : ₹${bonus}`,
      20,
      120
    );

    doc.text(
      `Deduction : ₹${deduction}`,
      20,
      130
    );

    doc.text(
      `Net Salary : ₹${netSalary}`,
      20,
      145
    );

    doc.save(
      `Payslip_${employee.firstName || "Employee"}.pdf`
    );
  };

  if (loading) {

    return (
      <div className="text-center mt-5">
        <h3>
          Loading Salary...
        </h3>
      </div>
    );
  }

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="fw-bold mb-4">
            💰 My Salary
          </h2>

          <div className="row g-4">

            <div className="col-md-3">

              <div className="card bg-primary text-white shadow-lg border-0">

                <div className="card-body text-center">

                  <h5>
                    Basic Salary
                  </h5>

                  <h2>
                    ₹{basicSalary}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-success text-white shadow-lg border-0">

                <div className="card-body text-center">

                  <h5>
                    Bonus
                  </h5>

                  <h2>
                    ₹{bonus}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-warning shadow-lg border-0">

                <div className="card-body text-center">

                  <h5>
                    Deduction
                  </h5>

                  <h2>
                    ₹{deduction}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-danger text-white shadow-lg border-0">

                <div className="card-body text-center">

                  <h5>
                    Net Salary
                  </h5>

                  <h2>
                    ₹{netSalary}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          <div className="card shadow-lg border-0 mt-4">

            <div className="card-body">

              <h3 className="mb-4">
                Employee Details
              </h3>

              <div className="row">

                <div className="col-md-6">

                  <p>
                    <strong>ID :</strong> {employee.id}
                  </p>

                  <p>
                    <strong>Name :</strong> {employee.firstName} {employee.lastName}
                  </p>

                  <p>
                    <strong>Email :</strong> {employee.email}
                  </p>

                  <p>
                    <strong>Department :</strong> {employee.department}
                  </p>

                  <p>
                    <strong>Designation :</strong> {employee.designation}
                  </p>

                </div>

                <div className="col-md-6">

                  <p>
                    <strong>Status :</strong>

                    <span className="badge bg-success ms-2">
                      {employee.status}
                    </span>

                  </p>

                  <p>
                    <strong>Attendance :</strong> {employee.attendancePercentage || 0}%
                  </p>

                  <p>
                    <strong>Current Project :</strong> {employee.currentProject || "N/A"}
                  </p>

                  <p>
                    <strong>Total Projects :</strong> {employee.projectCount || 0}
                  </p>

                </div>

              </div>

              <hr />

              <table className="table table-bordered">

                <thead className="table-dark">

                  <tr>

                    <th>Description</th>
                    <th>Amount</th>

                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>Basic Salary</td>
                    <td>₹{basicSalary}</td>
                  </tr>

                  <tr>
                    <td>Bonus</td>
                    <td>₹{bonus}</td>
                  </tr>

                  <tr>
                    <td>Deduction</td>
                    <td>₹{deduction}</td>
                  </tr>

                  <tr className="table-success">

                    <td>
                      <strong>Net Salary</strong>
                    </td>

                    <td>
                      <strong>₹{netSalary}</strong>
                    </td>

                  </tr>

                </tbody>

              </table>

              <div className="text-center">

                <button
                  className="btn btn-primary btn-lg"
                  onClick={downloadPayslip}
                >
                  📄 Download Payslip
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Salary;