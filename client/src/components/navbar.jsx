import { Context } from "@/context/authContext";
import React, { useContext, useState } from "react";
import { IoSchool } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const {
    background,
    setBackground,
    authorized,
    setAuthorized,
    userDetail,
    profilePicture,
  } = useContext(Context);

  const [show, setShow] = useState(false);

  return (
    <nav
      className={`${
        background ? "bg-[#2CA4AB]" : "bg-slate-900"
      } shadow-2xl w-full`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center space-x-3">
            <IoSchool className="h-12 w-12 text-white hover:scale-105 transform transition duration-200 ease-in-out" />
            <span className="text-white font-bold text-2xl md:text-3xl tracking-wide font-serif">
              Edu<span className="text-yellow-300">PI</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-10 items-center">
            <Link
              to="/"
              className="text-white font-semibold text-[14px] hover:text-slate-400 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Home
            </Link>

            {userDetail?.profession === "student" && (
              <>
                <Link
                  to="/ShowInstructions"
                  className="text-white font-semibold text-[14px] hover:text-slate-400 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Show Instruction
                </Link>
                <Link
                  to="/take-test"
                  className="text-white font-semibold text-[14px] hover:text-slate-400 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Attempt Test
                </Link>
              </>
            )}

            {userDetail?.profession !== "student" && (
              <>
                <Link
                  to="/AddInstructions"
                  className="text-white font-semibold text-[14px] hover:text-slate-400 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Add Instruction
                </Link>
                <Link
                  to="/add-question"
                  className="text-white font-semibold text-[14px] hover:text-slate-400 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Add Questions
                </Link>
                <Link
                  to="/AddCourse"
                  className="text-white font-semibold text-[14px] hover:text-slate-400 transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Add Courses
                </Link>
              </>
            )}

            <Link
              to="/showCourseList"
              className="text-white font-semibold text-[14px] hover:text-slate-400 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Course List
            </Link>
          </div>

          <div className="flex space-x-4 items-center">
            {!authorized && (
              <div className="flex space-x-4 items-center">
                <Link
                  to="/login"
                  className={`text-white font-semibold py-1 px-4 md:py-2 md:px-6 rounded-full ${
                    background
                      ? "bg-gradient-to-r from-[#2CA4AB] to-[#1D8D92]"
                      : "bg-slate-900 shadow-sm shadow-white"
                  } hover:from-[#262626] hover:to-[#1E1E1E] transition-all duration-500 ease-in-out transform hover:scale-105 shadow-lg`}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className={`text-[#2CA4AB] font-semibold py-1 px-4 md:py-2 md:px-6 rounded-full ${
                    background
                      ? "bg-gradient-to-r from-white to-gray-100"
                      : "bg-slate-800 shadow-sm shadow-white text-slate-50"
                  } hover:from-gray-50 hover:to-white transition-all duration-500 ease-in-out transform hover:scale-105 shadow-lg`}
                >
                  Register
                </Link>
              </div>
            )}

            {authorized && (
              <Link to="/profile" className="text-4xl text-white">
                <span>
                  <img
                    className="h-12 w-12 rounded-full"
                    src={profilePicture}
                    alt=""
                  />
                </span>
              </Link>
            )}

            <button
              onClick={() => setBackground(!background)}
              className={`text-xl ${background ? "text-white" : "text-white"}`}
            >
              {background ? <FaMoon /> : <IoSunny />}
            </button>

            <button
              onClick={() => setShow(!show)}
              className="md:hidden text-3xl text-white"
            >
              {show ? <RxCross1 /> : <GiHamburgerMenu />}
            </button>
          </div>
        </div>
      </div>

      <div className={`${show ? "block" : "hidden"} md:hidden`}>
        <div
          className={`px-2 pt-2 pb-3 space-y-1 ${
            background
              ? "bg-gradient-to-r from-[#2CA4AB] to-[#67B26F]"
              : "bg-slate-800"
          }`}
        >
          <Link
            to="/"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
          >
            Home
          </Link>

          {userDetail?.profession === "student" && (
            <>
              <Link
                to="/ShowInstructions"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
              >
                Show Instruction
              </Link>
              <Link
                to="/take-test"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
              >
                Attempt Test
              </Link>
            </>
          )}

          {userDetail?.profession !== "student" && (
            <>
              <Link
                to="/AddInstructions"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
              >
                Add Instruction
              </Link>
              <Link
                to="/add-question"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
              >
                Add Questions
              </Link>
              <Link
                to="/AddCourse"
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
              >
                Add Courses
              </Link>
            </>
          )}

          <Link
            to="/showCourseList"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
          >
            Course List
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
