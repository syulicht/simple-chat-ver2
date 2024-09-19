"use client"
import { db } from '@/lib/firebase/firebase';
import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
const Page = () => {
  const [user, setUser] = useState<DocumentData | null>(null);
  const [users, setUsers] = useState<DocumentData[]>([]);

  const query = useSearchParams();

  return (
    <>
    <aside>
    </aside>
    <div>
      {user?.name}
    </div>
    </>
  )
}

export default Page