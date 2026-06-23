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

  }, []);

  const loadLogs = async () => {

    try {

      const response =
        await API.get("/audit");

      setLogs(
        response.data
      );

    } catch(error) {

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

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="fw-bold mb-4">
            📋 Audit Logs
          </h2>

          {/* Summary */}

          <div className="row mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0 bg-primary text-white">

                <div className="card-body">

                  <h6>Total Logs</h6>

                  <h2>
                    {logs.length}
                  </h2>

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
                placeholder="Search Username, Action..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          {/* Table */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4 className="mb-3">
                System Activity Logs
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
                        <th>Username</th>
                        <th>Action</th>
                        <th>Details</th>
                        <th>Date & Time</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        filteredLogs.length > 0 ?

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

                                <span className="badge bg-primary">

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