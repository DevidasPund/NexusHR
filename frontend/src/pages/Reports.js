import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Reports() {

  const [dashboard,
         setDashboard] =
         useState({});

  useEffect(() => {

    loadReports();

    const interval =
    setInterval(
      loadReports,
      5000
    );

    return () =>
    clearInterval(
      interval
    );

  }, []);

  const loadReports =
  async () => {

    try {

      const response =
      await API.get(
        "/dashboard"
      );

      setDashboard(
        response.data
      );

    } catch(error){

      console.error(error);
    }
  };

  const exportPdf = () => {

    window.open(
      "https://nexushr-production-612e.up.railway.app/reports/pdf"
    );
  };

  const exportExcel = () => {

    window.open(
      "https://nexushr-production-612e.up.railway.app/reports/excel"
    );
  };

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="mb-4">
            📊 HR Reports Dashboard
          </h2>

          <div className="row g-4">

            <div className="col-md-3">

              <div className="card bg-primary text-white shadow">

                <div className="card-body text-center">

                  <h6>
                    Employees
                  </h6>

                  <h1>
                    {
                      dashboard.totalEmployees || 0
                    }
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-success text-white shadow">

                <div className="card-body text-center">

                  <h6>
                    Attendance
                  </h6>

                  <h1>
                    {
                      dashboard.totalAttendance || 0
                    }
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-warning shadow">

                <div className="card-body text-center">

                  <h6>
                    Pending Leaves
                  </h6>

                  <h1>
                    {
                      dashboard.pendingLeaves || 0
                    }
                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card bg-danger text-white shadow">

                <div className="card-body text-center">

                  <h6>
                    Payroll
                  </h6>

                  <h1>
                    ₹{
                      dashboard.totalSalary || 0
                    }
                  </h1>

                </div>

              </div>

            </div>

          </div>

          <div className="card shadow mt-4 p-4">

            <h4>
              Attendance Overview
            </h4>

            <div className="mt-3">

              <label>
                Present Employees
              </label>

              <div className="progress mb-3">

                <div
                  className="progress-bar bg-success"
                  style={{
                    width:
                    `${dashboard.attendancePercent || 0}%`
                  }}
                >

                  {
                    dashboard.attendancePercent || 0
                  }%

                </div>

              </div>

            </div>

          </div>

          <div className="row mt-4">

            <div className="col-md-6">

              <div className="card shadow p-4">

                <h4>
                  Department Summary
                </h4>

                <table className="table mt-3">

                  <thead className="table-dark">

                    <tr>

                      <th>
                        Department
                      </th>

                      <th>
                        Employees
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr>
                      <td>IT</td>
                      <td>
                        {
                          dashboard.itEmployees || 0
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>HR</td>
                      <td>
                        {
                          dashboard.hrEmployees || 0
                        }
                      </td>
                    </tr>

                    <tr>
                      <td>Finance</td>
                      <td>
                        {
                          dashboard.financeEmployees || 0
                        }
                      </td>
                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

            <div className="col-md-6">

              <div className="card shadow p-4">

                <h4>
                  Recent Activities
                </h4>

                <ul className="list-group mt-3">

                  <li className="list-group-item">
                    Employee Check-In Completed
                  </li>

                  <li className="list-group-item">
                    Leave Request Approved
                  </li>

                  <li className="list-group-item">
                    New Employee Added
                  </li>

                  <li className="list-group-item">
                    Task Assigned
                  </li>

                </ul>

              </div>

            </div>

          </div>

          <div className="card shadow mt-4 p-4">

            <h4>
              Export Reports
            </h4>

            <div className="d-flex gap-3 mt-3">

              <button
                className=
                "btn btn-danger btn-lg"
                onClick={
                  exportPdf
                }
              >
                📄 Export PDF
              </button>

              <button
                className=
                "btn btn-success btn-lg"
                onClick={
                  exportExcel
                }
              >
                📊 Export Excel
              </button>

              <button
                className=
                "btn btn-primary btn-lg"
                onClick={() =>
                  window.print()
                }
              >
                🖨 Print
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Reports;