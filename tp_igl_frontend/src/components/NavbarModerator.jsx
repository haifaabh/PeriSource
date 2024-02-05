import { useState } from 'react'
import React from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import NameLogo from '../assets/NameLogo.svg'
import logo from '../assets/logo.svg'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { useAuth } from '../AuthContext'


export const NavbarModerator = () => {
    const { setAuthenticatedUser } = useAuth(); 
    const [nav,setnav] = useState(true) ;

    const handlenav = () => {
        console.log('Menu button clicked');
        setnav(!nav);
    };

    const [selectedItem, setSelectedItem] = useState('Home');

    const handleItemClick = (item) => {
      setSelectedItem(item);
    };

    const handleSignOut = () => {
        setAuthenticatedUser(null);
        window.location.href = '/signin';
      };

  return (
    <div className='bg-white flex justify-between items-center h-24 w-screen mx-auto  text-[#4D4D4D] border-b-1.5 border-[#ABBED1] border-opacity-50 lg:px-24 px-4'>
       <div className={!nav ? 'hidden' : 'flex justify-between items-center '}>
            <div className='mx-2 '>
                <img src={NameLogo} alt="PeriSource" className="w-full h-auto" />
            </div>
        </div>
       
        <div className="hidden md:flex lg:ml-4">
            <button onClick={handleSignOut} className="lg:px-2 px-0 py-2 text-sm lg:text-base text-[#002366] font-montserrat font-semibold border border-[#002366] hover:bg-[#e0ebf6]">
                Sign Out   
                <ExitToAppOutlinedIcon className='lg:ml-2 text-[#002366]'/>
            </button>
        </div>

        <div onClick={handlenav} className='md:hidden absolute top-4 right-4'>
            {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        <div className='flex md:hidden p-0 m-0'>
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r bg-[#ffffff] border-[#ABBED1] border-opacity-40 ease-in-out duration-500': 'fixed left-[-100%]'} >
        <div className='w-[70%] p-4'>
        <img src={NameLogo} alt="PeriSource" className="w-full h-auto "/>
       </div>
            <ul className='uppercase'>
                <li className='p-4'><a  href="#Home" onClick={() => handlenav()} className="p-4  border-b border-b-gray-600 text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold">Home</a></li>
                <li className='p-4'><a  href="#About" onClick={() => handlenav()} className="p-4  border-b border-b-gray-600 text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold">About Us</a></li>
                <li className='p-4'><a href="#Contact" onClick={() => handlenav()} className=" p-4  border-b border-b-gray-600 text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold">Contact Us</a></li>
                <li className='p-4'><a href="" onClick={() => handleSignOut()} className=" p-4  border-b border-b-gray-600 text-sm lg:text-base hover:text-gray-400 font-montserrat font-semibold">Sign out</a></li>
            </ul>    
        </div>
        </div>
    </div>
  )
}
export default NavbarModerator;
