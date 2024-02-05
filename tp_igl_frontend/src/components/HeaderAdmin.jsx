import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import axios from 'axios'

function HeaderAdmin({largeurEcran,handleUploadArticles,handleManageModeratore,showAddModeratorePage}){
    const WidthLimit1 = 1430
    const WidthLimit2 = 1180
    const handleManageModeratore2= () => {
        if (!showAddModeratorePage) {
            handleManageModeratore()
        }
    }
    const handleSignOut = () => {
        // Clear the authentication token from local storage or cookies
        localStorage.removeItem('authToken');
       
      };
   return(
    <div className="flex w-screen gap-auto justify-between py-2 gap-[20px] bg-white  lg:gap-auto">
    <div className={`flex items-start w-439 px-0  md:px-29 justify-center items-center gap-[7px] `} style={{ marginLeft: largeurEcran < WidthLimit1 ? largeurEcran < WidthLimit1 ? '10px' : '40px' : '101px' }} id="Logo">
        <div className="w-50 h-50 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
                <circle cx="25.5918" cy="25" r="25" fill="#3F3F3F">
                </circle>
            </svg>
        </div>
        <div className="hidden lg:flex  justify-center items-center ">
            <div className="  text-[#3F3F3F] font-rammetto text-[25px] font-[1000] ">PeriSource</div>
            <div className="  text-[#3F3F3F] font-prosto-one text-[16px] font-[400] ">.com</div>
        </div>
    </div>
    <div className={`flex  justify-between  items-center `} style={{ marginRight: largeurEcran < WidthLimit1 ? largeurEcran < 520 ? '15px' : '40px' : '101px', width: largeurEcran < WidthLimit2 ? '600px' : '712px' }} id="right menu">
        <div className="flex w-365 items-start gap-[13px] lg:gap-10 " id="upload and manage moderator">
            <div className="flex p-2 px-5 lg:px-14 items-center gap-8 rounded-full bg-blue-500" id="uploadarticle" style={{ background: showAddModeratorePage ? '#FFF' : '#36A3FA' }}>
                <p className="text-white font-roboto text-[10px] font-[700] leading-6 cursor-pointer" onClick={handleUploadArticles} style={{ fontSize: largeurEcran < 570 ? '11px' : '16px', color: showAddModeratorePage ? '#585858' : '#FFF' }}>Upload Articles</p>
            </div>
            <div className="flex py-2 items-center gap-2 rounded-[30px] p-[4px]" id="manage moderator" style={{ background: showAddModeratorePage ? '#36A3FA' : '#FFF' }}>
                <p className=" font-roboto text-[10px] font-[700] leading-6 " style={{ fontSize: largeurEcran < 570 ? '11px' : '16px', color: showAddModeratorePage ? '#FFF' : '#585858' }}>Manage Moderators</p>
                <div className='cursor-pointer' onClick={handleManageModeratore2}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="8" viewBox="0 0 14 8" fill="none">
                        <path d="M1 1L7 7L13 1H1Z" fill={showAddModeratorePage ? "#FFF" : "#3F3F3F"} stroke={showAddModeratorePage ? "#FFF" : "#3F3F3F"} strokeWidth="2" strokeLinecap="round" strokeinejoin="round"></path>
                    </svg>
                </div>
            </div>
        </div>
            
                    <div className="flex items-center p-[8px] lg:p-[16px] gap-3.5 lg:w-[127px] w-[105px] h-[52px]  border border-solid border-blue-900 " id="Signout">
                        {/* <div className="w-62 items-start text-blue-900 text-center font-roboto font-bold leading-6 " style={{fontSize:largeurEcran<500?'13px':'16px'}}>Signout</div> */}
                     
                        <Link
        to="/login"  // Specify the path you want to redirect after signout
        className="w-62 items-start text-blue-900 text-center font-roboto font-bold leading-6"
        style={{ fontSize: largeurEcran < 500 ? '13px' : '16px' }}
      >
        Signout
      </Link>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="18" viewBox="0 0 23 18" fill="none">
                                <path d="M13.4 5V3C13.4 2.46957 13.1625 1.96086 12.7397 1.58579C12.3168 1.21071 11.7434 1 11.1455 1H3.25455C2.6566 1 2.08315 1.21071 1.66034 1.58579C1.23753 1.96086 1 2.46957 1 3V15C1 15.5304 1.23753 16.0391 1.66034 16.4142C2.08315 16.7893 2.6566 17 3.25455 17H11.1455C11.7434 17 12.3168 16.7893 12.7397 16.4142C13.1625 16.0391 13.4 15.5304 13.4 15V13M7.76364 9H21.2909M21.2909 9L17.9091 6M21.2909 9L17.9091 12" stroke="#002366" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

   )

}

export default HeaderAdmin