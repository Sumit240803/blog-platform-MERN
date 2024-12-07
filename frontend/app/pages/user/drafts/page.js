"use client"
import UserNav from '@/app/components/UserNav';
import checkToken from '@/app/utils/checkToken';
import getToken from '@/app/utils/getToken'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Drafts = () => {
    const [blogData , setBlogData] = useState([]);
    const router = useRouter();
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
    const getBlog =(id)=>{
        router.replace(`/pages/user/${encodeURIComponent(id)}`)
    }
    
    useEffect(()=>{
      if(!checkToken()){
        router.replace("/");
      }else{
        myBlogs()
      }
    },[router]);
  return (
    <div className="bg-black flex min-h-screen">
  {/* Sidebar - UserNav */}
  <div className="text-white ">
  <UserNav />
  </div>

  {/* Main content area */}
  <div className="w-3/4 p-8">
    <div className="text-white font-bold text-center text-4xl  mb-6">Drafts</div>

    {/* Blog drafts */}
    {blogData.length > 0 ? (
      blogData.map((blog) => (
        <div
          className="w-fit max-w-md text-white h-auto p-6 bg-gray-950 m-3 border-2 border-blue-900 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          key={blog._id}
        >
          <div
            className="text-lg text-center font-semibold text-white cursor-pointer"
            onClick={() => getBlog(blog.blogId)}
          >
            {blog.title}
          </div>
        </div>
      ))
    ) : (
      <div className="text-gray-500">No blogs right now.</div>
    )}
  </div>
</div>

  )
}

export default Drafts