import React, { useContext } from "react";
import aboutImage from "../../public/about.jpg";
import { Link } from "react-router-dom";
import { Context } from "@/context/authContext";

const AboutSection = () => {
  const { background, setBackground } = useContext(Context);
  return (
    <div
      className={`flex flex-col-reverse md:flex-row items-center justify-between min-h-screen ${
        background
          ? "bg-gradient-to-r from-[#f0f4f8] to-[#e9eef5]"
          : "bg-gray-900"
      } py-16 px-8 md:px-24`}
    >
      {/* Left Side - Image */}
      <div className="w-full md:w-2/5">
        <div className="relative">
          <img
            src={aboutImage}
            alt="About Us"
            className="rounded-xl shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105"
          />
          {/* Decorative element for a modern look */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#2CA4AB] to-[#1D8D92] rounded-full opacity-70 blur-xl"></div>
        </div>
      </div>

      {/* Right Side - Text */}
      <div className="w-full md:w-1/2 text-black mt-8 md:mt-0 md:pl-16">
        <h2
          className={`text-4xl md:text-3xl font-extrabold leading-tight mb-6 ${
            background ? "text-[#333333]" : "text-white"
          }`}
        >
          Revolutionize Your Learning
        </h2>
        <p
          className={`text-md md:text-lg mb-6 ${
            background ? "text-[#555555]" : "text-gray-400"
          }`}
        >
          We're committed to making education engaging, interactive, and
          accessible. Our courses feature live sessions, hands-on assessments,
          and personalized learning experiences guided by industry experts.
        </p>
        <p
          className={`text-md md:text-lg mb-8 ${
            background ? "text-[#555555]" : "text-gray-400"
          }`}
        >
          Join a global community of learners and unlock your full potential
          with practical skills and real-world applications. Let’s shape the
          future together.
        </p>
        <Link
          to="/contact"
          className={`inline-block text-white font-semibold py-3 px-6 rounded-full ${
            background
              ? "bg-gradient-to-r from-[#1D8D92] to-[#2CA4AB]"
              : "bg-slate-800 text-white"
          } hover:from-[#262626] hover:to-[#1E1E1E] transition-all mb-6 duration-500 ease-in-out transform hover:scale-105 shadow-xl`}
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default AboutSection;
