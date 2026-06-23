import React, { useEffect, useState } from "react";
import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Department() {

  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {

    try {

      const response =
        await API.get("/departments");

      setDepartments(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  };

  const saveDepartment = async () => {

    if (!departmentName.trim()) {

      alert(
        "Department Name Required"
      );

      return;
    }

    try {

      await API.post(
        "/departments",
        {
          departmentName,
          description
        }
      );

      setDepartmentName("");
      setDescription("");

      loadDepartments();

      alert(
        "Department Added Successfully"
      );

    } catch (error) {

      console.error(error);
    }
  };

  const deleteDepartment = async (id) => {

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

      loadDepartments();

    } catch (error) {

      console.error(error);
    }
  };

  const filteredDepartments =
    departments.filter((dept) =>
      dept.departmentName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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
                Department Management 🏢
              </h2>

              <p className="mb-0">
                Manage all company departments
              </p>

            </div>

          </div>

          <div className="row mb-4">

            <div className="col-md-4">

              <div className="card bg-primary text-white shadow">

                <div className="card-body text-center">

                  <h6>
                    Total Departments
                  </h6>

                  <h2>
                    {departments.length}
                  </h2>

                </div>

              </div>

            </div>

          </div>

          <div className="card shadow border-0 mb-4">

            <div className="card-body">

              <div className="row">

                <div className="col-md-5">

                  <input
                    className="form-control"
                    placeholder="Department Name"
                    value={departmentName}
                    onChange={(e) =>
                      setDepartmentName(
                        e.target.value
                      )
                    }
                  />

                </div>

                <div className="col-md-5">

                  <input
                    className="form-control"
                    placeholder="Department Description"
                    value={description}
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
                  >
                    Add Department
                  </button>

                </div>

              </div>

            </div>

          </div>

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between mb-3">

                <h4>
                  Department List
                </h4>

                <input
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

              <table className="table table-hover">

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
                    filteredDepartments.length > 0 ?

                      filteredDepartments.map(
                        (dept) => (

                          <tr key={dept.id}>

                            <td>
                              {dept.id}
                            </td>

                            <td>
                              {dept.departmentName}
                            </td>

                            <td>
                              {dept.description}
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

  );
}

export default Department;