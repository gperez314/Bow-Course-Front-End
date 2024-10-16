// Function to map program from form object to db object

export const MapProgramtoDB = (program) => {
  // Map department
  const departmentMap = {
    "SD": "Software Development",
  };
  // Map program
  const programMap = {
    "2Y": "Post Diploma (2 years)",
    "1Y": "Post Diploma (1 year)",
    "6M": "Certificate (6 months)",
  };

  return {
    id: "",
    name: `${departmentMap[program.department]} - ${programMap[program.program]}`,
    department: program.department,
    program: program.program,
    term: program.term,
    code: program.code,
    desc: program.desc,
    start_date: program.start_date,
    end_date: program.end_date,
    domestic_fee: program.domestic_fee,
    international_fee: program.international_fee,
    course: [],
  };
};
