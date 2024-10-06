import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowInstructions = () => {
  const [instruction, setInstruction] = useState([]);

  const getInstruction = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/instruction/getInstruction",
      { withCredentials: true }
    );
    console.log(data.getAllInstruction[0].instruction);
    setInstruction(data.getAllInstruction[0].instruction);
  };

  useEffect(() => {
    getInstruction();
  }, []);

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Important Instructions
      </h1>
      {instruction.length > 0 ? (
        instruction.map((data, index) => (
          <div
            key={index}
            className="text-lg text-gray-700 mb-4 p-4 border-l-4 border-green-500 hover:bg-slate-200 transition-all"
          >
            <span className="font-semibold ">{index + 1}.</span> {data}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg">
          No instructions available.
        </div>
      )}
    </div>
  );
};

export default ShowInstructions;
