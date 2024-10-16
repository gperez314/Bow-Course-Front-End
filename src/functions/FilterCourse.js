// Function to filter courses based on search term
export const filterCourse = (courseList, searchTerm) => {
  // Ensure courseList is an array. If it's an object, convert it into an array.
  const coursesArray = Array.isArray(courseList)
    ? courseList
    : Object.values(courseList).flat(); // Flatten if it's an object of arrays

  // Filter the courses based on the search term
  const filteredCourses = coursesArray.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group courses by term no
  const groupedCourses = filteredCourses.reduce((acc, c) => {
    acc[c.term_no] = acc[c.term_no] || []; // Initialize array if not present
    acc[c.term_no].push(c); // Add course to the term group
    return acc;
  }, {});

  return groupedCourses;
};
