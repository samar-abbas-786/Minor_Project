import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "@/context/authContext";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [Code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { userDetail } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!userDetail?._id) {
      setErrorMessage("User ID is missing. Please log in again.");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("Code", Code);
    formData.append("addedBy", userDetail._id.toString()); // Ensure _id is a string

    // Debugging FormData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

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
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to add course. Please try again later.";
      console.error("Error adding course:", errorMsg);
      setErrorMessage(errorMsg);
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
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the Code"
            type="text"
            name="Code"
            value={Code}
            onChange={(e) => setCode(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`w-full py-2 mt-4 text-white rounded-lg font-semibold transition duration-300 ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-slate-900 hover:bg-slate-800"
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
