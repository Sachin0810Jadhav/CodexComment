import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic
    const response = await axios.post(
      "http://localhost:3000/user/signup",
      form,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data.msg == "user created successfully") {
      localStorage.setItem("token", response.data.token);
      toast.success(response.data.msg);
      navigate("/mainPage");
    } else {
      toast.error(response.data.msg);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center ">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-cyan-500">
          Sign Up
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block text-gray-300">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <a href="/signin" className="text-cyan-400 hover:underline">
            Signin
          </a>
        </p>
      </div>
    </div>
  );
}
