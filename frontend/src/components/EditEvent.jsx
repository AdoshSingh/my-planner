import React, { useEffect, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
}

const EditEvent = ({ value, setCurrKey, editTitle, editDescription, token, setShowEditEvent }) => {

    const [title, setTitle] = useState(editTitle);
    const [description, setDescription] = useState(editDescription);

    const handleEditEvent = (e) => {
        e.preventDefault();

        const _year = value.$y;
        const _monthNo = value.$M;
        const _month = months[_monthNo];
        const _day = value.$D;

        const data = {
            year: _year,
            month: _month,
            day: _day,
            title: title,
            description: description,
        }

        fetch('http://localhost:8000/event/edit-event', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setShowEditEvent(false);
                setCurrKey(prevVlaue => prevVlaue + 1);
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <form className=' absolute top-0 left-0 h-full w-full flex flex-col justify-between items-center gap-4 p-4 bg-cusDarkTwo font-comfortaa z-10' onSubmit={handleEditEvent}>
            <div className='flex justify-between w-full'>
                <h1 className=' text-cusSecOne font-comfortaa text-3xl font-bold'>Edit Event</h1>
                <div
                    className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-cusDarkTwo transition-all'
                    onClick={() => { setShowEditEvent(false) }}
                >
                    <CloseRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <input
                    value={title}
                    className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none'
                    type="text"
                    placeholder='Edit title'
                    required
                    onChange={(e) => { setTitle(e.target.value) }}
                />
                <textarea
                    value={description}
                    className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none'
                    cols="30"
                    rows="7"
                    placeholder='Edit description'
                    onChange={(e) => { setDescription(e.target.value) }}
                    required
                ></textarea>
                <button className='bg-cusSecTwo border border-cusSecTwo text-cusDarkOne rounded-md py-2 px-4 w-full hover:bg-transparent hover:text-cusSecOne transition font-bold' type='submit'>
                    Edit Event
                </button>
            </div>
        </form>
    )
}

export default EditEvent
