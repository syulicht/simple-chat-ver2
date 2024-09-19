"use client"
import { db } from '@/lib/firebase/firebase';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
    const [users, setUsers] = useState<DocumentData[]>([]);
    const [user, setUser] = useState<DocumentData | null>(null);
    const query = useSearchParams();

    useEffect(() => {
        onSnapshot(collection(db, 'users'), (users)=>{
            setUsers(users.docs.map(user => {
                if(user.id === query.get("keyword")){
                    setUser(user.data());
                }
                return user.data();
            })
            .sort((a : DocumentData, b : DocumentData) => a.id - b.id));
        });
    }, [query]);

  return (
    <div>
    </div>
  )
}

export default Page;