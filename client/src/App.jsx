import "./App.css";
import { Button } from "@/components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./components/signup";
import Login from "./components/login";
import Layout from "./components/layout";
import PageNotFound from "./components/pageNotFound";
import AddInstructions from "./components/testComponent/addInstructions";
import ShowInstructions from "./components/testComponent/showInstructions.jsx";
import AddQuestion from "./components/AddQuestion";
import StudentTest from "./components/StudentTest";
import AddCourse from "./components/Course/addCourse";
import ShowCourseList from "./components/Course/showCoursesList";
import CourseDetails from "./components/Course/courseDetails";
import ProfilePage from "./components/Profile/profile";
import MyEnrollCourses from "./components/Course/myEnrollCourses";
import CreateProfilePage from "./components/Profile/createProfilePage";
import TeacherProfilePage from "./components/Profile/teacherProfile";
import EnrolledStudentsPage from "./components/enrollStudentPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/CreateProfilePage" element={<CreateProfilePage />} />
          <Route path="/EnrolledStudents" element={<EnrolledStudentsPage />} />

          <Route path="/AddInstructions" element={<AddInstructions />} />
          <Route path="/ShowInstructions" element={<ShowInstructions />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/take-test" element={<StudentTest />} />
          <Route path="/AddCourse" element={<AddCourse />} />
          <Route path="/MyEnrollCourses" element={<MyEnrollCourses />} />
          <Route path="/showCourseList" element={<ShowCourseList />} />
          <Route path="/teacherProfile" element={<TeacherProfilePage />} />

          <Route path="/course/:Code" element={<CourseDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
