import "./message.style.css";
import React, { useState } from "react";
import { sendMessage_API } from "../../functions/Frontend-API";
import { SweetAlert } from "../../functions/SweetAlert";

const Message = ({ student }) => {
  const [subject, setSubject] = useState(""); // State for subject
  const [message, setMessage] = useState(""); // State for message

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new message object
    const newMessage = {
      studentid: student.id,
      subject: subject,
      date: new Date().toISOString(),
      message: message,
    };

    // Send message to database
    sendMessage_API(newMessage);
    SweetAlert("Message sent successfully!", "success");

    // Resetting the form fields after submission
    setSubject("");
    setMessage("");
  };

  return (
    <form className="send-message-form" onSubmit={handleSubmit}>
      <div className="send-message-div">
        <strong>
          <label htmlFor="subject">Subject</label>
        </strong>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="send-message-div">
        <strong>
          <label htmlFor="message">Message</label>
        </strong>
        <textarea
          id="message"
          rows="8"
          value={message}
          placeholder="Type your here"
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="send-button hover">
        Send
      </button>
    </form>
  );
};

export default Message;
