"use client"
import { DocumentData } from 'firebase/firestore'
import '../../globals.css'
import styles from "../css/page.module.css"
import React, { useState, useEffect, useRef, BaseSyntheticEvent } from 'react'
import escapeStringRegexp from "escape-string-regexp";

type Props = {
    id : number
    users: DocumentData[],
    addfriend: (id : number) => void,
    close: ()=>void
}

const AddFriends = (props: Props) => {
    const [searchWord, setSearchWord] = useState('');
    const [filterList, setFilterList] = useState<DocumentData[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const submit = () => {
        const user = props.users.find(user => user.name === inputRef.current!.value);
        if(user && user.id !== props.id){
            props.addfriend(user.id);
            inputRef.current!.value = "";
            setSearchWord('');
        }
    }

    const inputField = (li : BaseSyntheticEvent) => {
        inputRef.current!.value = li.target.textContent;
    }

    useEffect(()=> {
        if(searchWord.length > 0){
            const list = props.users.filter(user => {
                const escapedText = escapeStringRegexp(searchWord.toLowerCase());
                return new RegExp(escapedText).test(user.name.toLowerCase());
            })
            setFilterList(list);    
        } else {
            setFilterList([]);
        }
    }, [searchWord])
  return (
    <div className='overlay' onClick={props.close}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div>
            <input type='text' onChange={(e) => setSearchWord(e.target.value)} ref={inputRef}/>
            <button onClick={submit}>Add</button>
        </div>
        <ul>
            {filterList.map(li => (
                <div key={li.id} onClick={e => inputField(e)}>{li.name}</div>
                ))}
        </ul>
        </div>
    </div>
  )
}

export default AddFriends