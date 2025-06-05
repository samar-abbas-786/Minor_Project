import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "@/context/authContext";
import Navbar from "../navbar";

const MyEnrollCourses = () => {
  const [enrollCourses, setEnrollCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userDetail, background } = useContext(Context);

  const getAllCourses = async () => {
    try {
      if (!userDetail || !userDetail._id) {
        console.log("User details not available yet, skipping API call.");
        return;
      }

      setLoading(true);
      const response = await axios.get(
        "https://backend-edupi-2.onrender.com/api/v1/course/getEnrolledCourses",
        { params: { userId: userDetail._id } }
      );
      console.log(response);

      if (response.data && response.data.getAllCourses) {
        setEnrollCourses(response.data.getAllCourses);
      } else {
        throw new Error("No enrolled courses found.");
      }
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
      setError(err.message || "Failed to load enrolled courses.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetail) {
      getAllCourses();
    }
  }, [userDetail]);

  if (loading)
    return (
      <div className="text-center text-blue-600 font-bold">Loading...</div>
    );

  // if (error)
  //   return (
  //     <div className="text-center text-red-500 font-semibold">
  //       Error: {error}
  //     </div>
  //   );

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          My Enrolled Courses
        </h2>
        {enrollCourses.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500 mb-4">
              You have not enrolled in any courses yet.
            </p>
            <Link
              to="/showCourseList"
              className="bg-slate-950 text-white px-4 py-2 rounded-lg text-sm font-medium transition-transform transform hover:bg-slate-800"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-5 items-center justify-center">
            {enrollCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition duration-300 w-72"
              >
                <div
                  className={`${
                    background
                      ? "bg-gradient-to-r from-[#2CA4AB] to-[#2CA4AB]"
                      : "bg-slate-800"
                  } p-4 text-white`}
                >
                  <h3 className="text-xl font-semibold truncate">
                    {course.title || "Unnamed Course"}
                  </h3>
                  <p className="text-sm mt-1 opacity-80">
                    {course.Code || "No code available"}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm mb-3">
                    {course.description ||
                      `Click to view the details of ${course.title}`}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 text-right">
                  <Link
                    to={`/course/${course.Code}`}
                    className="bg-white flex justify-center text-black border-1 shadow-sm shadow-black border-black px-4 py-2 rounded-lg text-sm font-medium transition-transform transform hover:bg-slate-700 hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrollCourses;
