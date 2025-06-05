import React, { useContext } from "react";
import { Context } from "@/context/authContext";
import Navbar from "../navbar";

const TeacherProfilePage = () => {
  const { background, profilePicture, prof } = useContext(Context);

  return (
    <div
      className={`min-h-screen ${
        background ? "bg-gray-100 text-gray-800" : "bg-slate-950 text-white"
      }`}
    >
      <Navbar />
      <div className="flex items-start justify-center p-6">
        <div
          className={`w-full max-w-6xl ${
            background ? "bg-white" : "bg-slate-950 shadow-md shadow-gray-100"
          } shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8`}
        >
          <div
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md ${
              background
                ? "bg-gray-50 text-gray-800"
                : "bg-slate-800 text-white"
            }`}
          >
            <img
              className="h-40 w-40 rounded-full border"
              src={profilePicture}
              alt={prof?.name || "Teacher"}
            />
            <h2 className="text-2xl font-semibold mt-4">
              {prof?.name || "Teacher Name"}
            </h2>
            <p>{prof?.email || "teacher@example.com"}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-medium w-40">Profession:</span>
                <span className="capitalize">
                  {prof?.profession || "Not specified"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-40">Subjects Taught:</span>
                <span>
                  {prof?.subjects?.join(", ") || "No subjects listed"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-40">Courses Assigned:</span>
                <span>{prof?.coursesCount || 0} courses</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-40">Students Enrolled:</span>
                <span>{prof?.studentsEnrolled || 0} students</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfilePage;
