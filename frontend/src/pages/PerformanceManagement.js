import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function PerformanceManagement() {

  const [performances, setPerformances] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    reviewMonth: "",
    kpiScore: "",
    managerComments: ""
  });

  useEffect(() => {

    loadPerformance();

    const interval = setInterval(() => {
      loadPerformance();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  const loadPerformance = async () => {

    try {

      const response =
        await API.get("/performance");

      setPerformances(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const savePerformance = async () => {

    if (
      !formData.employeeId ||
      !formData.employeeName ||
      !formData.reviewMonth ||
      !formData.kpiScore
    ) {

      alert("Please fill all required fields");
      return;

    }

    try {

      await API.post(
        "/performance",
        formData
      );

      alert(
        "Performance Review Saved Successfully"
      );

      setFormData({
        employeeId: "",
        employeeName: "",
        reviewMonth: "",
        kpiScore: "",
        managerComments: ""
      });

      loadPerformance();

    } catch (error) {

      console.error(error);

      alert("Failed to Save Review");

    }

  };

  const filteredData =
    performances.filter(item =>
      item.employeeName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const averageScore =
    performances.length > 0
      ? (
          performances.reduce(
            (sum, p) =>
              sum +
              Number(p.overallScore || 0),
            0
          ) / performances.length
        ).toFixed(1)
      : 0;

  const excellentCount =
    performances.filter(
      p => p.rating === "EXCELLENT"
    ).length;

  const goodCount =
    performances.filter(
      p => p.rating === "GOOD"
    ).length;

  const improvementCount =
    performances.filter(
      p =>
        p.rating === "NEEDS IMPROVEMENT"
    ).length;

  return (

    <div className="d-flex">

      <Sidebar />

      <div
        className="flex-grow-1"
        style={{
          background: "#f4f7fc",
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
                ⭐ Performance Management
              </h2>

              <p>
                Employee Performance Review &
                KPI Analytics
              </p>

            </div>

          </div>

          {/* KPI Cards */}

          <div className="row g-4 mb-4">

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Average Score</h6>

                  <h2 className="text-primary">
                    {averageScore}%
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Excellent</h6>

                  <h2 className="text-success">
                    {excellentCount}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Good</h6>

                  <h2 className="text-info">
                    {goodCount}
                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-3">

              <div className="card shadow border-0">

                <div className="card-body text-center">

                  <h6>Needs Improvement</h6>

                  <h2 className="text-danger">
                    {improvementCount}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Add Review */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <h4 className="mb-3">
                Add Performance Review
              </h4>

              <div className="row g-3">

                <div className="col-md-3">

                  <input
                    type="text"
                    name="employeeId"
                    className="form-control"
                    placeholder="Employee ID"
                    value={formData.employeeId}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-3">

                  <input
                    type="text"
                    name="employeeName"
                    className="form-control"
                    placeholder="Employee Name"
                    value={formData.employeeName}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-3">

                  <input
                    type="month"
                    name="reviewMonth"
                    className="form-control"
                    value={formData.reviewMonth}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-3">

                  <input
                    type="number"
                    name="kpiScore"
                    className="form-control"
                    placeholder="KPI Score"
                    value={formData.kpiScore}
                    onChange={handleChange}
                  />

                </div>

                <div className="col-md-12">

                  <textarea
                    rows="3"
                    name="managerComments"
                    className="form-control"
                    placeholder="Manager Comments"
                    value={formData.managerComments}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <button
                className="btn btn-success mt-3"
                onClick={savePerformance}
              >
                Save Review
              </button>

            </div>

          </div>

          {/* Search */}

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search Employee"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

          </div>

          {/* Table */}

          <div className="card shadow border-0">

            <div className="card-body">

              <h4>
                Performance Reviews
              </h4>

              {

                loading ?

                <h5>Loading...</h5>

                :

                <div className="table-responsive">

                  <table className="table table-hover">

                    <thead className="table-dark">

                      <tr>

                        <th>Employee</th>
                        <th>Month</th>
                        <th>Attendance</th>
                        <th>Task Score</th>
                        <th>Overall</th>
                        <th>Rating</th>

                      </tr>

                    </thead>

                    <tbody>

                      {

                        filteredData.length > 0 ?

                        filteredData.map(item => (

                          <tr key={item.id}>

                            <td>
                              {item.employeeName}
                            </td>

                            <td>
                              {item.reviewMonth}
                            </td>

                            <td>
                              {item.attendanceScore?.toFixed(0)}%
                            </td>

                            <td>
                              {item.taskScore?.toFixed(0)}%
                            </td>

                            <td>

                              <strong>
                                {item.overallScore?.toFixed(0)}%
                              </strong>

                            </td>

                            <td>

                              <span
                                className={
                                  item.rating === "EXCELLENT"
                                    ? "badge bg-success"
                                    : item.rating === "GOOD"
                                    ? "badge bg-primary"
                                    : item.rating === "AVERAGE"
                                    ? "badge bg-warning text-dark"
                                    : "badge bg-danger"
                                }
                              >
                                {item.rating}
                              </span>

                            </td>

                          </tr>

                        ))

                        :

                        <tr>

                          <td
                            colSpan="6"
                            className="text-center"
                          >
                            No Performance Reviews Found
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

export default PerformanceManagement;