"use client"
import Navbar from '@/app/components/Navbar';
import TinyMCEEditor from '@/app/components/TinyMCEEditor'
import React, { useState } from 'react'

const Publish = () => {
    const [content, setContent] = useState('');
    const [ title , setTitle] = useState('');
    const [ showForm , setShowForm] = useState(false);
  const handleEditorChange = (newContent) => {
    setContent(newContent);

  }
  
  return (
    <div className='bg-black min-h-screen text-white'>
       
      <h1 className='text-center text-3xl font-bold p-4'>Edit Your Blog Here</h1>
      <TinyMCEEditor value={content} onChange={handleEditorChange} />
      <div className='text-center m-auto w-fit mt-4'>
        
        <button onClick={()=>setShowForm((prev)=>!prev)} className='text-center border-2 border-purple-900 p-4 m-auto w-fit rounded-full'>Publish</button>
      </div>
      {showForm ? <div>
        <form className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-md z-50">
  <input
    type="text"
    id="title"
    name="title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Enter the blog title"
    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
  />
</form>


      </div> : ""}
    </div>
  )
}

export default Publish