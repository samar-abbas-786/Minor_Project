import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { obtainedMarks, totalMarks } = location.state || {};

  const chartData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        data: [obtainedMarks, totalMarks - obtainedMarks],
        backgroundColor: ["#36A2EB", "#FF5733"],
        hoverOffset: 4,
      },
    ],
  };

  const handleGoHome = () => {
    navigate("/"); // Navigate to home page ("/" can be updated based on your route structure)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Test Results
        </h1>
        <p className="text-center text-gray-600 mb-4">{`Score: ${obtainedMarks} / ${totalMarks}`}</p>
        <div className="mt-4 w-full max-w-xs mx-auto">
          <Pie data={chartData} />
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleGoHome}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
