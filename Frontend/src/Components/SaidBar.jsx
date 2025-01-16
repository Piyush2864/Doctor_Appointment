import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChartBar, FaBell, FaClipboardList, FaHeart, FaWallet, FaCog, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} h-screen fixed top-0 left-0 transition-all shadow-lg ${isCollapsed ? "w-20" : "w-64"} p-4 flex flex-col`}>
      
      {/* Profile Section */}
      <div className="flex items-center gap-3 mb-6">
        {/* <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full" /> */}
        {!isCollapsed  && <div>
          {/* <h2 className="text-sm font-semibold">Stella Army</h2>
          <p className="text-xs opacity-70">Web Developer</p> */}
        </div>}
      </div>


      {/* Sidebar Menu */}
    
      <ul className="flex-1 space-y-4 ">
        <SidebarItem icon={<FaHome />} text="Dashboard" to="/" isCollapsed={isCollapsed} />
        <SidebarItem icon={<FaChartBar />} text="Medical History" to="/revenue" isCollapsed={isCollapsed} active />
        <SidebarItem icon={<FaBell />} text="Notifications" to="/notifications" isCollapsed={isCollapsed} />
        <SidebarItem icon={<FaClipboardList />} text="Vidoe Call History" to="/analytics" isCollapsed={isCollapsed} />
        {/* <SidebarItem icon={<FaHeart />} text="Likes" to="/likes" isCollapsed={isCollapsed} /> */}
        <SidebarItem icon={<FaWallet />} text="Wallets" to="/wallets" isCollapsed={isCollapsed} />
      </ul>

      {/* Bottom Section */}
      <div>
        <SidebarItem icon={<FaSignOutAlt />} text="Logout" to="/logout" isCollapsed={isCollapsed} />
        
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-full flex items-center gap-3 p-3 rounded-md text-sm font-semibold bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
          {!isCollapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>

      {/* Collapse Button */}
      <button
  onClick={() => setIsCollapsed(!isCollapsed)}
  className="absolute top-5 right-[-12px] text-black dark:text-white bg-gray-300 dark:bg-gray-700 rounded-full p-3 shadow-md text-2xl font-bold"
>
  <RxHamburgerMenu />
</button>
 </div>
  );
}

function SidebarItem({ icon, text, to, isCollapsed, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-3 rounded-md transition-all ${active ? "bg-red-500 text-white" : "hover:bg-gray-300 dark:hover:bg-gray-700"}`}
    >
      {icon}
      {!isCollapsed && <span>{text}</span>}
    </Link>
  );
}
