import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ShowInstructions = () => {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { code } = useParams();
  const navigate = useNavigate();

  const getInstructions = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/instruction/getInstruction`,
        {
          params: { code },
          withCredentials: true,
        }
      );
      if (data && data.getAllInstruction) {
        setInstructions(data.getAllInstruction[0]?.instruction || []);
      }
    } catch (err) {
      console.error("Error fetching instructions:", err);
      setError("Failed to fetch instructions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getInstructions();
  }, [code]);

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Important Instructions
      </h1>
      {loading ? (
        <div className="text-center text-gray-500 text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : instructions.length > 0 ? (
        instructions.map((instruction, index) => (
          <div
            key={index}
            className="text-lg text-gray-700 mb-4 p-4 border-l-4 border-green-500 bg-gray-50 hover:bg-green-100 transition-all rounded-md"
          >
            <span className="font-semibold">{index + 1}.</span> {instruction}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No instructions available.
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate(`/attemptTest/${code}`)}
          className="px-6 py-3 text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-lg font-semibold transition-all"
        >
          Attempt Test
        </button>
      </div>
    </div>
  );
};

export default ShowInstructions;
