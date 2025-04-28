import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdClose } from 'react-icons/md'
import { SummaryApi } from '../common/summaryApi';
import Axios from '../utils/Axios';
import { useNavigate } from 'react-router-dom';

const CreateTag = () => {

  const navigate = useNavigate();
  const [tagName, setTagName] = useState("");

  const close = () => {
    navigate('/');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
      const response = await Axios({
        ...SummaryApi.createTags,
        data: {
          name: tagName
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success("Tag Created Successfully");
        setTagName("");
        close();
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center h-full w-full bg-black bg-opacity-70'>
      <section className='max-w-md w-full max-h-full bg-white rounded shadow-sm overflow-auto'>
        <div className='p-2 font-semibold  shadow-md flex items-center justify-between'>
          <h2 className='font-semibold'>Create Blog</h2>
          <MdClose onClick={close} className='font-bold hover:cursor-pointer' size={20} />
        </div>
        <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>
            {/* Title Field */}
            <div className='grid gap-1'>
              <label htmlFor='title'>Name </label>
              <input 
                type='text'
                id='title'
                placeholder='Enter product title'
                value={tagName}
                name='title'
                onChange={(e) => setTagName(e.target.value)}
                required
                className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded'
              />
            </div>
            <button
              type='submit'
              disabled={tagName.length == 0}
              className='bg-green-700 hover:bg-green-800 disabled:bg-gray-400 text-white py-2 rounded font-semibold'
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default CreateTag