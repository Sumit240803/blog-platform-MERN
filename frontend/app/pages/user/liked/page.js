"use client"
import UserNav from '@/app/components/UserNav';
import getToken from '@/app/utils/getToken';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Liked = () => {
    const [likedItems, setLikedItems] = useState([]);
    const token = getToken();

    const likePen = async() => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/likes`,{
          method : "GET",
          headers : {
            "Authorization" : `Bearer ${token}`
          }
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
            setLikedItems(data.liked); // assuming 'liked' is the array in the response
        }
    };
    const unlikePen = async(id) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/unlike`,{
          method : "POST",
          headers : {
            "Authorization" : `Bearer ${token}`,
             "Content-Type" : "application/json"
          },
          body : JSON.stringify({"blogId" : id})
        });
        if(response.ok){
            const data = await response.json();
            console.log(data);
            setLikedItems(data.liked); // assuming 'liked' is the array in the response
        }
    };

    useEffect(()=>{
        likePen();
    }, []);

    return (
        <div className='flex'>
            <div>
                <UserNav/>
            </div>
            <div>
               <div>Liked Pens</div>
                {likedItems && likedItems.length > 0 ? (
                    <ul>
                        {likedItems.map(item => (
                            <li key={item._id}>
                                <h2>{item.name}</h2>
                                <Link href={`/pages/public/id/${item.id}`}>Read</Link>
                                <button onClick={()=>unlikePen(item.id)}>Remove From Like</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No liked items found.</p>
                )}
            </div>
        </div>
    )
}

export default Liked;
