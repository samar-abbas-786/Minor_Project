import { Context } from "@/context/authContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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

  const { background, userDetail, setUserDetails } = useContext(Context);
  const { Code } = useParams();
  const seeProfile = () => {
    setUserDetails(professor);
    navigate("/profile");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/course/singleCourse/${Code}`
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
        `http://localhost:5000/api/v1/course/getContent/${Code}`
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
        `http://localhost:5000/api/v1/user/getUserById?id=${course.addedBy}`
      );
      setProfessor(response.data.user);
    } catch (error) {
      console.error("Error fetching professor details:", error);
    }
  };

  useEffect(() => {
    if (course && course.addedBy) {
      getProfessor();
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
        `http://localhost:5000/api/v1/course/addContent/${Code}`,
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
        !background ? "bg-slate-900" : "bg-[#fff]"
      } h-[100vh]`}
    >
      <Navbar />
      <div
        className={`${
          !background ? "bg-slate-900 text-white" : "bg-[#fff] text-[#2CA4AB]"
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
              ? "bg-slate-900 shadow-sm shadow-white"
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
        </div>
        {userDetail.profession === "professor" ? (
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
                !background ? "bg-red-500 text-white shadow-sm shadow-white" : "bg-red-700 text-white"
              } px-6 py-1 rounded-sm`}
            >
              Create Test
            </button>
          </div>
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
                  href={`http://localhost:5000/uploads/${content.fileName}`}
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
