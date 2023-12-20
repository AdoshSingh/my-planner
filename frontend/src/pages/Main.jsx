import React from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../assets/exo';

const Main = () => {

  const navigate = useNavigate();

  return (
    <div className=' h-screen w-screen bg-cusDarkOne bg-cusImage bg-cover bg-fixed'>
      <div className='h-full flex flex-col justify-evenly items-center'>
        <div className='flex justify-center items-center'>
          <img src={images.mainLogo} alt="" className=' w-64' />
        </div>
        <div className='flex flex-col border border-cusSecTwo bg-cusDarkTwo bg-opacity-50 backdrop-blur-md rounded-3xl w-fit items-center justify-center p-10 gap-10'>
          <div className=' flex flex-col justify-center items-center gap-4'>
            <h1 className=' text-cusSecOne text-9xl font-passionOne tracking-wider'>HELLO</h1>
            <p className=' text-cusText text-center max-w-2xl text-lg font-comfortaa'>Elevate your productivity with My Planner - your digital hub for transforming dreams into plans. Seamlessly craft to-do lists, design schedules, and turn aspirations into achievements. Conquer tasks, celebrate events, and step toward success effortlessly. Your personalized productivity oasis, My Planner, awaits. Dive in, organize, and conquer goals!</p>
          </div>
          <div className='flex justify-center gap-28 items-center'>
            <button
              className='bg-blue-400 w-44 py-4 text-lg text-cusSecOne bg-transparent border-cusSecTwo border transition hover:bg-cusSecTwo font-comfortaa rounded-md'
              onClick={() => navigate('/login')}>
              Log In
            </button>
            <button
              className='bg-blue-400 w-44 py-4 text-lg text-cusSecOne bg-transparent border-cusSecTwo border transition hover:bg-cusSecTwo font-comfortaa rounded-md'
              onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
