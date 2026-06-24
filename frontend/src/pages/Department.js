import React, {
  useEffect,
  useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Department() {

  const [departments, setDepartments] =
    useState([]);

  const [departmentName, setDepartmentName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    loadDepartments();

    const interval =
      setInterval(() => {

        loadDepartments();

      }, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  const loadDepartments =
    async () => {

      try {

        const response =
          await API.get(
            "/departments"
          );

        setDepartments(
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  const saveDepartment =
    async () => {

      if (
        !departmentName.trim()
      ) {

        alert(
          "Department Name Required"
        );

        return;

      }

      try {

        setSaving(true);

        await API.post(
          "/departments",
          {
            departmentName,
            description
          }
        );

        alert(
          "Department Added Successfully"
        );

        setDepartmentName("");
        setDescription("");

        loadDepartments();

      } catch (error) {

        console.error(error);

        alert(
          "Failed To Add Department"
        );

      } finally {

        setSaving(false);

      }

    };

  const deleteDepartment =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete Department?"
        );

      if (!confirmDelete) {

        return;

      }

      try {

        await API.delete(
          `/departments/${id}`
        );

        alert(
          "Department Deleted Successfully"
        );

        loadDepartments();

      } catch (error) {

        console.error(error);

        alert(
          "Delete Failed"
        );

      }

    };

  const filteredDepartments =
    departments.filter(
      (dept) =>

        dept.departmentName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

        ||

        dept.description
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  if (loading) {

    return (

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh"
        }}
      >

        <h3>
          Loading Departments...
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

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h2>
                    🏢 Department Management
                  </h2>

                  <p className="mb-0">
                    Manage Company Departments
                  </p>

                </div>

                <button
                  className="btn btn-light"
                  onClick={
                    loadDepartments
                  }
                >
                  🔄 Refresh
                </button>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="row g-4 mb-4">

            <div className="col-md-4">

              <div
                className="card border-0 shadow"
                style={{
                  height: "140px",
                  borderRadius: "15px"
                }}
              >

                <div className="card-body text-center">

                  <h6>
                    Total Departments
                  </h6>

                  <h2 className="text-primary">

                    {departments.length}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="card border-0 shadow"
                style={{
                  height: "140px",
                  borderRadius: "15px"
                }}
              >

                <div className="card-body text-center">

                  <h6>
                    Active Departments
                  </h6>

                  <h2 className="text-success">

                    {departments.length}

                  </h2>

                </div>

              </div>

            </div>

            <div className="col-md-4">

              <div
                className="card border-0 shadow"
                style={{
                  height: "140px",
                  borderRadius: "15px"
                }}
              >

                <div className="card-body text-center">

                  <h6>
                    System Status
                  </h6>

                  <h2>

                    🟢 Online

                  </h2>

                </div>

              </div>

            </div>

          </div>

          {/* Add Department */}

          <div
            className="card border-0 shadow-lg mb-4"
            style={{
              borderRadius: "20px"
            }}
          >

            <div className="card-body">

              <h4 className="mb-4">
                ➕ Add Department
              </h4>

              <div className="row">

                <div className="col-md-5">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Department Name"
                    value={
                      departmentName
                    }
                    onChange={(e) =>
                      setDepartmentName(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-5">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Department Description"
                    value={
                      description
                    }
                    onChange={(e) =>
                      setDescription(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-2">

                  <button
                    className="btn btn-success w-100"
                    onClick={
                      saveDepartment
                    }
                    disabled={
                      saving
                    }
                  >

                    {
                      saving
                        ? "Saving..."
                        : "Add"
                    }

                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* Department List */}

          <div
            className="card border-0 shadow-lg"
            style={{
              borderRadius: "20px"
            }}
          >

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h4>
                  📋 Department List
                </h4>

                <input
                  type="text"
                  className="form-control"
                  style={{
                    width: "300px"
                  }}
                  placeholder="Search Department"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="table-responsive">

                <table className="table table-hover align-middle">

                  <thead className="table-dark">

                    <tr>

                      <th>ID</th>
                      <th>Department</th>
                      <th>Description</th>
                      <th>Action</th>

                    </tr>

                  </thead>

                  <tbody>

                    {
                      filteredDepartments.length > 0

                        ?

                        filteredDepartments.map(
                          (dept) => (

                            <tr
                              key={
                                dept.id
                              }
                            >

                              <td>
                                {dept.id}
                              </td>

                              <td>

                                <strong>
                                  {
                                    dept.departmentName
                                  }
                                </strong>

                              </td>

                              <td>
                                {
                                  dept.description
                                }
                              </td>

                              <td>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    deleteDepartment(
                                      dept.id
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
                            colSpan="4"
                            className="text-center"
                          >

                            No Departments Found

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

export default Department;