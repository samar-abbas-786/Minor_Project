import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "@/context/authContext";

const AttemptTest = () => {
  const { code } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const { userDetail } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://backend-edupi-2.onrender.com/api/v1/questions/all",
          { params: { code } }
        );
        setQuestions(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to load questions. Please try again.");
      }
    };

    fetchQuestions();
  }, [code]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://backend-edupi-2.onrender.com/api/v1/questions/submit",
        { answers },
        { params: { code } }
      );

      const { success, totalMarks, obtainedMarks } = response.data;

      if (success) {
        navigate("/result", {
          state: {
            obtainedMarks,
            totalMarks,
          },
        });
      } else {
        alert("Failed to submit the test. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("Failed to submit the test. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Attempt Test - {code}
        </h1>
        {questions.map((question) => (
          <div
            key={question._id}
            className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md"
          >
            <p className="font-semibold text-lg text-gray-800">
              {question.question}
            </p>
            <div className="mt-3 space-y-2">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    checked={answers[question._id] === option}
                    onChange={() => handleOptionChange(question._id, option)}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Submit Test
        </button>
      </div>
    </div>
  );
};

export default AttemptTest;
