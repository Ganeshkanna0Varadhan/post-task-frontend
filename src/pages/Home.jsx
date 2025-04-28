import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';

const Home = () => {
  const [blogPost, setBlogPost] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);

  const fetchAllPost = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getAllPost,
        params: {
          page: page
        }
      });

      if (response.data.success) {
        setPage(response.data.page)
        setTotalPageCount(Math.ceil( response.data.totalCount / response.data.limit))
        setBlogPost(response.data.posts);
      }
 
      console.log("response ", response);
    }
    catch(err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  } 

  useEffect(() => {
    fetchAllPost();
  }, [page]);

  const handlePrev = () => { 
    if (page > 1) {
      setPage(prev => prev -1);
    }
  }

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage(prev => prev + 1);
    }
  }

  return (
  <div className="h-full p-3 flex flex-col bg-blue-50">
    {/* Cards Grid */}
    <div className="flex-1 overflow-auto">
      <div className="grid mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          loading ? (
            new Array(12).fill(1).map((_, index) => (
              <div key={"loading_"+index} className="animate-pulse bg-white shadow rounded-md p-2 w-full">
                <div className="h-48 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))
          ) : blogPost[0] ? (
            blogPost.map((blog, index) => (
              <div key={"myblog_"+index} className="bg-white min-w-md shadow-md rounded-md overflow-hidden">
                <img
                  src={blog?.image}
                  alt={blog?.title}
                  className="w-full h-40 md:h-48 lg:h-56 object-scale-down"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{blog?.title}</h2>
                  <p className="text-gray-600 mb-3">{blog?.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {blog?.tags.map((tag, index) => (
                      <span key={"tags_"+index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-400">
              No blogs available.
            </div>
          )
        }
      </div>
    </div>


    {/* Pagination */}
    <div className="flex justify-between items-center mt-2">
      <button onClick={handlePrev} className="border border-blue-300 px-4 py-1 hover:bg-blue-100 rounded disabled:bg-neutral-300 disabled:border-none">
        Previous
      </button>
      <button className="w-full bg-slate-100 text-center py-1">
        {page}/{totalPageCount}
      </button>
      <button onClick={handleNext} disabled={page === totalPageCount} className="border border-blue-300 px-4 py-1 hover:bg-blue-100 rounded disabled:bg-neutral-300 disabled:border-none">
        Next
      </button>
    </div>

  </div>


  )
}

export default Home