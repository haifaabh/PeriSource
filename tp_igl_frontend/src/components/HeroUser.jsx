import React, { Fragment } from 'react';
import searchIcon from '../assets/Search.svg';
import filterIcon from '../assets/Filter.svg';
import UserPageM from '../assets/UserPageM.svg';
import UserPageW from '../assets/UserPageW.svg';
import { View, TouchableOpacity, Text } from 'react';
import { FilterPage } from '../pages/FilterPage';
import { useState } from 'react'; 


export const HeroUser = () => {
  console.log('Heroo Rendered');


   const [isFilterVisible, setFilterVisible] = useState(false);
  
  return (
    <Fragment>
    <div className='bg-white borderTopUser borderBottomUser w-screen relative'>
      {/* Left Image */}
      <div
        className="md:block hidden lg:ml-16 absolute bottom-0 left-0 w-[30%] h-[65%] bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${UserPageM})`,
          backgroundSize: 'contain', 
        }}
      />
      <div
        className='max-w-[800px] w-full h-screen mx-auto text-center flex flex-col justify-center'
        style={{
          height: 'calc(100vh - 115px)',
        }}
      >
        <div className="flex items-center justify-center flex-col md:mb-16 mb-8 ">
          <div className="mb-4">
            <p className='md:text-4xl sm:text-3xl text-2xl font-bold max-w-[600px] text-center font-montserrat text-[#002366]' style={{ lineHeight: '1.5' }}>
              Empower your research journey with
              <span className="text-[#4D4D4D] font-rammetto"> PeriSource</span>,
            </p>
          </div>
          <div>
            <p className='max-w-[650px] md:text-[16px] text-[12px] font-bold text-gray-500'> a dedicated platform designed to streamline your search for high-quality scientific articles, ensuring a comprehensive and efficient exploration of the latest advancements in your field.</p>
          </div>
        </div>
        <div className='flex col-span-2 items-center justify-center'>
          <div className="mb-4 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 pl-8 border-solid bg-white border-gray-400 lg:w-[450px]"
              style={{
                border: '1px solid rgba(171, 190, 209, 0.40)',
                borderRadius: '16px 0 0 16px',
              }}
            />
            <button className="bg-[#002366] text-white p-2 px-4" style={{ borderRadius: '0 16px 16px 0' }}>
              <img src={searchIcon} alt="" className="w-[25px] h-[25px]" />
            </button>
          </div>
          <div className="mb-4 flex items-center justify-center px-4">
            <button className="bg-[#002366] text-white p-2 px-4 font-montserrat font-bold flex items-center" style={{ borderRadius: '16px', marginTop: '0' }} onClick={() => setFilterVisible(true)}>
              <img src={filterIcon} alt="" className="w-[25px] h-[25px] mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>
      {/* Right Image */}
      <div
            className="lg:flex  hidden absolute bottom-0 right-0 w-[20%] h-[54%] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${UserPageW})`,
              backgroundSize: 'contain',
            }}
          />
    </div>
    <FilterPage isVisible={isFilterVisible} onClose={()=>setFilterVisible(false)} />
    </Fragment>
  );
}
