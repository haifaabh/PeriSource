import React, { useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Back from '../assets/Back1.svg'
import backRespo from '../assets/bgUp.svg'
import Swal from 'sweetalert2';
import { useAuth } from '../AuthContext';



function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', { fullName, email, username, password, passwordCheck });

    if (!password || !passwordCheck) {
      Swal.fire({
        title: 'Registration failed',
        text: 'Password and Password Confirmation are required.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return; 
    }
  
    if (password !== passwordCheck) {
      Swal.fire({
        title: 'Registration failed',
        text: 'Password and Password Confirmation do not match.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return; 
    }

    try {
      const response = await axios.post('http://localhost:8000/register', {
        id: null,
        email,
        username,
        name: fullName,
        role: 'user',
        is_staff: false,
        is_active: false,
        password,
      });
        console.log(response.data); 
        const { access, refresh } = response.data;
        localStorage.setItem('token', access);
        localStorage.setItem('refreshToken', refresh);

        const userId = response.data.id;
        const role = response.data.role;


        setAuthenticatedUser({
          userId, 
          role,
        });

        console.log('Id and role',userId,role);
        console.log('register successful:', refresh);

      Swal.fire({
        title: 'Registration successful!',
        text: 'Check your email for activation.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('../Home');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        const { email, username } = error.response.data;
        if (email) {
          Swal.fire({
            title: 'Registration failed',
            text: email[0], 
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else if (username) {
          Swal.fire({
            title: 'Registration failed',
            text: username[0], 
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    }
  };

  return (
   <div>
    <div className='relative flex'>
    <img src={Back} className='ml-0 mt-[-40px] hidden md:flex lg:flex' alt="" />
    <img src={backRespo} className=' block sm:block w-full h-full absolute inset-0 md:hidden lg:hidden' alt="" />

    <div className='lg:ml-[-250px] md:ml-[-400px] z-10 mx-auto transition-all duration-500'>
    <form action=''onSubmit={handleSubmit}  className='max-w-[400px] lg:max-w-[600px] md:w-[100%] md:mt-0 mt-[12rem] mx-auto w-[100%] p-8 rounded-lg' >
    <h3 className='text-3xl font-bold text-blue-900 mb-6 ml-3'>Create account</h3>
            <div className='mb-4'>
              <div className='flex items-cente bg-white p-2 rounded-[20px] '>
                <PersonOutlineOutlinedIcon className='text-black' />
                <input
                  type='text'
                  name='fullName'
                  id='fullName'
                  placeholder='Full Name'
                  className='ml-2 w-[100%] h-10 bg-white outline-none'
                  onChange={ (e) => setFullName(e.target.value)}
                />
              </div>
            </div>
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
                <PersonOutlineOutlinedIcon className='text-black' />
                <input
                  type='text'
                  name='username'
                  id=''
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

            <div className='mb-4'>
              <div className='flex items-center bg-white p-2 rounded-[20px]'>
                <LockOutlinedIcon className='text-black' />
                <input
                  type='password'
                  name='confirmPassword'
                  id='confirmPassword'
                  placeholder='Confirm your password'
                  className='ml-2 w-[100%] h-10 bg-white outline-none'
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </div>
            </div>


            <p className='text-base text-black'>
              Already have an account?{' '}
              <a href='../signin' className='text-blue-500'>
                Sign in
              </a>
            </p>

            <button type='submit' className='flex justify-center w-[400px]  bg-[#002366] text-white font-bold p-[10px]  rounded-3xl mt-4 mb-4'>
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp
