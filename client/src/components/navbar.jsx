import { Context } from "@/context/authContext";
import React, { useContext, useState } from "react";
import { IoSchool } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const { background, setBackground, authorized, userDetail, profilePicture } =
    useContext(Context);

  const [show, setShow] = useState(false);

  return (
    <nav
      className={`${
        background
          ? "bg-gradient-to-r from-cyan-500 to-teal-500"
          : "bg-slate-900"
      } shadow-lg w-full`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 h-16">
          <Link to={"/"} className="flex items-center space-x-3">
            <IoSchool className="h-10 w-10 text-white transform transition-all duration-200 ease-in-out" />
            <span className="text-white font-extrabold text-md md:text-2xl tracking-wide font-serif">
              Madarsa Dua <span className="text-white">Educational</span>
              <span className="text-yellow-400"> School</span>
            </span>
          </Link>

          {authorized && (
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                to="/"
                className="text-white hover:text-slate-300  font-medium text-sm md:text-base hover:text-opacity-90 transition duration-200 ease-in-out transform "
              >
                Home
              </Link>

              {userDetail?.profession == "professor" && (
                <>
                  <Link
                    to="/AddCourse"
                    className="text-white font-medium text-sm md:text-base hover:text-slate-300 transition duration-200 ease-in-out transform "
                  >
                    Add Courses
                  </Link>
                </>
              )}
              <Link
                to="/gallery"
                className="text-white font-medium text-sm md:text-base hover:text-slate-300 transition duration-200 ease-in-out transform "
              >
                Gallery
              </Link>
              {userDetail?.profession === "admin" && (
                <Link
                  to={"/add-gallery"}
                  className="text-white font-medium text-sm md:text-base hover:text-slate-300 transition duration-200 ease-in-out transform "
                >
                  Add Gallery
                </Link>
              )}
              <Link
                to="/showCourseList"
                className="text-white font-medium text-sm md:text-base hover:text-slate-300 transition duration-200 ease-in-out transform "
              >
                Course List
              </Link>
              <button
                onClick={() =>
                  window.scroll({
                    top: 1200,
                    left: 0,
                    behavior: "smooth",
                  })
                }
                className="text-white font-medium text-sm md:text-base hover:text-slate-300 transition duration-200 ease-in-out transform "
              >
                Contact Us
              </button>
            </div>
          )}

          <div className="flex space-x-4 items-center">
            {!authorized ? (
              <div className="flex space-x-4 items-center">
                <Link
                  to="/login"
                  className={`text-white font-medium py-1 px-4 md:py-2 md:px-6 hidden md:block rounded-full ${
                    background
                      ? "bg-gradient-to-r from-[#2CA4AB] to-[#1D8D92]"
                      : "bg-slate-900 shadow-sm shadow-white"
                  } hover:from-[#262626] hover:to-[#1E1E1E] transition-all duration-500 ease-in-out transform hover:scale-105 shadow-lg`}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className={`text-[#2CA4AB] hidden md:block font-medium py-1 px-4 md:py-2 md:px-6 rounded-full ${
                    background
                      ? "bg-gradient-to-r from-white to-gray-100"
                      : "bg-slate-800 shadow-sm shadow-white text-slate-50"
                  } hover:from-gray-50 hover:to-white transition-all duration-500 ease-in-out transform hover:scale-105 shadow-lg`}
                >
                  Register
                </Link>
              </div>
            ) : (
              <Link to="/profile" className="text-3xl text-white">
                <img
                  className="h-10 w-10 rounded-full"
                  src={profilePicture}
                  alt="Profile"
                />
              </Link>
            )}

            <button
              onClick={() => setBackground(!background)}
              className={`text-xl text-white`}
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

      {authorized && (
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
            <Link
              to="/gallery"
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
            >
              Gallery
            </Link>
            {userDetail?.profession === "admin" && (
              <Link
                to={"/add-gallery"}
                className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
              >
                Add Gallery
              </Link>
            )}
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
            <button
              onClick={() =>
                window.scroll({
                  top: 1900,
                  left: 0,
                  behavior: "smooth",
                })
              }
              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
            >
              Contact us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
