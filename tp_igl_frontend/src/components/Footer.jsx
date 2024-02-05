import React from "react";
import esiLogo from '../assets/logo_esi.png'
import NameLogo from '../assets/NameLogo.svg'
import mailIcon from '../assets/mailIcon.svg'



const Footer=()=>{

    
    return(
    <div id="Contact" className="bg-white h-60 lg:p-6 p-2 borderTopUser w-screen flex justify-between items-center">
        <div className="container mx-auto justify-between pt-4 flex flex-wrap">
            <div className="lg:p-6 w-full sm:w-1/2 md:w-1/4 xl:w-1/6 ml-4 space-y-4 font-bold font-rammeto text-2xl text-[#3F3F3F]">
            <img src={NameLogo} alt="PeriSource" className="md:w-full w-[60%] h-[auto] " />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/4 xl:w-1/6 lg:p-4 pt-4 ml-4 space-y-4 font-bold font-rammeto text-2xl text-[#3F3F3F]">
            <img src={esiLogo} alt="PeriSource" className="w-[40%] md:w-full lg:h-[80px]" />
            </div>
            <div className=" w-full sm:w-1/4 md:w-1/4 xl:w-1/6 md:p-8 p-4 text-[#002366] font-montserrat font-bold text-2xl ">
                Contact Us 
                <div className="flex items-center text-black p-2">
                    <img src={mailIcon} alt="" className="w-6 h-auto mr-2" />
                    <span className="text-xl text-gray-700 font-montserrat font-bold">PeriSource@gmail.com</span>
                </div>
            </div>
        </div>    
    </div>
    );
}

export default Footer;
