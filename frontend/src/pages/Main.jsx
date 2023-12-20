import React from 'react';
import {useNavigate} from 'react-router-dom';

const Main = () => {

  const navigate = useNavigate();

  return (
    <div className='flex gap-2'>
      <button className='bg-blue-400' onClick={() => navigate('/login')}>Login</button>
      <button className='bg-blue-400' onClick={() => navigate('/signup')}>Sign Up</button>
    </div>
  )
}

export default Main
