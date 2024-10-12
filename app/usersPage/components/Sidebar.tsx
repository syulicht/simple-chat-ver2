"use client"
import Image from 'next/image'
import React from 'react'
import style from '../css/page.module.css'
import { DocumentData } from 'firebase/firestore'
import { usePathname } from 'next/navigation'
import FriendsList from '@/app/chatSpace/components/FriendsList'

type Props = {
  id: number,
  friendIds : number[],
  users : DocumentData[],
  addfriend: (id: number) => void,
  setfriend: (id: number) => void
}

const Sidebar = (props : Props) => {
  const path = usePathname();

  return (
    <aside className={style.sidebar}>
        <div className={style.logo}>
            <Image src="/what is the matter.png" alt='' width={300} height={150} style={{objectFit: "cover"}}/>
        </div>
        {
          path === "/usersPage" ? (<></>) :
          path === "/chatSpace" ? (<FriendsList users={props.users} addfriend={props.addfriend} friendIds={props.friendIds} id={props.id} setfriend={props.setfriend}/>) : <></>
        }
    </aside>
  )
}

export default Sidebar