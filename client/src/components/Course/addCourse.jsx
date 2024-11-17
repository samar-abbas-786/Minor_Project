import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "@/context/authContext";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [Code, setCode] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { userDetail } = useContext(Context);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFileUrl(selectedFile);
    } else {
      console.error("Only PDF files are allowed");
      alert("Please upload a valid PDF file.");
      setFileUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!fileUrl) {
      setErrorMessage("Please upload a PDF file.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Code", Code);
    formData.append("fileUrl", fileUrl);
    formData.append("addedBy", userDetail._id);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/course/addCourses",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("Course added successfully:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error adding course:", error);
      setErrorMessage("Failed to add course. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add New Course
        </h2>
        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the Code"
            type="text"
            value={Code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="application/pdf"
            type="file"
            name="fileUrl"
            onChange={handleFileChange}
            required
          />
          <button
            type="submit"
            className={`w-full py-2 mt-4 text-white rounded-lg font-semibold transition duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
