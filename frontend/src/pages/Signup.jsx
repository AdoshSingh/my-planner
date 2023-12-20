import React, { useEffect, useState } from 'react';
import images from '../assets/exo';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const [isMatching, setIsMatching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsMatching(password === conPassword);
  }, [password, conPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        email,
        password,
      }

      fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => { console.log(data.message) })
        .catch((err) => { console.log(err) });

    } catch (err) {
      console.log('client error', err);
    }
  }

  return (
    <div className='h-screen w-screen bg-cusDarkOne bg-cusImage bg-cover bg-fixed'>
      <div className='h-full flex flex-col justify-evenly items-center'>
        <div className='flex justify-center items-center cursor-pointer' onClick={() => {navigate('/')}}>
          <img src={images.mainLogo} alt="" className=' w-64' />
        </div>
        <div className='flex flex-col border border-cusSecTwo bg-cusDarkTwo bg-opacity-50 backdrop-blur-md rounded-3xl w-fit items-center justify-center gap-20 p-10'>
          <h1 className=' text-cusSecOne text-5xl font-passionOne tracking-wide'>Create your account</h1>
          <form className='flex flex-col gap-3 items-center justify-center w-full' onSubmit={handleSubmit}>
            <input
              className=' border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none'
              type="text"
              placeholder='Enter your name'
              required
              onChange={(e) => { setName(e.target.value) }}
            />
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
            <input
              className=' border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none'
              type="password"
              placeholder='Confirm your password'
              required
              onChange={(e) => { setConPassword(e.target.value) }}
            />
            {!isMatching && <p className=' text-red-500 text-sm font-comfortaa'>Passwords do not match!</p>} 
            <p className='text-cusText font-comfortaa'>Already have an account? <span className=' underline text-cusSecTwo hover:text-cusSecOne cursor-pointer' onClick={() => {navigate('/login')}}>Login</span></p>
            <button className='bg-cusSecTwo border border-cusSecTwo text-cusDarkOne rounded-md py-2 px-4 w-full hover:bg-transparent hover:text-cusSecOne transition' type='submit'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
