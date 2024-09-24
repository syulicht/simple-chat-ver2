import { collection, doc, DocumentData, getDocs, query, setDoc, where } from 'firebase/firestore';
import {db, storage} from "../../../lib/firebase/firebase";
import '../../globals.css';
import style from '../css/page.module.css';
import React, { FormEvent, useEffect, useState } from 'react'
import UserEditModal from './UserEditModal';
import Image from 'next/image';
import { getDownloadURL, ref, StorageReference } from 'firebase/storage';
import { useRouter } from 'next/navigation';

type UserProps = {
  user: DocumentData,
  id: string
}

function User(props: UserProps) {
  const [url, setUrl] = useState("");
  const router = useRouter();
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
    
  const deleteUser = async (e : FormEvent<HTMLElement>) => {
    e.stopPropagation();
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

  const openEditModal = (e : FormEvent<HTMLElement>) => {
    e.stopPropagation();
    setModalShow(true);
  }
  
  const closeEditModal = () => {
    setModalShow(false);
  }

  const link = () => {
    router.push(`/chatSpace?keyword=${props.id}`)
  }
  return (
    <>
    <div onClick={link} className={style.user}>
    <div><Image className={style.icon} src={`${url}`} alt={"image"} width={100} height={100} style={{objectFit: "cover"}}/></div>
    <div className={style.userContents}>
      <div className={style.name}>{props.user.name}</div>
      <div className={style.quote}>{props.user.quote}</div>
    </div>
    <div className={style.editButtons}>
      <div onClick={(e) => openEditModal(e)}><Image src="/edit_50dp_5F6368_FILL0_wght400_GRAD0_opsz48.png" alt='image' width={30} height={30} style={{objectFit: "contain"}}/></div>
      <div onClick={(e) => deleteUser(e)}><Image src="/delete_50dp_5F6368_FILL0_wght400_GRAD0_opsz48.png" alt='image' width={30} height={30} style={{objectFit: "contain"}}/></div>
    </div>
    </div>
    <UserEditModal user={props.user} show={modalShow} close={closeEditModal}/>
    </>

  )
}

export default User