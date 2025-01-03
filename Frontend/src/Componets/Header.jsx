import React from "react";
import { FaArrowRight } from "react-icons/fa";
import docterImage from "../assets/docterimages.jpg";

import docterGroup from "../assets/Docter4image1.jpg";

export default function Header() {
  return (
    <div className=" flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-20">

      <div className="md:w-1/2 flex flex-col justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] text-white ">
      <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight"> 
        Book Appointment <br /> with Trusted Doctors 
      </p>
      <div className="flex flex-col md:flex-row gap-3 text-white text-sm font-light">
        <img  className="w-28" src={docterGroup} alt="" />
        <p>Doctors help patients to get relief from their pain. <br className=" hidden sm:block " />
           Doctors play a very essential role in human life. </p>
      </div>
      <a href="#speciality" className="flex items-center gap-2 bg-white px-10 py-3 rounded-full w-60   text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all  duration-300 ">Book Appointment <FaArrowRight className="w-3" />
      </a>
      </div>
      
      <div className="md:w-1/2 relative">
        <img className="w-full md:absolute bottom-0 h-auto roundede-lg  "     src={docterImage}    alt="" />
      </div>
</div>

    
  );
}
