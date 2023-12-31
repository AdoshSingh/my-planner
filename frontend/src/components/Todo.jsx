import React, { useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

const Todo = ({
    title, description, done, id, token, deleteTodoFront, showEditTodo, setShowEditTodo, setUpdateTodoId, setEditTitle, setEditDes, getUserTodos
}) => {

    const [showDescription, setShowDescription] = useState(false);
    const [taskDone, setTaskDone] = useState(done);

    const handleEditFront = () => {
        setShowEditTodo(!showEditTodo);
        setUpdateTodoId(id);
        setEditTitle(title);
        setEditDes(description);
    }

    const handleTodoDelete = () => {
        fetch('http://localhost:8000/todo/delete-todo', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todoId: id }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message);
                deleteTodoFront(id);
            })
            .catch((err) => { console.log(err) });
    }

    const handleDoneTask = () => {
        setTaskDone(!taskDone);
        fetch('http://localhost:8000/todo/change-status-todo', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ taskId: id }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message);
                getUserTodos(token);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleShowDes = () => {
        setShowDescription(!showDescription);
    }

    return (
        <div className=' bg-gray-300 p-2 rounded-md font-comfortaa z-10 shadow-lg'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-2 items-center justify-center'>
                    <div onClick={handleDoneTask}>
                        {taskDone ?
                            <CheckCircleOutlineRoundedIcon className=' cursor-pointer' style={{ fontSize: '1.2rem', color: '#1F2833' }} />
                            :
                            <RadioButtonUncheckedRoundedIcon className=' cursor-pointer' style={{ fontSize: '1.2rem', color: '#1F2833' }} />
                        }
                    </div>
                    <h1 className={` text-xl text-cusDarkTwo font-semibold ${taskDone && 'line-through'}`}>{title}</h1>
                </div>
                <div className="flex gap-2 items-center">
                    {showDescription ?
                        <KeyboardArrowUpRoundedIcon className='cursor-pointer' style={{ color: '#1F2833' }} onClick={handleShowDes} />
                        :
                        <KeyboardArrowDownRoundedIcon className='cursor-pointer' style={{ color: '#1F2833' }} onClick={handleShowDes} />
                    }
                    <DeleteOutlineRoundedIcon className='cursor-pointer' style={{ fontSize: '1.2rem', color: '#1F2833' }} onClick={handleTodoDelete} />
                </div>
            </div>
            {showDescription &&
                <div className='flex w-full justify-between relative'>
                    {description ?
                        <p className=' w-[95%]'>{description}</p>
                        :
                        <p className=' w-[95%]'>No description...</p>
                    }
                    <EditRoundedIcon
                        className='absolute cursor-pointer bottom-0 right-0' style={{ fontSize: '1rem', color: '#1F2833' }}
                        onClick={handleEditFront}
                    />
                </div>
            }

        </div>
    )
}

export default Todo;
