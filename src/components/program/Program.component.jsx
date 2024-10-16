import "./program.style.css";
import { formatDate } from "../../functions/DateFormat";  

const Program = ({ program }) => {
  return (
    <>
      <div>
        <em className="program-name">{program.name}</em>
      </div>
      <div>Code: {program.code}</div>
      <div>Term: {program.term}</div>
      <div>Description: {program.desc}</div>
      <div>Start Date: {formatDate(program.start_date)}</div>
      <div>End Date: {formatDate(program.end_date)}</div>
      <div>
        Fees: ${Number(program.domestic_fee).toLocaleString()} domestic / ${Number(program.international_fee).toLocaleString()} international
      </div>
    </>
  );
};

export default Program;