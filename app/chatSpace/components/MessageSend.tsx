"use client"
import { db } from '@/lib/firebase/firebase'
import { addDoc, collection, DocumentData, Timestamp } from 'firebase/firestore'
import Image from 'next/image'
import React, { FormEvent, useRef, useState } from 'react'
import styles from '../css/page.module.css'

type Props = {
    user: DocumentData | null,
    to: DocumentData | null
}

const MessageSend = (props: Props) => {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const submit = async(e : FormEvent<HTMLElement>) => {
        e.preventDefault();
        const chat = {
            from : props.user?.property.id,
            to : props.to?.property.id,
            message : message,
            read : false,
            time : Timestamp.fromMillis(new Date().getTime())
        }
        await addDoc(collection(db, "chats"), chat);
        if(inputRef.current){
            inputRef.current.value = "";
        }
    }
  return (
    <form onSubmit={(e) => submit(e)} className={styles.messageSend}>
        <div>
            <input type='text' onChange={e => setMessage(e.target.value)} ref={inputRef}/>
        </div>
        <button>
            <Image src={"/send_50dp_5F6368_FILL0_wght400_GRAD0_opsz48.png"} width={50} height={50} alt=''/>
        </button>
    </form>
  )
}

export default MessageSend