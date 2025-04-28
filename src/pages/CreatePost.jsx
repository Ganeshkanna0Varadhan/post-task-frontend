import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { MdClose, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [data, setData] = useState({
    title : "",
    desc : "",
    image : undefined,
    tags: [],
  });

  const [allTags, setAllTags] = useState([]);
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState("");
  const [selectedAllTags, setSelectedAllTags] = useState([]);
  const [validateValue, setValidateValue] = useState(false);


  const fetchAllTags = async() => {
    try {
      const response = await Axios({
        ...SummaryApi.getAllTags
      })

      if (response.data.success) {
        console.log(response.data.tags);
        setAllTags(response.data.tags);
      }
    }
    catch(err) {
      console.log(err);
    }
  }

  const close = () => {
    navigate('/');
  }

  useEffect(() => {
    fetchAllTags();
  }, [])

  useEffect(() => {
    const value = (Object.values(data)).every(val => {
      if (Array.isArray(val)) {
        return val.length > 0;
      }
      return val;
    });
    setValidateValue(value);
  }, [data])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append form data
    formData.append("title", data.title);
    formData.append("desc", data.desc);
    formData.append("tag", data.tags.join(',')); // Assuming tags is an array of strings

    // Append image file (assuming data.image is a File object)
    formData.append("image", data.image);
    
    try {
      const response = await Axios({
        ...SummaryApi.createPost,
        data: formData, // Use formData here instead of JSON
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
          setData({
            title : "",
            desc : "",
            image : undefined,
            tags: [],
          });
          close();
          toast.success("Post Created Successfully");
          setSelectedAllTags([]);
      }
    }
    catch(err) {
      console.log(err);
    }
  }
  const handleChange = (e) => {
    const {name, value} = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSelectedTag = (e) => {
    const value = e.target.value;
    if (!value) 
      return

    setData((prev) => {
      return {
        ...prev,
        tags: [...prev.tags, value]
      }
    })

    const findTag = allTags.find((tag) => tag._id === value);
    setSelectedAllTags((prev) => {
      if (!prev.some(tag => tag._id === findTag._id)) {
        return [...prev, findTag]
      }
      return prev; // Return the previous state if the value is already in the array
    });

    setSelectValue("");
  }

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) 
      return;
    
    setData((prev) => {
      return {
        ...prev,
        image: file
      }
    })
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
              <label htmlFor='title'>Title</label>
              <input 
                type='text'
                id='title'
                placeholder='Enter product title'
                value={data.title}
                name='title'
                onChange={handleChange}
                required
                className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded'
              />
            </div>

            {/* Description Field */}
            <div className='grid gap-1'>
              <label htmlFor='description'>Description</label>
              <textarea 
                id='description'
                placeholder='Enter product description'
                value={data.desc}
                name='desc'
                onChange={handleChange}
                required
                rows={3}
                className='bg-blue-50 p-2 outline-none border 
                  focus-within:border-primary-200 rounded resize-none'
              />
            </div>

            {/* Image Upload */}
            <div className='grid gap-1'>
              <p>Image</p>
              <div>
                <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
                  <div className='text-center flex justify-center items-center flex-col'>
                    {
                      
                    }
                    <>
                      <FaCloudUploadAlt size={35} />
                      <p>Upload Image</p>
                    </>
                  </div>
                  <input 
                    id='productImage' 
                    accept='image/*' 
                    type='file' 
                    onChange={handleUploadImage} 
                    className='hidden'
                  />
                </label>
              </div>
              <div>
                {
                  data.image && (
                    <div className='h-20 mt-1 w-20 min-w-20 rounded bg-blue-50 border relative group'>
                    <img 
                      src={URL.createObjectURL(data.image)}
                      alt={data.name}
                      className='w-full h-full object-scale-down cursor-pointer'
                    />
                  </div>
                  )
                }
              </div>
            </div>


            {/* Category Field (Assuming category is already set in state) */}
            <div className='grid gap-1'>
              <label htmlFor='tags'>Tags</label>
              <select
                id='tags'
                value={setSelectValue}
                name='selectedTag'
                onChange={handleSelectedTag}
                className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
              >
                <option value=''>Select Tag</option>
                {
                  allTags[0] && allTags.map((tag, index) => (
                    <option key={"allTags_"+index} value={tag._id}>{tag.name}</option>
                  ))
                }
              </select>
            </div>

            <div className='flex gap-2'>
              {
                selectedAllTags[0] && selectedAllTags.map((tag) => {
                  return (
                    <div key={"displayTag_"+tag._id} className='flex px-2 gap-2 items-center bg-blue-200 rounded-full'>
                      <p>{tag.name}</p>
                      <MdClose className='hover:text-red-500 hover:cursor-pointer' />
                    </div>
                  )
                })
              }
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              disabled={!validateValue}
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

export default CreatePost