import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import images from '../assets/exo';
import Todo from '../components/Todo';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Home = () => {

    const [token, setToken] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [showEditTodo, setShowEditTodo] = useState(false);
    const [todoTitle, setTodoTitle] = useState();
    const [todoDes, setTodoDes] = useState();
    const [userTodos, setUserTodos] = useState();
    const [updateTodoId, setUpdateTodoId] = useState();
    const [editTitle, setEditTitle] = useState();
    const [editDes, setEditDes] = useState();

    const deleteTodo = (idToDelete) => {
        const newArray = [...userTodos];
        const ind = newArray.findIndex(obj => obj._id === idToDelete);
        newArray.splice(ind, 1);
        setUserTodos(newArray);
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
                console.log(data.message, data.todos);
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
            setEmail(decodedToken.email);
            getUserTodos(tokenValue);
        }

    }, []);

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

    const handleSubmit = (e) => {
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
                setShowAddTodo(!showAddTodo);
            })
            .catch((err) => { console.log(err) });

    }

    return (
        <div className='h-screen w-screen bg-cusDarkOne bg-cusImage bg-cover bg-fixed'>
            <div className='flex flex-col justify-between h-full'>
                <div className='flex w-full justify-between items-center p-8 '>
                    <img src={images.mainLogo} alt="" className='w-56' />
                    <h1 className=' text-cusSecOne text-3xl font-comfortaa font-bold'>{userName}</h1>
                </div>
                <div className='flex items-center justify-center h-5/6'>
                    <div className=' relative w-[450px] h-[500px] flex flex-col justify-between gap-4 p-4 rounded-3xl border border-cusSecTwo bg-cusDarkTwo'>
                        <h1 className=' text-cusSecOne font-comfortaa text-3xl font-bold'>My Todo List</h1>
                        <div className='flex-1 flex flex-col gap-2 overflow-auto scrollbar-hide'>
                            {userTodos?.map((item) => (
                                <Todo key={item._id} title={item.title} description={item.description} done={item.done} id={item._id} token={token} deleteTodoFront={deleteTodo} showEditTodo={showEditTodo} setShowEditTodo={setShowEditTodo}
                                    setUpdateTodoId={setUpdateTodoId} setEditTitle={setEditTitle} setEditDes={setEditDes} getUserTodos={getUserTodos}
                                />
                            ))}
                        </div>
                        <div className="flex w-full justify-end">
                            <div
                                className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-cusDarkTwo transition-all'
                                onClick={() => { setShowAddTodo(!showAddTodo) }}
                            >
                                <AddRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                            </div>
                        </div>
                        {showAddTodo &&
                            <form className=' absolute top-0 left-0 h-full w-full flex flex-col justify-between items-center gap-4 p-4 rounded-3xl border border-cusSecTwo bg-cusDarkTwo font-comfortaa' onSubmit={handleSubmit}>
                                <div className='flex justify-between w-full'>
                                    <h1 className=' text-cusSecOne font-comfortaa text-3xl font-bold'>Add Todo</h1>
                                    <div
                                        className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-cusDarkTwo transition-all'
                                        onClick={() => { setShowAddTodo(!showAddTodo) }}
                                    >
                                        <CloseRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 w-full'>
                                    <input className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' type="text" placeholder='Add title' required onChange={(e) => { setTodoTitle(e.target.value) }} />
                                    <textarea className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' name="" id="" cols="30" rows="10" placeholder='Add description' onChange={(e) => { setTodoDes(e.target.value) }}></textarea>
                                    <button className='bg-cusSecTwo border border-cusSecTwo text-cusDarkOne rounded-md py-2 px-4 w-full hover:bg-transparent hover:text-cusSecOne transition font-bold' type='submit'>Add Todo</button>
                                </div>
                            </form>
                        }
                        {showEditTodo &&
                            <form className=' absolute top-0 left-0 h-full w-full flex flex-col justify-between items-center gap-4 p-4 rounded-3xl border border-cusSecTwo bg-cusDarkTwo font-comfortaa' onSubmit={hanldeEditTodo}>
                                <div className='flex justify-between w-full'>
                                    <h1 className=' text-cusSecOne font-comfortaa text-3xl font-bold'>Edit Todo</h1>
                                    <div
                                        className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-cusDarkTwo transition-all'
                                        onClick={() => { setShowEditTodo(!showEditTodo) }}
                                    >
                                        <CloseRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4 w-full'>
                                    <input value={editTitle} className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' type="text" placeholder='Add title' required onChange={(e) => { setEditTitle(e.target.value) }} />
                                    <textarea value={editDes} className='border border-cusSecTwo rounded-md py-2 px-4 font-comfortaa w-full bg-transparent text-cusText outline-none' name="" id="" cols="30" rows="10" placeholder='Add description' onChange={(e) => { setEditDes(e.target.value) }}></textarea>
                                    <button className='bg-cusSecTwo border border-cusSecTwo text-cusDarkOne rounded-md py-2 px-4 w-full hover:bg-transparent hover:text-cusSecOne transition font-bold' type='submit'>Edit Todo</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
