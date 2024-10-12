"use client"
import { storage } from '@/lib/firebase/firebase'
import { DocumentData } from 'firebase/firestore'
import { getDownloadURL, ref, StorageReference } from 'firebase/storage'
import Image from 'next/image'
import styles from "../css/page.module.css"
import React, { useEffect, useState } from 'react'

type Props = {
    user: DocumentData | null
}

const Header = (props: Props) => {
    const [url, setUrl] = useState("");
    useEffect(() =>{
        if(props.user){
            const getImageUrl = async (imageRef: StorageReference) => {
                try {
                  const url = await getDownloadURL(imageRef);
                  setUrl(url);
                } catch (e) {
                  const url = await getDownloadURL(ref(storage, `images/${"Frame 15.png"}`));
                  setUrl(url);
                }
              };
          
              const imageRef = ref(storage, `images/${props.user.property.id}`);
              getImageUrl(imageRef);
        }
        }, [props.user]);
  
  return (
    <div className={styles.header}>
    <div>
        <Image src={`${url}`} width={50} height={50} alt={""} style={{objectFit: "cover"}}/>
    </div>
    <div>
        {props.user?.property.name}
    </div>
    </div>
  )
}

export default Header