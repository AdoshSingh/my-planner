import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
