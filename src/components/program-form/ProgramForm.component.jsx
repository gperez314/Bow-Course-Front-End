const ProgramForm = ({ program, mode, handleChange, handleSubmit, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box-container">
        <form className="modal-popup-box" onSubmit={handleSubmit}>
          <h2 className="modal-popup-title">{mode} Program</h2>
          <div className="modal-popup-group">
            <div className="popup-form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                value={program.department}
                onChange={handleChange}
              >
                <option value="SD">Software Development</option>
              </select>
            </div>
            <div className="popup-form-group">
              <label htmlFor="program">Program</label>
              <select
                id="program"
                value={program.program}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select program
                </option>
                <option value="2Y">Diploma (2 years)</option>
                <option value="1Y">Diploma (1 year)</option>
                <option value="6M">Certificate (6 months)</option>
              </select>
            </div>
            <div className="popup-form-group">
              <label htmlFor="code">Code</label>
              <input
                type="text"
                id="code"
                value={program.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group">
              <label htmlFor="term">Term</label>
              <select
                id="term"
                value={program.term}
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
                value={program.start_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                value={program.end_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group">
              <label htmlFor="domestic_fee">Domestic Fee ($)</label>
              <input
                type="number"
                id="domestic_fee"
                value={program.domestic_fee}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group">
              <label htmlFor="international_fee">International Fee ($)</label>
              <input
                type="number"
                id="international_fee"
                value={program.international_fee}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-form-group desc-group">
              <label htmlFor="desc">Description</label>
              <textarea
                id="desc"
                rows="8"
                value={program.desc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="popup-button-container">
              <button type="submit" className="popup-button hover">
                {mode} Program
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

export default ProgramForm;
