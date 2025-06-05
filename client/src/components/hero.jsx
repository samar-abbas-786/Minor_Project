import React, { useContext } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../public/hero2.jpg";
import { Context } from "@/context/authContext";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { background, authorized } = useContext(Context);

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between h-[100vh] md:h-[90vh] px-6 md:px-16 transition-all duration-300 ${
        background ? "bg-gray-50" : "bg-gray-950"
      }`}
    >
      {/* Text Section */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`flex flex-col justify-center w-full lg:w-1/2 text-center lg:text-left ${
          background ? "text-slate-900" : "text-white"
        }`}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
          Elevate Your <span className="text-[#2CA4AB]">Learning</span>{" "}
          Experience
        </h1>
        <p className="text-lg sm:text-xl mb-10 leading-relaxed">
          Join our immersive courses featuring interactive tests, personalized
          learning paths, and expert mentorship — all designed to help you grow.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link
            to={authorized ? "/showCourseList" : "/login"}
            className="text-white font-semibold py-3 px-7 rounded-full bg-gradient-to-r from-[#1D8D92] to-[#2CA4AB] hover:from-[#16686d] hover:to-[#1f8d95] transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started
          </Link>

          {!authorized && (
            <Link
              to="/signup"
              className="text-black font-semibold py-3 px-7 rounded-full bg-white hover:bg-gray-200 transition-all duration-300 transform hover:scale-110 shadow-md"
            >
              Sign Up
            </Link>
          )}
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-2/5 mt-10 lg:mt-0 relative"
      >
        <div className="rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 ease-in-out">
          <img
            src={heroImage}
            alt="Hero"
            className="object-cover w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-xl pointer-events-none"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
