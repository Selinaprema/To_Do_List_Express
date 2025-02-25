import React from "react";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to the To-Do App</h1>
      <div className="welcome-buttons">
        <Link to="/register" className="btn">
          Register
        </Link>
        <Link to="/login" className="btn">
          Login
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
