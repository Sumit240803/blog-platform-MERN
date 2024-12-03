"use client"
import Link from 'next/link'
import React, { useState } from 'react'

const UserNav = ({username , email}) => {
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

                    <Link href={`/pages/user/publish?username=${username}&email=${email}`}>
                        Publish Blog
                    </Link>
                    </div>
                    <div>

                    <Link href={"/pages/user/myblogs"}>
                        Your Blogs
                    </Link>
                    </div>
                    <div>

                    <Link href={"/pages/user/drafts"}>
                        Drafts
                    </Link>
                    </div>
                    <div>

                    <Link href={"/pages/user/analytics"}>
                        Analytics
                    </Link>
                    </div>
                    <div>
                    <Link href={"/pages/user/settings"}>
                        Settings
                    </Link>
                    </div>
                </div> : ""}
        </div>
    )
}

export default UserNav