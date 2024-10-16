import { MapProgramtoDB } from "./MapProgram_FormtoDB";

function signup_API(formData) {
  // Add the new user to the users array
  let users = JSON.parse(localStorage.getItem("userData")) || [];
  users.push({
    id: users.length + 1,
    role: "student",
    user_id: users.length + 1000,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    birthday: formData.birthday,
    department: formData.department,
    program: formData.program,
    username: formData.username,
    password: formData.password,
    courses: [],
  });
  // Save the updated users array back to local storage
  localStorage.setItem("userData", JSON.stringify(users));
}

function login_API(username, password) {
  // Retrieve users from local storage
  const users = JSON.parse(localStorage.getItem("userData")) || [];
  // Find the user with matching username and password
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return user;
}

function getProgram_API(programId) {
  // Retrieve the program list from localStorage
  const programList = JSON.parse(localStorage.getItem("programData"));
  // Return the program with the same id
  return programList.find((p) => p.id === Number(programId));
}

function addProgram_API(program) {
  // Map program date from form to database compatible format
  const newProgram = MapProgramtoDB(program);
  // Add the new program to the program list and assigning the next highest id
  const programlist = JSON.parse(localStorage.getItem("programData"));
  const newId =
    programlist.length > 0 ? Math.max(...programlist.map((p) => p.id)) + 1 : 1;
  newProgram.id = newId;
  programlist.push(newProgram);
  // Save the updated list back to localStorage
  localStorage.setItem("programData", JSON.stringify(programlist));
  // Return the mapped object
  return newProgram;
}

function editProgram_API(program) {
  // Map program date from form to database compatible format
  const editProgram = MapProgramtoDB(program);
  editProgram.id = program.id;
  // Update the program in the program list
  const programlist = JSON.parse(localStorage.getItem("programData"));
  const programIndex = programlist.findIndex((p) => p.id === program.id);
  programlist[programIndex] = editProgram;
  // Save the updated list back to localStorage
  localStorage.setItem("programData", JSON.stringify(programlist));
  // Return the mapped object
  return editProgram;
}

function deleteProgram_API(programId) {
  // Find the index of the program to delete and remove from the list
  const programlist = JSON.parse(localStorage.getItem("programData")) || [];
  const programIndex = programlist.findIndex(
    (program) => program.id === programId
  );
  programlist.splice(programIndex, 1);
  // Save the updated list back to localStorage
  localStorage.setItem("programData", JSON.stringify(programlist));
}

function addCourse_API(course, programId) {
  // Retrieve the program list from localStorage
  const programList = JSON.parse(localStorage.getItem("programData"));
  // Find the index of the program by its id
  const programIndex = programList.findIndex((p) => p.id === Number(programId));
  // Determine the highest existing course ID in the program
  const existingCourses = programList[programIndex].course;
  const maxCourseId =
    programList[programIndex].course.length > 0
      ? Math.max(...existingCourses.map((course) => course.id))
      : 0; // Default to 0 if there are no existing courses
  course.id = maxCourseId + 1; // Assign the id
  // Add the new course to the program's course field
  programList[programIndex].course.push(course);
  // Update localStorage with the new program list
  localStorage.setItem("programData", JSON.stringify(programList));
  // Return the added course with updated id
  console.log(course);
  return course;
}

function editCourse_API(editedCourse, programId) {
  // Retrieve the program list from localStorage
  const programList = JSON.parse(localStorage.getItem("programData")) || [];
  // Find the index of the program by its id
  const programIndex = programList.findIndex((p) => p.id === Number(programId));
  // Find the index of the course by its id
  const courseIndex = programList[programIndex].course.findIndex(
    (course) => course.id === editedCourse.id
  );
  // Update the course details
  programList[programIndex].course[courseIndex] = {
    ...programList[programIndex].course[courseIndex],
    ...editedCourse,
  };
  // Save the updated program list back to localStorage
  localStorage.setItem("programData", JSON.stringify(programList));
}

function deleteCourse_API(programId, courseId) {
  // Retrieve the program list from localStorage
  const programList = JSON.parse(localStorage.getItem("programData")) || [];
  // Find the index of the program by its id
  const programIndex = programList.findIndex((p) => p.id === Number(programId));
  // Find the index of the course by its id
  const courseIndex = programList[programIndex].course.findIndex(
    (course) => course.id === courseId
  );
  // Remove the course from the program's course list
  programList[programIndex].course.splice(courseIndex, 1);
  // Save the updated program list back to localStorage
  localStorage.setItem("programData", JSON.stringify(programList));
}

function enrollCourse_API(course, studentid, term) {
  // Retrieve the user data list from localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  // Find the student based on the student ID
  const courseList = userData[studentid - 1].courses;

  console.log(userData[studentid - 1])

  // Cannot register the same course on the same term
  if (
    courseList.some(
      (enrolledCourse) =>
        enrolledCourse.code === course.code &&
        enrolledCourse.term === course.term
    )
  ) {
    return {
      error: "true",
      message: "You are already enrolled in this course.",
    };
  }
  // Maximum of 5 courses per term only
  else if (
    courseList.filter((enrolledCourse) => enrolledCourse.term === term)
      .length >= 5
  ) {
    return {
      error: "true",
      message: "Maximum registration of 5 courses per term is reached.",
    };
  } else {
    // Course is added successfully
    courseList.push(course); // Add the new course to the course list
    // Update the user's courses and save back to localStorage
    userData[studentid-1].courses = courseList;
    localStorage.setItem("userData", JSON.stringify(userData));
    return {
      status: "false",
      message: "Course enrolled sucessfully!",
    };
  }
}

function unenrollCourse_API(programid, courseid, studentid) {
  // Retrieve the user data list from localStorage
  const userData = JSON.parse(localStorage.getItem("userData")) || [];
  // Find the student based on the student ID
  const student = userData[studentid - 1];
  // Filter the courses to remove the one that matches the programid and courseid
  student.courses = student.courses.filter(
    (course) => !(course.programid === programid && course.id === courseid)
  );
  // Save the updated user data back to localStorage
  localStorage.setItem("userData", JSON.stringify(userData));
}

function sendMessage_API(message) {
  // Retrieve form data list from localStorage
  const formData = JSON.parse(localStorage.getItem("FormData")) || [];
  // Add the new message to form data list
  formData.push(message);
  // Update the localStorage with the new formData
  localStorage.setItem("FormData", JSON.stringify(formData));
}


// Export API functions
export {
  signup_API,
  login_API,
  getProgram_API,
  addProgram_API,
  editProgram_API,
  deleteProgram_API,
  addCourse_API,
  editCourse_API,
  deleteCourse_API,
  enrollCourse_API,
  unenrollCourse_API,
  sendMessage_API,
};
