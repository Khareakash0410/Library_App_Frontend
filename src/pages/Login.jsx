import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch, useSelector } from "react-redux";
import { login, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const {loading, error, message, user, isAuthenticated} = useSelector((state) => state.auth);

const dispatch = useDispatch();

const handleLogin = (e) => {
  e.preventDefault();

  const data = new FormData();

  data.append("email", email);
  data.append("password", password);

  dispatch(login(data));
};

useEffect(() => {
  if(message) {
    toast.success(message);
    dispatch(resetAuthSlice());
  }
  if(error) {
    toast.error(error);
    dispatch(resetAuthSlice());
  }
}, [dispatch, isAuthenticated, error, loading]);

if(isAuthenticated) {
  return <Navigate to={"/"} /> 
};



return <>

<div className="flex flex-col justify-center md:flex-row h-screen">

  {/* Left */}
  <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
   <div className="max-w-sm w-full">

    <div className="flex justify-center mb-12">
      <div className="rounded-full flex items-center justify-center">
        <img src={logo} alt="logo" className="h-24 w-auto"/>
      </div>
    </div>

    <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">Welcome Back !!</h1>
    <p className="text-gray-800 text-center mb-12">Please enter your credentials to login.</p>

    <form onSubmit={handleLogin}>
      <div className="mb-4">
        <input 
          type="email" 
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
        />
      </div>

      <div className="mb-4">
        <input 
          type="password" 
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
        />
      </div>

      <Link to={"/password/forgot"} className="font-semibold text-black mb-12">Forgot Password?
      </Link>

      <div className="block md:hidden font-semibold mt-5">
        <p>
          New to our platform?{" "}<Link className="text-sm text-gray-500 hover:underline" to={"/register"}>Sign Up</Link>
        </p>
      </div>

      <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">
        {loading ? "LOGGING" : "SIGN IN"}
      </button>
    </form>
   </div>
  </div>

  {/* Right */}
  <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
    <div className="text-center h-[400px]">
      <div className="flex justify-center mb-12">
        <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto"/>
      </div>
      <p className="text-gray-300 mb-12">New to our platform? Sign up now.</p>
      <Link className="border-2 mt-5 border-white px-8 w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition" to={"/register"}>SIGN UP</Link>
    </div>
  </div>

</div>

</>;
};

export default Login;
