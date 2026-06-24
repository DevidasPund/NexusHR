import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MyLeave() {

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [leaveForm, setLeaveForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: ""
  });

  const employeeId =
    localStorage.getItem("employeeId");

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

      setLeaves(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const applyLeave = async () => {

    const {
      leaveType,
      fromDate,
      toDate,
      reason
    } = leaveForm;

    if (
      !leaveType ||
      !fromDate ||
      !toDate ||
      !reason
    ) {

      alert(
        "Please Fill All Fields"
      );

      return;

    }

    if (
      new Date(fromDate) >
      new Date(toDate)
    ) {

      alert(
        "Invalid Date Range"
      );

      return;

    }

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

      setLeaveForm({
        leaveType: "",
        fromDate: "",
        toDate: "",
        reason: ""
      });

      loadLeaves();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Apply Leave"
      );

    }

  };

  const cancelLeave =
    async (id) => {

      if (
        !window.confirm(
          "Cancel Leave Request?"
        )
      ) {
        return;
      }

      try {

        await API.delete(
          `/leave/${id}`
        );

        alert(
          "Leave Cancelled"
        );

        loadLeaves();

      } catch (error) {

        console.error(error);

      }

    };

  const filteredLeaves =
    leaves.filter(
      leave =>
        leave.leaveType
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        leave.status
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalLeaves =
    leaves.length;

  const approvedLeaves =
    leaves.filter(
      l => l.status === "APPROVED"
    ).length;

  const pendingLeaves =
    leaves.filter(
      l => l.status === "PENDING"
    ).length;

  const rejectedLeaves =
    leaves.filter(
      l => l.status === "REJECTED"
    ).length;

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
                🌴 My Leave Dashboard
              </h2>

              <p className="mb-0">
                Apply & Track Leave Requests
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Total Leaves</h6>

                  <h2 className="text-primary">
                    {totalLeaves}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Approved</h6>

                  <h2 className="text-success">
                    {approvedLeaves}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Pending</h6>

                  <h2 className="text-warning">
                    {pendingLeaves}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card border-0 shadow">

                <div className="card-body text-center">

                  <h6>Rejected</h6>

                  <h2 className="text-danger">
                    {rejectedLeaves}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Apply Leave */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <h4 className="mb-3">
                Apply Leave
              </h4>

              <div className="row g-3">

                <div className="col-md-3">

                  <select
                    className="form-select"
                    value={
                      leaveForm.leaveType
                    }
                    onChange={(e) =>
                      setLeaveForm({
                        ...leaveForm,
                        leaveType:
                          e.target.value
                      })
                    }
                  >

                    <option value="">
                      Select Leave Type
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

                    <option>
                      Work From Home
                    </option>

                  </select>

                </div>

                <div className="col-md-2">

                  <input
                    type="date"
                    className="form-control"
                    value={
                      leaveForm.fromDate
                    }
                    onChange={(e) =>
                      setLeaveForm({
                        ...leaveForm,
                        fromDate:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="col-md-2">

                  <input
                    type="date"
                    className="form-control"
                    value={
                      leaveForm.toDate
                    }
                    onChange={(e) =>
                      setLeaveForm({
                        ...leaveForm,
                        toDate:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="col-md-3">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Reason"
                    value={
                      leaveForm.reason
                    }
                    onChange={(e) =>
                      setLeaveForm({
                        ...leaveForm,
                        reason:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="col-md-2">

                  <button
                    className="btn btn-primary w-100"
                    onClick={applyLeave}
                  >
                    Apply
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search Leave..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Leave History */}

          <div className="card border-0 shadow">

            <div className="card-body">

              <h4 className="mb-3">
                Leave History
              </h4>

              {loading ? (

                <h5>
                  Loading...
                </h5>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-dark">

                      <tr>

                        <th>ID</th>
                        <th>Leave Type</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>

                      </tr>

                    </thead>

                    <tbody>

                      {
                        filteredLeaves.length > 0
                        ?

                        filteredLeaves.map(
                          leave => (

                            <tr
                              key={leave.id}
                            >

                              <td>
                                {leave.id}
                              </td>

                              <td>
                                {
                                  leave.leaveType
                                }
                              </td>

                              <td>
                                {
                                  leave.fromDate
                                }
                              </td>

                              <td>
                                {
                                  leave.toDate
                                }
                              </td>

                              <td>
                                {
                                  leave.reason
                                }
                              </td>

                              <td>

                                <span
                                  className={
                                    leave.status === "APPROVED"
                                    ? "badge bg-success"
                                    : leave.status === "REJECTED"
                                    ? "badge bg-danger"
                                    : "badge bg-warning text-dark"
                                  }
                                >

                                  {
                                    leave.status
                                  }

                                </span>

                              </td>

                              <td>

                                {
                                  leave.status === "PENDING" &&

                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      cancelLeave(
                                        leave.id
                                      )
                                    }
                                  >
                                    Cancel
                                  </button>
                                }

                              </td>

                            </tr>

                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="7"
                            className="text-center"
                          >
                            No Leave Records Found
                          </td>

                        </tr>

                      }

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

export default MyLeave;