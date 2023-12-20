import React, { useEffect, useState } from 'react'

const Signup = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const [isMatching, setIsMatching] = useState(true);

  useEffect(() => {
    setIsMatching(password === conPassword);
  }, [password, conPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userData = {
        name,
        email,
        password,
      }

      fetch('http://localhost:8000/auth/register', {
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
          type="text"
          placeholder='Enter your name'
          required
          onChange={(e) => { setName(e.target.value) }}
        />
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
        <input
          className=' border-2 border-gray-900'
          type="password"
          placeholder='Confirm your password'
          required
          onChange={(e) => { setConPassword(e.target.value) }}
        />
        {!isMatching && <p className=' text-red-500 text-sm'>Passwords do not match!</p>}
        <button className='bg-blue-500 p-2' type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
