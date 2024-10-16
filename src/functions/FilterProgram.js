// Function to filter programs based on search term
export const filterProgram = (programList, searchTerm) => {
  // Filter the programs based on the search term
  const filteredPrograms = programList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.term.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredPrograms;
};
