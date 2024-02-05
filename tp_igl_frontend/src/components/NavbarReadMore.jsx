import React, { useState } from 'react';
import NameLogo from '../assets/NameLogo.svg';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useAuth } from '../AuthContext';
import DropdownMenu from './DropdownMenu';

export const NavbarReadMore = () => {
  const [nav, setNav] = useState(true);
  const [selectedItem, setSelectedItem] = useState('');
  const { setAuthenticatedUser } = useAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const handleSignOut = () => {
    setAuthenticatedUser(null);
    window.location.href = '/signin';
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <nav className={`bg-white shadow-md z-10 ${nav ? 'sticky top-0' : ''}`}>
      <div className='flex justify-between items-center h-24 w-screen mx-auto text-[#4D4D4D] border-b-1.5 border-[#ABBED1] border-opacity-50 lg:px-24 px-4 navbarUser'>
        <div className={!nav ? 'hidden md:flex' : 'flex justify-between items-center'}>
          <div className='mx-2'>
            <img src={NameLogo} alt='PeriSource' className='w-full h-auto' />
          </div>
        </div>
        <ul className='hidden md:flex'>
          <li className='lg:p-4 p-2'>
            <a
              href="../User"
              onClick={() => handleItemClick('Home')}
              className={`text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold ${selectedItem === 'Home' ? 'text-white bg-[#3692FA] rounded-full px-4' : ''}`}>
              Home
            </a>
          </li>
          <li className='lg:p-4 p-2'>
            <div className='menu' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className='text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold'>Article</button>
              {isDropdownVisible && <DropdownMenu />}
            </div>
          </li>
          <li className='lg:p-4 p-2'>
            <a
              href='#Contact'
              onClick={() => handleItemClick('Contact')}
              className={`text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold ${selectedItem === 'Contact' ? 'text-white bg-[#3692FA] rounded-full px-4' : ''}`}
            >
              Contact Us
            </a>
          </li>
        </ul>
        <div className='hidden md:flex lg:ml-4'>
          <button onClick={handleSignOut} className='lg:px-2 px-0 py-2 text-sm lg:text-base text-[#002366] font-montserrat font-semibold border border-[#002366] hover:bg-[#e0ebf6]'>
            Sign Out
            <ExitToAppOutlinedIcon className='lg:ml-2 text-[#002366]' />
          </button>
        </div>
        <div onClick={handleNav} className='md:hidden absolute top-4 right-4'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div className='flex md:hidden p-0 m-0'>
          <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r bg-[#ffffff] border-[#ABBED1] border-opacity-40 ease-in-out duration-500 z-50' : 'fixed left-[-100%]'}>
            <div onClick={handleNav} className='md:hidden absolute top-4 right-4'>
            <AiOutlineClose size={20} />
            </div>
            <div className='w-[70%] p-4'>
              <img src={NameLogo} alt='PeriSource' className='w-full h-auto' />
            </div>
            <ul className='uppercase'>
              <li className='p-4'>
                <a href='../User' onClick={() => handleNav()} className='p-4 border-b border-b-gray-600 text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold'>
                  Home
                </a>
              </li>
              <li className='p-4'>
                <a href='#Contact' onClick={() => handleNav()} className=' p-4 border-b border-b-gray-600 text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold'>
                  Contact Us
                </a>
              </li>
          <li className='p-4'>
            <div className='menu  p-4 border-b border-b-gray-600 text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button className='text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold'>Dropdown Menu</button>
              {isDropdownVisible && <DropdownMenu />}
            </div>
          </li>
          <li className='p-4'><a href="" onClick={() => handleSignOut()} className=" p-4  border-b border-b-gray-600 text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
