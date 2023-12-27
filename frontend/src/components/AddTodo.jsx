import React, {useState} from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const AddTodo = ({token, getUserTodos, setShowAddTodo}) => {

    const [todoTitle, setTodoTitle] = useState();
    const [todoDes, setTodoDes] = useState();

    const handleAddTodo = (e) => {
        e.preventDefault();
        const todoData = {
            title: todoTitle,
            description: todoDes,
        }

        fetch('http://localhost:8000/todo/add-todo', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data?.message);
                getUserTodos(token);
                setShowAddTodo(false);
            })
            .catch((err) => { console.log(err) });

    }

    return (
        <form className=' absolute top-0 left-0 h-full w-full flex flex-col justify-between items-center gap-4 p-4 rounded-3xl border border-cusSecTwo bg-cusDarkTwo font-comfortaa z-10' onSubmit={handleAddTodo}>
            <div className='flex justify-between w-full'>
                <h1 className=' text-cusSecOne font-comfortaa text-3xl font-bold'>Add Todo</h1>
                <div
                    className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-cusDarkTwo transition-all'
                    onClick={() => { setShowAddTodo(false) }}
                >
                    <CloseRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                </div>
            </div>
            <div className='flex flex-col gap-4 w-full'>
                <input className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' type="text" placeholder='Add title' required onChange={(e) => { setTodoTitle(e.target.value) }} />
                <textarea className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' name="" id="" cols="30" rows="10" placeholder='Add description' onChange={(e) => { setTodoDes(e.target.value) }}></textarea>
                <button className='bg-cusSecTwo border border-cusSecTwo text-cusDarkOne rounded-md py-2 px-4 w-full hover:bg-transparent hover:text-cusSecOne transition font-bold' type='submit'>
                    Add Todo
                </button>
            </div>
        </form>
    )
}

export default AddTodo
