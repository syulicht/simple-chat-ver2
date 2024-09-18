"use client"
import React, { useEffect, useState } from 'react';
import {db} from "../../lib/firebase/firebase";
import { collection, onSnapshot } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore/lite';

import User from './components/User';
import UserAddModal from './components/UserAddModal';
import style from './css/page.module.css'
import Sidebar from './components/Sidebar';


function Page() {
  const [users, setUsers] = useState<DocumentData[]>([]);
  const[userIds, setUserIds] = useState<string[]>([]);

  const [modalShow, setModalShow] = useState(false);

  const openUserAddModal = () => {
    setModalShow(true);
  }
  
  const closeUserAddModal = () => {
    setModalShow(false);
  }

  useEffect(()=>{
    onSnapshot(collection(db, "users"), (users) => {
      setUsers(users.docs.map(user => user.data()).sort((a : DocumentData, b : DocumentData) => a.id - b.id));
      setUserIds(users.docs.map(user => user.id));
    })}, []);
  return (
    <div className={style.main}>
      <Sidebar />
      <div className={style.content}>
      <div className={style.usersList}>
      {users.map((u, index) => !u.delete && (<User key={u.id} user={u} id={userIds[index]}/>))}
      </div>
      <button className={style.addButton} onClick={openUserAddModal}>追加</button>
      </div>
    <UserAddModal close={closeUserAddModal} show={modalShow}/>
    </div>
  )
}

export default Page;