import React, {useState} from 'react';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import images from '../assets/exo';

const imgArray = [
    {
        id: 0,
        image: images.wallpaper1,
    },
    {
        id: 1,
        image: images.wallpaper2,
    },
    {
        id: 2,
        image: images.wallpaper3,
    },
    {
        id: 3,
        image: images.wallpaper4,
    }
]

const WallpaperSlider = ({setCurrWallpaper}) => {

    const [activeElement, setActiveElement] = useState(0);

    const jumpWallpaper = (ele) => {
        let wall = images.wallpaper1;
        
        if(ele === 0){
            wall = images.wallpaper1;
        }
        else if(ele === 1){
            wall = images.wallpaper2;
        }
        else if(ele === 2){
            wall = images.wallpaper3;
        }
        else{
            wall = images.wallpaper4;
        }

        setCurrWallpaper(wall);
        setActiveElement(ele);
    }

    const prevActiveElement = () => {

        let wall = images.wallpaper1;
        
        if(activeElement === 0){
            wall = images.wallpaper4;
        }
        else if(activeElement === 1){
            wall = images.wallpaper1;
        }
        else if(activeElement === 2){
            wall = images.wallpaper2;
        }
        else{
            wall = images.wallpaper3;
        }

        setCurrWallpaper(wall);

        setActiveElement(() => {
            if (activeElement === 0) return 3;
            return ((activeElement - 1) % 4);
        });
    }

    const nextActiveELement = () => {
        let wall = images.wallpaper1;
        
        if(activeElement === 0){
            wall = images.wallpaper2;
        }
        else if(activeElement === 1){
            wall = images.wallpaper3;
        }
        else if(activeElement === 2){
            wall = images.wallpaper4;
        }
        else{
            wall = images.wallpaper1;
        }

        setCurrWallpaper(wall);
        setActiveElement(() => ((activeElement + 1) % 4));
    }

    return (
        <div className='flex items-center'>
            <ArrowLeftRoundedIcon style={{ fontSize: '3rem' }} className=' text-cusSecOne cursor-pointer' onClick={prevActiveElement} />
            <div className='flex items-center gap-2'>
                {imgArray.map((ele) => (
                    <div
                        key={ele.id}
                        className={` overflow-hidden cursor-pointer rounded-full border-2 h-7 w-7 ${ele.id === activeElement ? ' border-cusSecOne' : ' border-gray-300'}`}
                        onClick={() => { jumpWallpaper(ele.id) }}
                    >
                        <img src={ele.image} className='' alt="" />
                    </div>
                ))}
            </div>
            <ArrowRightRoundedIcon style={{ fontSize: '3rem' }} className=' text-cusSecOne cursor-pointer' onClick={nextActiveELement} />
        </div>
    )
}

export default WallpaperSlider
