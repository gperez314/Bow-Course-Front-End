import "./App.css";
import { Route, Routes } from "react-router-dom";
import View from "./view/View";
import Home from "./routes/Home";
import Programs from "./routes/Program";
import Courses from "./routes/Course";
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import AdminDashboard from "./routes/AdminDashboard";
import StudentList from "./routes/StudentList";
import FormsList from "./routes/FormsList";
import StudentDashboard from "./routes/StudentDashboard";
import EnrolledCourses from "./routes/EnrolledCourses";
import SendMessage from "./routes/SendMessage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<View />}>
          <Route path="/" element={<Home />} />
          <Route path="/program" element={<Programs />} />
          <Route path="/course/:id" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard/:id" element={<AdminDashboard />} />
          <Route path="/admin/student-list/:id" element={<StudentList />} />
          <Route path="/admin/forms/:id" element={<FormsList />} />
          <Route path="/student/dashboard/:id" element={<StudentDashboard />} />
          <Route path="/student/enrolled-courses/:id" element={<EnrolledCourses />} />
          <Route path="/student/message/:id" element={<SendMessage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
