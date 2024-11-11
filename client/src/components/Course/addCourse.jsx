import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [Code, setCode] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Code", Code);
    formData.append("fileUrl", fileUrl);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/course/addCourses",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Course added successfully:", response.data);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add New Course
        </h2>
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
            onChange={(e) => setFileUrl(e.target.files[0])}
            required
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Submit Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
