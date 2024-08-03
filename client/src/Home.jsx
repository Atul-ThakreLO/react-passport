import React from "react";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <NavLink to="/login">Login</NavLink>
    </div>
  );
}

export default Home;