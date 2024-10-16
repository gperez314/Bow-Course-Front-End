import React, { useState, useEffect } from "react";
import ProgramForm from "../program-form/ProgramForm.component";
import "../../styles/popup.style.css";
import { editProgram_API } from "../../functions/Frontend-API";
import { SweetAlert } from "../../functions/SweetAlert";

const EditProgram = ({ isOpen, onClose, onEditProgram, program }) => {
  const [editedProgram, setEditedProgram] = useState({
    id: "",
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
    if (isOpen && program) {
      setEditedProgram({
        id: program.id,
        department: program.department,
        program: program.program,
        code: program.code,
        term: program.term,
        desc: program.desc,
        start_date: program.start_date,
        end_date: program.end_date,
        domestic_fee: program.domestic_fee,
        international_fee: program.international_fee,
      });
    }
  }, [isOpen, program]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEditedProgram((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the program in the database and send the updated program back to the program list page
    onEditProgram(editProgram_API(editedProgram));
    SweetAlert("Program updated successfully!", "success");

    // Close the modal
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ProgramForm
      program={editedProgram}
      mode="Edit"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onClose={onClose}
    />
  );
};

export default EditProgram;
