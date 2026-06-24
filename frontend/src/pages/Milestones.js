import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Milestones() {

  const [milestones, setMilestones] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [milestone, setMilestone] = useState({
    projectName: "",
    milestoneName: "",
    dueDate: "",
    status: "PENDING"
  });

  useEffect(() => {

    loadMilestones();

    const interval = setInterval(() => {

      loadMilestones();

    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const loadMilestones = async () => {

    try {

      const response =
        await API.get("/milestones");

      setMilestones(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const saveMilestone = async () => {

    if (
      !milestone.projectName ||
      !milestone.milestoneName ||
      !milestone.dueDate
    ) {

      alert("Please Fill All Fields");
      return;

    }

    try {

      await API.post(
        "/milestones",
        milestone
      );

      alert(
        "Milestone Added Successfully"
      );

      setMilestone({
        projectName: "",
        milestoneName: "",
        dueDate: "",
        status: "PENDING"
      });

      loadMilestones();

    } catch (error) {

      console.error(error);

      alert(
        "Failed To Save Milestone"
      );

    }

  };

  const deleteMilestone =
    async (id) => {

      if (
        !window.confirm(
          "Delete This Milestone?"
        )
      ) {
        return;
      }

      try {

        await API.delete(
          `/milestones/${id}`
        );

        alert(
          "Milestone Deleted"
        );

        loadMilestones();

      } catch (error) {

        console.error(error);

      }

    };

  const getProgress =
    (status) => {

      if (
        status === "COMPLETED"
      ) return 100;

      if (
        status === "IN_PROGRESS"
      ) return 60;

      return 20;

    };

  const filteredMilestones =
    milestones.filter(
      (m) =>
        m.projectName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        m.milestoneName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const completedCount =
    milestones.filter(
      m => m.status === "COMPLETED"
    ).length;

  const inProgressCount =
    milestones.filter(
      m => m.status === "IN_PROGRESS"
    ).length;

  const pendingCount =
    milestones.filter(
      m => m.status === "PENDING"
    ).length;

  if (loading) {

    return (

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >

        <h3>
          Loading Milestones...
        </h3>

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
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)"
            }}
          >

            <div className="card-body text-white">

              <h2>
                📌 Project Milestones
              </h2>

              <p className="mb-0">
                Track Project Progress &
                Deliverables
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Total Milestones
                  </h6>

                  <h2 className="text-primary">
                    {milestones.length}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Completed
                  </h6>

                  <h2 className="text-success">
                    {completedCount}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    In Progress
                  </h6>

                  <h2 className="text-warning">
                    {inProgressCount}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>
                    Pending
                  </h6>

                  <h2 className="text-danger">
                    {pendingCount}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Add Milestone */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4>
                Add New Milestone
              </h4>

              <div className="row g-3">

                <div className="col-md-3">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Project Name"
                    value={milestone.projectName}
                    onChange={(e) =>
                      setMilestone({
                        ...milestone,
                        projectName:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="col-md-3">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Milestone Name"
                    value={milestone.milestoneName}
                    onChange={(e) =>
                      setMilestone({
                        ...milestone,
                        milestoneName:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="col-md-2">

                  <input
                    type="date"
                    className="form-control"
                    value={milestone.dueDate}
                    onChange={(e) =>
                      setMilestone({
                        ...milestone,
                        dueDate:
                          e.target.value
                      })
                    }
                  />

                </div>

                <div className="col-md-2">

                  <select
                    className="form-select"
                    value={milestone.status}
                    onChange={(e) =>
                      setMilestone({
                        ...milestone,
                        status:
                          e.target.value
                      })
                    }
                  >

                    <option>
                      PENDING
                    </option>

                    <option>
                      IN_PROGRESS
                    </option>

                    <option>
                      COMPLETED
                    </option>

                  </select>

                </div>

                <div className="col-md-2">

                  <button
                    className="btn btn-primary w-100"
                    onClick={
                      saveMilestone
                    }
                  >
                    Save
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
                placeholder="🔍 Search Milestone..."
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

              <h4>
                Milestone List
              </h4>

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-dark">

                    <tr>

                      <th>Project</th>
                      <th>Milestone</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredMilestones.length > 0
                      ?

                      filteredMilestones.map(
                        (m) => (

                          <tr key={m.id}>

                            <td>
                              {m.projectName}
                            </td>

                            <td>
                              {m.milestoneName}
                            </td>

                            <td>
                              {m.dueDate}
                            </td>

                            <td>

                              <span
                                className={
                                  m.status === "COMPLETED"
                                  ? "badge bg-success"
                                  : m.status === "IN_PROGRESS"
                                  ? "badge bg-primary"
                                  : "badge bg-warning text-dark"
                                }
                              >

                                {m.status}

                              </span>

                            </td>

                            <td>

                              <div className="progress">

                                <div
                                  className={
                                    m.status === "COMPLETED"
                                    ? "progress-bar bg-success"
                                    : m.status === "IN_PROGRESS"
                                    ? "progress-bar bg-primary"
                                    : "progress-bar bg-warning"
                                  }
                                  style={{
                                    width:
                                      `${getProgress(
                                        m.status
                                      )}%`
                                  }}
                                >

                                  {
                                    getProgress(
                                      m.status
                                    )
                                  }%

                                </div>

                              </div>

                            </td>

                            <td>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deleteMilestone(
                                    m.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </td>

                          </tr>

                        )
                      )

                      :

                      <tr>

                        <td
                          colSpan="6"
                          className="text-center"
                        >

                          No Milestones Found

                        </td>

                      </tr>
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

export default Milestones;