import React, { useEffect } from 'react'
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';

const Home = () => {

  const fetchAllPost = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getAllPost
      });

      console.log("response ", response);
    }
    catch(err) {
      console.log(err);
    }
  } 

  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <div className='h-[84vh]'>
      
    </div>
  )
}

export default Home