import React, { useState } from "react";
import axios from "axios";
import { set } from "mongoose";

function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  };
  return (
    <div className=" w-full min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className=" text-4xl font-semibold ">Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div className=" w-full min-h-150 flex flex-col items-center justify-center">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              className=" px-5 py-3 rounded-md text-sm"
              type="text"
              id="username"
              name="username"
              required
              value={credentials.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password" className=" text-lg ">
              Password:
            </label>
            <input
              className=" px-5 py-3 rounded-md text-sm"
              type="password"
              id="password"
              name="password"
              required
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className=" px-3 py-2 bg-green-400 rounded-xl">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
