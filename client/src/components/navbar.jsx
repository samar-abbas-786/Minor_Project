import { Context } from "@/context/authContext";
import React, { useContext, useState } from "react";
import { IoSchool } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoSunny } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { FaUserLarge } from "react-icons/fa6";

const Navbar = () => {
  //2CA4AB
  const { background, setBackground, authorized, setAuthorized } =
    useContext(Context);
  const [show, setShow] = useState(false);
  return (
    // <nav className="bg-gradient-to-r from-[#2CA4AB] to-[#2CA4AB] shadow-2xl w-full">
    <nav
      className={`${
        background ? "bg-[#2CA4AB]" : "bg-slate-900"
      } shadow-2xl w-full`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <IoSchool className="h-12 w-12 text-white hover:scale-105 transform transition duration-200 ease-in-out" />
            <span className="text-white font-bold text-2xl md:text-3xl tracking-wide font-serif">
              Edu<span className="text-yellow-300">PI</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-10 items-center ">
            <Link
              to="/"
              className="text-white font-semibold text-md hover:text-slate-900 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-white font-semibold text-md hover:text-slate-900 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Courses
            </Link>
            <Link
              to="/video-call"
              className="text-white font-semibold text-md hover:text-slate-900 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Video Call
            </Link>
            <Link
              to="/tests"
              className="text-white font-semibold text-md hover:text-slate-900 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Tests
            </Link>
            <Link
              to="/teachers"
              className="text-white font-semibold text-md hover:text-slate-900 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Teachers
            </Link>
            <Link
              to="/about"
              className="text-white font-semibold text-md hover:text-slate-900 transition duration-200 ease-in-out transform hover:scale-105"
            >
              About
            </Link>
          </div>
          {/* <Link
            className={`${background ? "text-white" : "text-white"} text-xl `}
            onClick={() => setBackground(!background)}
          >
            {background ? <IoSunny /> : <FaMoon />}
          </Link> */}
          {/* Action Buttons */}
          <div className="flex space-x-4 items-center">
            <Link
              to="/login"
              className={`text-white ${
                authorized ? "md:hidden" : "block"
              }  md:block hidden font-semibold py-1 px-4 md:py-2 md:px-6 rounded-full ${
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
              {!authorized ? (
                "Register"
              ) : (
                <Link>
                  <FaUserLarge />
                </Link>
              )}
            </Link>
            <Link
              className={`${background ? "text-white" : "text-white"} text-xl `}
              onClick={() => setBackground(!background)}
            >
              {background ? <FaMoon /> : <IoSunny />}
            </Link>
            <Link
              onClick={() => setShow(!show)}
              className="md:hidden text-3xl text-white"
            >
              {!show ? <GiHamburgerMenu /> : <RxCross1 />}
            </Link>
            {/* <span
              className={`${background ? "text-white" : "text-white"} text-xl`}
              onClick={() => setBackground(!background)}
            >
              {background ? <IoSunny /> : <FaMoon />}
            </span> */}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${show ? "block" : "hidden"} md:hidden `}>
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
            to="/courses"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
          >
            Courses
          </Link>
          <Link
            to="/video-call"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
          >
            Video Call
          </Link>
          <Link
            to="/tests"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
          >
            Tests
          </Link>
          <Link
            to="/teachers"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
          >
            Teachers
          </Link>
          <Link
            to="/about"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#2CA4AB] hover:bg-opacity-50 transition duration-200 ease-in-out"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
