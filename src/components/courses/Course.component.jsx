import "./course.style.css";
import React, { useState } from "react";
import { formatDate } from "../../functions/DateFormat";  

const Course = ({ course, expanded }) => {
  // State to track which course details are expanded
  const [expandedCourses, setExpandedCourses] = useState({});

  // Toggle the course details on mouse down
  const toggleDescription = (code) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [code]: !prev[code], // Toggle the boolean for the course code
    }));
  };

  return (
    <>
      <div key={course.code}>
        <div
          onMouseDown={() => toggleDescription(course.code)} // Toggle on mouse down
        >
          <em className="course-name">
            {course.code} - {course.name}
          </em>
        </div>
        {(expanded || expandedCourses[course.code]) && ( // Only show details if expanded
          <div className="course-description">
            <div>Term: {course.term}</div>
            <div>Description: {course.desc}</div>
            <div>Start Date: {formatDate(course.start_date)}</div>
            <div>End Date: {formatDate(course.end_date)}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Course;
