import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userData = {
        email,
        password,
      }

      fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {console.log(data.message)})
        .catch((err) => {console.log(err)});

    } catch (err) {
      console.log('client error', err);
    }
  }

  return (
    <div>
      <form className='flex flex-col gap-2 items-center justify-center' onSubmit={handleSubmit}>
        <input
          className=' border-2 border-gray-900'
          type="email"
          placeholder='Enter your email'
          required
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          className=' border-2 border-gray-900'
          type="password"
          placeholder='Enter your password'
          required
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button className='bg-blue-500 p-2' type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default Login
