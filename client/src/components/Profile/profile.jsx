import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { Context } from "@/context/authContext";

const ProfilePage = () => {
  const { userDetail, setUserDetails, setAuthorized } = useContext(Context);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <div className="min-h-screen flex items-start justify-center bg-gray-100 p-6">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg shadow-md">
          <FaUserCircle className="text-6xl text-gray-500 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800">
            {userDetail?.name}
          </h2>
          <p className="text-gray-600">{userDetail?.email}</p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-40">
                Profession:
              </span>
              <span className="text-gray-800 capitalize">
                {userDetail?.profession}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 font-medium w-40">
                Other Details:
              </span>
              <span className="text-gray-800">Additional details here...</span>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800">
              Change Password
            </h3>
            <div className="mt-4 space-y-4">
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                onClick={handlePasswordChange}
                className="w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700"
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
  );
};

export default ProfilePage;
