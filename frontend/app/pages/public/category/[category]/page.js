"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Category = () => {
    const[blogs,setBlogs] = useState([]);
    const {category} = useParams();
    const getBlog = async()=>{
      try {
        const response = await fetch(`https://blog-platform-mern.onrender.com/api/blogs/blogCat`);
        if(response.ok){
          const data = await response.json();
          setBlogs(data);
        }
      } catch (error) {
        
      }
    }
    useEffect(()=>{
      getBlog();
    },[])
  return (
    <div>This is a {category} page.
    <div>
      {blogs.length>0 ? "Blog Aagye Oyeee" : "No Blogs "}
    </div>
    </div>
  )
}

export default Category