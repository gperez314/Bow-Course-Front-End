import React, { useState, useEffect } from "react";
import DashboardDetails from "../components/dashboard-details/DashBoardDetails.component";
import StudentListView from "../components/student-list/StudentListView.component";

const StudentList = () => {
  const [students, setStudents] = useState([]); // State to store the students data

  // Simulate fetching data from local storage
  useEffect(() => {
    // Get user data
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    // Check if userData is not null before filtering
    if (storedUserData) {
      // Filter only those with the role of "student"
      const filteredStudents = storedUserData.filter(
        (user) => user.role === "student"
      );
      setStudents(filteredStudents);
    }
  }, []);

  return (
    <>
      <DashboardDetails />
      <StudentListView students={students} />
    </>
  );
};

export default StudentList;
