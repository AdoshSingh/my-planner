import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Navbar from '../components/Navbar';
import TodoList from '../components/TodoList';

const Home = () => {

    const [token, setToken] = useState();
    const [userName, setUserName] = useState();
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

    return (
        <div className='h-screen w-screen bg-cusDarkOne bg-cusImage bg-cover bg-fixed'>
            <div className='flex flex-col justify-between h-full'>
                <Navbar userName={userName} />
                <div className='flex items-center justify-center h-5/6'>
                    {userTodos &&
                        <TodoList userTodos={userTodos} setUserTodos={setUserTodos} token={token} getUserTodos={getUserTodos} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
