import Image from 'next/image'
import React from 'react'
import style from '../css/page.module.css'


const Sidebar = () => {
  return (
    <aside className={style.sidebar}>
        <div className={style.logo}>
            <Image src="/what is the matter.png" alt='' width={300} height={150} style={{objectFit: "cover"}}/>
        </div>
    </aside>
  )
}

export default Sidebar