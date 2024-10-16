import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardDetails from "../components/dashboard-details/DashBoardDetails.component";
import CourseList from "../components/course-list/CourseList.component";

const Courses = () => {
  const { id } = useParams();

  const [adminMode, setAdminMode] = useState(false); // State to store access modec
  const [course, setCourse] = useState([]); // State to store the course

  // Simulate fetching data from a server
  useEffect(() => {
    // Check if admin mode
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.role) {
      setAdminMode(loggedInUser.role === "admin");
    } else {
      setAdminMode(false);
    }

    setCourse(JSON.parse(localStorage.getItem("programData"))[id - 1].course);
  }, [id]);

  return (
    <>
      {/* Render DashboardDetails only  in admin mode */}
      {adminMode && <DashboardDetails />}
      {/* Load ProgramList depending on mode */}
      <CourseList courses={course} adminMode={adminMode} />
    </>
  );
};

export default Courses;
