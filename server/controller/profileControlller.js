const Profile = require("../models/profileSchema");
const User = require("../models/userSchema");

const createProfile = async (req, res) => {
  const { userId, collegeName, yearOfStudying, branch, profession } = req.body;

  if (!collegeName || !yearOfStudying || !branch || !profession) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const newProfile = await Profile.create({
      userId,
      collegeName,
      yearOfStudying,
      branch,
      profession,
    });

    return res.status(201).json({
      message: "Profile created successfully",
      newProfile,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getProfileByUserId = async (req, res) => {
  const { userId } = req.query;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "User Not Found" });
  }
  const profile = await Profile.findOne({ userId: userId });
  if (!profile) {
    return res.status(400).json({ message: "User did not created profile" });
  }
  return res.status(200).json({ message: "Profile got successfully", profile });
};

module.exports = { createProfile, getProfileByUserId };
