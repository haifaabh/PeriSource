import React, { useState, useEffect } from 'react';
import Home1 from '../assets/Home1.svg'
import Home2 from '../assets/Home2.svg'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const HomePage= () => {

  const { userId } = useAuth();

  React.useEffect(() => {
    if (!userId) {
      console.log('Navigating to /signin...');
      window.location.href = '/signin'; // Navigate using window.location.href
      console.log('Navigation executed.');
    }
  }, [userId]);

  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('../User');
  };


  return (
<div>
<Navbar/>
<div>
<div id="Home" className='flex flex-col lg:flex-row justify-between bg-white m-6 rounded-xl'>
  <div className='lg:ml-6 flex flex-col justify-center'>
    <div className='mb-4 text-center lg:text-left'>
      <p className='font-bold font-roboto text-[40px] text-[#3F3F3F] mt-4'>PeriSource</p>
      <p className='text-[#002366] text-[30px] md:text-[40px] font-roboto font-bold'>Explore Science's Universe</p>
    </div>
    <div className='lg:hidden mx-auto'>
      <img src={Home1} alt="" className='max-w-[80%] md:max-w-[100%] mt-2' />
    </div>
    <div className='text-center lg:text-left'>
    <p className='font-roboto font-regular text-[14px] md:text-[18px] lg:text-[20px] mt-2 '>
      Explore, search, and save your favorites all in one place.<br/> Your gateway to a world of insights awaits.
    </p></div>
    <button onClick={handleSearch} className='lg:ml-0 mt-2 lg:mt-10 text-2xl lg:w-[500px] md:w-[400px] w-[300px] h-[50px] bg-[#002366] text-white font-medium font-roboto p-[10px] rounded-2xl mb-4 mx-auto lg:mr-20 hover:bg-zinc-600'>
      Search
    </button>
  </div>
  <img src={Home1} alt="" className='lg:inline-block lg:order-2 lg:mr-4 mt-2 lg:mt-4 mx-auto hidden' />
</div>




  <div className=' relative m-6 text-black bg-[#deedff] h-20 flex lg:flex-row justify-between py-2 px-4 rounded-xl'>
    <div className='lg:ml-10 font-roboto'>
      <p className='mt-2 font-semibold text-xl flex items-center '>+89,935 <PeopleOutlineIcon className='ml-2' /></p>
      <p className=''>Users</p>
      </div>
      <div className='font-roboto '>
      <p className='mt-2 font-semibold text-xl flex items-center'>+89,935 <ArticleOutlinedIcon className='ml-2' /></p>
      <p className=''>Articles</p>
      </div>
      <div className='lg:mr-10 font-roboto'>
      <p className='mt-2 font-semibold text-xl flex items-center'>+89,935 <CreateOutlinedIcon className='ml-2' /></p>
      <p className=''>Authors</p>
      </div>
  </div>


  <div id="About" className='flex flex-col lg:flex-row-reverse justify-between '>
  <div className='lg:ml-6 bg-white md:m-10 m-5  p-10 rounded-xl flex flex-col justify-center'>
    <div className='mb-2 text-center lg:text-left'>
      <p className='text-[#002366] text-[40px] font-roboto font-bold'>About Us</p>
    </div>
    <div className='lg:hidden'>
      <img src={Home2} alt="" className='mx-auto mt-0' />
    </div>
    <div className='font-montserrat font-regular text-[16px] lg:text-[20px] text-center max-w-[500px] lg:text-left mb-4 '>
    <p>
      We're a tight-knit team of six students from ESI Algiers, on a mission to redefine how you experience scientific knowledge.<br/>
      <span className="font-roboto font-bold text-xl">PeriSource</span> is our brainchild, born in the IGL module under the guidance of <strong>Mr. Batata</strong> and <strong>Ms. Zellagui</strong>. <br/>
      Our goal is simple: make scientific exploration accessible, seamless, and exciting for everyone.<br/> 
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
