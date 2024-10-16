import "./dashboard-details.style.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardDetails = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [isProfileExpanded, setProfileExpanded] = useState(false); // State to track profile expansion

  useEffect(() => {
    // Retrieve the logged-in user's data from local storage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser); // Set user state with logged-in user data
    }
  }, []);

  // Mapping department value to display
  const departmentMapping = {
    SD: "Software Development",
  };

  // Mapping program value to display
  const programMapping = {
    "2Y": "Diploma (2 years)",
    "1Y": "Diploma (1 year)",
    "6M": "Certificate (6 months)",
  };

  // Toggle profile visibility
  const toggleProfile = () => {
    setProfileExpanded((prev) => !prev);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="user-details">
          <h3 className="dashbord-name">Hello, {user.firstName}</h3>
          <div className="dashbord-details-container">
            <p>
              <strong>Role:</strong>{" "}
              {user.role
                ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                : ""}
            </p>
            {/*Only show Student ID, Department and Program for student */}
            {user.role === "student" && (
              <div>
                <p>
                  <strong>Student ID:</strong> {user.user_id}
                </p>
                <p>
                  <strong>Department:</strong>{" "}
                  {departmentMapping[user.department] || user.department}
                </p>
                <p>
                  <strong>Program:</strong>{" "}
                  {programMapping[user.program] || user.program}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="dashboard-profile-box">
        <div
          className="dashboard-profile-header"
          onClick={toggleProfile}
          style={{ cursor: "pointer" }}
        >
          <em className="dashboard-title">View Profile Information</em>
        </div>
        {isProfileExpanded && ( // Only show details if expanded
          <div className="dashboard-profile-desc">
            <div>
              <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Birthdate: {user.birthday}</p>
              <p>Username: {user.username}</p>
            </div>
          </div>
        )}
      </div>
      <div className="button-container dashboard-profile-box">
        {/* Show buttons based on user role */}
        {user.role === "admin" && (
          <>
            <button
              className="hover dashboard-button"
              onClick={() => navigate(`/admin/dashboard/${user.id}`)}
            >
              Manage Courses
            </button>
            <button
              className="hover dashboard-button"
              onClick={() => navigate(`/admin/student-list/${user.id}`)}
            >
              View Students
            </button>
            <button
              className="hover dashboard-button"
              onClick={() => navigate(`/admin/forms/${user.id}`)}
            >
              View Messages
            </button>
          </>
        )}

        {user.role === "student" && (
          <>
            <button
              className="hover dashboard-button"
              onClick={() => navigate(`/student/dashboard/${user.id}`)}
            >
              Course List
            </button>
            <button
              className="hover dashboard-button"
              onClick={() => navigate(`/student/enrolled-courses/${user.id}`)}
            >
              Enrolled Courses
            </button>
            <button
              className="hover dashboard-button"
              onClick={() => navigate(`/student/message/${user.id}`)}
            >
              Send Message
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardDetails;
