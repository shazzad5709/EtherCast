import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import Unauthorized from '../../../components/PageComponents/Unauthorized'
import Unauthenticated from '../../../components/PageComponents/Unauthenticated'

type Props = {}

const Moderator = (props: Props) => {
  const { data: session, status } = useSession()
  const user = session?.user

  if (status === "authenticated") {
    const data = JSON.stringify(user)
    let parsedMap = JSON.parse(data)
    if(parsedMap._doc.usertype === 'admin') {
      return (
        <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
          <h1 className="text-3xl">Regulator</h1>
          <div className='border-l-2 h-10 border-slate-800 inline-block'></div>
          <h2 className="text-2xl">😴😴😴</h2>      
        </div>
      )
    }
    return (
      <Unauthorized path={`${parsedMap._doc.usertype}`} />
    )    
  }
  return (
    <Unauthenticated />
  )
}

export default Moderator