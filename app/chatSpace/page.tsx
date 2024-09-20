"use client"
import { db } from '@/lib/firebase/firebase';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Sidebar from '../usersPage/components/Sidebar';
import AddFriends from './components/AddFriends';
import '../globals.css';


const Page = () => {
    const [users, setUsers] = useState<DocumentData[]>([]);
    const [user, setUser] = useState<DocumentData | null>(null);
    const [friendIds, setFriendIds] = useState<number[]>([]); 
    const query = useSearchParams();
    const addFriend = (id: number) => {
      
    }

    useEffect(() => {
        onSnapshot(collection(db, 'users'), (users)=>{
          setUsers(users.docs.map(user => {return user.data()}).sort((a : DocumentData, b : DocumentData) => a.id - b.id));
            users.docs.forEach(user => {if(user.id === query.get('keyword')){
              setUser(user.data());
            }})
        });
    }, []);

    useEffect(() => {
      if(user && user.friends){
        setFriendIds(user.friends);
      }
    }, [user])

  return (
    <div className='main'>
    <Sidebar friendIds={friendIds} users={users}/>
    <div>
      <AddFriends users={users.filter(user => user.delete === false)} addfriend={addFriend}/>
    </div>
    </div>
  )
}

export default Page