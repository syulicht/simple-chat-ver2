import { collection, doc, DocumentData, getDocs, query, setDoc, where } from 'firebase/firestore';
import {db, storage} from "../../../lib/firebase/firebase";
import '../../globals.css';
import style from '../css/page.module.css';
import React, { useEffect, useState } from 'react'
import UserEditModal from './UserEditModal';
import Image from 'next/image';
import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import Link from 'next/link';

type UserProps = {
  user: DocumentData,
  id: string
}

function User(props: UserProps) {
  const [url, setUrl] = useState("");
  useEffect(() =>{
    const getImageUrl = async (imageRef: StorageReference) => {
      try {
        const url = await getDownloadURL(imageRef);
        setUrl(url);
      } catch (e) {
        const url = await getDownloadURL(ref(storage, `images/${"Frame 15.png"}`));
        setUrl(url);
      }
    };

    const imageRef = ref(storage, `images/${props.user.id}`);
    getImageUrl(imageRef);  }, []);
  const deleteUser = async () => {
    try{
      const userCollectionRef = collection(db, 'users');
      const q = query(userCollectionRef, where('id', '==', props.user.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        const userDocumentRef = doc(db, 'users', document.id);
        await setDoc(userDocumentRef, {
          id: props.user.id,
          name: props.user.name,
          email: props.user.email,
          delete: true
        }, { merge: true });
      });
    } catch(error){
      console.log(error);
    }
  };

  const [modalShow, setModalShow] = useState(false);

  const openEditModal = () => {
    setModalShow(true);
  }
  
  const closeEditModal = () => {
    setModalShow(false);
  }
  return (
    <Link href={{pathname: '/chatSpace', query:{keyword: props.id}}} className={style.user}>
    <div><Image className={style.icon} src={`${url}`} alt={"image"} width={100} height={100} style={{objectFit: "contain"}}/></div>
    <div className={style.userContents}>
      <div className={style.name}>{props.user.name}</div>
      <div className={style.quote}>{props.user.quote}</div>
    </div>
    <div className={style.editButtons}>
      <div onClick={openEditModal}><Image src="/edit_50dp_5F6368_FILL0_wght400_GRAD0_opsz48.png" alt='image' width={30} height={30} style={{objectFit: "contain"}}/></div>
      <div onClick={deleteUser}><Image src="/delete_50dp_5F6368_FILL0_wght400_GRAD0_opsz48.png" alt='image' width={30} height={30} style={{objectFit: "contain"}}/></div>
    </div>
    <UserEditModal user={props.user} show={modalShow} close={closeEditModal}/>
    </Link>
  )
}

export default User