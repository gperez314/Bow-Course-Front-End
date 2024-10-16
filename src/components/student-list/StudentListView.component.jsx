import "./student-list-view.style.css";
import Search from "../search/Search.component";
import React, { useState, useEffect } from "react";
import Student from "../student/Student.component";

const StudentListView = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [studentList, setStudentList] = useState(students);

  // Sync studentList with students prop when students changes
  useEffect(() => {
    setStudentList(students);
  }, [students]);

  // Function to identify the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter student list based searchbar and dropdown selection
  const filteredStudentList = studentList.filter((s) => {
    const matchesSearchTerm =
      s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "" || s.department === selectedDepartment;

    const matchesProgram =
      selectedProgram === "" || s.program === selectedProgram;

    return matchesSearchTerm && matchesDepartment && matchesProgram;
  });

  return (
    <>
      <div className="student-options-box">
        <select
          className="filter-dropdown"
          value={selectedDepartment}
          onChange={(event) => setSelectedDepartment(event.target.value)}
        >
          <option value="">Select Department</option>
          <option value="SD">Software Developement</option>
        </select>
        <select
          className="filter-dropdown"
          value={selectedProgram}
          onChange={(event) => setSelectedProgram(event.target.value)}
        >
          <option value="">Select Program</option>
          <option value="2Y">Post Diploma (2 years)</option>
          <option value="1Y">Post Diploma (1 year)</option>
          <option value="6M">Certificate (6 months)</option>
        </select>
        <Search onSearchChange={handleSearchChange} />
      </div>
      <div className="student-box-container">
        {filteredStudentList.length > 0 ? (
          filteredStudentList.map((student, index) => (
            <div className="student-box" key={index}>
              <Student student={student} />
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

export default StudentListView;
