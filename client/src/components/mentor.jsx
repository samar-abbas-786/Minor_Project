import React, { useContext } from "react";
import { Context } from "@/context/authContext";

const mentors = [
  {
    name: "Dr. Ayesha Khan",
    title: "AI & Data Science Mentor",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mr. Raghav Sharma",
    title: "Full Stack Developer",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    name: "Ms. Leena Verma",
    title: "Cybersecurity Expert",
    img: "https://randomuser.me/api/portraits/women/52.jpg",
  },
];

const MentorsSection = () => {
  const { background } = useContext(Context);

  return (
    <div
      id="mentors"
      className={`py-20 px-8 md:px-24 transition-all duration-300 ${
        background
          ? "bg-gradient-to-r from-[#e9eef5] to-[#f5f9ff]"
          : "bg-gray-950"
      }`}
    >
      <h2
        className={`text-4xl font-extrabold text-center mb-12 ${
          background ? "text-gray-800" : "text-white"
        }`}
      >
        Meet Our Mentors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className={`rounded-xl shadow-lg p-6 text-center transform transition duration-500 hover:scale-105 ${
              background ? "bg-white" : "bg-gray-800"
            }`}
          >
            <img
              src={mentor.img}
              alt={mentor.name}
              className="w-24 h-24 mx-auto rounded-full mb-4 shadow-md"
            />
            <h3
              className={`text-xl font-semibold ${
                background ? "text-gray-900" : "text-white"
              }`}
            >
              {mentor.name}
            </h3>
            <p
              className={`text-sm mt-2 ${
                background ? "text-gray-600" : "text-gray-400"
              }`}
            >
              {mentor.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorsSection;
