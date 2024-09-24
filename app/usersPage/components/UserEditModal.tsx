import React, { FormEvent, useEffect, useState } from 'react'
import "../../globals.css";
import {db} from "../../../lib/firebase/firebase";
import styles from "../css/page.module.css";
import { collection, DocumentData, getDocs, query, where, doc, setDoc} from 'firebase/firestore';
import useFileUpload from '@/app/hooks/useFileUpload';

type UserEditModalProps = {
    user : DocumentData, 
    show : boolean, 
    close: () => void
}

function UserEditModal(props : UserEditModalProps) {
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [quote, setQuote] = useState(props.user.quote);
    const [file, setFile] = useState<File | null>();


    useEffect(() => {
        setName(props.user.name);
        setEmail(props.user.email);
    }, [props.user]);

    const EditUser = async(e : FormEvent<HTMLElement>) => {
        e.preventDefault();
        try{
            const userCollectionRef = collection(db, 'users');
            const q = query(userCollectionRef, where('id', '==', props.user.id));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(async(document) => {
                const userDocumentRef = doc(db, 'users', document.id);
                await setDoc(userDocumentRef, {
                    id: props.user.id,
                    name: name,
                    email: email, 
                    quote: quote,
                    delete: props.user.delete
                }, { merge: true });
            });
        } catch(error){
            console.log(error);
        }
        useFileUpload(file, props.user.id);
        props.close();    
    }
    if(props.show){
        return (
            <div className="overlay" onClick={props.close}>
                <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                    <form onSubmit={EditUser} className={styles.form}>
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
                        <button type='submit'>編集</button>
                    </form>
                    <p><button onClick={props.close}>close</button></p>
                </div>
            </div>  
        )        
    }
}

export default UserEditModal