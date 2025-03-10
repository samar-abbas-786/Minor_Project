import { useContext, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom"; // Import useParams
import Navbar from "../navbar";
import axios from "axios";
import { Context } from "@/context/authContext";

const AddInstructions = () => {
  const { code } = useSearchParams();

  const [count, setCount] = useState(1);
  const [inst, setInst] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [subjectCode, setSubjectCode] = useState(code);
  const { background } = useContext(Context);
  console.log(subjectCode);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      "http://localhost:5000/api/v1/instruction/addInstruction",
      { instruction: inst, code: subjectCode },
      {
        withCredentials: true,
      }
    );

    console.log(data);
    setCount(1);
    setInputValue("");
    setInst([]);
    setSubjectCode("");
  };

  const handleAdd = () => {
    setInst((prev) => [...prev, inputValue]);
    setInputValue("");
    setCount((c) => c + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl flex mb-16 space-x-12">
          <div className="w-1/2 flex flex-col space-y-6">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Add Instructions
            </h1>
            <form>
              <div className="flex items-center space-x-3">
                <label
                  className="text-2xl font-semibold text-gray-700"
                  htmlFor="inp"
                >
                  {count}.
                </label>
                <input
                  id="inp"
                  value={inputValue}
                  name="instruction"
                  onChange={(e) => setInputValue(e.target.value)}
                  className="h-12 w-full p-4 bg-gray-200 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  type="text"
                  placeholder="Enter instruction"
                />
                <button
                  onClick={handleAdd}
                  type="button"
                  className={`px-6 py-3 ${
                    !background
                      ? "bg-slate-900 hover:bg-slate-800"
                      : "bg-[#2CA4AB] hover:bg-[#1D8D92]"
                  } text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition`}
                >
                  Add
                </button>
              </div>

              <button
                onClick={onHandleSubmit}
                className={`w-full py-3 ${
                  !background
                    ? "bg-slate-900 hover:bg-slate-800"
                    : "bg-[#2CA4AB] hover:bg-[#1D8D92]"
                } text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition mt-6`}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>

          <div className="w-1/2 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Added Instructions:
            </h2>
            <div className="flex flex-col space-y-2">
              {inst.map((instruction, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-xl font-medium text-gray-700">
                    {index + 1}.
                  </span>
                  <span className="text-lg font-mono text-gray-600">
                    {instruction}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstructions;
