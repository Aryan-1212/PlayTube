import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { getUser, registerUser } from "../store/AuthSlice";
import Loading from "../Components/Loading";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

function Register() {
  const userData = useSelector(getUser);
  const dispatch = useDispatch();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const matchPassword = (password, confirmPassword)=>{
    return password === confirmPassword;
  }
  
  const handleSubmit = () =>{
    if(!matchPassword(password, confirmPassword)){
      toast.error("password and confirm password are not same")
      return;
    }
    
    dispatch(registerUser({username, email, password}))
  }
  
  useEffect(()=>{
    toast.error(userData.error)
  },[userData.error])
  
  if(userData && userData.isAuthenticated) return <Navigate to='/' />
  
  return (
    <>
    {userData?.loading && <Loading />}
    <div className="bg-[#1c1c21] w-screen h-screen flex justify-center items-center">
        <form onSubmit={(e)=>{
          e.preventDefault()
          handleSubmit()
        }}>
      <div className="w-full max-w-md bg-[#26262c] rounded-2xl shadow-lg p-10 flex flex-col items-center space-y-10">
        <h1 className="text-white text-3xl font-semibold text-center">
          Register to unlock{" "}
          <span className="text-blue-500 hover:text-blue-600">PlayTube</span>
        </h1>

        <div className="w-full flex flex-col space-y-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Full Name"
            className="w-full p-3 rounded-md bg-[#1f1f25] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-[#1f1f25] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          <div className="relative">
            <input
              type={togglePassword? "text":"password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-[#1f1f25] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <div className={`text-white absolute top-[35%] right-2 cursor-pointer`} onClick={()=>setTogglePassword(!togglePassword)}>
              {!togglePassword? <FaRegEye />:<FaRegEyeSlash />}
            </div>
          </div>
          <div className="relative">
            <input
              type={toggleConfirmPassword? "text":"password"}
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-[#1f1f25] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
            <div className={`text-white absolute top-[35%] right-2 cursor-pointer`} onClick={()=>setToggleConfirmPassword(!toggleConfirmPassword)}>
              {!toggleConfirmPassword? <FaRegEye />:<FaRegEyeSlash />}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center space-y-4">
          <button className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-medium py-3 rounded-md transition duration-300" type="submit">
            Register
          </button>
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-gray-200 cursor-pointer transition"
          >
            Already have an Account?
          </Link>
        </div>
      </div>
      </form>
    </div>
    </>
  );
}

export default Register;
