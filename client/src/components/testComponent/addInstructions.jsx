import React, { useState, useMemo } from "react";
import axios from "axios";

const AddInstructions = () => {
  const [count, setCount] = useState(1);
  const [inst, setInst] = useState([]);
  const [inputValue, setInputValue] = useState("");

  //   const onHandleInput = (e) => {
  //     setInputValue(e.tartget.value);
  //   };

  const onHandleSubmit = async () => {
    const { data } = await axios.post("url", [inst], {
      withCredentials: true,
    });
    setCount(1);
    setInputValue("");
    setInst("");
  };

  const handleAdd = () => {
    setInst((prev) => [...prev, inputValue]);
    setInputValue("");
    setCount((c) => c + 1);
  };

  return (
    <div className="text-center flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-center mt-5">
        Add Instructions
      </h1>

      <form>
        <div id="testDiv" className={`space-x-3`}>
          <label className="text-xl font-bold" htmlFor="ins1">
            {count}
          </label>
          <input
            id="inp"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-[7vh] w-[60vw] bg-slate-200 rounded-md"
            type="text"
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 px-4 py-1 text-white font-serif rounded-md"
          >
            Add
          </button>
        </div>
        <div className=" mt-3 w-[60vw]  text-lg font-mono  flex items-center justify-center  rounded-md">
          <p className="mt-3" id="Added">
            {inst.map((instruction, index) => (
              <div key={index}>
                {index + 1}. {instruction}
              </div>
            ))}
          </p>
        </div>
      </form>
      <button
        onClick={onHandleSubmit}
        className="px-3 py-1 bg-green-600 text-white font-mono rounded-md"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
};

export default AddInstructions;
