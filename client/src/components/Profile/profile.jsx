import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "@/context/authContext";
import Navbar from "../navbar";

const ProfilePage = () => {
  const {
    userDetail,
    setUserDetails,
    setAuthorized,
    background,
    setBackground,
  } = useContext(Context);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { profilePicture } = useContext(Context);

  // setInterval(() => {
  //   setBackground(!background);
  // }, 500);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserDetails(storedUser);
    }
  }, [setUserDetails]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setAuthorized(false);
    navigate("/login");
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Password updated successfully");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div
      className={`min-h-screen ${
        background ? "bg-gray-100 text-gray-800" : "bg-slate-950 text-white"
      }`}
    >
      <Navbar />
      <div className="flex items-start justify-center p-6">
        <div
          className={`w-full max-w-6xl ${
            background ? "bg-white" : "bg-slate-900 shadow-sm shadow-gray-100"
          } shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8`}
        >
          <div
            className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-md ${
              background
                ? "bg-gray-50 text-gray-800"
                : "bg-slate-800 text-white"
            }`}
          >
            <img
              className="h-40 w-40 rounded-full border"
              src={profilePicture}
              alt={userDetail?.name || "User"}
            />
            <h2 className="text-2xl font-semibold mt-4">
              {userDetail?.name || "User Name"}
            </h2>
            <p>{userDetail?.email || "user@example.com"}</p>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-medium w-40">Profession:</span>
                <span className="capitalize">
                  {userDetail?.profession || "Not specified"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium w-40">Other Details:</span>
                <span>Additional details here...</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold">Change Password</h3>
              <div className="mt-4 space-y-4">
                <input
                  type="password"
                  className={`w-full p-2 border rounded-lg ${
                    background ? "border-gray-300" : "border-slate-700"
                  }`}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  className={`w-full p-2 border rounded-lg ${
                    background ? "border-gray-300" : "border-slate-700"
                  }`}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={handlePasswordChange}
                  className={`w-full py-2 rounded-lg ${
                    background
                      ? "bg-[#2CA4AB] hover:bg-[#249499]"
                      : "bg-slate-800 hover:bg-slate-600"
                  } text-white`}
                >
                  Update Password
                </button>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
