"use client"
import React, { useEffect, useState } from 'react';
import TinyMCEEditor from '@/app/components/TinyMCEEditor';
import getToken from '@/app/utils/getToken';
import { useRouter } from 'next/navigation';

import checkToken from '@/app/utils/checkToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


const Publish = () => {
  const token = getToken();
  const[username , setUsername] = useState("");
  const[email , setEmail] = useState("");
  if(localStorage.getItem("username")){
    setUsername(localStorage.getItem("username"));
  }
  if(localStorage.getItem("email")){
    setEmail(localStorage.getItem("email"));
  }
  
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [tags, setTags] = useState([]);
  const[saved , setSaved] = useState(false);
  const[error , setError] = useState('');

  const getCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs/categories`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const publishBlog = async (isPublished) => {
    try {
      console.log(isPublished);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          authorName: username,
          authorEmail: email,
          tags,
          isPublished : isPublished,
          category: selected,
        }),
      });
      if (response.ok) {
        console.log("Ok Response")
        window.location.href = "/pages/home";
        
      }
    } catch (error) {
      console.log("Error Response:", response.status);
  const errorData = await response.json();
  console.log("Error Data:", errorData);
    }
  };


  const addCategory = (category) => {
    if (selected.includes(category)) {
      // If category is already selected, remove it and its tags from the selected and tags list
      setSelected(selected.filter((catId) => catId !== category));
      const categoryTags = categories.find((cat) => cat.category === category)?.tags || [];
      setTags(tags.filter((tag) => !categoryTags.includes(tag))); // Remove associated tags
    } else {
      // If category is not selected, add it and its tags
      setSelected([...selected, category]);
      const categoryTags = categories.find((cat) => cat.category === category)?.tags || [];
      setTags([...tags, ...categoryTags]); // Add associated tags
    }
  };

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };


  useEffect(() => {
    if(!checkToken()){
      router.replace("/")
    }else{

      getCategories();
    }
  }, [router]);
  

  return (
    <div className=' bg-black min-h-screen text-white'>
      
      <div className=''>

      <div className='py-3 items-center flex '>
        <Link href={"/pages/home"}>
      <FontAwesomeIcon className='px-4 text-xl' icon={faHouse} />
        </Link>
      <h1 className='text-center bg-gray-900 w-fit mx-auto rounded-lg py-4 text-3xl  font-bold p-4 border  border-blue-900'>Post Your Blog Here</h1>
      </div>
      <div className='w-11/12 m-auto my-4  rounded-lg '>
      <TinyMCEEditor value={content} onChange={handleEditorChange} />
      </div>
      <div className='text-center m-auto w-fit mt-4'>
        <button onClick={() => setShowForm((prev) => !prev)} className='text-center border-2 bg-gray-900 border-blue-900 p-4 m-auto w-fit rounded-lg'>
          Publish
        </button>
      </div>
      {showForm ? (
        <div>
          <form className="text-black fixed w-1/2 h-80 top-40 rounded-xl border-2 shadow-gray-500 opacity-85 border-blue-700 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-md z-50">
            <div className='text-right'>
              <button onClick={() => setShowForm((prev) => !prev)}>Close</button>
            </div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the blog title"
              className="w-full text-xl font-semibold text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className='text-center font-sans text-xl py-2'>Choose appropriate Category</div>
            <div className='space-x-1 space-y-2 p-3 text-left'>
              {categories && categories.length > 0 ? categories.map((category) => (
                <button
                  className={`border border-gray-300 p-2 rounded-xl ${selected.includes(category.category) ? 'bg-gray-500 text-white' : 'bg-white text-black'}`}
                  key={category._id}
                  onClick={(e) => { e.preventDefault(); addCategory(category.category); }}
                >
                  {category.category}
                </button>
              )) : "Getting categories"}
            </div>
            <div className='flex flex-row justify-end items-end space-x-7'>
              <button onClick={()=>publishBlog(false)} className='bg-gray-700 text-white rounded-2xl p-2 hover:bg-gray-900'>
                Save As Drafts
              </button>
              <button onClick={()=>publishBlog(true)} className=' bg-gray-700 text-white rounded-2xl p-2 hover:bg-gray-900'>
                Publish
              </button>
            </div>
          </form>
        </div>
      ) : null}
      {saved ?   
      <div className='text-green-900 fixed w-fit h-20 top-40 rounded-xl border-2 shadow-gray-500 opacity-15 border-blue-700 left-1/2 transform -translate-x-1/2 bg-white p-4 shadow-md z-50 text-center text-3xl font-bold '>Blog Upload Done</div>
    : null}
    {error ? error : ''}
    </div>
    </div>
  );
};

export default Publish;
