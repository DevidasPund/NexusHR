import React,
{
 useEffect,
 useState
}
from "react";

function Navbar() {

 const [count,
        setCount] =
        useState(0);

 useEffect(() => {

  loadCount();

  window.addEventListener(
   "notification-update",
   loadCount
  );

  return () => {

   window.removeEventListener(
    "notification-update",
    loadCount
   );

  };

 }, []);

 const loadCount = () => {

  const notifications =
   JSON.parse(
    localStorage.getItem(
     "notifications"
    ) || "[]"
   );

  setCount(
   notifications.length
  );

 };

 return (

 <div className=
 "navbar navbar-light bg-white shadow-sm px-4">

  <h4>
   NexusHR
  </h4>

  <div className=
  "position-relative">

   <span
    style={{
     fontSize:"28px",
     cursor:"pointer"
    }}
   >
    🔔
   </span>

   {
    count > 0 && (

    <span
     className=
     "badge bg-danger position-absolute top-0 start-100 translate-middle"
    >

     {count}

    </span>

    )
   }

  </div>

 </div>

 );
}

export default Navbar;