import React,
{
 useEffect,
 useState
}
from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Performance(){

 const [data,
        setData] =
        useState([]);

 useEffect(()=>{

  API.get(
   "/performance"
  )
  .then(res=>
    setData(
      res.data
    )
  );

 },[]);

 return(

  <div className="d-flex">

   <Sidebar/>

   <div className="flex-grow-1">

    <Navbar/>

    <div className="container p-4">

      <div className="card shadow p-4">

       <h2>
        Team Performance
       </h2>

       <table
        className=
        "table"
       >

        <thead>

         <tr>

          <th>Name</th>
          <th>Rating</th>

         </tr>

        </thead>

        <tbody>

         {
          data.map(
          (emp)=>(
          <tr
           key={emp.id}
          >
           <td>
            {emp.firstName}
           </td>
           <td>
            {emp.rating}
           </td>
          </tr>
         ))
         }

        </tbody>

       </table>

      </div>

    </div>

   </div>

  </div>
 );
}

export default Performance;