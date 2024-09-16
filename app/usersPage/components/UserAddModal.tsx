import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import {db} from "../../../lib/firebase/firebase";
import styles from "../css/page.module.css"
import usefileUpload from "../../hooks/useFileUpload";
import React, { FormEvent, useState } from 'react'

type UserAddModalProps = {
    show : boolean, 
    close: () => void
}


function UserAddModal(props : UserAddModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [quote, setQuote] = useState("");
    const [id, setId] = useState(0);
    const [file, setFile] = useState<File | null>();
    
    onSnapshot(collection(db, "users"), (users) => {
        setId(users.docs.length);
    })

    const AddUser = async (e : FormEvent<HTMLElement>) => {
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
        await usefileUpload(file, id);
        console.log(0);
        setEmail('');
        props.close();
    }

    if(props.show){
        return (
            <div className="overlay" onClick={props.close}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={AddUser} className={styles.form}>
                        <div>
                            <label>Name</label>
                            <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label>Quote</label>
                            <input type='text' value={quote} onChange={(e) => setQuote(e.target.value)}/>
                        </div>
                        <div className='inputfile'>
                            <input type='file' accept="image/jpeg, image/png" onChange={(e) => setFile(e.target.files && e.target.files[0])} name="photo"/>
                        </div>
                        <button type='submit'>追加</button>
                    </form>
                    <p><button onClick={props.close}>close</button></p>
                </div>
            </div>  
          )        
    }
}

export default UserAddModal