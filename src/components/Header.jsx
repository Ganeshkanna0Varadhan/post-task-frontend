import React from 'react'

const Header = () => {
  return (
    <div className='h-[8vh] text-white px-4 flex items-center bg-gray-800'>
        <div className='flex justify-between w-full'>
        <p className='font-bold text-xl font-pacifico'>Blogs</p>
        <div className='flex gap-3'>
            <button className='px-2 bg-green-800 py-1.5 rounded'>Create Post</button>
            <button className='px-2 bg-green-800 py-1.5 rounded'>Create Tag</button>
        </div>
        </div>
    </div>
  )
}

export default Header