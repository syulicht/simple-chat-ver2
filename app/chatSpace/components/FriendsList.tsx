'use client'
import { DocumentData } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import AddFriends from './AddFriends'
import Image from 'next/image'
import styles from '../css/page.module.css'

type Props = {
    id: number
    users: DocumentData[],
    friendIds: number[],
    addfriend: (id:number)=>void,
    setfriend: (id:number)=>void
}

const FriendsList = (props: Props) => {
    const [friends, setFriends] = useState<DocumentData[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        if(props.friendIds.length !== 0){
          setFriends(props.friendIds.map(id => props.users.find(user => user.id === id) as DocumentData));
        }
      }, [props.users, props.friendIds]);

    const modalClose = () => {
        console.log(0);
        setModalOpen(false);
    }
  return (
    <div className={styles.friendList}>
    {friends.map(user => (<Friend key={user.id} user={user} id={props.id} setfriend={props.setfriend}/>))}
    <div onClick={()=>setModalOpen(true)}>
    <Image src={'/add_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png'} width={30} height={30} alt='' style={{objectFit: "contain"}}/>
    </div>
    {modalOpen&&<AddFriends users={props.users.filter(user => user.delete === false)} addfriend={props.addfriend} close={modalClose} id={props.id}/>}
    </div>
  )
}

export default FriendsList