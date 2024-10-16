import "../styles/home.style.css";
import React, { useState, useEffect } from "react";
import ProgramList from "../components/program-list/ProgramList.component";

const Programs = () => {
  const [program, setProgram] = useState([]); // State to store the program data

  // Simulate fetching data from server
  useEffect(() => {
    // Get program data
    const storedProgramData = localStorage.getItem("programData");
    setProgram(JSON.parse(storedProgramData));
  }, []);

  return (
    <>
      <ProgramList programs={program} adminMode={false} />
    </>
  );
};

export default Programs;
