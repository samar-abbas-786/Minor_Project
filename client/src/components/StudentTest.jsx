import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentTest = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/questions/all"
      );
      setQuestions(response.data.data);
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/questions/submit",
        {
          answers,
        }
      );
      setScore(response.data.obtainedMarks);
      alert(
        `You scored ${response.data.obtainedMarks} out of ${response.data.totalMarks}`
      );
    } catch (error) {
      console.error("Error submitting test:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Take the Test
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {questions.map((question) => (
            <div key={question._id} className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                {question.question}
              </h3>
              {question.option.map((opt, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    name={question._id}
                    value={opt}
                    onChange={(e) =>
                      handleAnswerChange(question._id, e.target.value)
                    }
                    className="mr-2 focus:ring-indigo-500"
                    required
                  />
                  <label className="text-gray-600">{opt}</label>
                </div>
              ))}
            </div>
          ))}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Submit Test
          </button>
        </form>

        {score !== null && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-center text-green-600">
              Your Score: {score}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTest;
