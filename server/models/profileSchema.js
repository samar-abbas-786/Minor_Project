const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  collegeName: {
    type: String,
    required: [true, "Please enter your college name!"],
  },
  yearOfStudying: {
    type: String,
    required: [true, "Please provide the year of studying!"],
  },
  branch: {
    type: String,
    required: [true, "Please provide your branch!"],
  },
  profession: {
    type: String,
    required: [true, "Please provide your profession!"],
    enum: ["student", "professor"],
    default: "student",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
