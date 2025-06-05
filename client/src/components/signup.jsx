import React, { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "@/context/authContext";
import { MdEmail, MdLock } from "react-icons/md"; // Import the email and lock icons
import { FaUser } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa6";
// import { useToast } from "@/components/../hooks/use-toast";
// import { Button } from "@/components/ui/button"
// import { ToastAction } from "@/components/ui/toast";
// import { ToastContainer, toast } from "react-toastify";
// const notify = () => toast();

const SignUp = () => {
  // const { toast } = useToast();
  const navigate = useNavigate();

  //profession
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const { authorized, setAuthorized, setUserDetails } = useContext(Context);

  // navigate("/login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-edupi-2.onrender.com/api/v1/user/register",
        { name, email, password, profession },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response);
      setAuthorized(true);
      navigate("/");

      setName("");
      setEmail("");
      setPassword("");
      setProfession("");
    } catch (error) {
      console.error("error", error);
      setAuthorized(false);
    }
  };

  return (
    <div className="w-full max-h-screen flex">
      <div className="w-1/2 md:block hidden flex items-center justify-center">
        <img
          src="/register.png"
          alt="Registration"
          className="object-cover h-full"
        />
      </div>
      <div className="md:w-1/2 w-full  flex items-center justify-center">
        {/* {message ? toast({ message }) : null} */}
        <div className="max-w-md w-full p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign Up</h2>
          <form
            className="mt-8  space-y-8"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <FaUser className="absolute left-3 top-3 text-gray-500" />

                <input
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-md w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <MdEmail className="absolute left-3 top-3 text-gray-500" />
                <input
                  id="email-address"
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <FaPenNib className="absolute left-3 top-3 text-gray-500" />
                <select
                  id="profession"
                  name="profession"
                  type="option"
                  onChange={(e) => setProfession(e.target.value)}
                  autoComplete=""
                  required
                  placeholder="Choose  Profession"
                  className="appearance-none  rounded-md w-full px-10 py-2 border border-gray-300  text-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                >
                  <option className="text-gray-400" value="">
                    Choose Profession
                  </option>
                  <option className="" value="student">
                    Student
                  </option>
                  <option className="" value="professor">
                    Professor
                  </option>
                </select>
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <MdLock className="absolute left-3 top-3 text-gray-500" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              {/* <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-[#2CA4AB]"
              >
                Sign Up
              </Button> */}
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-[#2CA4AB]"
                variant="outline"

                // onClick={() => {
                //   toast({
                //     title: { message },
                //     description: { description },
                //     // action: (
                //     //   // <ToastAction altText="Goto schedule to undo">
                //     //   //   Undo
                //     //   // </ToastAction>
                //     // ),
                //   });
                // }}
              >
                Sign Up
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#2CA4AB] hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
