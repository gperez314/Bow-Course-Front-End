import "./form-details.style.css";
import React, { useState } from "react";
import { formatDateTime } from "../../functions/DateTimeFormat";

const Form = ({ form, student }) => {
  const [isProfileExpanded, setProfileExpanded] = useState(false); // State to track profile expansion

  // Toggle profile visibility
  const toggleProfile = () => {
    setProfileExpanded((prev) => !prev);
  };

  return (
    <>
      <div
        className="form-details-header"
        onClick={toggleProfile}
        style={{ cursor: "pointer" }}
      >
        <em className="form-subject">{form.subject}</em>
      </div>
      {isProfileExpanded && ( // Only show details if expanded
        <div className="form-details-desc">
          <div>
            <p>
              <em className="form-em"> From:</em> {student.firstName}{" "}
              {student.lastName}
            </p>
            <p>
              <em className="form-em"> Email:</em> {student.email}
            </p>
            <p>
              <em className="form-em">Time:</em> {formatDateTime(form.date)}
            </p>
            <em className="form-em">Message:</em>
            <p>{form.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
