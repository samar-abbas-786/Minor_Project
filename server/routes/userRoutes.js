const express = require("express");
const {
  login,
  logout,
  register,
  getUserById,
  getAllEnrolledStudent,
  getAllTeacher,
} = require("../controller/userController.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getUserById", getUserById);
router.get("/getEnrolled", getAllEnrolledStudent);
router.get("/getAllTeacher", getAllTeacher);

// router.get("/getuser", getUser);

module.exports = router;
