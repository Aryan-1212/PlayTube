import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="bg-[#1c1c21] w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-md bg-[#26262c] rounded-2xl shadow-lg p-10 flex flex-col items-center space-y-10">
  
        <h1 className="text-white text-3xl font-semibold text-center">
          Step into the world of <span className="text-blue-500 hover:text-blue-600">PlayTube</span>
        </h1>

        <div className="w-full flex flex-col space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-[#1f1f25] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-[#1f1f25] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        </div>

        <div className="w-full flex flex-col items-center space-y-4">
          <button className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-medium py-3 rounded-md transition duration-300">
            Log In
          </button>
          <Link className="text-sm text-gray-400 hover:text-gray-200 cursor-pointer transition">Forgot Password?</Link>
          <Link to="/register" className="text-sm text-gray-400 hover:text-gray-200 cursor-pointer transition">Create a New Account</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
