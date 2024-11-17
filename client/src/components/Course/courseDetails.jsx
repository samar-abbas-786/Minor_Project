import { Context } from "@/context/authContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { background } = useContext(Context);
  // console.log(course.addedBy);

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

  // Fetch professor data
  const getProfessor = async (addedBy) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/user/getUserById?id=${course.addedBy}`
      );
      console.log(response);
      // console.log("Id", id);

      setProfessor(response.data.user);
      // console.log("professor", professor);
    } catch (error) {
      console.error("Error fetching professor details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [Code]);

  useEffect(() => {
    if (course && course.addedBy) {
      getProfessor(course.addedBy);
    }
  }, [course]);

  if (loading) {
    return (
      <div className="text-center text-white">Loading course details...</div>
    );
  }

  if (!course) {
    return <div className="text-center text-white">Course not found.</div>;
  }

  return (
    <div>
      <div
        className={`${
          !background ? "bg-slate-900" : "bg-[#2CA4AB]"
        } p-6 md:p-10 lg:p-14 h-[100vh] w-full text-white max-w-4xl mx-auto`}
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

        <div className="flex justify-center mb-8">
          <a
            href={`http://localhost:5000/uploads/${course.fileUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-600"
          >
            View Course Material
          </a>
        </div>

        <div className="text-sm text-gray-400 mt-6">
          <p className="font-semibold">Course Description:</p>
          <p>{course.description || "No description available."}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
