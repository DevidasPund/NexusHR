import React, {
 useEffect,
 useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Attendance() {

 const [attendance,
        setAttendance] =
        useState([]);

 const [employeeId,
        setEmployeeId] =
        useState(null);

 const [loading,
        setLoading] =
        useState(true);

 useEffect(() => {

  loadAttendance();

 }, []);

 const loadAttendance =
 async () => {

  try {

   const username =
    localStorage.getItem(
     "username"
    );

   const employeeResponse =
    await API.get(
     `/employees/username/${username}`
    );

  const employeeId =
 employeeResponse.data;

setEmployeeId(
 employeeId
);

const response =
 await API.get(
  `/attendance/employee/${employeeId}`
);

   setAttendance(
    response.data
   );

  } catch(error){

   console.error(
    error
   );

  } finally {

   setLoading(false);

  }
 };

 const checkIn =
 async () => {

  try {

   await API.post(
    `/attendance/checkin/${employeeId}`
   );

   alert(
    "Check In Successful"
   );

   loadAttendance();

  } catch(error){

   console.error(
    error
   );

   alert(
    "Already Checked In"
   );
  }
 };

 const checkOut =
 async () => {

  try {

   await API.post(
    `/attendance/checkout/${employeeId}`
   );

   alert(
    "Check Out Successful"
   );

   loadAttendance();

  } catch(error){

   console.error(
    error
   );

   alert(
    "Check In First"
   );
  }
 };

 if(loading){

  return(

   <div className="text-center mt-5">

    <h3>
     Loading...
    </h3>

   </div>

  );
 }

 return (

 <div className="d-flex">

  <Sidebar />

  <div className="flex-grow-1">

   <Navbar />

   <div className="container-fluid p-4">

    <h2 className="mb-4">
     Attendance Management
    </h2>

    <div className="card shadow p-4 mb-4">

     <h4 className="mb-3">
      Today's Attendance
     </h4>

     <div>

      <button
       className=
       "btn btn-success me-3"
       onClick={
        checkIn
       }
      >
       Check In
      </button>

      <button
       className=
       "btn btn-danger"
       onClick={
        checkOut
       }
      >
       Check Out
      </button>

     </div>

    </div>

    <div className="card shadow p-4">

     <h4 className="mb-3">
      Attendance History
     </h4>

     <table
      className=
      "table table-bordered table-hover"
     >

      <thead
       className=
       "table-dark"
      >

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
        attendance.length > 0

        ?

        attendance.map(
         (att) => (

         <tr
          key={att.id}
         >

          <td>
           {att.id}
          </td>

          <td>
           {att.attendanceDate}
          </td>

          <td>
           {
            att.checkInTime ||
            "-"
           }
          </td>

          <td>
           {
            att.checkOutTime ||
            "-"
           }
          </td>

          <td>

           <span
            className={
             att.status ===
             "PRESENT"

             ?

             "badge bg-success"

             :

             "badge bg-danger"
            }
           >

            {att.status}

           </span>

          </td>

         </tr>

        ))

        :

        <tr>

         <td
          colSpan="5"
          className=
          "text-center"
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

 );
}

export default Attendance;