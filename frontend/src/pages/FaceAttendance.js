import React,
{
 useEffect,
 useRef,
 useState
}
from "react";

import Webcam from "react-webcam";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/ApiService";

function FaceAttendance() {

 const webcamRef =
  useRef(null);

 const [statusMessage,
        setStatusMessage] =
        useState("");

 const [stats,
        setStats] =
        useState({

  presentToday: 0,
  absentToday: 0,
  checksToday: 0,
  successRate: 0,
  lastUpdated: null

 });

 const [loading,
        setLoading] =
        useState(true);

 const loadRealtimeStats =
 async () => {

  try {

   const response =
    await API.get(
     "/attendance/face/realtime"
    );

   setStats(
    response.data
   );

  } catch(error){

   console.error(error);

  } finally {

   setLoading(false);

  }
 };

 useEffect(() => {

  loadRealtimeStats();

  const interval =
   setInterval(
    loadRealtimeStats,
    5000
   );

  return () =>
   clearInterval(interval);

 }, []);

 const capture =
 async () => {

  const imageSrc =
   webcamRef.current
   ?.getScreenshot();

  if(!imageSrc){

   setStatusMessage(
    "Camera not detected"
   );

   return;
  }

  try {

   setStatusMessage(
    "Scanning Face..."
   );

   const username =
    localStorage.getItem(
     "username"
    );

   const response =
    await API.post(
     "/attendance/face",
     {
      username,
      image: imageSrc
     }
    );

   setStatusMessage(
    response.data.message
   );

   loadRealtimeStats();

  } catch(error){

   console.error(error);

   setStatusMessage(
    "Face Verification Failed"
   );
  }
 };

 return (

 <div className="d-flex">

  <Sidebar />

  <div className="flex-grow-1">

   <Navbar />

   <div className="container-fluid p-4">

    <h2 className="mb-4">
     Face Attendance
    </h2>

    <div className="row mb-4">

     <div className="col-md-3">

      <div className="card shadow">

       <div className="card-body">

        <h6>
         Present Today
        </h6>

        <h3>
         {stats.presentToday}
        </h3>

       </div>

      </div>

     </div>

     <div className="col-md-3">

      <div className="card shadow">

       <div className="card-body">

        <h6>
         Absent Today
        </h6>

        <h3>
         {stats.absentToday}
        </h3>

       </div>

      </div>

     </div>

     <div className="col-md-3">

      <div className="card shadow">

       <div className="card-body">

        <h6>
         Checks Today
        </h6>

        <h3>
         {stats.checksToday}
        </h3>

       </div>

      </div>

     </div>

     <div className="col-md-3">

      <div className="card shadow">

       <div className="card-body">

        <h6>
         Success Rate
        </h6>

        <h3>
         {stats.successRate}%
        </h3>

       </div>

      </div>

     </div>

    </div>

    <div className="card shadow p-4">

     <h4 className="mb-3">
      Live Camera
     </h4>

     <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width="100%"
      height="400"
     />

     <button
      className=
      "btn btn-success mt-3"
      onClick={capture}
     >
      Mark Attendance
     </button>

     {
      statusMessage &&
      <div
       className=
       "alert alert-info mt-3"
      >
       {statusMessage}
      </div>
     }

    </div>

   </div>

  </div>

 </div>

 );
}

export default FaceAttendance;