import React from "react";
import Header from "../Componets/Header"
import SpecialityMenu from "../Componets/SpecialityMenu"
import TopDoctors from "../Componets/TopDocters"
import Banner from "../Componets/Banar"
import Sidebar from "../Componets/SaidBar" // Ensure you import Sidebar correctly

export default function Home() {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 ml-40 "> 
        <Header />
        <SpecialityMenu />
        <TopDoctors />
        <Banner />
      </div>
    </div>
  );
}
