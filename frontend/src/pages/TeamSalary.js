import React,
{
 useEffect,
 useState
}
from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function TeamSalary() {

 const [employees,
        setEmployees] =
        useState([]);

 const [search,
        setSearch] =
        useState("");

 const [totalSalary,
        setTotalSalary] =
        useState(0);

 useEffect(() => {

  loadEmployees();

 }, []);

 const loadEmployees =
 async() => {

  try{

   const response =
    await API.get(
     "/employees"
    );

   setEmployees(
    response.data
   );

   const total =
    response.data.reduce(
     (sum, emp) =>
      sum +
      (emp.salary || 0),
     0
    );

   setTotalSalary(
    total
   );

  }catch(error){

   console.error(error);
  }
 };

 const filteredEmployees =
  employees.filter(
   emp =>

   `${emp.firstName}
    ${emp.lastName}`
   .toLowerCase()
   .includes(
    search.toLowerCase()
   )
  );

 return(

 <div className="d-flex">

  <Sidebar />

  <div className="flex-grow-1">

   <Navbar />

   <div className="container-fluid p-4">

    <h2 className="fw-bold mb-4">
     💰 Team Salary Report
    </h2>

    {/* Summary Cards */}

    <div className="row mb-4">

     <div className="col-md-4">

      <div className="card bg-primary text-white shadow">

       <div className="card-body text-center">

        <h6>
         Team Members
        </h6>

        <h2>
         {employees.length}
        </h2>

       </div>

      </div>

     </div>

     <div className="col-md-4">

      <div className="card bg-success text-white shadow">

       <div className="card-body text-center">

        <h6>
         Total Salary
        </h6>

        <h2>
         ₹{totalSalary}
        </h2>

       </div>

      </div>

     </div>

     <div className="col-md-4">

      <div className="card bg-warning shadow">

       <div className="card-body text-center">

        <h6>
         Average Salary
        </h6>

        <h2>
         ₹{
          employees.length
          ?
          Math.round(
           totalSalary /
           employees.length
          )
          : 0
         }
        </h2>

       </div>

      </div>

     </div>

    </div>

    {/* Search */}

    <div className="card shadow mb-4">

     <div className="card-body">

      <input
       type="text"
       className="form-control"
       placeholder="Search Employee..."
       value={search}
       onChange={(e)=>
        setSearch(
         e.target.value
        )
       }
      />

     </div>

    </div>

    {/* Salary Table */}

    <div className="card shadow">

     <div className="card-body">

      <table
       className=
       "table table-hover"
      >

       <thead>

        <tr>

         <th>ID</th>
         <th>Name</th>
         <th>Department</th>
         <th>Designation</th>
         <th>Salary</th>
         <th>Status</th>

        </tr>

       </thead>

       <tbody>

        {
         filteredEmployees.map(
         emp => (

         <tr key={emp.id}>

          <td>
           {emp.id}
          </td>

          <td>
           {emp.firstName}
           {" "}
           {emp.lastName}
          </td>

          <td>
           {emp.department}
          </td>

          <td>
           {emp.designation}
          </td>

          <td>
           ₹{emp.salary}
          </td>

          <td>

           <span
            className=
            "badge bg-success"
           >

            {emp.status}

           </span>

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

 </div>

 );
}

export default TeamSalary;