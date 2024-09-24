import { DocumentData } from 'firebase/firestore'
import styles from '../css/page.module.css'
import React from 'react'

type Props = {
    message: DocumentData
    user: DocumentData | null
}

function Message(props: Props) {
  return (
    <div className={`${props.message.to === props.user?.property.id ? styles.fromMessage : styles.toMessage} ${styles.messageGroup}`}>
    <div>{props.message.time.toDate().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
    <div className={`${styles.message}`}>
        {props.message.message}
    </div>
    </div>
  )
}

export default Message