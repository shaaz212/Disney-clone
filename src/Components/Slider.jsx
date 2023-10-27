import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../Services/GlobalApi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'



function Slider() {

  const IMAGE_BASE_URL ="https://image.tmdb.org/t/p/original";
  const screenWidth = window.innerWidth

  const [movieList,setmovieList] = useState([])
  const elementRef = useRef()

  useEffect(()=>{
    trendingVideos();
  },[])

  // trending videos
  const trendingVideos = ()=>{
    GlobalApi.getTrendingVideos.then(resp=>{
      // console.log(resp.data.results);
      setmovieList(resp.data.results)
    })
  }

  // slider right
  const sliderRight = (element) => {
    element.scrollLeft +=screenWidth - 110
  }

  // slider left
  const sliderLeft = (element) => {
    element.scrollLeft -=screenWidth -110
  }

  return (
    <div>
      <HiChevronLeft className='hidden md:block text-white text-[30px] absolute mx-8 mt-[200px] cursor pointer' onClick={()=>sliderLeft(elementRef.current)} style={{backgroundColor: '#00000000'}}/>
      <HiChevronRight className='hidden md:block text-white text-[30px] absolute mx-8 mt-[200px] cursor pointer right-0' onClick={()=>sliderRight(elementRef.current)} style={{backgroundColor: '#00000000'}}/>
    <div className='flex overflow-x-auto w-full px-16 py-4 scrollbar-none scroll-smooth' ref={elementRef}>
      {
        movieList.map((item)=>(
          <img src={IMAGE_BASE_URL+ item.backdrop_path} className='min-w-full md:h-[400px] object-cover object-left-top mr-5 rounded-md hover:border-[4px] border-gray-400 transition-all duration-100 ease-in-out'  alt="" />
        ))
      }
    </div>
    </div>
  )
}

export default Slider