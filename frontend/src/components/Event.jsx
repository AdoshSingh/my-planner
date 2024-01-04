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

const Event = ({token}) => {

    const [value, setValue] = useState(dayjs());
    const [highlightedDays, setHighlightedDays] = useState([]);
    const [visibleMonth, setVisibleMonth] = useState(dayjs());
    const [visibleYear, setVisibleYear] = useState(dayjs());
    const [showAddEvent, setShowAddEvent] = useState(false);

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
                badgeContent={isSelected ? <Dot/> : undefined}
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
                <h1 className='h-[8%] text-cusSecOne font-comfortaa text-3xl font-bold z-10'>My Events</h1>
                {value &&
                    <CurrentEvent highlightedDays={highlightedDays} setHighlightedDays={setHighlightedDays} value={value} token={token}/>
                }
                <div
                    className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-transparent transition-all'
                    onClick={() => { setShowAddEvent(true) }}
                >
                    <AddRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                </div>
                {showAddEvent && 
                    <AddEvent parentValue={value} setParentValue={setValue} highlightedDays={highlightedDays} setHighlightedDays={setHighlightedDays} setShowAddEvent={setShowAddEvent} token={token}/>
                }
            </div>
        </div>
    )
}

export default Event
