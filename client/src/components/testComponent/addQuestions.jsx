import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Code } from "lucide-react";

const AddQuestions = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
      marks: 1,
    },
  ]);
  const [timer, setTimer] = useState(0);

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctOption: "", marks: 1 },
    ]);
  };

  const handleQuestionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, e) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].correctOption = e.target.value;
    setQuestions(newQuestions);
  };

  const handleMarksChange = (index, e) => {
    const newQuestions = [...questions];
    newQuestions[index].marks = e.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        questions: questions.map((q) => ({
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
          marks: q.marks,
        })),
        timer,
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/questions/add",
        payload
      );

      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctOption: "",
          marks: 1,
        },
      ]);
      navigate(`/course/${Code}`);
      setTimer(0);
    } catch (error) {
      console.error("Error adding questions:", error);
      alert("Failed to add questions");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add Multiple Questions
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={q.question}
                  onChange={(e) => handleQuestionChange(index, e)}
                  required
                />
              </div>

              {q.options.map((opt, optIndex) => (
                <div key={optIndex}>
                  <label className="block mb-2 text-sm font-medium text-gray-600">
                    Option {optIndex + 1}
                  </label>
                  <input
                    type="text"
                    className="w-full mb-2 px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    value={opt}
                    onChange={(e) => handleOptionChange(index, optIndex, e)}
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Correct Option
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={q.correctOption}
                  onChange={(e) => handleCorrectOptionChange(index, e)}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Marks
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={q.marks}
                  onChange={(e) => handleMarksChange(index, e)}
                  required
                />
              </div>
            </div>
          ))}

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Timer (in seconds)
            </label>
            <input
              type="number"
              className="w-full px-4 py-2 bg-gray-200 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={timer}
              onChange={(e) => setTimer(e.target.value)}
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Questions
            </button>
            <button
              type="button"
              onClick={addQuestionField}
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Add More Questions
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddQuestions;
