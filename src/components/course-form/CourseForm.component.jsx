import React, { useEffect, useState } from "react";
import { getProgram_API } from "../../functions/Frontend-API";

const CourseForm = ({
  course,
  mode,
  handleChange,
  handleSubmit,
  onClose,
  programId,
}) => {
  const [termOptions, setTermOptions] = useState([]);

  useEffect(() => {
    const program = getProgram_API(programId);

    if (program) {
      // Set term options based on the program
      switch (program.program) {
        case "2Y":
          setTermOptions(["1", "2", "3", "4"]);
          break;
        case "1Y":
          setTermOptions(["1", "2"]);
          break;
        case "6M":
          setTermOptions(["1"]);
          break;
        default:
          setTermOptions([]);
          break;
      }
    }
  }, [programId]);

  return (
    <div className="modal-overlay">
      <div className="modal-box-container">
        <form className="modal-popup-box" onSubmit={handleSubmit}>
          <h2 className="modal-popup-title">{mode} Course</h2>
          <div className="modal-popup-group">
            <div className="popup-form-group">
              <label htmlFor="term_no">Term</label>
              <select
                id="term_no"
                value={course.term_no}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Term
                </option>
                {termOptions.map((term, index) => (
                  <option key={index} value={term}>
                    {term}
                  </option>
                ))}
              </select>
            </div>
            <div className="popup-form-group">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                value={course.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={course.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group">
              <label htmlFor="term">Term</label>
              <select
                id="term"
                value={course.term}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Term
                </option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
              </select>
            </div>
            <div className="popup-form-group">
              <label htmlFor="start_date">Start Date</label>
              <input
                type="date"
                id="start_date"
                value={course.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                value={course.end_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group desc-group">
              <label htmlFor="desc">Description</label>
              <textarea
                id="desc"
                rows="8"
                value={course.desc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-button-container">
              <button type="submit" className="popup-button hover">
                {mode} Course
              </button>
              <button
                type="button"
                className="popup-button hover"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
