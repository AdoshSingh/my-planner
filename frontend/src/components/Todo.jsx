import React, { useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

const Todo = ({ title, description, done, id, token }) => {

    const [showDescription, setShowDescription] = useState(false);
    const [taskDone, setTaskDone] = useState(done);

    const handleDoneTask = () => {
        setTaskDone(!taskDone);
        fetch('http://localhost:8000/todo/change-status-todo', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({taskId: id}),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleShowDes = () => {
        setShowDescription(!showDescription);
    }

    return (
        <div className=' bg-gray-400 p-2 rounded-md font-comfortaa'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center justify-center'>
                    <div onClick={handleDoneTask}>
                        {taskDone ?
                            <CheckCircleOutlineRoundedIcon className=' cursor-pointer' style={{ fontSize: '1.2rem', color: '#1F2833' }} />
                            :
                            <RadioButtonUncheckedRoundedIcon className=' cursor-pointer' style={{ fontSize: '1.2rem', color: '#1F2833' }} />
                        }
                    </div>
                    <h1 className={` text-2xl text-cusDarkTwo font-semibold ${taskDone && 'line-through'}`}>{title}</h1>
                </div>
                <div className="flex gap-2 items-center">
                    <KeyboardArrowDownRoundedIcon className='cursor-pointer' onClick={handleShowDes} />
                    <DeleteOutlineRoundedIcon className='cursor-pointer' style={{ fontSize: '1.2rem' }} />
                </div>
            </div>
            {showDescription &&
                <div>
                    {description ?
                        <p>{description}</p>
                        :
                        <p>No description...</p>
                    }
                </div>
            }

        </div>
    )
}

export default Todo;
