import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AddQuestions = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctOption: "",
      marks: 1,
    },
  ]);

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctOption: "", marks: 1 },
    ]);
  };

  const removeQuestionField = (index) => {
    const newQuestions = questions.filter((_, idx) => idx !== index);
    setQuestions(newQuestions);
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[index].options[optionIndex] = value;
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
      };

      const response = await axios.post(
        `https://backend-edupi-2.onrender.com/api/v1/questions/add?code=${code}`,
        payload
      );

      // alert(response.data.message);
      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctOption: "",
          marks: 1,
        },
      ]);
      navigate(`/course/${code}`);
    } catch (error) {
      console.error("Error adding questions:", error);
      alert("Failed to add questions");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-200 to-slate-400 flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add Questions
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className="relative bg-gray-100 rounded-lg shadow-md p-6 space-y-4"
            >
              <button
                type="button"
                onClick={() => removeQuestionField(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                title="Remove this question"
              >
                <AiOutlineDelete size={20} />
              </button>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Question {index + 1}
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={q.question}
                  onChange={(e) =>
                    handleInputChange(index, "question", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Options
                </label>
                {q.options.map((opt, optIndex) => (
                  <div key={optIndex} className="flex items-center space-x-3">
                    <input
                      type="text"
                      className="w-full px-4 py-2 mt-1  bg-gray-200  border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                      required
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Correct Option
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-200 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={q.correctOption}
                  onChange={(e) =>
                    handleInputChange(index, "correctOption", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Marks
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 bg-gray-200 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={q.marks}
                  onChange={(e) =>
                    handleInputChange(index, "marks", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestionField}
            className="flex items-center justify-center w-full px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500"
          >
            <FiPlusCircle className="mr-2" />
            Add More Questions
          </button>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500"
          >
            Submit Questions
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestions;
