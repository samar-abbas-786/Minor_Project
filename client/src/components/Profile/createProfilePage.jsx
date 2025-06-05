import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../navbar";
import { Context } from "@/context/authContext";

const CreateProfilePage = () => {
  const navigate = useNavigate();
  const [collegeName, setCollegeName] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [branch, setBranch] = useState("");
  //   const [additionalInfo, setAdditionalInfo] = useState("");
  const { userDetail, isProfile, setIsProfile, background } =
    useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(collegeName, yearOfStudy, branch);
    console.log(userDetail);
    if (!collegeName || !yearOfStudy || !branch) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/profile/createProfile",
        {
          collegeName,
          yearOfStudying: yearOfStudy,
          branch,
          userId: userDetail._id,
          profession: userDetail.profession,
        }
      );

      if (response.status === 201) {
        setIsProfile(true);
        navigate("/profile");
      }
    } catch (error) {
      console.error(
        "Error creating profile:",
        error.response?.data || error.message
      );
      alert("There was an error creating the profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />
      <div className="flex justify-center items-center p-6">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 gap-8">
          <div className="text-center mb-6">
            <h2
              className={`text-3xl font-bold ${
                background ? "text-[#2CA4AB]" : "text-slate-900"
              }`}
            >
              Create Your Profile
            </h2>
            <p className="text-gray-600 text-lg">
              Fill in the details below to complete your profile.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className={`absolute ${
              background ? "bg-[#2CA4AB]" : "bg-slate-950"
            }  text-white px-5 py-1 rounded-sm`}
          >
            Skip
          </button>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  name="collegeName"
                  className="p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-[#2CA4AB] outline-none"
                  placeholder="Enter your College Name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Year of Study
                </label>
                <select
                  className="p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-[#2CA4AB] outline-none"
                  value={yearOfStudy}
                  name="yearOfStudying"
                  onChange={(e) => setYearOfStudy(e.target.value)}
                >
                  <option value="">Select Year</option>
                  <option value="First">First Year</option>
                  <option value="Second">Second Year</option>
                  <option value="Third">Third Year</option>
                  <option value="Final">Final Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Branch */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-2">
                  Branch
                </label>
                <input
                  type="text"
                  className="p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-[#2CA4AB] outline-none"
                  placeholder="Enter your Branch"
                  value={branch}
                  name="branch"
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className={`py-3 px-6 ${
                  background ? "bg-[#2CA4AB]" : "bg-slate-950"
                } text-white font-semibold rounded-lg hover:opacity-95 transition-colors`}
              >
                Create Profile
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            {/* <button
              onClick={() => navigate("/profile")}
              className="py-2 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Profile
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePage;
