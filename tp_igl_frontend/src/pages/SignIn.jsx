import React, { useState } from 'react';
import Back from '../assets/Back1.svg';
import backRespo from '../assets/bgUp.svg';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../AuthContext';
import { useEffect } from 'react';


function SignIn() {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { setAuthenticatedUser} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { username, password });

    try {
      const response = await axios.post('http://localhost:8000/login', {
        username,
        password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);

       const decodedToken = jwtDecode(access);
       const userId = decodedToken.user_id;
       const role = decodedToken.role;


      setAuthenticatedUser({
        userId, 
        role,
        username,
      });

       console.log('Login successful:', refresh);

       if (role =='user') {
        navigate('../user');
       } else {
         if (role == 'admin') {navigate('../admin');}
         if (role == 'moderator') {navigate('../moderator');}
       }
       

    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
        Swal.fire({
          title: 'Login failed',
          text: 'Incorrect username or password. Please double-check your credentials and make sure your account is activated.',
          icon: 'error',
          confirmButtonText: 'OK',
        });

    }
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
                <PersonOutlineOutlinedIcon className='text-black' />
                <input
                  type='text'
                  name='username'
                  id='username'
                  placeholder='Username'
                  className='ml-2 w-[100%] h-10 bg-white outline-none'
                  onChange={ (e) => setUsername(e.target.value)}
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
              <a href='../signup' className='text-blue-500'>
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
