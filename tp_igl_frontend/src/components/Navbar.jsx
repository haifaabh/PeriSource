import React, { useState } from 'react';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

const Navbar = () => {

  return (
<nav className="bg-white p-4">
  <div className="container mx-auto flex justify-between items-center">
    <div className="ml-4 font-bold font-rammeto text-2xl text-[#3F3F3F]">PeriSource</div>
  
    <div className="hidden lg:flex lg:justify-center ml-12 mt-4 lg:mt-0 space-x-4">
      <a href="#Home" className="text-sm lg:text-base hover:bg-blue-400 font-montserrat font-semibold">
        Home
      </a>
      <a href="#About" className="text-sm lg:text-base hover:bg-blue-400 font-montserrat font-semibold">
        About Us
      </a>
      <a href="#Contact" className="text-sm lg:text-base hover:bg-blue-400 font-montserrat font-semibold">
        Contact Us
      </a>
      
    </div>
    <div className="text-[#3F3F3F] lg:hidden flex space-x-4">
          <a href="#Home" className="text-sm hover:bg-blue-400">
            <HomeOutlinedIcon className="text-sm" />
          </a>
          <a href="#About" className="text-sm hover:bg-blue-400">
            <InfoOutlinedIcon className="text-sm" />
          </a>
          <a href="#Contact" className="text-sm hover:bg-blue-400">
            <EmailOutlinedIcon className="text-sm" />
          </a>
    </div>
    <div className="lg:ml-4">
      <button className="px-4 py-2 text-sm lg:text-base text-[#002366] font-montserrat font-semibold border border-[#002366] hover:bg-[#a6d1ff]">
        Sign Out   
        <ExitToAppOutlinedIcon className='ml-2 text-[#002366]'/>
      </button>
    </div>
  </div>
</nav>

  
  );
};

export default Navbar;
