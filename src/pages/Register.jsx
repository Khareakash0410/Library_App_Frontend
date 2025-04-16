import React, { useEffect, useState } from "react";
import placeHolder from "../assets/placeholder.jpg";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate, useNavigate} from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";



const Register = () => {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [avatar, setAvatar] = useState(null);
const [avatarPreview, setAvatarPreview] = useState(null);
const dispatch = useDispatch();

const {loading, error, message, user, isAuthenticated} = useSelector((state) => state.auth);

const navigateTo = useNavigate();

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if(file) {
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setAvatar(file);
  };
};

const handleRegister = (e) => {
  e.preventDefault();
  if (password.length < 8 || password.length > 16) {
    return toast.error("Password must between 8 to 16 characters")
  }
  else {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("avatar", avatar);
    dispatch(register(data));
  }
};

useEffect(() => {
  if(message) {
    toast.success(message);
    dispatch(resetAuthSlice());
    navigateTo(`/otp-verification/${email}`);
  }
  if(error) {
    toast.error(error);
    dispatch(resetAuthSlice());
  }
}, [dispatch, isAuthenticated, error, loading]);

if(isAuthenticated) {
  return <Navigate to={"/"} /> 
}

return <>

<div className="flex flex-col justify-center md:flex-row h-screen">

  {/* left */}
    <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
      <div className="text-center h-[376px]">
        <div className="flex justify-center mb-12">
          <img className="mb-12 h-44 w-auto" src={logo_with_title} alt="logo" />
        </div>
        <p className="text-gray-300 mb-12">Already have Account? Sign in now.</p>
        <Link className="border-2 rounded-lg font-semibold border-white py-2 px-8 hover:bg-white hover:text-black transition" to={"/login"}>
         SIGN IN
        </Link>
      </div>
    </div>

  {/* right */}
     <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
       <div className="w-full max-w-sm">

         <div className="flex justify-center mb-12">
          <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-5">
            <h3 className="font-medium text-4xl overflow-hidden">
              Sign Up
            </h3>
            <img src={logo} alt="logo" className="h-auto w-24 object-cover"/>
          </div>
         </div>

         <p className="text-gray-800 text-center mb-12">
          Please provide your information to sign up.
         </p>
 
         <form onSubmit={handleRegister}>

            <div className="flex flex-col items-center mb-6">
              <label 
                htmlFor="avatarInput" 
                className="cursor-pointer"
              >
              <img 
                src={avatarPreview ? avatarPreview : placeHolder} alt="avatar" 
                className="w-24 h-24 rounded-full object-cover"
              />
              <input 
                type="file" 
                id="avatarInput" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
              </label>
            </div>

            <div className="mb-4">
              <input 
                type="text" 
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full Name"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input 
                type="email" 
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="mb-4">
              <input 
                type="password" 
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
              />
            </div>

            <div className="block md:hidden font-semibold mt-5">
              <p>Already have an account?
                <Link to={"/login"} className="text-sm text-gray-500 hover:underline">
                Sign In
                </Link>
              </p>
            </div>

            <button type="submit" className="border-2 mt-5 border-black w-full font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition">
             {loading ? "REGISTERING" : "SIGN UP"} 
            </button>
            
         </form>

       </div>
     </div>

</div>

</>;
};

export default Register;
