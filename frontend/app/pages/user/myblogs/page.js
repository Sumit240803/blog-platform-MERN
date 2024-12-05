"use client"
import UserNav from '@/app/components/UserNav';
import getToken from '@/app/utils/getToken'
import React, { useEffect, useState } from 'react'

const MyBlogs = () => {
    const [blogData , setBlogData] = useState([]);
    const token = getToken();
    const myBlogs = async()=>{
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/published`,{
            method : "GET",
            headers : {
                "Authorization" : `Bearer ${token}`
            }
        });
        if(response.ok){

            const data = await response.json();
            setBlogData(data.drafts);
            console.log(data);
        }
    }
    useEffect(()=>{
        myBlogs()
    },[]);
  return (
    <div className='flex'>
        <UserNav/>
        <div className=''>

        MyBlogs
        {blogData.length >0 ? <div>
           
        </div> : "No blogs right now."}
        </div>
    </div>
  )
}

export default MyBlogs