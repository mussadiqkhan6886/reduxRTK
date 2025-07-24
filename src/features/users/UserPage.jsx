import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { useGetPostsByUserIdQuery } from '../posts/postsSlice'

const UserPage = () => {
    const {userId} = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const {data: postsForUser, isLoading, isSuccess, isError, error} = useGetPostsByUserIdQuery()

   let content;
   if(isLoading){
    content = <p>Loading...</p>
   }else if(isSuccess){
    const {ids, entities} = postsForUser
    content = ids.map(id => (
      <li key={id}>
        <Link to={`/post/${id}`} >{entities[id].title}</Link>
      </li>
    ))
   }else if(isError){
    content = <p>{error}</p>
   }

  return (
    <section className="h-[581px] bg-gradient-to-b from-gray-800 to-purple-900 px-12 flex flex-col items-center">
      <h2 className='text-3xl font-bold text-white my-2'>{user?.name}</h2>
      <ol className='font-semibold text-xl text-gray-300'>{content}</ol>
    </section>
  )
}

export default UserPage
