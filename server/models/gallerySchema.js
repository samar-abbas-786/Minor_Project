const mongoose = require("mongoose");
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};
const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
    enum: ["portrait", "landscape"],
  },
  uploadedAt: {
    type: String,
    default: () => formatDate(new Date()),
    required: true,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);
module.exports = Gallery;
