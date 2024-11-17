const express = require("express");
const {
  login,
  logout,
  register,
  getUserBYId,
} = require("../controller/userController.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/getUserById", getUserBYId);

// router.get("/getuser", getUser);

module.exports = router;
