import "./student-course-list.style.css";
import { useParams } from "react-router-dom";
import Search from "../search/Search.component";
import React, { useState, useEffect } from "react";
import Course from "../courses/Course.component";
import {
  enrollCourse_API,
  unenrollCourse_API,
} from "../../functions/Frontend-API";
import { SweetAlert, SweetConfirm } from "../../functions/SweetAlert";

const StudentCourseList = ({ courses, enrolled }) => {
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [courseList, setCourseList] = useState(courses);

  // Sync courseList with courses prop when courses changes
  useEffect(() => {
    setCourseList(courses);
  }, [courses]);

  // Function to handle enrolling a course
  const handleEnrollCourse = (course) => {
    const response = enrollCourse_API(course, id, selectedTerm); // Call the enrollment function
    // Show message as an alert based on the response
    if (response.error) {
      SweetAlert(response.message, "error"); // Display error alert
    } else {
      SweetAlert(response.message, "success"); // Display success alert
    }
  };

  // Function to handle enrolling a course
  const handleUnenrollCourse = (programid, courseid) => {
    // Confirm unenrollment
    SweetConfirm(
      "Are you sure you want to unenroll this course?",
      "Unenroll",
      () => {
        // Call unenroll course API
        unenrollCourse_API(programid, courseid, id);
        // Update courseList after unenrollment by filtering out the specific course
        setCourseList((prevCourses) =>
          prevCourses.filter(
            (course) =>
              !(course.programid === programid && course.id === courseid)
          )
        );
        SweetAlert("Course unenrolled sucessfully!", "success");
      }
    );
  };

  // Function to identify the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter course list based on term dropdown selection
  const filteredCourseListbyTerm = courseList.filter((course) => {
    let matchesTerm; // Declare the variable
    if (enrolled) {
      matchesTerm = selectedTerm === "" || course.term === selectedTerm;
    } else {
      matchesTerm = course.term === selectedTerm; // Check term without enrollment context
    }
    return matchesTerm;
  });

  // Filter course list based on search term
  const filteredCourseList = filteredCourseListbyTerm.filter((course) => {
    const matchesSearchTerm =
      searchTerm === "" ||
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  return (
    <>
      {/* Display only for course list view */}
      {!enrolled && (
        <div className="course-instruction">
          <em>Please select a term to start:</em>
        </div>
      )}
      <div className="student-course-options-box">
        <select
          className="filter-dropdown course-term-filter"
          value={selectedTerm}
          onChange={(event) => setSelectedTerm(event.target.value)}
        >
          <option value="None">Select Term</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
        <Search onSearchChange={handleSearchChange} />
      </div>
      <div className="student-coursebox-container">
        <div className="enroll-instruction">
          {/* Display only for enrolled course view */}
          {enrolled && (
            <>
              <h2>Total No. of courses enrolled: {courseList.length}</h2>
              {/* Display only when there is a term selected */}
              {selectedTerm !== "None" && selectedTerm !== "" && (
                <h2>
                  No. of courses enrolled for {selectedTerm}:{" "}
                  {filteredCourseListbyTerm.length}
                </h2>
              )}
              <strong>Students can register for 2-5 courses per term</strong>
            </>
          )}
        </div>
        {filteredCourseList.length > 0 ? (
          filteredCourseList.map((course, index) => {
            return (
              <div className="course-box" key={index}>
                <Course course={course} expanded={true} />
                {enrolled ? (
                  <button
                    className="hover course-button"
                    onClick={() =>
                      handleUnenrollCourse(course.programid, course.id)
                    } // Call the unenroll function
                  >
                    Unenroll
                  </button>
                ) : (
                  <button
                    className="hover course-button"
                    onClick={() => handleEnrollCourse(course)} // Call the enroll function
                  >
                    Enroll
                  </button>
                )}
              </div>
            );
          })
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

export default StudentCourseList;
