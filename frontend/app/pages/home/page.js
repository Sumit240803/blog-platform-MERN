"use client"
import Navbar from '@/app/components/Navbar'
import UserNav from '@/app/components/UserNav'
import checkToken from '@/app/utils/checkToken'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    if (!checkToken()) {
      router.replace("/");
    }
  }, [])
  return (
    <div className='min-h-screen flex bg-black'>
      <div className=''>
        <UserNav />
      </div>
      <div className='text-white flex '>
        <div className='m-20  w-32 h-32 flex items-center justify-center'>
          <Image src={"/profile.png"} width={128} height={128} alt="hie" className="object-cover rounded-full" layout='intrinsic' />
        </div>

        <div className='flex m-20 text-lg '>
          <div className='mx-5 '>
            <div>followers</div>
            <div>32</div>
          </div>
          <div>
            <div>following</div>
            <div>3</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home