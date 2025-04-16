import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import {useDispatch, useSelector} from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const Header = () => {

const dispatch = useDispatch();
const {user} = useSelector((state) => state.auth);
const [currentTime, setCurrenttime] = useState("");
const [currentDate, setCurrentDate] = useState("");


useEffect(() => {
  const updateDatetime = () => {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = now.getHours() >= 12 ? "PM" : "AM";

    setCurrenttime(`${hours}:${minutes}:${ampm}`);

    const options = {month: "short", date: "numeric", year: "numeric"};
    setCurrentDate(now.toDateString("en-US", options));
  };

  updateDatetime();
  const intervalId = setInterval(updateDatetime, 1000);

  return () => clearInterval(intervalId);
}, []);



  return <>
   <header className="absolute top-0 bg-white w-full py-4 px-6 left-0 shadow-md flex justify-between items-center">

    {/* left */}
     <div className="flex items-center gap-2">
      <img className="w-8 h-8 rounded-full" src={user?.avatar?.url || userIcon} alt="userIcon" />
      <div className="flex flex-col sm:flex-row sm:gap-2">
        <span className="text-sm font-bold sm:text-lg lg:text-xl sm:font-bold">
             {user && user.name} 
        </span>
        <span className="text-sm font-medium sm:text-lg sm:font-medium border-[1px] border-black px-2 bg-yellow-300 hover:bg-yellow-400 flex justify-center items-center rounded-lg">
             {user && user.role} 
        </span>
      </div>
     </div>

     {/* right */}
     <div className="hidden md:flex items-center gap-2">
       <div className="flex flex-col text-sm lg:text-base items-end font-semibold">
        <span>
          {currentTime}
        </span>
        <span>
           {currentDate}
        </span>
       </div>

       <span className="bg-black h-14 w-[2px]" />

       <img src={settingIcon} alt="settingIcon" className="w-8 h-8 hover:cursor-pointer" onClick={() => dispatch(toggleSettingPopup())} />
        
     </div>

   </header>
  </>;
};

export default Header;
