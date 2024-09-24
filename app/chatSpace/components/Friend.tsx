import { db } from '@/lib/firebase/firebase'
import { collection, doc, DocumentData, getDocs, query, updateDoc, where } from 'firebase/firestore'
import Image from 'next/image'
import React from 'react'
import styles from "../css/page.module.css"

type Props = {
    id: number
    user: DocumentData
    setfriend: (id: number) => void
}

const Friend = (props: Props) => {
  const deleteUser = async() => {
    const userCollectionRef = collection(db, 'users');
    const q = query(userCollectionRef, where('id', '==', props.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async(document) => {
      const userDocumentRef = doc(db, "users", document.id);
      await updateDoc(userDocumentRef, {
        friendIds: document.data().friendIds.filter((id: number) => id !== props.user.id)
      }, )
    });

    const q2 = query(userCollectionRef, where('id', '==', props.user.id));
    const querySnapshot2 = await getDocs(q2);
    querySnapshot2.forEach(async (document) => {
      const userDocumentRef = doc(db, "users", document.id);
      await updateDoc(userDocumentRef, {
        friendIds: [...document.data().friendIds.filter((id : number) => id !== props.id)]
      })
    })

    window.location.reload();
  }
  return (
    <div className={styles.friend} onClick={() => props.setfriend(props.user.id)}>
    <div>
        {props.user.name}
    </div>
    <div onClick={deleteUser}>
      <Image src={'/delete_50dp_5F6368_FILL0_wght400_GRAD0_opsz48.png'} width={30} height={30} alt='' style={{objectFit: "contain"}}/>
    </div>
    </div>
  )
}

export default Friend