const {
  createProfile,
  getProfileByUserId,
} = require("../controller/profileControlller");
const express = require("express");
const router = express.Router();

router.post("/createProfile", createProfile);
router.get("/getProfileByUserId", getProfileByUserId);

module.exports = router;
