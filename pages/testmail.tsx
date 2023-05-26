import axios from 'axios';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import React, { useState } from 'react'

type Props = {}

export default function Testmail({ }: Props) {
  const { data: session, status } = useSession()
  // const { activeStatus, setActiveStatus } = useState()

  const sendmail = async (e: any) => {
    e.preventDefault()
    if (status === 'authenticated') {
      if (session?.user?.role === 'VOTER') {
        const res = await axios.get('./api/data/voter/secret')
        console.log(res.data.secret[0].secret)
        console.log(res.data.secret.status)
        // // setActiveStatus(res.data.msg)
        // console.log(res.data.msg)
        // if ((res.data.msg) === false)
        //   console.log('false')
        //   await router.push('/signin/firstsignin')
      }
    }
  }

  return (
    <div className="bg-black h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
      <button onClick={sendmail} className='border-2 border-[#c4b5fd] text-[#c4b5fd] tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:text-[#c4b5fd]'>
        Secret
      </button>
    </div>
  )
}