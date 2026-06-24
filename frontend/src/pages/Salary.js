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

    const interval = setInterval(() => {
      loadEmployee();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadEmployee = async () => {
    try {
      const employeeId =
        localStorage.getItem("employeeId");

      const response = await API.get(
        `/employees/${employeeId}`
      );

      setEmployee(response.data);
    } catch (error) {
      console.error(
        "Salary Load Error",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
      }
    ).format(amount || 0);
  };

  const basicSalary =
    Number(employee.salary) || 0;

  const hra =
    Math.round(basicSalary * 0.20);

  const bonus =
    Math.round(basicSalary * 0.10);

  const pf =
    Math.round(basicSalary * 0.12);

  const tax =
    Math.round(basicSalary * 0.05);

  const netSalary =
    basicSalary +
    hra +
    bonus -
    pf -
    tax;

  const downloadPayslip = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(
      "NexusHR Enterprise Payslip",
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
      `Basic Salary : ${formatCurrency(
        basicSalary
      )}`,
      20,
      110
    );

    doc.text(
      `HRA : ${formatCurrency(hra)}`,
      20,
      120
    );

    doc.text(
      `Bonus : ${formatCurrency(
        bonus
      )}`,
      20,
      130
    );

    doc.text(
      `PF : ${formatCurrency(pf)}`,
      20,
      140
    );

    doc.text(
      `Tax : ${formatCurrency(tax)}`,
      20,
      150
    );

    doc.text(
      `Net Salary : ${formatCurrency(
        netSalary
      )}`,
      20,
      165
    );

    doc.save(
      `Payslip_${employee.firstName || "Employee"}.pdf`
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h3>Loading Salary Details...</h3>
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
                💰 Salary & Payslip Portal
              </h2>

              <p>
                View Salary Details,
                Earnings & Download
                Payslip
              </p>
            </div>
          </div>

          {/* Salary Cards */}

          <div className="row g-4">

            <div className="col-md-3">
              <div className="card border-0 shadow">
                <div className="card-body text-center">
                  <h6>
                    Basic Salary
                  </h6>

                  <h3 className="text-primary">
                    {formatCurrency(
                      basicSalary
                    )}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow">
                <div className="card-body text-center">
                  <h6>HRA</h6>

                  <h3 className="text-success">
                    {formatCurrency(
                      hra
                    )}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow">
                <div className="card-body text-center">
                  <h6>Bonus</h6>

                  <h3 className="text-warning">
                    {formatCurrency(
                      bonus
                    )}
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow">
                <div className="card-body text-center">
                  <h6>
                    Net Salary
                  </h6>

                  <h3 className="text-danger">
                    {formatCurrency(
                      netSalary
                    )}
                  </h3>
                </div>
              </div>
            </div>

          </div>

          {/* Employee Info */}

          <div className="card border-0 shadow mt-4">
            <div className="card-body">

              <h4 className="mb-4">
                Employee Information
              </h4>

              <div className="row">

                <div className="col-md-6">

                  <p>
                    <strong>ID :</strong>
                    {" "}
                    {employee.id}
                  </p>

                  <p>
                    <strong>Name :</strong>
                    {" "}
                    {employee.firstName}
                    {" "}
                    {employee.lastName}
                  </p>

                  <p>
                    <strong>Email :</strong>
                    {" "}
                    {employee.email}
                  </p>

                  <p>
                    <strong>Phone :</strong>
                    {" "}
                    {employee.phone}
                  </p>

                </div>

                <div className="col-md-6">

                  <p>
                    <strong>Department :</strong>
                    {" "}
                    {employee.department}
                  </p>

                  <p>
                    <strong>Designation :</strong>
                    {" "}
                    {employee.designation}
                  </p>

                  <p>
                    <strong>Status :</strong>
                    {" "}

                    <span className="badge bg-success">
                      {employee.status}
                    </span>

                  </p>

                  <p>
                    <strong>Attendance :</strong>
                    {" "}
                    {employee.attendancePercentage || 0}%
                  </p>

                </div>

              </div>

            </div>
          </div>

          {/* Salary Breakdown */}

          <div className="card border-0 shadow mt-4">
            <div className="card-body">

              <h4 className="mb-4">
                Salary Breakdown
              </h4>

              <table className="table table-bordered">

                <thead className="table-dark">

                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>

                </thead>

                <tbody>

                  <tr>
                    <td>
                      Basic Salary
                    </td>

                    <td>
                      {formatCurrency(
                        basicSalary
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>HRA</td>

                    <td>
                      {formatCurrency(
                        hra
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>Bonus</td>

                    <td>
                      {formatCurrency(
                        bonus
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      PF Deduction
                    </td>

                    <td>
                      -
                      {formatCurrency(
                        pf
                      )}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      Income Tax
                    </td>

                    <td>
                      -
                      {formatCurrency(
                        tax
                      )}
                    </td>
                  </tr>

                  <tr className="table-success">

                    <td>
                      <strong>
                        Net Salary
                      </strong>
                    </td>

                    <td>
                      <strong>
                        {formatCurrency(
                          netSalary
                        )}
                      </strong>
                    </td>

                  </tr>

                </tbody>

              </table>

              <div className="text-center mt-4">

                <button
                  className="btn btn-primary btn-lg"
                  onClick={
                    downloadPayslip
                  }
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