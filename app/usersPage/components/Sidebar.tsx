"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import style from '../css/page.module.css'
import { DocumentData } from 'firebase/firestore'
import Friend from '@/app/friendsPage/components/Friend'

type Props = {
  friendIds : number[],
  users : DocumentData[]
}

const Sidebar = (props : Props) => {
  const [friends, setFriends] = useState<DocumentData[]>([]);
  console.log(props.users);
  useEffect(() => {
    if(props.friendIds.length !== 0){
      setFriends(props.friendIds.map(id => props.users.find(user => user.id === id) as DocumentData));
    }
  }, [])
  return (
    <aside className={style.sidebar}>
        <div className={style.logo}>
            <Image src="/what is the matter.png" alt='' width={300} height={150} style={{objectFit: "cover"}}/>
        </div>
        {friends.map(friend => 
          <Friend key={friend.id} user={friend} />
        )}
    </aside>
  )
}

export default Sidebar