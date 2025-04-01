const Gallery = require("../models/gallerySchema.js");

const createPost = async (req, res) => {
  const { title, uploadedAt, mode } = req.body;

  const file = req.file.filename;
  console.log(file);

  if (!title || !file || !mode) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const gallery = new Gallery({
    title,
    picture: file,
    mode,
    uploadedAt,
  });
  gallery.save();
  if (!gallery) {
    return res.status(400).json({ message: "Could not upload post" });
  }
  return res
    .status(200)
    .json({ message: "Successfully uploaded post on gallery", gallery });
};

const getAllPost = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ uploadedAt: -1 });
    if (!gallery) {
      return res.status(400).json({ message: "Could not get post" });
    }
    return res
      .status(200)
      .json({ message: "Successfully got all post", gallery });
  } catch (error) {
    console.log("error", error);

    return res
      .status(400)
      .json({ message: "Could not get post(Internal Server Error)" });
  }
};
module.exports = { createPost, getAllPost };
