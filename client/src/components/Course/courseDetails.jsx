import { Context } from "@/context/authContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { CgMathPlus } from "react-icons/cg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import { FaFileDownload } from "react-icons/fa";

const CourseDetails = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createTestDialogOpen, setCreateTestDialogOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [fileName, setFileName] = useState(null);
  const [courseContent, setCourseContent] = useState([]);
  const [enroll, setEnroll] = useState(false);

  const { background, userDetail, prof, setProf } = useContext(Context);
  const { Code } = useParams();
  const seeProfile = () => {
    // setUserDetails(professor);
    navigate("/teacherProfile");
  };
  // console.log("Professor", professor._id);
  // console.log("Course", course.addedBy);
  // console.log("userDetail", userDetail._id);
  const handleEnrollment = async () => {
    const formData = new FormData();
    formData.append("userId", userDetail._id);
    formData.append("courseId", course._id);
    formData.append("addedBy", course.addedBy);

    try {
      const response = await axios.post(
        "https://backend-edupi-2.onrender.com/api/v1/course/enrolled",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      // console.log("Clicked");

      if (response.status === 200) {
        setEnroll(true);
        console.log("Enrollment response:", response);
      } else {
        console.log("Enrollment failed:", response);
      }
    } catch (error) {
      console.error("Error during enrollment:", error);
    }
  };

  const getEnrollByCourseId = async () => {
    if (!course?._id || !userDetail?._id) return;

    try {
      const response = await axios.get(
        "https://backend-edupi-2.onrender.com/api/v1/course/getEnrollByCourseId",
        {
          params: {
            courseId: course._id,
            userId: userDetail._id,
          },
        }
      );

      if (response.data.isEnrolled) {
        setEnroll(true);
      } else {
        setEnroll(false);
      }
    } catch (error) {
      console.error("Error checking enrollment:", error);
      setEnroll(false);
    }
  };

  useEffect(() => {
    if (course && userDetail) {
      getEnrollByCourseId();
    }
  }, [course, userDetail]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://backend-edupi-2.onrender.com/api/v1/course/singleCourse/${Code}`
      );
      setCourse(response.data.course[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setLoading(false);
    }
  };

  const getContent = async () => {
    try {
      const response = await axios.get(
        `https://backend-edupi-2.onrender.com/api/v1/course/getContent/${Code}`
      );
      setCourseContent(response.data.content || []);
    } catch (error) {
      console.log("Error in getting content:", error);
    }
  };

  useEffect(() => {
    fetchData();
    getContent();
  }, [Code]);

  const getProfessor = async () => {
    try {
      const response = await axios.get(
        `https://backend-edupi-2.onrender.com/api/v1/user/getUserById?id=${course.addedBy}`
      );
      setProfessor(response.data.user);
      setProf(response.data.user);
      console.log(professor);
    } catch (error) {
      console.error("Error fetching professor details:", error);
    }
  };

  useEffect(() => {
    if (course && course.addedBy) {
      getProfessor();
      // console.log(professor);
    }
  }, [course]);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleCreateTestDialogOpen = () => setCreateTestDialogOpen(true);
  const handleCreateTestDialogClose = () => setCreateTestDialogOpen(false);

  const handleTopicChange = (event) => setTopic(event.target.value);
  const handleFileChange = (event) => setFileName(event.target.files[0]);

  const handleSubmit = async () => {
    if (!topic || !fileName) {
      alert("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("fileName", fileName);
    formData.append("addedBy", course.addedBy);
    formData.append("courseId", course._id);

    try {
      await axios.post(
        `https://backend-edupi-2.onrender.com/api/v1/course/addContent/${Code}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Material added successfully!");
      setDialogOpen(false);
      getContent();
    } catch (error) {
      console.error("Error adding material:", error);
      alert("Failed to add material. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-white">Loading course details...</div>
    );
  }

  if (!course) {
    return <div className="text-center text-white">Course not found.</div>;
  }

  return (
    <div
      className={`w-[100vw] h-[100%] ${
        !background ? "bg-slate-950" : "bg-[#fff]"
      } h-[100vh]`}
    >
      <Navbar />
      <div
        className={`${
          !background ? "bg-slate-950 text-white" : "bg-[#fff] text-[#2CA4AB]"
        } p-6 md:p-10 lg:p-14 h-full w-full  max-w-6xl mx-auto`}
      >
        <h1
          className={`text-3xl sm:text-4xl ${
            !background ? "text-white" : "text-black"
          } font-bold mb-6`}
        >
          {course.title}
        </h1>
        <div
          className={` w-max p-5 my-8 ${
            !background
              ? "bg-slate-950 shadow-sm shadow-white"
              : "bg-[#fff] text-black shadow-sm shadow-black"
          } rounded-md `}
        >
          <p className="text-lg sm:text-xl mb-4 flex items-center">
            <strong className={`${!background ? "text-white" : "text-black"}`}>
              Professor :
            </strong>{" "}
            <span className="flex items-center gap-6">
              {professor ? professor.name : ""}{" "}
              <img
                onClick={seeProfile}
                className="h-12 w-12 rounded-full"
                src="https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-173760.jpg?ga=GA1.1.732799867.1719772377&semt=ais_hybrid"
                alt="profession.name"
              />
            </span>
          </p>
          <p className="text-lg sm:text-xl mb-6">
            <strong className={`${!background ? "text-white" : "text-black"}`}>
              Course Code:
            </strong>{" "}
            {course.Code}
          </p>

          {!enroll && userDetail.profession == "student" && (
            <button
              onClick={handleEnrollment}
              className="relative text-sm px-5 flex justify-between items-center py-2 font-serif text-white bg-gradient-to-r from-purple-600 via-sky-700 to-blue-500 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-sky-400 focus:ring-offset-2 active:scale-95 transition-all duration-300 ease-in-out overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-sky-400 to-purple-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-20"></span>

              <span className="relative z-10 group-hover:text-yellow-300 transition-colors duration-300 ease-in-out">
                Enroll
              </span>

              <CgMathPlus className="relative z-10 text-xl transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
            </button>
          )}
        </div>
        {userDetail.profession === "professor" &&
        userDetail?._id === course.addedBy ? (
          <div className="flex items-center gap-10">
            <button
              onClick={handleDialogOpen}
              className={`text-sm ${
                !background
                  ? "bg-slate-950 text-white shadow-sm shadow-white"
                  : "bg-[#2CA4AB] text-white"
              } px-6 py-1 rounded-sm`}
            >
              Add Material
            </button>
            <button
              onClick={handleCreateTestDialogOpen}
              className={`text-sm ${
                !background
                  ? "bg-red-500 text-white shadow-sm shadow-white"
                  : "bg-red-700 text-white"
              } px-6 py-1 rounded-sm`}
            >
              Create Test
            </button>
          </div>
        ) : (
          ""
        )}
        {userDetail.profession === "student" ? (
          <button
            onClick={() => navigate(`/ShowInstructions/${Code}`)}
            className={`text-sm ${
              !background
                ? "bg-cyan-700 text-white shadow-sm shadow-white"
                : "bg-cyan-900 text-white"
            } px-6 py-1 rounded-sm`}
          >
            Attempt Test
          </button>
        ) : (
          ""
        )}

        <div className="mt-10">
          <h2
            className={`text-2xl ${
              !background ? "" : "text-slate-950"
            } font-semibold mb-4`}
          >
            Course Topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courseContent.map((content, index) => (
              <div
                key={index}
                className={`${
                  !background ? "bg-gray-800" : "bg-gray-100"
                } p-4 rounded-lg shadow-md`}
              >
                <h3
                  className={`text-lg font-bold mb-2 ${
                    !background ? "text-white" : "text-slate-900"
                  }  flex items-center`}
                >
                  <FaFileDownload
                    className={`mr-2 ${!background ? "" : "text-black"}`}
                  />{" "}
                  {content.topic}
                </h3>
                <a
                  href={`https://backend-edupi-2.onrender.com/uploads/${content.fileName}`}
                  className="text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Content
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add Course Material</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="topic"
            label="Topic"
            type="text"
            fullWidth
            value={topic}
            onChange={handleTopicChange}
          />
          <Input
            type="file"
            onChange={handleFileChange}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createTestDialogOpen} onClose={handleCreateTestDialogClose}>
        <DialogTitle>Create Test</DialogTitle>
        <DialogContent>
          <div className="space-y-4">
            <Button
              variant="outlined"
              onClick={() => navigate(`/add-instructions/${Code}`)}
              color="primary"
              fullWidth
            >
              Add Instructions
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(`/add-questions/${Code}`)}
              color="secondary"
              fullWidth
            >
              Add Questions
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateTestDialogClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CourseDetails;
