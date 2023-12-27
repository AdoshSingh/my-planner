import React, { useState } from 'react';
import images from '../assets/exo';
import Todo from './Todo';
import AddTodo from './AddTodo';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditTodo from './EditTodo';

const TodoList = ({ userTodos, setUserTodos, token, getUserTodos }) => {

    const [showEditTodo, setShowEditTodo] = useState(false);
    const [updateTodoId, setUpdateTodoId] = useState();
    const [editTitle, setEditTitle] = useState();
    const [editDes, setEditDes] = useState();
    const [showAddTodo, setShowAddTodo] = useState(false);

    const deleteTodo = (idToDelete) => {
        const newArray = [...userTodos];
        const ind = newArray.findIndex(obj => obj._id === idToDelete);
        newArray.splice(ind, 1);
        setUserTodos(newArray);
    }

    return (
        <div className=' relative w-[450px] h-[500px] flex flex-col justify-between gap-4 p-4 rounded-3xl border-2 border-cusSecOne bg-cusDarkTwo overflow-hidden'>
            <img src={images.wallpaper3} className='absolute w-full h-full top-0 left-0 opacity-60' alt="" />
            <h1 className='h-[8%] text-cusSecOne font-comfortaa text-3xl font-bold z-10'>My Todo List</h1>
            <div className='flex-1 flex flex-col gap-2 overflow-auto scrollbar-hide p-2'>
                {userTodos?.map((item) => (
                    <Todo key={item._id} title={item.title} description={item.description} done={item.done} id={item._id} token={token}
                        deleteTodoFront={deleteTodo} showEditTodo={showEditTodo} setShowEditTodo={setShowEditTodo}
                        setUpdateTodoId={setUpdateTodoId} setEditTitle={setEditTitle} setEditDes={setEditDes} getUserTodos={getUserTodos}
                    />
                ))}
            </div>
            <div className=" h-[8%] flex w-full justify-end z-10">
                <div
                    className=' group h-10 w-10 flex items-center justify-center bg-cusSecOne rounded-full cursor-pointer hover:border border-cusSecOne hover:bg-transparent transition-all'
                    onClick={() => { setShowAddTodo(true) }}
                >
                    <AddRoundedIcon className=' text-cusDarkTwo group-hover:text-cusSecOne transition-all' />
                </div>
            </div>
            {showAddTodo &&
                <AddTodo token={token} getUserTodos={getUserTodos} setShowAddTodo={setShowAddTodo} />
            }
            {showEditTodo &&
                <EditTodo
                    token={token} updateTodoId={updateTodoId} getUserTodos={getUserTodos} setShowEditTodo={setShowEditTodo}
                    editTitle={editTitle} setEditTitle={setEditTitle} editDes={editDes} setEditDes={setEditDes}
                />
            }
        </div>
    )
}

export default TodoList
