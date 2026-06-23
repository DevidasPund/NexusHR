import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.clear();

    navigate("/");
  };

  return (

    <nav className="navbar navbar-dark bg-dark px-4">

      <h4 className="text-white">
        NexusHR
      </h4>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;