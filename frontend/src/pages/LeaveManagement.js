import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function LeaveManagement() {

  const [leaves, setLeaves] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const role =
    localStorage.getItem(
      "role"
    );

  useEffect(() => {

    loadLeaves();

  }, []);

  const loadLeaves = async () => {

    try {

      const response =
        await API.get("/leave");

      setLeaves(
        response.data
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  // Manager Approve

  const managerApprove =
    async (id) => {

      try {

        await API.put(
          `/leave/manager-approve/${id}`
        );

        loadLeaves();

      } catch (error) {

        console.error(error);
      }
    };

  // Admin Final Approve

  const adminApprove =
    async (id) => {

      try {

        await API.put(
          `/leave/admin-approve/${id}`
        );

        loadLeaves();

      } catch (error) {

        console.error(error);
      }
    };

  // Reject

  const rejectLeave =
    async (id) => {

      try {

        await API.put(
          `/leave/reject/${id}`
        );

        loadLeaves();

      } catch (error) {

        console.error(error);
      }
    };

  // Search

  const filteredLeaves =
    leaves.filter(
      (leave) =>

        String(
          leave.employeeId
        )
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        (leave.leaveType || "")
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  // Role Based View

  const roleLeaves =

    role === "MANAGER"

      ? filteredLeaves.filter(
          leave =>
            leave.status ===
            "PENDING"
        )

      : role === "ADMIN"

      ? filteredLeaves.filter(
          leave =>
            leave.status ===
              "PENDING_ADMIN" ||
            leave.status ===
              "APPROVED" ||
            leave.status ===
              "REJECTED"
        )

      : filteredLeaves;

  // Summary

  const totalLeaves =
    leaves.length;

  const pendingLeaves =
    leaves.filter(
      l =>
        l.status ===
        "PENDING"
    ).length;

  const pendingAdmin =
    leaves.filter(
      l =>
        l.status ===
        "PENDING_ADMIN"
    ).length;

  const approvedLeaves =
    leaves.filter(
      l =>
        l.status ===
        "APPROVED"
    ).length;

  const rejectedLeaves =
    leaves.filter(
      l =>
        l.status ===
        "REJECTED"
    ).length;

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="fw-bold mb-4">
            Leave Management
          </h2>

          {/* Summary */}

          <div className="row mb-4">

            <div className="col-md-3">

              <div className="card shadow bg-primary text-white">

                <div className="card-body">

                  <h6>
                    Total Leaves
                  </h6>

                  <h2>
                    {totalLeaves}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow bg-warning">

                <div className="card-body">

                  <h6>
                    Pending Manager
                  </h6>

                  <h2>
                    {pendingLeaves}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow bg-info text-white">

                <div className="card-body">

                  <h6>
                    Pending Admin
                  </h6>

                  <h2>
                    {pendingAdmin}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow bg-success text-white">

                <div className="card-body">

                  <h6>
                    Approved
                  </h6>

                  <h2>
                    {approvedLeaves}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Search */}

          <div className="card shadow mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="Search Employee ID or Leave Type..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Leave Table */}

          <div className="card shadow">

            <div className="card-body">

              <h4 className="mb-3">
                Leave Requests
              </h4>

              {

                loading ?

                <h5>
                  Loading...
                </h5>

                :

                <div className="table-responsive">

                  <table className="table table-bordered table-hover">

                    <thead className="table-dark">

                      <tr>

                        <th>ID</th>
                        <th>Employee ID</th>
                        <th>Leave Type</th>
                        <th>From Date</th>
                        <th>To Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Manager</th>
                        <th>Admin</th>
                        <th>Action</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        roleLeaves.length > 0 ?

                        roleLeaves.map(
                          leave => (

                            <tr
                              key={leave.id}
                            >

                              <td>
                                {leave.id}
                              </td>

                              <td>
                                {leave.employeeId}
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
                                {leave.reason}
                              </td>

                              <td>
                                {leave.status}
                              </td>

                              <td>
                                {leave.managerStatus}
                              </td>

                              <td>
                                {leave.adminStatus}
                              </td>

                              <td>

                                {

                                  role ===
                                  "MANAGER"

                                  &&

                                  leave.status ===
                                  "PENDING"

                                  &&

                                  <>

                                    <button
                                      className="btn btn-success btn-sm me-2"
                                      onClick={() =>
                                        managerApprove(
                                          leave.id
                                        )
                                      }
                                    >
                                      Approve
                                    </button>

                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        rejectLeave(
                                          leave.id
                                        )
                                      }
                                    >
                                      Reject
                                    </button>

                                  </>
                                }

                                {

                                  role ===
                                  "ADMIN"

                                  &&

                                  leave.status ===
                                  "PENDING_ADMIN"

                                  &&

                                  <>

                                    <button
                                      className="btn btn-primary btn-sm me-2"
                                      onClick={() =>
                                        adminApprove(
                                          leave.id
                                        )
                                      }
                                    >
                                      Final Approve
                                    </button>

                                    <button
                                      className="btn btn-danger btn-sm"
                                      onClick={() =>
                                        rejectLeave(
                                          leave.id
                                        )
                                      }
                                    >
                                      Reject
                                    </button>

                                  </>
                                }

                              </td>

                            </tr>
                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="10"
                            className="text-center"
                          >

                            No Leave Requests Found

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

export default LeaveManagement;