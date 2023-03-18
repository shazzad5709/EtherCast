import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Candidate = (props: Props) => {
  const { data: session, status } = useSession()
  const user = session?.user

  if (status === "authenticated") {
    const data = JSON.stringify(user)
    let parsedMap = JSON.parse(data)
    if(parsedMap._doc.usertype === 'admin') {
      return (
        <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
          <h1 className="text-3xl">Candidate</h1>
          <div className='border-l-2 h-10 border-slate-800 inline-block'></div>
          <h2 className="text-2xl">🔪🔪🔪</h2>      
        </div>
      )
    }
    return (
      <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-4">
        <h1 className="text-3xl">403</h1>
        <div className='border-l-2 h-10 border-black inline-block'></div>
        <h2 className="text-xl">You do not have access to this page.</h2>
        <div className='border-l-2 h-10 border-black inline-block'></div>
        <Link href={`${parsedMap._doc.usertype}`} className='border-2 border-black tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-black hover:text-white hover:font-normal'>
          Home
        </Link>
      </div>
    )    
  }
  return (
    <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
      <h1 className="text-3xl">403</h1>
      <div className='border-l-2 h-10 border-slate-800 inline-block'></div>
      <h2 className="text-xl">Please Sign In.</h2>
      <div className='border-l-2 h-10 border-black inline-block'></div>
      <Link href="/Login" className='border-2 border-black tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-black hover:text-white hover:font-normal'>
        Sign In
      </Link>
    </div>
  )
}

export default Candidate