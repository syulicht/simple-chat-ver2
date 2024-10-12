import React, { FormEvent, useState } from 'react'
import {db} from "../../../lib/firebase/firebase";
import { addDoc, collection, onSnapshot } from 'firebase/firestore';


function UserAdd() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [quote, setQuote] = useState("");
    const [id, setId] = useState(0);
    onSnapshot(collection(db, "users"), (users) => {
        setId(users.docs.length);
    })
    const onSubmit = async (e : FormEvent<HTMLElement>) => {
        e.preventDefault();
        try{
            await addDoc(collection(db, "users"), {
                id : id,
                name: name,
                email: email,
                quote: quote,
                delete: false
            });
        } catch(error){
            console.log(error);
        }

    }
  return (
    <form onSubmit={onSubmit}>
        <input type='text' onChange={(e => setName(e.target.value))}/>
        <input type='text' onChange={(e => setEmail(e.target.value))}/>
        <input type='text' onChange={(e => setQuote(e.target.value))}/>
        <button type='submit'>追加</button>
    </form>
  )
}

export default UserAdd