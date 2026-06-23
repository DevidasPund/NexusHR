import React, {
useEffect,
useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function EmployeeAttendance() {

const [attendance,
setAttendance] =
useState([]);

const [employee,
setEmployee] =
useState({});

const [currentTime,
setCurrentTime] =
useState(new Date());

useEffect(() => {


loadEmployee();

const clock =
  setInterval(() => {

    setCurrentTime(
      new Date()
    );

  }, 1000);

const refresh =
  setInterval(() => {

    const employeeId =
      localStorage.getItem(
        "employeeId"
      );

    if(employeeId){

      loadAttendance(
        employeeId
      );
    }

  }, 5000);

return () => {

  clearInterval(clock);
  clearInterval(refresh);

};


}, []);

const loadEmployee =
async () => {


try {

  const employeeId =
    localStorage.getItem(
      "employeeId"
    );

  const response =
    await API.get(
      `/employees/${employeeId}`
    );

  setEmployee(
    response.data
  );

  loadAttendance(
    employeeId
  );

} catch(error){

  console.error(error);
}


};

const loadAttendance =
async(employeeId) => {


try {

  const response =
    await API.get(
      `/attendance/employee/${employeeId}`
    );

  setAttendance(
    response.data
  );

} catch(error){

  console.error(error);
}


};

const checkIn =
async () => {


try {

  await API.post(
    `/attendance/checkin/${employee.id}`
  );

  alert(
    "Checked In Successfully"
  );

  loadAttendance(
    employee.id
  );

} catch(error){

  alert(
    error.response?.data ||
    "Already Checked In Today"
  );
}


};

const checkOut =
async () => {


try {

  await API.post(
    `/attendance/checkout/${employee.id}`
  );

  alert(
    "Checked Out Successfully"
  );

  loadAttendance(
    employee.id
  );

} catch(error){

  alert(
    error.response?.data ||
    "Already Checked Out Today"
  );
}


};

const today =
new Date()
.toISOString()
.split("T")[0];

const todayAttendance =
attendance.find(
a =>
a.attendanceDate ===
today
);

const presentDays =
attendance.filter(
a =>
a.status ===
"PRESENT"
).length;

return (


<div className="d-flex">

  <Sidebar />

  <div className="flex-grow-1">

    <Navbar />

    <div className="container-fluid p-4">

      <h2 className="fw-bold mb-4">
        🕒 Employee Attendance
      </h2>

      <div className="card shadow border-0 mb-4">

        <div className="card-body text-center">

          <h1 className="fw-bold">
            {
              currentTime
              .toLocaleTimeString()
            }
          </h1>

          <h5>
            {
              currentTime
              .toDateString()
            }
          </h5>

        </div>

      </div>

      <div className="row mb-4">

        <div className="col-md-3">

          <div className="card bg-success text-white shadow">

            <div className="card-body">

              <h6>
                Present Days
              </h6>

              <h2>
                {presentDays}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-primary text-white shadow">

            <div className="card-body">

              <h6>
                Employee
              </h6>

              <h5>
                {employee.firstName}
              </h5>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-warning shadow">

            <div className="card-body">

              <h6>
                Department
              </h6>

              <h5>
                {employee.department}
              </h5>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-info text-white shadow">

            <div className="card-body">

              <h6>
                Today's Status
              </h6>

              <h5>
                {
                  todayAttendance
                  ?
                  "PRESENT"
                  :
                  "ABSENT"
                }
              </h5>

            </div>

          </div>

        </div>

      </div>

      <div className="card shadow border-0 mb-4">

        <div className="card-body">

          <h4 className="mb-3">
            Today's Attendance
          </h4>

          <button
            className="btn btn-success me-3"
            onClick={checkIn}
            disabled={
              todayAttendance
            }
          >
            ✅ Check In
          </button>

          <button
            className="btn btn-danger"
            onClick={checkOut}
            disabled={
              !todayAttendance ||
              todayAttendance.checkOutTime
            }
          >
            ❌ Check Out
          </button>

        </div>

      </div>

      <div className="card shadow border-0">

        <div className="card-body">

          <h4 className="mb-3">
            Attendance History
          </h4>

          <table className="table table-hover table-bordered">

            <thead className="table-dark">

              <tr>

                <th>ID</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {
                attendance.length > 0 ?

                attendance.map(
                (a) => (

                  <tr key={a.id}>

                    <td>{a.id}</td>

                    <td>
                      {a.attendanceDate}
                    </td>

                    <td>
                      {a.checkInTime}
                    </td>

                    <td>
                      {
                        a.checkOutTime
                        || "-"
                      }
                    </td>

                    <td>

                      <span
                        className={
                          a.status ===
                          "PRESENT"
                          ?
                          "badge bg-success"
                          :
                          "badge bg-danger"
                        }
                      >
                        {a.status}
                      </span>

                    </td>

                  </tr>

                ))

                :

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >
                    No Attendance Found
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

export default EmployeeAttendance;
