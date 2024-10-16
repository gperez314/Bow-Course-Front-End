import React, { useState, useEffect } from "react";
import CourseForm from "../course-form/CourseForm.component";
import "../../styles/popup.style.css";
import { addCourse_API } from "../../functions/Frontend-API";
import { SweetAlert } from "../../functions/SweetAlert";

const AddCourse = ({ isOpen, onClose, onAddCourse, programId }) => {
  const [newCourse, setNewCourse] = useState({
    programid: programId,
    term_no: "",
    code: "",
    name: "",
    term: "",
    start_date: "",
    end_date: "",
    desc: "",
  });

  // Reset form values when popup is opened
  useEffect(() => {
    if (isOpen) {
      setNewCourse({
        programid: programId,
        term_no: "",
        code: "",
        name: "",
        term: "",
        start_date: "",
        end_date: "",
        desc: "",
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new program to database and send new program to program list page
    onAddCourse(addCourse_API(newCourse, programId));
    SweetAlert("Course added sucessfully!", "success");

    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <CourseForm
      course={newCourse}
      mode="Add"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onClose={onClose}
      programId={programId}
    />
  );
};

export default AddCourse;
