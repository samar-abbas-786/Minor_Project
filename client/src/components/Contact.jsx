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
        "http://localhost:5000/api/v1/contact",
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
      className={`flex flex-col items-center justify-center min-h-screen py-16 px-8 md:px-24 ${
        background ? "bg-gradient-to-r bg-white" : "bg-gray-900"
      }`}
    >
      <h2
        className={`text-4xl md:text-3xl font-extrabold leading-tight mb-6 ${
          background ? "text-[#333333]" : "text-white"
        }`}
      >
        Get in Touch with Us
      </h2>
      <p
        className={`text-md md:text-lg mb-8 text-center ${
          background ? "text-[#555555]" : "text-gray-400"
        }`}
      >
        Have questions or need assistance? Fill out the form below, and our team
        will get back to you promptly.
      </p>

      <form
        onSubmit={handleSubmit}
        className={`w-full md:w-2/3 lg:w-1/2 bg-white p-8 rounded-xl shadow-lg ${
          background ? "" : "bg-gray-800"
        }`}
      >
        <div className="mb-6">
          <label
            className={`block text-sm font-bold mb-2 ${
              background ? "text-[#333333]" : "text-gray-300"
            }`}
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1D8D92] transition-all"
          />
        </div>

        <div className="mb-6">
          <label
            className={`block text-sm font-bold mb-2 ${
              background ? "text-[#333333]" : "text-gray-300"
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1D8D92] transition-all"
          />
        </div>

        <div className="mb-6">
          <label
            className={`block text-sm font-bold mb-2 ${
              background ? "text-[#333333]" : "text-gray-300"
            }`}
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#1D8D92] transition-all"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold text-white ${
            background
              ? "bg-gradient-to-r from-[#1D8D92] to-[#2CA4AB]"
              : "bg-slate-800"
          } hover:from-[#262626] hover:to-[#1E1E1E] transition-all duration-500 transform hover:scale-105 shadow-xl`}
        >
          Send Message
        </button>
      </form>

      {submissionStatus && (
        <p
          className={`mt-4 ${
            submissionStatus.startsWith("Message sent")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {submissionStatus}
        </p>
      )}
    </div>
  );
};

export default ContactUs;
