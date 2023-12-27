import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const EditTodo = ({ token, updateTodoId, getUserTodos, setShowEditTodo, editTitle, setEditTitle, editDes, setEditDes }) => {

    const hanldeEditTodo = (e) => {
        e.preventDefault();
        const updatedData = {
            id: updateTodoId,
            title: editTitle,
            description: editDes,
        }
        fetch('http://localhost:8000/todo/edit-todo', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.message);
                getUserTodos(token);
                setShowEditTodo(false);
            })
    }

    return (
        <form className=' absolute top-0 left-0 h-full w-full flex flex-col justify-between items-center gap-4 p-4 rounded-3xl border border-cusSecTwo bg-cusDarkTwo font-comfortaa z-10' onSubmit={hanldeEditTodo}>
            <div className='flex justify-between w-full'>
                <h1 className=' text-cusSecOne font-comfortaa text-3xl font-bold'>Edit Todo</h1>
                <div
                    className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-cusDarkTwo transition-all'
                    onClick={() => { setShowEditTodo(false) }}
                >
                    <CloseRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <input value={editTitle} className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' type="text" placeholder='Add title' required onChange={(e) => { setEditTitle(e.target.value) }} />
                <textarea value={editDes} className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' name="" id="" cols="30" rows="10" placeholder='Add description' onChange={(e) => { setEditDes(e.target.value) }}></textarea>
                <button className='bg-cusSecTwo border border-cusSecTwo text-cusDarkOne rounded-md py-2 px-4 w-full hover:bg-transparent hover:text-cusSecOne transition font-bold' type='submit'>
                    Edit Todo
                </button>
            </div>
        </form>
    )
}

export default EditTodo
