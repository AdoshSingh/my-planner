import React, { useState } from 'react';
import images from '../assets/exo';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      }

      fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      })
        .then((res) => {
          return [res, res.json()];
        }
        )
        .then((data) => {
          data[1].then((d) => { console.log(d?.message); }).catch((err) => { console.log(err) });
          if (data[0].ok) {
            navigate('/home');
          }
          else {
            setInvalidCredentials(true);
            setTimeout(() => {
              setInvalidCredentials(false);
            }, 3000);
          }
        })
        .catch((err) => { console.log(err) });

    } catch (err) {
      console.log('client error', err);
    }
  }

  return (
    <div className='h-screen w-screen bg-cusDarkOne bg-cusImage bg-cover bg-fixed'>
      <div className='h-full flex flex-col justify-evenly items-center'>
        <div className='flex justify-center items-center cursor-pointer' onClick={() => { navigate('/') }}>
          <img src={images.mainLogo} alt="" className=' w-64' />
        </div>
        <div className='flex flex-col border border-cusSecTwo bg-cusDarkTwo bg-opacity-50 backdrop-blur-md rounded-3xl w-fit items-center justify-center gap-20 p-10'>
          <h1 className=' text-cusSecOne text-5xl font-passionOne tracking-wide'>
            Log into your account
          </h1>
          <form className='flex flex-col gap-3 items-center justify-center w-full' onSubmit={handleSubmit}>
            <input
              className=' border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none'
              type="email"
              placeholder='Enter your email'
              required
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <input
              className=' border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none'
              type="password"
              placeholder='Enter your password'
              required
              onChange={(e) => { setPassword(e.target.value) }}
            />
            {invalidCredentials &&
              <p className='text-red-500 text-sm font-comfortaa'>Invalid Credentials</p>
            }
            <p className='text-cusText font-comfortaa'>Don't have an account? <span className=' underline text-cusSecTwo hover:text-cusSecOne cursor-pointer' onClick={() => { navigate('/signup') }}>Signup</span></p>
            <button className='bg-cusSecTwo border border-cusSecTwo text-cusDarkOne rounded-md py-2 px-4 w-full hover:bg-transparent hover:text-cusSecOne transition' type='submit'>Log In</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
