import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ShowCourseList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/course/listAllCourses"
        );
        // console.log("Response:", response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-400 mb-10 text-center">
        All Available Courses
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-slate-800 p-5 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-slate-700"
          >
            <h2 className="text-2xl font-semibold text-white mb-2 truncate">
              {item.title}
            </h2>
            <p className="text-sm text-slate-400 mb-4">Code: {item.Code}</p>
            <Link
              className="text-blue-300 hover:text-blue-500 text-lg underline"
              to={`/course/${item.Code}`}
            >
              View Course Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCourseList;
