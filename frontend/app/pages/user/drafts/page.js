"use client"
import getToken from '@/app/utils/getToken'
import React, { useEffect, useState } from 'react'

const Drafts = () => {
    const [blogData , setBlogData] = useState([]);
    const token = getToken();
    const myBlogs = async()=>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/drafts`,{
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        });
        if(response.ok){

            const data = await response.json();
            setBlogData(data.drafts);
            console.log(data.drafts);
        }
    }
    useEffect(()=>{
        myBlogs()
    },[]);
  return (
    <div>
        MyBlogs
        {blogData.length >0 ? blogData.map((blog)=>(
            <div key={blog._id}>
                {blog.title}
            </div>
        )) : "No blogs right now."}
    </div>
  )
}

export default Drafts