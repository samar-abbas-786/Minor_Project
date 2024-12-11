import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "@/context/authContext";
import axios from "axios";
import Navbar from "../navbar";

const ProfilePage = () => {
  const { userDetail, background, isProfile, setIsProfile, profilePicture } =
    useContext(Context);
  const navigate = useNavigate();
  const [enrollCourses, setEnrollCourses] = useState([]);
  const [profile, setProfile] = useState();
  const [enrollStudent, setEnrollStudent] = useState([]);

  const getAllCourses = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/course/getEnrolledCourses",
      { params: { userId: userDetail._id } }
    );
    if (!response) {
      return console.log("No Enrolled Course");
    }
    setEnrollCourses(response.data.getAllCourses || []);
  };

  useEffect(() => {
    getAllCourses();
  }, [userDetail]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getProfile = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/v1/profile/getProfileByUserId",
      {
        params: {
          userId: userDetail._id,
        },
      }
    );
    setProfile(response?.data.profile);
    setIsProfile(true);
  };

  useEffect(() => {
    if (userDetail) {
      getProfile();
    }
  }, [userDetail]);

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
            background ? "bg-white" : "bg-slate-900 shadow-md shadow-gray-100"
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
              alt={userDetail?.name || "User"}
            />
            <h2 className="text-2xl font-semibold mt-4">
              {userDetail?.name || "User Name"}
            </h2>
            <p>{userDetail?.email || "user@example.com"}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-medium w-40">Profession:</span>
                <span className="capitalize">
                  {profile?.profession || "Not specified"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-40">College Name:</span>
                <span>{profile?.collegeName || "Not specified"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-40">Year of Studying:</span>
                <span>{profile?.yearOfStudying || "Not specified"}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-40">Branch:</span>
                <span>{profile?.branch || "Not specified"}</span>
              </div>

              {userDetail.profession === "professor" && (
                <div className="flex items-center">
                  <span className="font-medium w-40">Enrolled Students:</span>
                  <Link
                    className={`
                    ${
                      background
                        ? "bg-yellow-600 text-white"
                        : "bg-slate-800 text-white"
                    } px-5 text-md py-1 rounded-sm font-semibold
                  `}
                    to={"/EnrolledStudents"}
                  >
                    View
                  </Link>
                </div>
              )}
            </div>

            {userDetail.profession === "student" && (
              <div className="mt-8">
                <a
                  className={`px-5 py-2 rounded-md font-semibold transition duration-300 ease-in-out transform hover:scale-105 shadow-md border-2 ${
                    background
                      ? "bg-orange-500 text-teal-50 hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-400"
                      : "bg-slate-900 text-teal-100 hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500"
                  }`}
                  href="/MyEnrollCourses"
                >
                  My Enrolled Courses
                </a>
              </div>
            )}

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
