import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'


const UsersList = () => {

    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user => (
        <li className='hover:underline hover:text-white' key={user.id}>
            <Link to={`/user/${user.id}`} >{user.name}</Link>
        </li>
    )) 

  return (
    <section className="bg-gradient-to-b from-gray-800 to-purple-900 px-12 flex flex-col items-center">
      <h2 className='font-bold text-white text-4xl m-3'>Users</h2>
      <ul className='flex flex-col text-xl gap-6 mb-[21px] text-center'>{renderedUsers}</ul>
    </section>
  )
}

export default UsersList
