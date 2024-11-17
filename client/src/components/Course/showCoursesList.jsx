import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "@/context/authContext";
import Navbar from "../navbar";

const ShowCourseList = () => {
  const [data, setData] = useState([]);
  const { background } = useContext(Context);

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
    <div>
      <Navbar />
      <div
        className={`${
          !background ? "bg-slate-900" : "bg-[#f6f6f6]"
        } min-h-screen p-8 flex flex-col items-center`}
      >
        <h1
          className={`text-3xl font-bold ${
            !background ? "text-blue-400" : "text-black"
          } mb-10 text-center`}
        >
          All Available Courses
        </h1>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full max-w-6xl">
          {data.map((item, index) => (
            <div
              key={index}
              className={`${
                !background
                  ? "bg-slate-800 hover:bg-slate-700"
                  : "bg-[#2cc9be] hover:bg-[#2cb6ad]"
              } p-5 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 `}
            >
              <h2 className="text-2xl font-semibold text-white mb-2 truncate">
                {item.title}
              </h2>
              <p
                className={`text-sm ${
                  !background ? "text-slate-400" : "text-white"
                } mb-4`}
              >
                Code: {item.Code}
              </p>
              <Link
                className={`${
                  !background
                    ? "text-blue-300 hover:text-blue-500"
                    : "text-[#157666] hover:text-black"
                }  text-lg underline`}
                to={`/course/${item.Code}`}
              >
                View Course Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowCourseList;
