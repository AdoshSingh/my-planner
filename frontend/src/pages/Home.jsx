import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import images from '../assets/exo';
import Todo from '../components/Todo';

const Home = () => {

    const [token, setToken] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [todoTitle, setTodoTitle] = useState();
    const [todoDes, setTodoDes] = useState();
    const [userTodos, setUserTodos] = useState();

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
                    setUserTodos(data.todos);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        try {

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
                })
                .catch((err) => { console.log(err) });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-screen w-screen bg-cusDarkOne bg-cusImage bg-cover bg-fixed'>
            <div className='flex flex-col justify-between h-full'>
                <div className='flex w-full justify-between items-center p-8 '>
                    <img src={images.mainLogo} alt="" className='w-56' />
                    <h1 className=' text-cusSecOne text-3xl font-comfortaa font-bold'>{userName}</h1>
                </div>
                <div className='flex items-center justify-center h-5/6'>
                    <div className=' w-[450px] h-[500px] flex flex-col justify-between gap-4 p-4 rounded-3xl border border-cusSecTwo bg-cusDarkTwo'>
                        <h1 className=' text-cusSecOne font-comfortaa text-3xl font-bold'>My Todo List</h1>
                        <div className='flex-1 flex flex-col gap-2 overflow-auto scrollbar-hide'>
                            {userTodos?.map((item) => (
                                <Todo key={item._id} title={item.title} description={item.description} done={item.done} id={item._id} token={token}/>
                            ))}
                        </div>
                        <div className="flex w-full justify-end">
                            <div
                                className=' h-12 w-12 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer'
                                onClick={() => { setShowAddTodo(!showAddTodo) }}
                            >
                                <p className=' text-xl'>+</p>
                            </div>
                        </div>
                    </div>
                    {showAddTodo &&
                        <div>
                            <form onSubmit={handleSubmit}>
                                <input type="text" placeholder='Add title' required onChange={(e) => { setTodoTitle(e.target.value) }} />
                                <textarea name="" id="" cols="30" rows="10" placeholder='Add description' onChange={(e) => { setTodoDes(e.target.value) }}></textarea>
                                <button type='submit'>Add Todo</button>
                            </form>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
