import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AuditLogs() {

  const [logs, setLogs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadLogs();

    const interval =
      setInterval(() => {
        loadLogs();
      }, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadLogs = async () => {

    try {

      const response =
        await API.get("/audit");

      setLogs(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const filteredLogs =
    logs.filter(log =>

      (log.username || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      (log.action || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

      ||

      (log.details || "")
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  const loginCount =
    logs.filter(
      log =>
        log.action ===
        "LOGIN"
    ).length;

  const employeeActions =
    logs.filter(
      log =>
        (log.action || "")
          .includes(
            "EMPLOYEE"
          )
    ).length;

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

            <div className="card-body text-white">

              <h2>
                📋 Audit Logs
              </h2>

              <p className="mb-0">
                Monitor system activities,
                user actions and security events
              </p>

            </div>

          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div
                className="card border-0 shadow"
                style={{
                  height: "140px"
                }}
              >

                <div className="card-body text-center">

                  <h6>
                    Total Logs
                  </h6>

                  <h2 className="text-primary">

                    {logs.length}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="card border-0 shadow"
                style={{
                  height: "140px"
                }}
              >

                <div className="card-body text-center">

                  <h6>
                    Login Activities
                  </h6>

                  <h2 className="text-success">

                    {loginCount}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="card border-0 shadow"
                style={{
                  height: "140px"
                }}
              >

                <div className="card-body text-center">

                  <h6>
                    Employee Actions
                  </h6>

                  <h2 className="text-warning">

                    {employeeActions}

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Search & Refresh */}

          <div className="card border-0 shadow mb-4">

            <div className="card-body">

              <div className="row">

                <div className="col-md-8">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Username, Action, Details..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-4 text-end">

                  <button
                    className="btn btn-primary"
                    onClick={loadLogs}
                  >
                    🔄 Refresh
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Logs Table */}

          <div className="card border-0 shadow">

            <div className="card-body">

              <h4 className="mb-4">
                System Activity Logs
              </h4>

              {

                loading

                ?

                <div className="text-center">

                  <h5>
                    Loading Logs...
                  </h5>

                </div>

                :

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-dark">

                      <tr>

                        <th>ID</th>
                        <th>Username</th>
                        <th>Action</th>
                        <th>Details</th>
                        <th>Date & Time</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        filteredLogs.length > 0

                        ?

                        filteredLogs.map(
                          log => (

                            <tr
                              key={log.id}
                            >

                              <td>
                                {log.id}
                              </td>

                              <td>
                                {log.username}
                              </td>

                              <td>

                                <span
                                  className={
                                    log.action === "LOGIN"
                                      ? "badge bg-success"
                                      : log.action === "DELETE"
                                      ? "badge bg-danger"
                                      : log.action === "UPDATE"
                                      ? "badge bg-warning text-dark"
                                      : "badge bg-primary"
                                  }
                                >

                                  {log.action}

                                </span>

                              </td>

                              <td>
                                {log.details}
                              </td>

                              <td>
                                {log.createdAt}
                              </td>

                            </tr>

                          )
                        )

                        :

                        <tr>

                          <td
                            colSpan="5"
                            className="text-center"
                          >

                            No Audit Logs Found

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

export default AuditLogs;