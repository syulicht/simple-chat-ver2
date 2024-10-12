import { db } from '@/lib/firebase/firebase'
import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../css/page.module.css';
import Message from './Message'

type Props = {
    user: DocumentData | null,
    to: DocumentData | null
}

const MessageList = (props: Props) => {
    const [messages, setMessages] = useState<DocumentData[]>([]);
    const messageList = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if(messageList.current){
            messageList.current.scrollIntoView(false);
            console.log(0);
        }
    }, [props.to]);
    useEffect(()=>{
        onSnapshot(collection(db, "chats"), (chats => {
            setMessages(chats.docs.map(item => item.data())
            .sort((a, b)=> a.time.toString() < b.time.toString() ? -1 : 1)
            .filter(item => (item.to === props.user?.property.id && item.from === props.to?.property.id) || (item.to === props.to?.property.id && item.from === props.user?.property.id)));
        }))
    }, [props.user, props.to])
  return (
    <div className={styles.messageList} ref={messageList}>
        {messages.map((message, index) => (<Message key={index} message={message} user={props.user}/>))}
    </div>
  )
}

export default MessageList