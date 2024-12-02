"use client"
import getToken from '@/app/utils/getToken'
import React, { useEffect, useState } from 'react'

const MyBlogs = () => {
    const [blogData , setBlogData] = useState([]);
    const token = getToken();
    const myBlogs = async()=>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/myBlogs`,{
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        });
        if(response.ok){

            const data = await response.json();
            setBlogData(data.user.blogs);
            console.log(blogData);
        }
    }
    useEffect(()=>{
        myBlogs()
    },[]);
  return (
    <div>
        MyBlogs
        {blogData.length >0 ? <div>
            blogs
        </div> : "No blogs right now."}
    </div>
  )
}

export default MyBlogs