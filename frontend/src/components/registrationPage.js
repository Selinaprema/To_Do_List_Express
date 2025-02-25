import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage(
        "You have successfully registered, redirecting you to login..."
      );
      setErrorMessage(""); // Clear previous error messages
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } else {
      setErrorMessage(data.message);
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="registration-page">
      <h2>Register</h2>

      {/* Display success or error messages */}
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email (@gmail.com)"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
