import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MyLeave() {

  const [leaves, setLeaves] =
    useState([]);

  const [leaveType, setLeaveType] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const [reason, setReason] =
    useState("");

  const employeeId =
    localStorage.getItem(
      "employeeId"
    );

  useEffect(() => {

    loadLeaves();

    const interval =
      setInterval(() => {

        loadLeaves();

      }, 5000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadLeaves = async () => {

    try {

      const response =
        await API.get(
          `/leave/employee/${employeeId}`
        );

      setLeaves(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  };

  const applyLeave = async () => {

    try {

      await API.post(
        "/leave",
        {
          employeeId,
          leaveType,
          fromDate,
          toDate,
          reason
        }
      );

      alert(
        "Leave Applied Successfully"
      );

      setLeaveType("");
      setFromDate("");
      setToDate("");
      setReason("");

      loadLeaves();

    } catch (error) {

      console.error(error);

    }
  };

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background:"#f4f7fe",
          minHeight:"100vh"
        }}
      >

        <Navbar />

        <div className="container-fluid p-4">

          {/* Banner */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              background:
              "linear-gradient(135deg,#2563eb,#7c3aed)",
              borderRadius:"20px"
            }}
          >

            <div className="card-body text-white">

              <h2>
                🌴 My Leave Dashboard
              </h2>

              <p>
                Apply and Track Leave Requests
                in Real Time
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Total Leaves</h6>

                  <h1 className="text-primary">

                    {leaves.length}

                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Approved</h6>

                  <h1 className="text-success">

                    {
                      leaves.filter(
                        l =>
                        l.status ===
                        "APPROVED"
                      ).length
                    }

                  </h1>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Pending</h6>

                  <h1 className="text-warning">

                    {
                      leaves.filter(
                        l =>
                        l.status ===
                        "PENDING"
                      ).length
                    }

                  </h1>

                </div>

              </div>

            </div>

          </div>

          {/* Apply Leave */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                Apply Leave
              </h4>

              <hr />

              <div className="row">

                <div className="col-md-3">

                  <select
                    className="form-select"
                    value={leaveType}
                    onChange={(e)=>
                      setLeaveType(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Leave
                    </option>

                    <option>
                      Casual Leave
                    </option>

                    <option>
                      Sick Leave
                    </option>

                    <option>
                      Emergency Leave
                    </option>

                  </select>

                </div>

                <div className="col-md-3">

                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    onChange={(e)=>
                      setFromDate(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-3">

                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    onChange={(e)=>
                      setToDate(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-3">

                  <button
                    className=
                    "btn btn-primary w-100"
                    onClick={
                      applyLeave
                    }
                  >

                    Apply

                  </button>

                </div>

              </div>

              <textarea
                className="form-control mt-3"
                rows="3"
                placeholder="Reason"
                value={reason}
                onChange={(e)=>
                  setReason(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Leave History */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                Leave History
              </h4>

              <table
                className=
                "table table-hover"
              >

                <thead
                  className=
                  "table-dark"
                >

                  <tr>

                    <th>ID</th>
                    <th>Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Manager</th>
                    <th>Admin</th>
                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    leaves.map(
                      leave => (

                      <tr
                        key={leave.id}
                      >

                        <td>
                          {leave.id}
                        </td>

                        <td>
                          {leave.leaveType}
                        </td>

                        <td>
                          {leave.fromDate}
                        </td>

                        <td>
                          {leave.toDate}
                        </td>

                        <td>

                          <span
                            className=
                            "badge bg-warning"
                          >

                            {
                              leave.managerStatus
                            }

                          </span>

                        </td>

                        <td>

                          <span
                            className=
                            "badge bg-info"
                          >

                            {
                              leave.adminStatus
                            }

                          </span>

                        </td>

                        <td>

                          <span
                            className={
                              leave.status ===
                              "APPROVED"
                              ?
                              "badge bg-success"
                              :
                              leave.status ===
                              "REJECTED"
                              ?
                              "badge bg-danger"
                              :
                              "badge bg-warning"
                            }
                          >

                            {
                              leave.status
                            }

                          </span>

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

  );
}

export default MyLeave;