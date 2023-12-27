import React from 'react';
import images from '../assets/exo';

const Navbar = ({userName}) => {
    return (
        <div>
            <div className='flex w-full justify-between items-center p-8 '>
                <img src={images.mainLogo} alt="" className='w-56' />
                <h1 className=' text-cusSecOne text-3xl font-comfortaa font-bold'>{userName}</h1>
            </div>
        </div>
    )
}

export default Navbar
