import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex text-3xl bg-black text-white py-8 justify-between px-44'>
        <div className=' font-bold'>
            <Link href={"/"}>Pen Stitched</Link>
        </div>
        <div className=''>
            <Link className='px-4' href={"/pages/home"}>Home</Link>
            <Link className='px-4' href={"/pages/blogs"}>Latest Blogs</Link>
            <Link className='px-4' href={"/pages/contact"}>Contact Us</Link>
        </div>
    
    </div>
  )
}

export default Navbar