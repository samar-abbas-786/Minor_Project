import React, { useState } from "react";
import axios from "axios";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");
  const [marks, setMarks] = useState(1);
  const [questionsList, setQuestionsList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/questions/add",
        {
          question,
          option: options,
          correctOption,
          marks,
        }
      );

      // Add the newly added question to the right side list
      setQuestionsList([
        ...questionsList,
        { question, options, correctOption, marks },
      ]);

      alert(response.data.message);
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOption("");
      setMarks(1);
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Add Question
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Question
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Options
              </label>
              {options.map((opt, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-full mb-2 px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring"
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  required
                />
              ))}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Correct Option
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring"
                value={correctOption}
                onChange={(e) => setCorrectOption(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Marks
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 border border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none focus:ring"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Add Question
            </button>
          </form>
        </div>
      </div>

      <div className="flex-1 bg-white p-6 shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Questions List</h3>
        {questionsList.length > 0 ? (
          <ul className="space-y-4">
            {questionsList.map((q, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <p className="font-medium text-gray-800">{q.question}</p>
                <ul className="list-disc list-inside mt-2">
                  {q.options.map((opt, idx) => (
                    <li key={idx} className="text-gray-600">
                      {opt}{" "}
                      {opt === q.correctOption && (
                        <span className="text-green-500">(Correct)</span>
                      )}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-sm text-gray-500">Marks: {q.marks}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No questions added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddQuestion;
