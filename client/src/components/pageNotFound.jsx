import React from "react";
import Image from "../../public/error.avif";
import Navbar from "./navbar";
const pageNotFound = () => {
  return (
    <div className=" w-full h-full items-center justify-center ">
      <Navbar />
      <img
        className="md:h-[85vh] h-[50vh] md:ml-[30%] md:mt-1 mt-24 ml-12 items-center  rounded-full"
        src={Image}
        alt=""
      />
    </div>
  );
};

export default pageNotFound;
