const {
  createPost,
  getAllPost,
} = require("../controller/galleryController.js");
const upload = require("../utils/multer.js");
const express = require("express");
const router = express.Router();

router.get("/getAllPost", getAllPost);
router.post("/createPost", upload.single("picture"), createPost);

module.exports = router;
