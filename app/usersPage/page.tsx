"use client"
import React, { useEffect, useState } from 'react';
import {db} from "../../lib/firebase/firebase";
import { collection, onSnapshot } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore/lite';
import '../globals.css';

import User from './components/User';
import UserAddModal from './components/UserAddModal';
import style from './css/page.module.css'
import Sidebar from './components/Sidebar';


function Page() {
  const [users, setUsers] = useState<{data: DocumentData, id: string}[]>([]);

  const [modalShow, setModalShow] = useState(false);

  const openUserAddModal = () => {
    setModalShow(true);
  }
  
  const closeUserAddModal = () => {
    setModalShow(false);
  }

  useEffect(()=>{
    onSnapshot(collection(db, "users"), (users) => {
      setUsers(users.docs.map(user => {return {data: user.data(), id: user.id}}).sort((a : DocumentData, b : DocumentData) => a.id - b.id));
    })}, []);
  return (
    <div className='main'>
      <Sidebar friendIds={[]} users={users.map(user => user.data)}/>
      <div className={style.content}>
      <div className={style.usersList}>
      {users.map((u) => !u.data.delete && (<User key={u.id} user={u.data} id={u.id}/>))}
      </div>
      <button className={style.addButton} onClick={openUserAddModal}>追加</button>
      </div>
    <UserAddModal close={closeUserAddModal} show={modalShow}/>
    </div>
  )
}

export default Page;