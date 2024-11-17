import { Context } from "@/context/authContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const CourseDetails = () => {
  const [course, setCourse] = useState([]);
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [fileName, setFileName] = useState(null);
  const [courseContent, setCourseContent] = useState([]);

  const { background, userDetail } = useContext(Context);
  const { Code } = useParams();

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

  const getProfessor = async (addedBy) => {
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
      getProfessor(course.addedBy);
    }
  }, [course]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);
  };

  const handleFileChange = (event) => {
    setFileName(event.target.files[0]);
  };

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
      className={`w-[100vw] ${
        !background ? "bg-slate-900" : "bg-[#2CA4AB]"
      } h-[100vh]`}
    >
      <div
        className={`${
          !background ? "bg-slate-900" : "bg-[#2CA4AB]"
        } p-6 md:p-10 lg:p-14 h-full w-full text-white max-w-6xl mx-auto`}
      >
        <h1 className="text-3xl sm:text-4xl text-white font-bold mb-6">
          {course.title}
        </h1>
        <p className="text-lg sm:text-xl mb-4">
          <strong>Added By:</strong> {professor ? professor.name : ""}
        </p>
        <p className="text-lg sm:text-xl mb-6">
          <strong>Course Code:</strong> {course.Code}
        </p>

        {userDetail.profession === "professor" ? (
          <button
            onClick={handleDialogOpen}
            className={`text-sm ${
              !background ? "bg-slate-700 text-white" : "bg-white text-black"
            } px-6 py-1 rounded-sm`}
          >
            Add Material
          </button>
        ) : (
          ""
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Course Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {courseContent.map((content, index) => (
              <div
                key={index}
                className={`${
                  !background ? "bg-gray-800" : "bg-[#258c91]"
                } p-4 rounded-lg shadow-md`}
              >
                <h3 className="text-lg font-bold mb-2 text-white">
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

      {/* Dialog Box */}
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
    </div>
  );
};

export default CourseDetails;
