import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Recruitment() {

  const [candidates, setCandidates] = useState([]);

  const [search, setSearch] = useState("");

  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    expectedSalary: "",
    interviewDate: "",
    status: "APPLIED"
  });

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const response = await API.get("/recruitment");
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveCandidate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/recruitment", candidate);

      alert("Candidate Added Successfully");

      setCandidate({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        expectedSalary: "",
        interviewDate: "",
        status: "APPLIED"
      });

      loadCandidates();

    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {

    try {

      await API.put(
        `/recruitment/${id}`,
        { status }
      );

      loadCandidates();

    } catch (error) {
      console.error(error);
    }
  };

  const deleteCandidate = async (id) => {

    if (!window.confirm("Delete Candidate?"))
      return;

    try {

      await API.delete(
        `/recruitment/${id}`
      );

      loadCandidates();

    } catch (error) {
      console.error(error);
    }
  };

  const filteredCandidates =
    candidates.filter((c) =>
      c.name?.toLowerCase()
        .includes(search.toLowerCase()) ||

      c.position?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const totalCandidates =
    candidates.length;

  const appliedCount =
    candidates.filter(
      c => c.status === "APPLIED"
    ).length;

  const interviewCount =
    candidates.filter(
      c => c.status === "INTERVIEW"
    ).length;

  const selectedCount =
    candidates.filter(
      c => c.status === "SELECTED"
    ).length;

  const rejectedCount =
    candidates.filter(
      c => c.status === "REJECTED"
    ).length;

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container-fluid p-4">

          <h2 className="fw-bold mb-4">
            🎯 Recruitment Dashboard
          </h2>

          <div className="row mb-4">

            <div className="col-md-3">
              <div className="card bg-primary text-white shadow border-0">
                <div className="card-body text-center">
                  <h6>Total Candidates</h6>
                  <h2>{totalCandidates}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning shadow border-0">
                <div className="card-body text-center">
                  <h6>Applied</h6>
                  <h2>{appliedCount}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-info text-white shadow border-0">
                <div className="card-body text-center">
                  <h6>Interview</h6>
                  <h2>{interviewCount}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-success text-white shadow border-0">
                <div className="card-body text-center">
                  <h6>Selected</h6>
                  <h2>{selectedCount}</h2>
                </div>
              </div>
            </div>

          </div>

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4 className="mb-4">
                Add New Candidate
              </h4>

              <form onSubmit={saveCandidate}>

                <div className="row">

                  <div className="col-md-6">
                    <input
                      className="form-control mb-3"
                      placeholder="Candidate Name"
                      value={candidate.name}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          name: e.target.value
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control mb-3"
                      placeholder="Email"
                      value={candidate.email}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          email: e.target.value
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control mb-3"
                      placeholder="Phone Number"
                      value={candidate.phone}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          phone: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control mb-3"
                      placeholder="Position"
                      value={candidate.position}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          position: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      className="form-control mb-3"
                      placeholder="Experience"
                      value={candidate.experience}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          experience: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control mb-3"
                      placeholder="Expected Salary"
                      value={candidate.expectedSalary}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          expectedSalary: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="date"
                      className="form-control mb-3"
                      value={candidate.interviewDate}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          interviewDate: e.target.value
                        })
                      }
                    />
                  </div>

                  <div className="col-md-6">
                    <select
                      className="form-control mb-3"
                      value={candidate.status}
                      onChange={(e) =>
                        setCandidate({
                          ...candidate,
                          status: e.target.value
                        })
                      }
                    >
                      <option value="APPLIED">APPLIED</option>
                      <option value="INTERVIEW">INTERVIEW</option>
                      <option value="SELECTED">SELECTED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </div>

                </div>

                <button
                  className="btn btn-success"
                  type="submit"
                >
                  Add Candidate
                </button>

              </form>

            </div>

          </div>

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between mb-3">

                <h4>
                  Candidate List
                </h4>

                <input
                  className="form-control w-25"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />

              </div>

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Salary</th>
                    <th>Interview</th>
                    <th>Status</th>
                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredCandidates.map((c) => (

                    <tr key={c.id}>

                      <td>{c.id}</td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.position}</td>
                      <td>{c.experience}</td>
                      <td>₹{c.expectedSalary}</td>
                      <td>{c.interviewDate}</td>

                      <td>

                        <span
                          className={
                            c.status === "SELECTED"
                              ? "badge bg-success"
                              : c.status === "REJECTED"
                              ? "badge bg-danger"
                              : c.status === "INTERVIEW"
                              ? "badge bg-info"
                              : "badge bg-warning text-dark"
                          }
                        >
                          {c.status}
                        </span>

                      </td>

                      <td>

                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() =>
                            updateStatus(
                              c.id,
                              "SELECTED"
                            )
                          }
                        >
                          Select
                        </button>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            updateStatus(
                              c.id,
                              "INTERVIEW"
                            )
                          }
                        >
                          Interview
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteCandidate(
                              c.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Recruitment;