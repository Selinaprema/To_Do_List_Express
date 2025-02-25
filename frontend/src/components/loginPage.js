import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token); // Save token in local storage
      setSuccessMessage("Taking you to your todos...");
      setErrorMessage(""); // Clear any previous error message
      setTimeout(() => navigate("/todo"), 2000); // Redirect after 2 seconds
    } else {
      setErrorMessage(data.message); // Show error message
      setSuccessMessage(""); // Clear success message
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>

      {/* Display success or error messages */}
      {successMessage && <div className="success">{successMessage}</div>}
      {errorMessage && <div className="error">{errorMessage}</div>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email (@gmail.com)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
