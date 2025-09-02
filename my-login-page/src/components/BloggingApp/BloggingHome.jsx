import React from 'react'
import Sidebar from '../FirstPage/Sidebar'
import BlogList from './BlogList'
import BlogHeader from './BlogHeader'

const BloggingHome = () => {
  return (
    <div className="bg-[#f0f4fc] ">
      <div className="md:w-[20%] fixed left-0 top-0 h-screen bg-white  z-50">
        <Sidebar />
      </div>
      <div>
        <BlogHeader/>
        <BlogList/>
      </div>
    </div>
  )
}

export default BloggingHome
