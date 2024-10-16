import "./header.style.css";
import { useNavigate } from "react-router-dom";
import logo from "./img/icon.png";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = JSON.parse(localStorage.getItem("loggedInUser")) != null;

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove logged-in user from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <div className="homepageHeader">
        <div className="logoContainer" onClick={() => navigate(`/`)}>
          <img src={logo} alt="" id="logo" />
        </div>
        <div className="titleHeader" onClick={() => navigate(`/`)}>
          <p>Bow Course Registration</p>
        </div>
        <div className="header-container">
          {isLoggedIn ? (
            // Render the logout button if logged in
            <button className="logout-button hover" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            // Render the login/signup buttons if not logged in
            <>
              {/* Render signup and login buttons */}
              <div className="homeSignupLoginSquare">
                <button className="hover" onClick={() => navigate(`/signup`)}>
                  Signup
                </button>
                <button className="hover" onClick={() => navigate(`/login`)}>
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
