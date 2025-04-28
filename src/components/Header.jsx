import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='h-[8vh] text-white px-4 flex items-center bg-gray-800'>
        <div className='flex justify-between w-full'>
        <Link to={'/'} className='font-bold text-xl font-pacifico'>Blogs</Link>
        <div className='flex gap-3'>
            <Link to={'create-post'}  className='px-2 bg-green-800 py-1.5 rounded'>Create Post</Link>
            <Link to={'create-tag'} className='px-2 bg-green-800 py-1.5 rounded'>Create Tag</Link>
        </div>
        </div>
    </div>
  )
}

export default Header