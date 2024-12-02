"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const UserNav = () => {
    const [open, setOpen] = useState(true);
    const handleMenu = () => {
        setOpen((prev) => !prev);
    }
    return (
        <div>{
            !open ?
                <button className='text-white' onClick={handleMenu}>
                    Menu
                </button>
                : ""}
            {open ?

                <div className='bg-zinc-900 w-40 min-h-screen p-6 text-white z-0'>
                    <button className='mx-0' onClick={handleMenu}>
                        Close
                    </button>
                    
                    <div>
                        Publish Blog
                    </div>
                    <div>
                        Your Blogs
                    </div>
                    <div>
                        Drafts
                    </div>
                    <div>
                        Analytics
                    </div>
                    <div>
                        Settings
                    </div>
                </div> : ""}
        </div>
    )
}

export default UserNav