"use client"
import { DocumentData } from 'firebase/firestore'
import React, { useState, useEffect, useRef, BaseSyntheticEvent } from 'react'
import escapeStringRegexp from "escape-string-regexp";

type Props = {
    users: DocumentData[]
    addfriend: (id : number) => void
}

const AddFriends = (props: Props) => {
    const [searchWord, setSearchWord] = useState('');
    const [filterList, setFilterList] = useState<DocumentData[]>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const submit = () => {
        const user = props.users.find(user => user.name === inputRef.current!.value);
        if(user){
            props.addfriend(user.id);
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
    <div>
        <form onSubmit={submit}>
            <input type='text' onChange={(e) => setSearchWord(e.target.value)} ref={inputRef}/>
            <input type='hidden' />
            <button type='submit'>Add</button>
        </form>
        <ul>
            {filterList.map(li => (
                <div key={li.id} onClick={e => inputField(e)}>{li.name}</div>
                ))}
        </ul>
    </div>
  )
}

export default AddFriends