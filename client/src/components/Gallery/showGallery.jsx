import React, { useContext, useEffect, useState } from "react";
import Navbar from "../navbar";
import { Context } from "@/context/authContext";
import axios from "axios";

const ShowGallery = () => {
  const { background } = useContext(Context);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          "https://backend-edupi-2.onrender.com/api/v1/Gallery/getAllPost"
        );
        setGallery(response.data.gallery);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div
      className={`${
        background ? "bg-gray-50 text-gray-900" : "bg-slate-950 text-white"
      } min-h-screen`}
    >
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center mb-6">School Gallery</h1>
        <p className="text-center text-lg mb-10">
          Explore the memorable moments captured in our school’s vibrant
          journey.
        </p>

        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : error ? (
          <p className="text-center text-xl text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.length > 0 ? (
              gallery.map((item) => (
                <div
                  key={item._id}
                  className="rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={`https://backend-edupi-2.onrender.com/uploads/${item.picture}`}
                    alt={item.title}
                    className="w-full h-64 object-fit"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-400">
                      Uploaded on {item.uploadedAt}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-xl">No images found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowGallery;
