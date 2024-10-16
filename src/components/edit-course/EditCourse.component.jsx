import React, { useState, useEffect } from "react";
import CourseForm from "../course-form/CourseForm.component";
import "../../styles/popup.style.css";
import { editCourse_API } from "../../functions/Frontend-API";
import { SweetAlert } from "../../functions/SweetAlert";

const EditCourse = ({ isOpen, onClose, onEditCourse, programId, course }) => {
  const [editedCourse, setNewCourse] = useState({
    programid: programId,
    id: "",
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
    if (isOpen && course) {
      setNewCourse({
        programid: programId,
        id: course.id,
        term_no: course.term_no,
        code: course.code,
        name: course.name,
        term: course.term,
        start_date: course.start_date,
        end_date: course.end_date,
        desc: course.desc,
      });
    }
  }, [isOpen, course]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the course in the database and send the updated program back to the course list page
    editCourse_API(editedCourse, programId);
    onEditCourse(editedCourse);
    SweetAlert("Course updated sucessfully!", "success");

    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  return (
    <CourseForm
      course={editedCourse}
      mode="Edit"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      onClose={onClose}
      programId={programId}
    />
  );
};

export default EditCourse;
