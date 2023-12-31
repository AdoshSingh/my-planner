import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { Badge } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';


const Home = () => {

    const [token, setToken] = useState();
    const [userName, setUserName] = useState();
    const [userTodos, setUserTodos] = useState();
    const [value, setValue] = useState(dayjs());
    const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
    const [visibleMonth, setVisibleMonth] = useState(dayjs());

    function ServerDay(props) {
        const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

        const isSelected =
            !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

        return (
            <Badge
                key={props.day.toString()}
                overlap="circular"
                badgeContent={isSelected ? '⭕' : undefined}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        );
    }

    const getUserTodos = (tokenValue) => {
        fetch('http://localhost:8000/todo/get-todos', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${tokenValue}`,
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const theTodos = data.todos;
                theTodos.sort((a, b) => {
                    const doneA = a.done ? 1 : 0;
                    const doneB = b.done ? 1 : 0;
                    return doneA - doneB;
                })
                setUserTodos(theTodos);
            })
            .catch((err) => { console.log(err) });
    }

    useEffect(() => {

        const specificCookie = document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='));

        if (specificCookie) {
            const tokenValue = specificCookie.split('=')[1];
            setToken(tokenValue);
            const decodedToken = jwtDecode(tokenValue);
            setUserName(decodedToken.name);
            getUserTodos(tokenValue);
        }

    }, []);

    useEffect(() => { console.log(value) }, [value]);

    const handleMonthChange = (newVisibleMonth) => {
        setVisibleMonth(newVisibleMonth);
        console.log('Visible Month:', newVisibleMonth);
    };

    return (
        <div className='h-screen w-screen bg-cusDarkOne bg-cusImage bg-cover bg-fixed'>
            <div className='flex flex-col justify-between h-full'>
                <Navbar userName={userName} />
                <div className='flex items-center justify-evenly h-5/6'>
                    {userTodos &&
                        <TodoList userTodos={userTodos} setUserTodos={setUserTodos} token={token} getUserTodos={getUserTodos} />
                    }
                    <div className='flex items-center backdrop-blur-md bu w-[50%] h-[500px] rounded-3xl border-2 border-cusSecOne overflow-hidden'>
                        <div className='bg-gray-300 w-[45%] h-full flex items-center font-comfortaa'>
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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
