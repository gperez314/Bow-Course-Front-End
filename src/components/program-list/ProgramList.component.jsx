import "./program-list.style.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Program from "../program/Program.component";
import Search from "../search/Search.component";
import AddProgram from "../add-program/AddProgram.component";
import EditProgram from "../edit-program/EditProgram.component";
import { filterProgram } from "../../functions/FilterProgram";
import { deleteProgram_API } from "../../functions/Frontend-API";
import { SweetAlert, SweetConfirm } from "../../functions/SweetAlert";

const ProgramList = ({ programs, adminMode }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [programList, setProgramList] = useState(programs);
  const [currentProgram, setCurrentProgram] = useState(null);

  // Sync programList with programs prop when programs changes
  useEffect(() => {
    setProgramList(programs);
  }, [programs]);

  // Function to identify the search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle adding a new program
  const handleAddProgram = (newProgram) => {
    setProgramList((prevPrograms) => [...prevPrograms, newProgram]); // Update the program list state
  };

  // Function to handle editing a program
  const handleEditProgram = (editedProgram) => {
    setProgramList((prevPrograms) =>
      prevPrograms.map(
        (program) => (program.id === editedProgram.id ? editedProgram : program) // Replace the old program with the edited one
      )
    );
    setCurrentProgram(null); // Clear the current program after editing
  };

  // Function to handle deleting a program
  const handleDeleteProgram = (id) => {
    // Confirm deletion
    SweetConfirm("Are you sure you want to delete this program?", "Delete", () => {
        // Call delete program API
        deleteProgram_API(id);
        // Update program list state 
        setProgramList((prevPrograms) =>
          prevPrograms.filter((program) => program.id !== id)
        );
        SweetAlert("Program deleted sucessfully!", "success");
      });
  };

  // Filter program list based on search term
  const filteredProgramList = filterProgram(programList, searchTerm);

  return (
    <>
      <div className="admin-options-box">
        {adminMode && (
          <button
            className="hover add-program"
            onClick={() => setAddModalOpen(true)} // Open Add popup
          >
            Add Program
          </button>
        )}
        <Search onSearchChange={handleSearchChange} />
      </div>
      <div className="program-box-container">
        {filteredProgramList.length > 0 ? (
          filteredProgramList.map((prog, index) => (
            <div className="program-box" key={index}>
              <Program program={prog} />
              <div className="button-container">
                <button
                  className="hover"
                  onClick={() => navigate(`/course/${prog.id}`)}
                >
                  View Courses
                </button>
                {adminMode && (
                  <>
                    <button
                      className="hover"
                      onClick={() => {
                        setCurrentProgram(prog); // Set the current program to edit
                        setEditModalOpen(true); // Open edit popup
                      }}
                    >
                      Edit Program
                    </button>
                    <button
                      className="hover"
                      onClick={() => handleDeleteProgram(prog.id)} // Call the delete function
                    >
                      Delete Program
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          // Display "No results found" when the filtered list is empty
          <div className="no-results">
            <h3>No matching results found.</h3>
          </div>
        )}
      </div>
      <AddProgram
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)} // Close modal
        onAddProgram={handleAddProgram} // Update the program list after adding
      />
      <EditProgram
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)} // Close modal
        onEditProgram={handleEditProgram} // Update the program list after editing
        program={currentProgram} // Pass the program to edit
      />
    </>
  );
};

export default ProgramList;
