import "../styles/home.style.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Simulate fetching data from server
  useEffect(() => {
    // Get program data
    const storedProgramData = localStorage.getItem("programData");
    if (!storedProgramData) {
      // Import the sample program data and store in local storage
      import("../data/program-data").then((module) => {
        localStorage.setItem("programData", JSON.stringify(module.default)); // Store in local storage
      });
    }

    // Get user data
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      // Import the sample user data and store in local storage if it does not exist
      import("../data/user-data").then((module) => {
        localStorage.setItem("userData", JSON.stringify(module.default)); // Store in local storage
      });
    }

    // Get submitted forms
    const storedForms = localStorage.getItem("FormData");
    if (!storedForms) {
      // Import the sample user data and store in local storage if it does not exist
      import("../data/form-data").then((module) => {
        localStorage.setItem("FormData", JSON.stringify(module.default)); // Store in local storage
      });
    }

    // Check if admin mode
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.role === "admin") {
      navigate(`/admin/dashboard/${loggedInUser.id}`); // Redirect to admin dashboard
    }
    if (loggedInUser && loggedInUser.role === "student") {
      navigate(`/student/dashboard/${loggedInUser.id}`); // Redirect to student dashboard
    }
  }, []);

  return (
    <>
      <div className="front-page-containter">
        <h1 className="front-page-header ">
          Welcome to Bow Course Registration System
        </h1>
        <p className="front-page-description">
          Bow Valley College is located in the heart of downtown Calgary, one of
          the biggest cities in Canada. Located at the foot of the Canadian
          Rockies, and just 1 hour away from world famous Banff National Park
          and Lake Louise, you can finish your classes at 5 and be in the
          mountains by 6. Named the third most livable city in the world in
          2023, Calgary is also Canada's sunniest city, and the cleanest city in
          the world. With almost a quarter of Calgary's population being
          foreign-born, you'll feel at home in this cosmopolitan and diverse
          city.
        </p>
        <p className="view-programs-link" onClick={() => navigate(`/program`)}>View availale programs</p>
      </div>
    </>
  );
};

export default Home;
