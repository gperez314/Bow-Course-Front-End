import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DashboardDetails from "../components/dashboard-details/DashBoardDetails.component";
import StudentCourseList from "../components/student-course-list/StudentCourseList.component";

const EnrolledCourses = () => {
  const { id } = useParams();

  const [courses, setCourses] = useState([]); // State to store the courses data

  // Simulate fetching data from server
  useEffect(() => {
    // Retrieve the user data list from localStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    // Find the student based on the student ID
    const student = userData[id - 1];
    // Filter the courses enrolled by the student
    setCourses(student.courses);
  }, []);

  return (
    <>
      <DashboardDetails />
      <StudentCourseList courses={courses} enrolled={true} />
    </>
  );
};

export default EnrolledCourses;
