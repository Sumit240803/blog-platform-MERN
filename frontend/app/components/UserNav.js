"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import checkToken from '../utils/checkToken';
import { useRouter } from 'next/navigation';
import getToken from '../utils/getToken';

const UserNav = () => {
    const [open, setOpen] = useState(true);
    const handleMenu = () => {
        setOpen((prev) => !prev);
    }
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const router = useRouter();
    const token = getToken();
    const fetchUserInfo = async () => {
        try {
          if (token) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/userInfo`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            if (response.ok) {
              const data = await response.json();
              
               setUsername(data.username);
               setEmail(data.email);
               localStorage.setItem("email",data.email);
               localStorage.setItem("username",data.username);
              
            } else {
              router.replace("/");
            }
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      const logout = ()=>{
        localStorage.clear();
        router.replace("/")
      }
      useEffect(() => {
        if (!checkToken()) {
          router.replace("/");
        } else {
          fetchUserInfo();
        }
      }, []);
    return (
        <div>{
            !open ?
                <button className='text-3xl p-4 text-white' onClick={handleMenu}>
                    &#9776;
                </button>
                : ""}
            {open ?

                <div className='bg-zinc-900 w-40 min-h-screen p-6 text-white z-0'>
                    <button className='text-3xl  mx-0' onClick={handleMenu}>
                    &#x02DF;
                    </button>
                    <div>
                        
                    <Link href={"/pages/home"}>
                        {username}
                    </Link>
                    </div>
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
                    <div>
                    <button onClick={logout}>
                        Log Out
                    </button>
                    </div>
                </div> : ""}
        </div>
    )
}

export default UserNav