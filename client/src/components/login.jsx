import React, { useContext, useState } from "react";
import { Button } from "./ui/button";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context } from "@/context/authContext";
import { MdEmail } from "react-icons/md"; // Import the email icon
import { MdLock } from "react-icons/md"; // Import the lock icon for password

const Login = () => {
  //login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authorized, setAuthorized } = useContext(Context);
  const [message, setMessage] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(data);

      setAuthorized(true);
      setEmail("");
      setPassword("");
      setMessage(data.message);
      setDescription(data.description);
    } catch (error) {
      console.error("error", error);
      setAuthorized(false);
      setMessage(data.message);
      setDescription(data.description);
    }
  };

  if (authorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full max-h-screen flex">
      {/* Left Section: Image */}
      <div className="w-1/2 md:block hidden flex items-center justify-center">
        <img
          src="/login.png" // Replace with your desired login image
          alt="Login"
          className="object-cover h-full"
        />
      </div>
      {/* Right Section: Login Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="max-w-md w-full p-8 space-y-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-extrabold text-gray-900">Login</h2>
          <form className="mt-8 space-y-6" onSubmit={onSubmit} method="POST">
            <div className="rounded-md shadow-sm space-y-4">
              <div className="relative">
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
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-[#2CA4AB]"
              >
                Login
              </Button>
            </div>
          </form>
          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-[#2CA4AB] hover:underline">
                Sign Up here
              </Link>
            </p>
            <p className="text-gray-600">
              <Link
                to="/forgot-password"
                className="text-[#2CA4AB] hover:underline"
              >
                Forgot your password?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
