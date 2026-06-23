import React, {
useEffect,
useState
} from "react";

import API from "../services/ApiService";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Ratings() {

const [ratings,
setRatings] =
useState([]);

const [search,
setSearch] =
useState("");

const [rating,
setRating] =
useState({


employeeName: "",
attendanceScore: "",
projectScore: "",
managerFeedback: "",
finalRating: 0


});

useEffect(() => {


loadRatings();

const interval =
  setInterval(
    loadRatings,
    5000
  );

return () =>
  clearInterval(
    interval
  );


}, []);

const loadRatings =
async () => {


try {

  const response =
  await API.get(
    "/rating"
  );

  setRatings(
    response.data
  );

} catch(error){

  console.error(error);
}


};

const saveRating =
async(e)=>{


e.preventDefault();

try{

  const finalRating =

  (
    Number(
      rating.attendanceScore
    )
    +
    Number(
      rating.projectScore
    )
  ) / 2;

  await API.post(
    "/rating",
    {
      ...rating,
      finalRating
    }
  );

  alert(
    "Rating Saved Successfully"
  );

  setRating({

    employeeName: "",
    attendanceScore: "",
    projectScore: "",
    managerFeedback: "",
    finalRating: 0

  });

  loadRatings();

}catch(error){

  console.error(error);

  alert(
    "Failed To Save Rating"
  );
}


};

const filteredRatings =
ratings.filter((r)=>


r.employeeName
?.toLowerCase()
.includes(
  search.toLowerCase()
)

);

return (


<div className="d-flex">

  <Sidebar />

  <div className="flex-grow-1">

    <Navbar />

    <div className="container-fluid p-4">

      <h2 className="text-primary mb-4">

        ⭐ Employee Performance Ratings

      </h2>

      <div className="row mb-4">

        <div className="col-md-3">

          <div className="card bg-primary text-white shadow">

            <div className="card-body text-center">

              <h6>
                Total Reviews
              </h6>

              <h2>
                {ratings.length}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-success text-white shadow">

            <div className="card-body text-center">

              <h6>
                Excellent
              </h6>

              <h2>

                {
                  ratings.filter(
                    r =>
                    r.finalRating >= 90
                  ).length
                }

              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-warning shadow">

            <div className="card-body text-center">

              <h6>
                Good
              </h6>

              <h2>

                {
                  ratings.filter(
                    r =>
                    r.finalRating >= 70 &&
                    r.finalRating < 90
                  ).length
                }

              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-3">

          <div className="card bg-danger text-white shadow">

            <div className="card-body text-center">

              <h6>
                Average
              </h6>

              <h2>

                {
                  ratings.filter(
                    r =>
                    r.finalRating < 70
                  ).length
                }

              </h2>

            </div>

          </div>

        </div>

      </div>

      <div className="card shadow p-4">

        <h3 className="mb-4">
          Add Employee Rating
        </h3>

        <form
          onSubmit={
            saveRating
          }
        >

          <input
            className=
            "form-control mb-3"
            placeholder=
            "Employee Name"
            value={
              rating.employeeName
            }
            onChange={(e)=>
              setRating({

                ...rating,

                employeeName:
                e.target.value

              })
            }
            required
          />

          <input
            type="number"
            className=
            "form-control mb-3"
            placeholder=
            "Attendance Score"
            value={
              rating.attendanceScore
            }
            onChange={(e)=>
              setRating({

                ...rating,

                attendanceScore:
                e.target.value

              })
            }
            required
          />

          <input
            type="number"
            className=
            "form-control mb-3"
            placeholder=
            "Project Score"
            value={
              rating.projectScore
            }
            onChange={(e)=>
              setRating({

                ...rating,

                projectScore:
                e.target.value

              })
            }
            required
          />

          <textarea
            className=
            "form-control mb-3"
            placeholder=
            "Manager Feedback"
            value={
              rating.managerFeedback
            }
            onChange={(e)=>
              setRating({

                ...rating,

                managerFeedback:
                e.target.value

              })
            }
          />

          <button
            className=
            "btn btn-primary"
          >
            Save Rating
          </button>

        </form>

      </div>

      <div className="card shadow mt-4 p-4">

        <div className="d-flex justify-content-between mb-3">

          <h3>
            Ratings History
          </h3>

          <input
            className=
            "form-control w-25"
            placeholder=
            "Search Employee"
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <table
          className=
          "table table-bordered table-hover"
        >

          <thead
            className=
            "table-dark"
          >

            <tr>

              <th>
                Employee
              </th>

              <th>
                Attendance
              </th>

              <th>
                Project
              </th>

              <th>
                Final Rating
              </th>

              <th>
                Performance
              </th>

              <th>
                Feedback
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredRatings.map(
              (r)=>(

              <tr
                key={r.id}
              >

                <td>
                  {r.employeeName}
                </td>

                <td>
                  {r.attendanceScore}
                </td>

                <td>
                  {r.projectScore}
                </td>

                <td>

                  <span
                    className={
                      r.finalRating >= 90
                      ?
                      "badge bg-success"
                      :
                      r.finalRating >= 70
                      ?
                      "badge bg-primary"
                      :
                      "badge bg-danger"
                    }
                  >

                    {r.finalRating}

                  </span>

                </td>

                <td>

                  {
                    r.finalRating >= 90
                    ?
                    "Excellent"
                    :
                    r.finalRating >= 70
                    ?
                    "Good"
                    :
                    "Needs Improvement"
                  }

                </td>

                <td>
                  {r.managerFeedback}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </div>

</div>


);
}

export default Ratings;
