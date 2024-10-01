import React, { useContext } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../public/hero2.jpg"; // Adjust the import path if needed
import { Context } from "@/context/authContext";

const HeroSection = () => {
  const { background, setBackground } = useContext(Context);

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between h-[100vh] md:h-[87vh] ${
        background ? "bg-gray-50" : "bg-slate-900"
      }`}
    >
      {/* Left Side - Content */}
      <div
        className={`flex flex-col justify-center p-10 ${
          background ? "text-[#000]" : "text-[#fff]"
        } w-full lg:w-1/2 text-center lg:text-left`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
          Elevate Your Learning Experience
        </h1>
        <p className="text-md sm:text-lg mb-8">
          Join our interactive courses with live video classes and hands-on
          tests led by expert teachers.
        </p>
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/login"
            className={`text-white font-semibold py-3 px-6 rounded-full ${
              background
                ? "bg-gradient-to-r from-[#2CA4AB] to-[#1D8D92]"
                : "bg-slate-900 shadow-sm shadow-white"
            } hover:from-[#262626] hover:to-[#1E1E1E] transition-all duration-500 ease-in-out transform hover:scale-110 shadow-lg`}
          >
            Get Started
          </Link>
          <Link
            to="/signup"
            className="text-black font-semibold py-3 px-6 rounded-full bg-white hover:bg-gray-200 transition-all duration-500 ease-in-out transform hover:scale-110 shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="md:w-full w-[90vw]  lg:w-2/5 h-[40vh] sm:h-[50vh] lg:h-[60vh] mt-8 lg:mt-0 lg:mr-12">
        <img
          src={heroImage}
          alt="Hero"
          className="object-cover h-full w-full md:rounded-xl" // Ensure the image covers the area properly
        />
      </div>
    </div>
  );
};

export default HeroSection;
