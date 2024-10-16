import "../styles/signup-page.style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup_API } from "../functions/Frontend-API";

const Signup = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const [sucessMessage, setsucessMessage] = useState(""); // State to store success message
  // States to handle form data
  const [formData, setFormData] = useState({
    role: "student",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    department: "SD",
    program: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Handler for input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setsucessMessage(""); // Reset success message

    // Validate phone number format
    if (!/^\d+$/.test(formData.phone)) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    // Register new user to database
    signup_API(formData);

    // Redirect to login page
    setsucessMessage("Registered successfully!");
    setTimeout(() => {
      navigate("/login"); // Redirect to login-page
    }, 1500);
  };

  return (
    <>
      <div className="signup-div">
        <div className="signup-box-container">
          <form className="signup-box" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="date"
                id="birthday"
                value={formData.birthday}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="SD">Software Development</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="program">Program</label>
              <select
                id="program"
                value={formData.program}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select program
                </option>
                <option value="2Y">Diploma (2 years)</option>
                <option value="1Y">Diploma (1 year)</option>
                <option value="6M">Certificate (6 months)</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Re-type Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button className="signup-button hover" type="submit">
              Sign up
            </button>
            {/* Conditionally render error message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {/* Conditionally render sucess message */}
            {sucessMessage && (
              <p className="success-message">{sucessMessage}</p>
            )}
          </form>
        </div>
        <div className="have-account-bar">
          Already have an account? Log in{" "}
          <button className="hover" onClick={() => navigate(`/login`)}>
            Here
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
