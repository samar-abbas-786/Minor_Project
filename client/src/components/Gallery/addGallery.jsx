import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar";

const AddGallery = () => {
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState(null);
  const [mode, setMode] = useState("portrait");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setPicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !picture) {
      setError("Title and picture are required!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("picture", picture);
    formData.append("mode", mode);

    try {
      const response = await axios.post(
        "https://backend-edupi-2.onrender.com/api/v1/Gallery/createPost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setTitle("");
      setPicture(null);
      setMode("portrait");
      alert("Gallery post added successfully!");
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold text-center mb-6">
            Add New Gallery
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label className="block text-lg font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">
                Choose Image
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-md"
                onChange={handleFileChange}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Add Gallery Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddGallery;
