import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import axios from "axios";
import { Context } from "@/context/authContext";
import { useNavigate } from "react-router-dom";
const AddInstructions = () => {
  const [count, setCount] = useState(1);
  const [inst, setInst] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const { background, userDetail } = useContext(Context);
  const navigate = useNavigate();
  const { code } = useParams();

  useEffect(() => {
    setSubjectCode(code);
  }, [code]);

  const onHandleSubmit = async (e) => {
    e.preventDefault();

    console.log(inst);

    const { data } = await axios.post(
      "http://localhost:5000/api/v1/instruction/addInstruction",
      {
        instruction: inst,
        uploadedBy: userDetail._id,
        code: subjectCode,
      },
      { withCredentials: true }
    );

    console.log(data);
    setCount(1);
    setInputValue("");
    setInst([]);
    navigate(`/course/${code}`);
  };

  const handleAdd = () => {
    setInst((prev) => [...prev, inputValue]);
    setInputValue("");
    setCount((c) => c + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Add Instructions
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <form className="space-y-6">
                <div className="flex items-center space-x-4">
                  <label
                    className="text-xl font-semibold text-gray-700"
                    htmlFor="inp"
                  >
                    {count}.
                  </label>
                  <input
                    id="inp"
                    value={inputValue}
                    name="instruction"
                    onChange={(e) => setInputValue(e.target.value)}
                    className="h-12 w-full px-4 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                    type="text"
                    placeholder="Enter instruction"
                    required
                  />
                  <button
                    onClick={handleAdd}
                    type="button"
                    className="px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-slate-950 transition"
                  >
                    Add
                  </button>
                </div>

                <button
                  onClick={onHandleSubmit}
                  className={`w-full py-3 ${
                    background ? "bg-[#2CA4AB]" : "bg-slate-950"
                  } text-white font-medium rounded-md hover:scale-105 transition`}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Added Instructions:
              </h2>
              <div className="space-y-3">
                {inst.map((instruction, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm"
                  >
                    <span className="text-lg font-medium text-gray-700">
                      {index + 1}.
                    </span>
                    <span className="text-base text-gray-600">
                      {instruction}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInstructions;
