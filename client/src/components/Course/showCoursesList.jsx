import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Context } from "@/context/authContext";
import Navbar from "../navbar";
import { BsArrowRightShort } from "react-icons/bs";

const ShowCourseList = () => {
  const [data, setData] = useState([]);
  const { background } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backend-edupi-2.onrender.com/api/v1/course/listAllCourses"
        );
        // console.log("Response:", response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);
  if (data.length == 0) {
    return (
    <>
  <Navbar />
  <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
    <h2 className="text-3xl font-bold text-gray-800 mb-3 animate-pulse">
      📚 No Course Available
    </h2>
    <p className="text-gray-500 text-lg">
      Please check back later or reach out for more information.
    </p>
  </div>
</>

    );
  }

  return (
    <div>
      <Navbar />
      <div
        className={`${
          !background ? "bg-slate-950" : "bg-[#f6f6f6]"
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
          {data &&
            data.map((item, index) => (
              <div
                key={index}
                className={`${
                  !background
                    ? "bg-slate-800 hover:bg-slate-700"
                    : "bg-gray-50 hover:bg-gray-200"
                } p-5 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 `}
              >
                <h2
                  className={`text-2xl font-semibold ${
                    !background ? "text-white" : "text-black"
                  }  mb-2 truncate`}
                >
                  {item.title}
                </h2>
                <p
                  className={`text-sm ${
                    !background ? "text-white" : "text-slate-900"
                  } mb-4`}
                >
                  Code: {item.Code}
                </p>
                <Link
                  to={`/course/${item.Code}`}
                  className="flex items-center justify-between"
                >
                  <Link
                    className={`${
                      !background
                        ? "text-blue-300 hover:text-blue-500"
                        : "text-[#157666] hover:text-black"
                    }  text-md `}
                    to={`/course/${item.Code}`}
                  >
                    View Course Details
                  </Link>
                  <BsArrowRightShort
                    className={`${!background ? "text-white" : "text-black"}`}
                    size={30}
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShowCourseList;
