import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddEvent from './AddEvent';


const Event = () => {

    const [value, setValue] = useState(dayjs());
    const [highlightedDays, setHighlightedDays] = useState([4, 27, 15]);
    const [visibleMonth, setVisibleMonth] = useState(dayjs());
    const [showAddEvent, setShowAddEvent] = useState(false);

    const ServerDay = (props) => {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected =
            !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? '🔴' : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    const handleMonthChange = (newVisibleMonth) => {
        setVisibleMonth(newVisibleMonth);
        console.log('Visible Month:', newVisibleMonth);
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
                    />
                </LocalizationProvider>
            </div>
            <div className='flex flex-col h-full gap-4 p-4 items-end w-full justify-between relative'>
                <h1 className='h-[8%] text-cusSecOne font-comfortaa text-3xl font-bold z-10'>My Events</h1>

                <div
                    className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-transparent transition-all'
                    onClick={() => { setShowAddEvent(true) }}
                >
                    <AddRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                </div>
                {showAddEvent && 
                    <AddEvent setShowAddEvent={setShowAddEvent}/>
                }
            </div>
        </div>
    )
}

export default Event
