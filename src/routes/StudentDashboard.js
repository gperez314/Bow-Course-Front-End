import React, { useState, useEffect } from "react";
import DashboardDetails from "../components/dashboard-details/DashBoardDetails.component";
import StudentCourseList from "../components/student-course-list/StudentCourseList.component";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]); // State to store the courses data

  // Simulate fetching data from server
  useEffect(() => {
    // Get program data from localStorage
    const storedProgramData = localStorage.getItem("programData");
    const programData = JSON.parse(storedProgramData);

    // Get student data from localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    const studentData = JSON.parse(loggedInUser);

    // Filter the courses applicable based on student program
    if (programData && studentData) {
      const filteredProgram = programData.filter(
        (program) =>
          program.department === studentData.department &&
          program.program === studentData.program
      );
      setCourses(filteredProgram.flatMap((program) => program.course));
    }
  }, []);

  return (
    <>
      <DashboardDetails />
      <StudentCourseList courses={courses} enrolled={false}/>
    </>
  );
};

export default StudentDashboard;
