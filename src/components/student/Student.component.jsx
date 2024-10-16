import { formatDate } from "../../functions/DateFormat";

const Student = ({ student }) => {
  // Map department
  const departmentMap = {
    sd: "Software Development",
  };
  // Map program
  const programMap = {
    "2Y": "Post Diploma (2 years)",
    "1Y": "Post Diploma (1 year)",
    "6M": "Certificate (6 months)",

  };
  return (
    <>
      <div>
        <em className="student-name">
          {student.firstName} {student.lastName}
        </em>
      </div>
      <div>Department: {departmentMap[student.department]}</div>
      <div>Program: {programMap[student.program]}</div>
      <div>Email: {student.email}</div>
      <div>Phone: {student.phone}</div>
      <div>Birthday: {formatDate(student.birthday)}</div>
      <div>Username: {student.username}</div>
    </>
  );
};

export default Student;
