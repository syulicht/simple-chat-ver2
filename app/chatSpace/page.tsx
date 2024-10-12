"use client"
import { db } from '@/lib/firebase/firebase';
import { collection, doc, DocumentData, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import Sidebar from '../usersPage/components/Sidebar';
import '../globals.css';
import styles from "./css/page.module.css"
import MessageSend from './components/MessageSend';
import MessageList from './components/MessageList';
import Header from './components/Header';


const Page = () => {
    const [users, setUsers] = useState<DocumentData[]>([]);
    const [user, setUser] = useState<DocumentData | null>(null);
    const [toUser, setToUser] = useState<DocumentData | null>(null);
    const [friendIds, setFriendIds] = useState<number[]>([]); 
    const query2 = useSearchParams();
    const addFriend = async(id: number) => {
      await updateDoc(doc(db, "users", user?.id), {
        ...user?.property, friendIds : [...friendIds.filter(i => i !== id), id]
      });
      const userCollectionRef = collection(db, 'users');
      const q = query(userCollectionRef, where('id', '==', id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        const userDocumentRef = doc(db, "users", document.id);
        const friendIds = (document.data().friendIds as number[]) || [];
        await updateDoc(userDocumentRef, {
          friendIds: [...friendIds.filter((id : number) => id !== user?.property.id), user?.property.id]
        })
      })
  
      setFriendIds([...friendIds, id]);
    }
    const setFriend = (id: number) => {
      const userCollectionRef = collection(db, 'users');
      const q = query(userCollectionRef, where('id', '==', id));
      onSnapshot(q, documents => {
        documents.docs.forEach(document => {
          setToUser({property: document.data(), id: document.id});
        })
      })
    }

    useEffect(() => {
        onSnapshot(collection(db, 'users'), (users)=>{
          setUsers(users.docs.map(user => {return user.data()}).sort((a : DocumentData, b : DocumentData) => a.id - b.id));
            users.docs.forEach(user => {if(user.id === query2.get('keyword')){
              setUser({property: user.data(), id: user.id});
            }})
        });
    }, [query2]);

    useEffect(() => {
      if(user && user.property.friendIds){
        setFriendIds(user.property.friendIds);
      }
    }, [user])

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className='main'>
    <Sidebar friendIds={user?.property.friendIds ? user?.property.friendIds : []} users={users} addfriend={addFriend} id={user?.property.id} setfriend={setFriend}/>
    <div className={styles.mainContent}>
    <Header user={user}/>
    {toUser&&<>
      <MessageList user={user} to={toUser} />
      <MessageSend user={user} to={toUser}/>
      </>
    }
    </div>
    </div>
    </Suspense>
  )
}

export default Page