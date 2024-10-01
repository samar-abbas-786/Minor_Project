const express = require("express");
const {
  login,
  logout,
  register,
} = require("../controller/userController.js");


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// router.get("/getuser", getUser);

module.exports= router;
