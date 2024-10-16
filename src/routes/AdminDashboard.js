import React, { useState, useEffect } from "react";
import DashboardDetails from "../components/dashboard-details/DashBoardDetails.component";
import ProgramList from "../components/program-list/ProgramList.component";

const AdminDashboard = () => {
  const [program, setProgram] = useState([]); // State to store the program data

  // Simulate fetching data from server
  useEffect(() => {
    // Get program data
    const storedProgramData = localStorage.getItem("programData");
    setProgram(JSON.parse(storedProgramData));
  }, []);

  return (
    <>
      <DashboardDetails />
      <ProgramList programs={program} adminMode={true} />
    </>
  );
};

export default AdminDashboard;
