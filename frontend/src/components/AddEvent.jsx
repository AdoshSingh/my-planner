import React, { useEffect, useState } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';

const AddEvent = ({ setShowAddEvent }) => {

    const [value, setValue] = useState(dayjs());

    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const color = "#C5C6C7";

    const theme = createTheme({
        components: {
            MuiIconButton: {
                styleOverrides: {
                    sizeMedium: {
                        color
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        color,
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color
                    }
                }
            }
        }
    });

    useEffect(() => { console.log(value) }, [value]);

    const handleAddEvent = (e) => {
        e.preventDefault();
    }

    return (
        <form className=' absolute top-0 left-0 h-full w-full flex flex-col justify-between items-center gap-4 p-4 bg-cusDarkTwo font-comfortaa z-10' onSubmit={handleAddEvent}>
            <div className='flex justify-between w-full'>
                <h1 className=' text-cusSecOne font-comfortaa text-3xl font-bold'>Add Event</h1>
                <div
                    className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-cusDarkTwo transition-all'
                    onClick={() => { setShowAddEvent(false) }}
                >
                    <CloseRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <div className=' text-cusSecOne flex w-full flex-row-reverse'>
                    <ThemeProvider theme={theme}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Pick the date"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}

                                sx={{
                                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: '1px solid #45A29E', borderRadius: '0.375rem' },
                                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: '1px solid #45A29E', borderRadius: '0.375rem' },
                                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '1px solid #45A29E', borderRadius: '0.375rem' },
                                    width: '100%',
                                }}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                </div>
                <input className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' type="text" placeholder='Add title' required />
                <textarea className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' cols="30" rows="7" placeholder='Add description'></textarea>
                <button className='bg-cusSecTwo border border-cusSecTwo text-cusDarkOne rounded-md py-2 px-4 w-full hover:bg-transparent hover:text-cusSecOne transition font-bold' type='submit'>
                    Add Event
                </button>
            </div>
        </form>
    )
}

export default AddEvent
