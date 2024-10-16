import "./course-list.style.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Course from "../courses/Course.component";
import Search from "../search/Search.component";
import AddCourse from "../add-course/AddCourse.component";
import EditCourse from "../edit-course/EditCourse.component";
import { filterCourse } from "../../functions/FilterCourse";
import { deleteCourse_API } from "../../functions/Frontend-API";
import { SweetAlert, SweetConfirm } from "../../functions/SweetAlert";

const CourseList = ({ courses, adminMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [courseList, setCourseList] = useState(courses);
  const [currentCourse, setCurrentCourse] = useState(null);

  // Sync courseList with courses prop when courses changes
  useEffect(() => {
    setCourseList(courses);
  }, [courses]);

  // Function to identify the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle adding a new course
  const handleAddCourse = (newCourse) => {
    setCourseList((prevCourses) => [...prevCourses, newCourse]); // Update the course list state
  };

  // Function to handle editing a course
  const handleEditCourse = (editedCourse) => {
    setCourseList((prevCourses) =>
      prevCourses.map(
        (course) => (course.id === editedCourse.id ? editedCourse : course) // Replace the old course with the edited one
      )
    );
    setCurrentCourse(null); // Clear the current course after editing
  };

  // Function to handle deleting a course
  const handleDeleteCourse = (courseId) => {
    // Confirm deletion
    SweetConfirm(
      "Are you sure you want to delete this course?",
      "Delete",
      () => {
        // Call delete course API
        deleteCourse_API(id, courseId);
        // Update course list state
        setCourseList((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
        // Show success message
        SweetAlert("Course deleted successfully!", "success");
      }
    );
  };

  // Filter and group course list based on search term
  const groupedCourses = filterCourse(courseList, searchTerm);

  return (
    <>
      <div className="course-button-container">
        <button
          className="hover course-back-button"
          onClick={() => {
            if (adminMode) {
              navigate(`/admin/dashboard/${id}`);
            } else {
              navigate(`/program`);
            }
          }}
        >
          Back to Program
        </button>
        {adminMode && (
          <>
            {/* Show Add Course only in admin mode */}
            <button
              className="hover course-add-program"
              onClick={() => setAddModalOpen(true)} // Open Add popup
            >
              Add Course
            </button>
          </>
        )}
        <Search onSearchChange={handleSearchChange} />
      </div>
      <div className="course-box-container">
        {Object.keys(groupedCourses).length > 0 ? (
          Object.keys(groupedCourses).map((term, index) => (
            <div key={index}>
              <h3 className="course-no">Term {term}</h3>
              {groupedCourses[term].map((course, index) => (
                <div className="course-box" key={index}>
                  <Course course={course} expanded={adminMode} />
                  {adminMode && (
                    <>
                      <button
                        className="hover course-button"
                        onClick={() => {
                          setCurrentCourse(course); // Set the current program to edit
                          setEditModalOpen(true); // Open edit popup
                        }}
                      >
                        Edit Course
                      </button>
                      <button
                        className="hover course-button"
                        onClick={() => handleDeleteCourse(course.id)} // Call the delete function
                      >
                        Delete Course
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No matching results found.</h3>
          </div>
        )}
      </div>
      <AddCourse
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)} // Close modal
        onAddCourse={handleAddCourse} // Update the course list after adding
        programId={id} // Pass the id from URL as the program id
      />
      <EditCourse
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)} // Close modal
        onEditCourse={handleEditCourse} // Update the course list after editing
        programId={id} // Pass the id from URL as the program id
        course={currentCourse}
      />
    </>
  );
};

export default CourseList;
