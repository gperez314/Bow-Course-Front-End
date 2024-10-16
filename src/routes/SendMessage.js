import React, { useState, useEffect } from "react";
import DashboardDetails from "../components/dashboard-details/DashBoardDetails.component";
import Message from "../components/message/Message.component";

const SendMessage = () => {
  const [student, setStudent] = useState([]); // State to store the student data

  // Simulate fetching data from server
  useEffect(() => {
    // Get student data from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setStudent(loggedInUser);
  }, []);

  return (
    <>
      <DashboardDetails />
      <Message student={student} />
    </>
  );
};

export default SendMessage;
