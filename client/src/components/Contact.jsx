import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "@/context/authContext";

const ContactUs = () => {
  const { background } = useContext(Context);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-edupi-2.onrender.com/api/v1/contact",
        formData
      );

      if (response.status === 201) {
        setSubmissionStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmissionStatus("Failed to send the message. Please try again.");
      }
    } catch (error) {
      setSubmissionStatus("An error occurred. Please try again later.");
      console.error("Error:", error);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-6 py-20 transition-all duration-300 ${
        background ? "bg-white" : "bg-gray-950"
      }`}
    >
      <div
        className={`w-full max-w-3xl p-8 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out ${
          background ? "bg-white" : "bg-gray-950"
        }`}
      >
        <h2
          className={`text-4xl font-bold text-center mb-4 ${
            background ? "text-gray-800" : "text-white"
          }`}
        >
          Get in Touch with Us
        </h2>
        <p
          className={`text-center mb-8 text-lg ${
            background ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Have questions or need assistance? Fill out the form and our team will
          respond promptly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className={`block mb-1 font-medium ${
                background ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#2CA4AB] focus:outline-none transition-all ${
                background
                  ? "border-gray-300 bg-white text-black"
                  : "border-gray-700 bg-gray-900 text-white placeholder-gray-400"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className={`block mb-1 font-medium ${
                background ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#2CA4AB] focus:outline-none transition-all ${
                background
                  ? "border-gray-300 bg-white text-black"
                  : "border-gray-700 bg-gray-900 text-white placeholder-gray-400"
              }`}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className={`block mb-1 font-medium ${
                background ? "text-gray-700" : "text-gray-200"
              }`}
            >
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-[#2CA4AB] focus:outline-none transition-all ${
                background
                  ? "border-gray-300 bg-white text-black"
                  : "border-gray-700 bg-gray-900 text-white placeholder-gray-400"
              }`}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#1D8D92] to-[#2CA4AB] hover:from-[#155E63] hover:to-[#1B7A7F] transition-transform duration-500 transform hover:scale-105 shadow-md"
          >
            Send Message
          </button>
        </form>

        {submissionStatus && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              submissionStatus.startsWith("Message sent")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {submissionStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
