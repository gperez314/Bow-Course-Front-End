import React, { useState, useEffect } from "react";
import DashboardDetails from "../components/dashboard-details/DashBoardDetails.component";
import FormListView from "../components/form-list/FormListView.component";

const FormsList = () => {
  const [forms, setForms] = useState([]); // State to store the form data
  const [students, setStudents] = useState([]); // State to store the students data

  // Simulate fetching data from local storage
  useEffect(() => {
    // Get forms data
    const storedForms = JSON.parse(localStorage.getItem("FormData"));
    setForms(storedForms);

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
      <FormListView forms={forms} students={students}/>
    </>
  );
};

export default FormsList;
