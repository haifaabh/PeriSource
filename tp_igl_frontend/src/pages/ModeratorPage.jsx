import image from '../assets/Annotation-amico 1.svg'
import React, { useState, useEffect } from 'react';
import Home1 from '../assets/Home1.svg'
import Home2 from '../assets/Home2.svg'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import NavbarModerator from '../components/NavbarModerator';
import Footer from '../components/Footer';
import ArticleTable from '../components/ArticleTable';
import { useAuth } from '../AuthContext';


export const ModeratorPage = () => {
   const { userId } = useAuth();

  React.useEffect(() => {
    if (!userId) {
      console.log('Navigating to /signin...');
      window.location.href = '/signin';
      console.log('Navigation executed.');
    }
  }, [userId]);
  
  return (
  <div>
<NavbarModerator />
  <div>
    <div  className='flex flex-col lg:flex-row justify-between bg-white m-6 rounded-xl'>
      <div className='lg:ml-8 mt-6 '>
        <div className='mb-4 text-center sm:text-left'>
          <p className='text-[#002366] text-[40px] font-montsserat font-bold'>Moderator Hub:  </p>
        </div>
        <div className='lg:hidden'>
          <img src={image} alt="" className='mx-auto mt-2' />
        </div>
        <p className='font-bold font-montserrat text-[35px] mt-0 text-center sm:text-left'>
        Your skill sharpens<br /> <span className='font-rammetto text-[40px] text-[#3F3F3F] mt-4'>PeriSource </span>brilliance.
        </p>
        <div className='text-[#3F3F3F] font-roboto font-regular text-[20px] mt-4 text-center sm:text-left'>
<p >As key architects of quality, your meticulous expertise <br />
and discerning eye elevate our content  to unparalleled standards. <br />
Thank you for your commitment to excellence!</p>      
</div>  
    
      </div>
       <img src={image} alt="" className='lg:inline-block lg:order-2 lg:mr-8 mt-2 lg:mt-0 mx-auto hidden  ' />
    </div>

   
    <div className=' bg-white m-6 rounded-xl'>

    <p className='text-[#002366] text-[40px] font-montsserat font-bold ml-8'>Pending Articles Queue </p>

     <ArticleTable/>
    </div>
    </div>    

  </div>
    );
  }
