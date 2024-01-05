import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddEvent from './AddEvent';
import Dot from './Dot';
import CurrentEvent from './CurrentEvent';
import EditEvent from './EditEvent';
import images from '../assets/exo';
import WallpaperSlider from './WallpaperSlider';

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

const Event = ({ token }) => {

    const [value, setValue] = useState(dayjs());
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [visibleMonth, setVisibleMonth] = useState(dayjs());
    const [visibleYear, setVisibleYear] = useState(dayjs());
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [showEditEvent, setShowEditEvent] = useState(false);
    const [editTitle, setEditTitle] = useState();
    const [editDescription, setEditDescription] = useState();
    const [currkey, setCurrKey] = useState(1);
    const [currWallpaper, setCurrWallpaper] = useState(images.wallpaper1);

    useEffect(() => {
        let newKey = currkey + 1;
        setCurrKey(newKey);
    }, [value])


    useEffect(() => {

        const monthNo = visibleMonth.$M;
        const month = months[monthNo];
        const year = visibleMonth.$y;

        const data = {
            year: year,
            month: month,
        }

        const queryParams = new URLSearchParams(data);

        fetch(`http://localhost:8000/event/get-month-event?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                const days = [];
                data.events.forEach((ele) => {
                    days.push(ele.day);
                })
                setHighlightedDays(days);
            })
            .catch(err => {
                console.log(err);
            })

    }, [visibleMonth])

    useEffect(() => {

        const monthNo = visibleYear.$M;
        const month = months[monthNo];
        const year = visibleYear.$y;

        const data = {
            year: year,
            month: month,
        }

        const queryParams = new URLSearchParams(data);

        fetch(`http://localhost:8000/event/get-month-event?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(data => {
                const days = [];
                data.events.forEach((ele) => {
                    days.push(ele.day);
                })
                setHighlightedDays(days);
            })
            .catch(err => {
                console.log(err);
            })

    }, [visibleYear])



    const ServerDay = (props) => {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected =
            !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? <Dot /> : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    const handleMonthChange = (newVisibleMonth) => {
        setVisibleMonth(newVisibleMonth);
    };

    const handleYearChange = (newVisibleYear) => {
        setVisibleYear(newVisibleYear);
    };


    return (
        <div className='flex items-center backdrop-blur-md bu w-[50%] h-[500px] rounded-3xl border-2 border-cusSecOne overflow-hidden'>
            <div className='bg-gray-300 w-[45%] h-full flex items-center justify-center font-comfortaa'>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateCalendar
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                        slots={{
                            day: ServerDay,
                        }}
                        slotProps={{
                            day: {
                                highlightedDays,
                            },
                        }}
                        onMonthChange={handleMonthChange}
                        onYearChange={handleYearChange}
                    />
                </LocalizationProvider>
            </div>
            <div className='flex flex-col h-full gap-4 p-4 items-end w-full justify-between relative'>
                <img
                    src={currWallpaper}
                    className='absolute w-full h-full top-0 left-0 opacity-60' alt=""
                />
                <h1 className='h-[8%] text-cusSecOne font-comfortaa text-3xl font-bold z-10'>My Events</h1>
                {value && currkey &&
                    <CurrentEvent currkey={currkey} highlightedDays={highlightedDays} setHighlightedDays={setHighlightedDays} value={value} token={token}
                        setEditTitle={setEditTitle} setEditDescription={setEditDescription} setShowEditEvent={setShowEditEvent}
                    />
                }
                <div className=' h-[8%] flex items-center justify-between w-full z-10'>
                    <WallpaperSlider setCurrWallpaper={setCurrWallpaper} />
                    <div
                        className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-transparent transition-all'
                        onClick={() => { setShowAddEvent(true) }}
                    >
                        <AddRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                    </div>
                </div>
                {showEditEvent &&
                    <EditEvent value={value} setCurrKey={setCurrKey} editTitle={editTitle} editDescription={editDescription} token={token} setShowEditEvent={setShowEditEvent} />
                }
                {showAddEvent &&
                    <AddEvent parentValue={value} setCurrKey={setCurrKey} setParentValue={setValue} highlightedDays={highlightedDays} setHighlightedDays={setHighlightedDays} setShowAddEvent={setShowAddEvent} token={token} />
                }
            </div>
        </div>
    )
}

export default Event
