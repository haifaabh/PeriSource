import React from "react";
import esiLogo from '../assets/logo_esi.png'
import NameLogo from '../assets/NameLogo.svg'



const Footer=()=>{

    
    return(
    <div id="Contact" className="bg-white h-60 p-6 borderTopUser w-screen flex justify-between items-center">
        <div className="container mx-auto justify-between flex flex-wrap">
            <div className="w-full sm:w-1/2 md:w-1/4 xl:w-1/6 ml-4 space-y-4 font-bold font-rammeto text-2xl text-[#3F3F3F] jsu">
            <img src={NameLogo} alt="PeriSource" className="md:w-full w-[70%] h-[auto] " />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 xl:w-1/6 p-4 ml-4 space-y-4 font-bold font-rammeto text-2xl text-[#3F3F3F]">
            <img src={esiLogo} alt="PeriSource" className="w-[50%] md:w-full lg:h-[80px]" />
            </div>
            <div className=" w-full sm:w-1/2 md:w-1/4 xl:w-1/6 p-8 text-[#002366] font-montserrat font-bold lg:text-2xl  ">
                Contact Us 
            </div>
        </div>    
    </div>
    );
}

export default Footer;