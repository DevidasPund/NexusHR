import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Ratings() {

  const [ratings, setRatings] = useState([]);
  const [search, setSearch] = useState("");

  const [rating, setRating] = useState({
    employeeName: "",
    attendanceScore: "",
    projectScore: "",
    managerFeedback: "",
    finalRating: 0
  });

  useEffect(() => {

    loadRatings();

    const interval = setInterval(() => {
      loadRatings();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadRatings = async () => {

    try {

      const response = await API.get("/rating");

      setRatings(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const saveRating = async (e) => {

    e.preventDefault();

    try {

      const finalRating =
        (
          Number(rating.attendanceScore) +
          Number(rating.projectScore)
        ) / 2;

      await API.post("/rating", {
        ...rating,
        finalRating
      });

      alert("Rating Saved Successfully");

      setRating({
        employeeName: "",
        attendanceScore: "",
        projectScore: "",
        managerFeedback: "",
        finalRating: 0
      });

      loadRatings();

    } catch (error) {

      console.error(error);

      alert("Failed To Save Rating");

    }
  };

  const deleteRating = async (id) => {

    if (!window.confirm("Delete Rating?")) {
      return;
    }

    try {

      await API.delete(`/rating/${id}`);

      loadRatings();

    } catch (error) {

      console.error(error);

    }
  };

  const filteredRatings = ratings.filter((r) =>
    r.employeeName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce(
            (sum, r) =>
              sum + Number(r.finalRating || 0),
            0
          ) / ratings.length
        ).toFixed(1)
      : 0;

  const topPerformers =
    ratings.filter(
      (r) => r.finalRating >= 90
    ).length;

  const goodPerformers =
    ratings.filter(
      (r) =>
        r.finalRating >= 70 &&
        r.finalRating < 90
    ).length;

  const lowPerformers =
    ratings.filter(
      (r) => r.finalRating < 70
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
                ⭐ Employee Ratings
              </h2>

              <p>
                Performance Evaluation &
                Analytics Dashboard
              </p>

            </div>
          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="card bg-primary text-white shadow border-0">
                <div className="card-body text-center">
                  <h6>Total Reviews</h6>
                  <h2>{ratings.length}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-success text-white shadow border-0">
                <div className="card-body text-center">
                  <h6>Top Performers</h6>
                  <h2>{topPerformers}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-warning shadow border-0">
                <div className="card-body text-center">
                  <h6>Good Performers</h6>
                  <h2>{goodPerformers}</h2>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card bg-info text-white shadow border-0">
                <div className="card-body text-center">
                  <h6>Average Rating</h6>
                  <h2>{averageRating}%</h2>
                </div>
              </div>
            </div>

          </div>

          {/* Add Rating */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4 className="mb-4">
                Add Employee Rating
              </h4>

              <form onSubmit={saveRating}>

                <div className="row g-3">

                  <div className="col-md-6">
                    <input
                      className="form-control"
                      placeholder="Employee Name"
                      value={rating.employeeName}
                      onChange={(e) =>
                        setRating({
                          ...rating,
                          employeeName:
                            e.target.value
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Attendance Score"
                      value={rating.attendanceScore}
                      onChange={(e) =>
                        setRating({
                          ...rating,
                          attendanceScore:
                            e.target.value
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Project Score"
                      value={rating.projectScore}
                      onChange={(e) =>
                        setRating({
                          ...rating,
                          projectScore:
                            e.target.value
                        })
                      }
                      required
                    />
                  </div>

                  <div className="col-md-12">
                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="Manager Feedback"
                      value={rating.managerFeedback}
                      onChange={(e) =>
                        setRating({
                          ...rating,
                          managerFeedback:
                            e.target.value
                        })
                      }
                    />
                  </div>

                </div>

                <button
                  className="btn btn-primary mt-3"
                >
                  Save Rating
                </button>

              </form>

            </div>

          </div>

          {/* Ratings History */}

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between mb-3">

                <h4>
                  Ratings History
                </h4>

                <input
                  className="form-control"
                  style={{ width: "300px" }}
                  placeholder="Search Employee..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

              </div>

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-dark">

                    <tr>
                      <th>Employee</th>
                      <th>Attendance</th>
                      <th>Project</th>
                      <th>Final Rating</th>
                      <th>Performance</th>
                      <th>Feedback</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredRatings.length > 0 ? (

                      filteredRatings.map((r) => (

                        <tr key={r.id}>

                          <td>{r.employeeName}</td>

                          <td>{r.attendanceScore}</td>

                          <td>{r.projectScore}</td>

                          <td>

                            <span
                              className={
                                r.finalRating >= 90
                                  ? "badge bg-success"
                                  : r.finalRating >= 70
                                  ? "badge bg-primary"
                                  : "badge bg-danger"
                              }
                            >
                              {r.finalRating}
                            </span>

                          </td>

                          <td>

                            {r.finalRating >= 90
                              ? "Excellent"
                              : r.finalRating >= 70
                              ? "Good"
                              : "Needs Improvement"}

                          </td>

                          <td>
                            {r.managerFeedback}
                          </td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteRating(r.id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))

                    ) : (

                      <tr>

                        <td
                          colSpan="7"
                          className="text-center"
                        >
                          No Ratings Found
                        </td>

                      </tr>

                    )}

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

export default Ratings;