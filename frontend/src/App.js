import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import WelcomePage from "./components/welcomePage";
import RegistrationPage from "./components/registrationPage";
import LoginPage from "./components/loginPage";
import ToDoApp from "./components/toDoApp";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Welcome Page */}
          <Route path="/" element={<WelcomePage />} />

          {/* Registration Page */}
          <Route path="/register" element={<RegistrationPage />} />

          {/* Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Todo List Page */}
          <Route
            path="/todo"
            element={<ProtectedRoute component={ToDoApp} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

// Protected Route for accessing Todo List page only if user is authenticated
const ProtectedRoute = ({ component: Component }) => {
  const token = localStorage.getItem("token");
  return token ? <Component /> : <Navigate to="/login" />;
};

export default App;
