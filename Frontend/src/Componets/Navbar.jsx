import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo123 from "../assets/logo123.jpg";
import { RiArrowDropDownLine } from "react-icons/ri";
import Man_image from "../assets/image_man.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(true);
  
  return (
    <div className="flex justify-between items-center text-sm py-4 mb-5 border-b border-gray-400">
      <img onClick={()=>navigate('/')} className="w-10 cursor-pointer" src={logo123} alt="Logo" />
      <ul className="hidden md:flex items-start gap-6 font-medium">
        <li className="py-1">
          <Link to="/">HOME</Link>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        <li className="py-1">
          <Link to="/doctors">ALL DOCTORS</Link>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        <li className="py-1">
          <Link to="/about">ABOUT</Link>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
        <li className="py-1">
          <Link to="/contact">CONTACT</Link>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </li>
      </ul>
      <div className="flex items-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-10 rounded-full" src={Man_image} alt="Profile" />
            <RiArrowDropDownLine className="text-2xl" />
            <div className="absolute top-full right-0 pt-2 bg-white shadow-md text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4  p-4">
                <p   onClick={()=>navigate("my-profile")}  className="hover:text-black cursor-pointer">My Profile</p>
                <p   onClick={()=>navigate("my-appointments")}  className="hover:text-black cursor-pointer">My Appointments</p>
                <p  onClick={()=>setToken(false)}  className="hover:text-black cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <buttononclick    
            onClick={() => navigate('/login')}
            className="bg-blue-700 text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            Create Account
          </buttononclick>
        )}
      </div>
    </div>
  );
}
