import "./form-list-view.style.css";
import Search from "../search/Search.component";
import React, { useState, useEffect } from "react";
import Form from "../form/Form.component";

const FormListView = ({ forms, students }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [formList, setFormList] = useState(forms);
  const [studentList, setStudentList] = useState(students);

  // Sync studentList with students prop when students changes
  useEffect(() => {
    setFormList(forms);
  }, [forms]);

  // Sync studentList with students prop when students changes
  useEffect(() => {
    setStudentList(students);
  }, [students]);

  // Function to identify the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Get student details based on student id from form
  const getStudent = (form, studentList) => {
    return studentList.find((student) => student.id === form.studentid);
  };

  // Filter formList based on the search term
  const filteredFormList = formList.filter((form) => {
    const student = getStudent(form, studentList);
    return (
      form.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <>
      <div className="search-options-box">
        <Search onSearchChange={handleSearchChange} />
      </div>
      <div className="form-box-container">
        {filteredFormList.length > 0 ? (
          filteredFormList.map((form, index) => (
            <div className="form-box" key={index}>
              <Form form={form} student={getStudent(form, studentList)} />
            </div>
          ))
        ) : (
          // Display "No results found" when the filtered list is empty
          <div className="no-results">
            <h3>No matching results found.</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default FormListView;
