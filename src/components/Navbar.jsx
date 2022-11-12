import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ setUserData, setUserToDos }) => {
  return (
    <nav>
      <Link
        to="/"
        onClick={() => {
          setUserData({});
          setUserToDos([]);
        }}
      >
        Logout
      </Link>
    </nav>
  );
};

export default Navbar;
