import React, { useState, useEffect } from 'react';
import Back from '../assets/Back1.svg'
import backRespo from '../assets/bgUp.svg'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', { email, password });
  };

  return (
   <div>
  <div className='relative flex'>
  <img src={Back} className='ml-0 mt-[-40px] hidden md:flex lg:flex' alt="" />
<img src={backRespo} className=' block sm:block w-full h-full absolute inset-0 md:hidden lg:hidden' alt="" />

      <div className='lg:ml-[-300px] md:ml-[-400px] z-10  transition-all duration-500'>
 <form action=''onSubmit={handleSubmit}  className='md:mt-0 mt-[12rem] mx-auto w-[100%] p-8 rounded-lg ' >
 <h3 className='text-3xl font-bold text-blue-900 mb-6 ml-3'>Sign in</h3>
        

            <div className='mb-4'>
              <div className='flex items-center bg-white p-2 rounded-[20px]'>
                <MailOutlineIcon className='text-black' />
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  className='ml-2 w-[100%] h-10 bg-white outline-none'
                onChange={ (e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className='mb-4'>
              <div className='flex items-center bg-white p-2 rounded-[20px]'>
                <LockOutlinedIcon className='text-black' />
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='ml-2 w-[100%] h-10 bg-white outline-none'
                  onChange={ (e) => setPassword(e.target.value)}

                />
              </div>
            </div>

            <p className='text-base text-black'>
              Don't have an account?{' '}
              <a href='' className='text-blue-500'>
                Sign up
              </a>
            </p>

            <button type='submit' className='flex justify-center w-[400px]  bg-[#002366] text-white font-bold p-[10px]  rounded-3xl mt-4 mb-4'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignIn
