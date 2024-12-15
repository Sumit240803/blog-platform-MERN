"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import checkToken from '../utils/checkToken';
import { useRouter } from 'next/navigation';
import getToken from '../utils/getToken';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const UserNav = () => {
    const [open, setOpen] = useState(true);
    const handleMenu = () => {
        setOpen((prev) => !prev);
    };
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
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
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("username", data.username);
                    setRole(data.role);
                } else {
                    router.replace("/");
                }
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    const logout = () => {
        localStorage.clear();
        router.replace("/");
    };

    useEffect(() => {
        if (!checkToken()) {
            router.replace("/");
        } else {
            fetchUserInfo();
        }
    }, []);

    return (
        <div>
            {!open ? (
                <button className='text-xl p-4 text-white' onClick={handleMenu}>
                    &#9776;
                </button>
            ) : (
                ""
            )}
            {open ? (
                <div className='bg-zinc-900 w-40 min-h-screen p-6 text-white z-0 font-mono space-y-4 font-semibold text-lg'>
                    <button className='text-7xl mx-0' onClick={handleMenu}>
                        &#x02DF;
                    </button>
                    <div>
                        <Link href={"/pages/home"} className="hover:text-green-500">
                            <FontAwesomeIcon className='text-xl' icon={faHouseUser} />
                        </Link>
                    </div>

                    {/* Conditional rendering based on role */}
                    {role === 'Reader' ? (
                        <>
                            <div>
                                <Link href={`/pages/user/favorites`} className="hover:text-blue-500">
                                    Favorites
                                </Link>
                            </div>
                            <div>
                                <Link href={`/pages/user/liked`} className="hover:text-blue-500">
                                    Liked Pens
                                </Link>
                            </div>
                            <div>
                                <Link href={`/pages/public/home`} className="hover:text-blue-500">
                                    Recent Pens
                                </Link>
                            </div>
                        </>
                    ) : role === 'Blogger' ? (
                        <>
                            <div>
                                <Link href={`/pages/user/publish?username=${username}&email=${email}`} className="hover:text-blue-500">
                                    Publish Pen
                                </Link>
                            </div>
                            <div>
                                <Link href={"/pages/user/myblogs"} className="hover:text-blue-500">
                                    Your Pens
                                </Link>
                            </div>
                            <div>
                                <Link href={"/pages/user/drafts"} className="hover:text-blue-500">
                                    Drafts
                                </Link>
                            </div>
                            <div>
                                <Link href={"/pages/user/analytics"} className="hover:text-blue-500">
                                    Analytics
                                </Link>
                            </div>
                           
                            <div>
                                <Link href={`/pages/user/liked`} className="hover:text-blue-500">
                                    Liked Pens
                                </Link>
                            </div>
                            <div>
                                <Link href={`/pages/public/home`} className="hover:text-blue-500">
                                    Recent Pens
                                </Link>
                            </div>
                            <div>
                                <Link href={"/pages/user/settings"} className="hover:text-blue-500">
                                    Settings
                                </Link>
                            </div>
                        </>
                    ) : null}

                    {/* Common Log Out Button */}
                    <div>
                        <button className='hover:text-red-500' onClick={logout}>
                            Log Out
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default UserNav;
