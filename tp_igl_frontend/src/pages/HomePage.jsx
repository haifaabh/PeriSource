import React, { useState, useEffect } from 'react';
import Home1 from '../assets/Home1.svg'
import Home2 from '../assets/Home2.svg'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


export const HomePage= () => {

  return (
<div>
<Navbar/>
<div>
  <div id="Home" className='flex flex-col lg:flex-row justify-between bg-white m-6 rounded-xl'>
    <div className='lg:ml-6'>
      <div className='mb-4 text-center sm:text-left'>
        <p className='font-rammeto text-[40px] text-[#3F3F3F] mt-4'>PeriSource:</p>
        <p className='text-[#002366] text-[40px] font-montsserat font-bold'>Explore Science's Universe</p>
      </div>
      <div className='lg:hidden'>
        <img src={Home1} alt="" className='mx-auto mt-2' />
      </div>
      <p className='font-roboto font-regular text-[25px] mt-4 text-center sm:text-left'>
        Explore, search, and save your favorites all in one place.<br/> Your gateway to a world of insights awaits.
      </p>
        <button className='mt-10 text-2xl w-[300px] h-[50px] bg-[#002366] text-white font-meduim font-roboto p-[10px] rounded-2xl mb-4 ml-20 sm:ml-0'>Search</button>
    
    </div>
     <img src={Home1} alt="" className='lg:inline-block lg:order-2 lg:mr-4 mt-2 lg:mt-4 mx-auto hidden  ' />
  </div>



  <div className=' relative m-6 text-black bg-[#b6d8ff] h-20 flex lg:flex-row justify-between py-2 px-4 rounded-xl'>
    <div className='lg:ml-10 font-montserrat '>
      <p className='mt-2 font-semibold text-xl flex items-center'>+89,935 <PeopleOutlineIcon className='ml-2' /></p>
      <p className=''>Users</p>
      </div>
      <div className='font-montserrat '>
      <p className='mt-2 font-semibold text-xl flex items-center'>+89,935 <ArticleOutlinedIcon className='ml-2' /></p>
      <p className=''>Articles</p>
      </div>
      <div className='lg:mr-10 font-montserrat '>
      <p className='mt-2 font-semibold text-xl flex items-center'>+89,935 <CreateOutlinedIcon className='ml-2' /></p>
      <p className=''>Authors</p>
      </div>
   
  </div>


  <div id="About" className='flex flex-col lg:flex-row-reverse justify-between '>
  <div className='lg:ml-6 bg-white m-10 p-10 rounded-xl'>
    <div className='mb-4 text-center sm:text-left'>
      <p className='text-[#002366] text-[40px] font-montsserat font-bold'>About Us</p>
    </div>
    <div className='lg:hidden'>
      <img src={Home2} alt="" className='mx-auto mt-2' />
    </div>
    <div className='font-roboto font-regular text-[20px] mt-4 text-center max-w-[500px] sm:text-left'>
      <p>    We're a tight-knit team of six students from ESI Algiers, <br /> on a mission to redefine
     how you experience scientific knowledge.<span className='font-rammeto'> PeriSource</span> is our brainchild, born in 
     the IGL module under the guidance <br /> of Mr. Batata and Ms. Zellagui. Our goal is simple: make scientific 
     exploration accessible, seamless, and exciting for everyone.  
   </p>    
   <p className='mt-4'>
   Welcome to <span className='font-rammeto'>PeriSource</span> where curiosity meets innovation.
   </p>
   </div>
  </div>
  <img src={Home2} alt="" className='lg:inline-block lg:order-2  lg:ml-4 mt-2 lg:mt-4 mx-auto hidden  ' />
</div>

</div>
<div id="Contact">
<Footer/>
</div>
</div>
  );
}