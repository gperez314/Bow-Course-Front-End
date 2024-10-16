import React, { useState, useEffect } from "react";
import ProgramForm from "../program-form/ProgramForm.component";
import "../../styles/popup.style.css";
import { addProgram_API } from "../../functions/Frontend-API";
import { SweetAlert } from "../../functions/SweetAlert";

const AddProgram = ({ isOpen, onClose, onAddProgram}) => {
  const [newProgram, setNewProgram] = useState({
    department: "SD",
    program: "",
    code: "",
    term: "",
    desc: "",
    start_date: "",
    end_date: "",
    domestic_fee: "",
    international_fee: "",
  });

  // Reset form values when popup is opened
  useEffect(() => {
    if (isOpen) {
      setNewProgram({
        department: "SD",
        program: "",
        code: "",
        term: "",
        desc: "",
        start_date: "",
        end_date: "",
        domestic_fee: "",
        international_fee: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewProgram((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new program to database and send new program to program list page
    onAddProgram(addProgram_API(newProgram));
    SweetAlert("Program added sucessfully!", "success");

    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <ProgramForm
      program={newProgram}
      mode="Add"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default AddProgram;
