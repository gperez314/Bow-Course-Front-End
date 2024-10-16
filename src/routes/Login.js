import "../styles/login-page.style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login_API } from "../functions/Frontend-API";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [sucessMessage, setsucessMessage] = useState(""); // State to store success message

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setsucessMessage(""); // Reset success message

    // Login user using provided credentials
    const user = login_API(username, password) 

    if (user) {
      // Successful login, navigate to dashboard
      localStorage.setItem("loggedInUser", JSON.stringify(user)); // Store logged-in user
      setsucessMessage("Login successful!");
      setTimeout(() => {
        if (user.role === "admin")
          navigate(`/admin/dashboard/${user.id}`); // Redirect to admin dashboard
        else
        navigate(`/student/dashboard/${user.id}`); // Redirect to student dashboard
      }, 500);
    } else {
      // Set error message if login fails
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <>
      <div className="login-div">
        <div className="login-box-container">
          <form className="login-box" onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="login-button hover">Login</button>
            {/* Conditionally render error message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* Conditionally render sucess message */}
            {sucessMessage && (
              <p className="success-message">{sucessMessage}</p>
            )}
          </form>
        </div>
        <div className="have-account-bar">
          Don't have an account? Sign up{" "}
          <button className="hover" onClick={() => navigate(`/signup`)}>
            Here
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
