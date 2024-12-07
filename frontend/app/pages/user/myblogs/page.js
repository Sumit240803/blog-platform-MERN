"use client";
import UserNav from '@/app/components/UserNav';
import checkToken from '@/app/utils/checkToken';
import getToken from '@/app/utils/getToken';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const MyBlogs = () => {
  const [blogData, setBlogData] = useState([]);
  const token = getToken();
    const router = useRouter();
  const myBlogs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/published`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setBlogData(data.drafts);
      console.log(data);
    }
  };
  const getBlog =(id)=>{
    router.replace(`/pages/user/${encodeURIComponent(id)}`)
}

  useEffect(() => {
    if(!checkToken()){
      router.replace("/");
    }else{
      myBlogs();
    }
  }, [router]);

  return (
    <div className='flex bg-black text-white min-h-screen'>
      <UserNav/>
      <div className='flex-1 p-6'>
        <h2 className='text-center text-3xl font-bold mb-4'>My Blogs</h2>
        {blogData.length > 0 ? (
          <div className='space-y-4'>
            {blogData.map((blog) => (
              <div
                key={blog._id}
                className='bg-gray-950 text-white  w-1/3 border border-blue-900 p-4 rounded-xl'
              >
                <div onClick={()=>getBlog(blog.blogId)} className='cursor-pointer text-xl font-semibold'>{blog.title}</div>
                <div className='space-x-2'>
                <FontAwesomeIcon icon={faTrash} />
                <FontAwesomeIcon icon={faPenToSquare} />
                <FontAwesomeIcon className='cursor-pointer' onClick={()=>getBlog(blog.blogId)} icon={faEye} />
                </div>
                
                
              </div>
            ))}
          </div>
        ) : (
          <div className='text-gray-600'>No blogs right now.</div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
