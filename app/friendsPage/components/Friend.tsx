import { DocumentData } from 'firebase/firestore'
import React from 'react'

type Props = {
    user: DocumentData
}

const Friend = (props: Props) => {
  return (
    <div>
        {props.user.name}
    </div>
  )
}

export default Friend