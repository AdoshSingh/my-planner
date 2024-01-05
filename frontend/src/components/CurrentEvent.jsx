import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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

const CurrentEvent = ({ currkey, highlightedDays, setHighlightedDays, value, token, setEditTitle, setEditDescription, setShowEditEvent }) => {

    const [event, setEvent] = useState(false);
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    useEffect(() => {console.log(currkey)}, [currkey])

    useEffect(() => {
        const _year = value.$y;
        const _monthNo = value.$M;
        const _month = months[_monthNo];
        const _day = value.$D;

        const data = {
            year: _year,
            month: _month,
            day: _day,
        }

        const queryParams = new URLSearchParams(data);

        fetch(`http://localhost:8000/event/get-event?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.event) {
                    setEvent(true);
                    setDay(data.event.day);
                    setMonth(data.event.month);
                    setYear(data.event.year);
                    setTitle(data.event.event.title);
                    setDescription(data.event.event.description);
                }
                else {
                    setEvent(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [value, currkey])

    const handleDelete = () => {
        const data = {
            year: year,
            month: month,
            day: day,
        }

        fetch('http://localhost:8000/event/delete-event',{
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setEvent(false);
                const filtered = highlightedDays.filter((ele) => ele !== day);
                setHighlightedDays(filtered);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleEdit = () => {
        setShowEditEvent(true);
        setEditTitle(title);
        setEditDescription(description);
    }

    return (
        <div className='w-full flex-1 rounded-md bg-gray-300 font-comfortaa flex z-10'>
            {!event ?
                <p className='flex flex-col gap-2 p-2 w-full bg-gray-400 rounded-md m-2 font-bold'>
                    No event listed...
                </p>
                :
                <div className='flex flex-col gap-2 p-2 w-full relative'>
                    <div className=' bg-gray-400 font-bold rounded-md p-2 flex justify-between'>
                        <p>Date:</p>
                        <p> {day} {month} {year}</p>
                    </div>
                    <p className='bg-gray-400 font-bold rounded-md p-2'>
                        {title}
                    </p>
                    <p className='bg-gray-400 rounded p-2 flex-1 overflow-hidden'>
                        {description}
                    </p>
                        <div className='flex gap-2 bg-gray-300 justify-between rounded-tl-md rounded-br-md'>
                            <DeleteIcon className=' cursor-pointer' onClick={handleDelete}/>
                            <EditIcon className=' cursor-pointer' onClick={handleEdit}/>
                        </div>
                </div>
            }
        </div>
    )
}

export default CurrentEvent
