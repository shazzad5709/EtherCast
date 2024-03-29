import Link from 'next/link'
import React from 'react'

type Props = {}

export default function applySuccess({}: Props) {
  return (
    <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
      <h1 className="text-2xl">Success! </h1>
      <div className='border-l-2 h-10 border-slate-800 inline-block'></div>
      <h2 className="text-xl">Password Saved Successfully.</h2>      
      <div className='border-l-2 h-10 border-black inline-block'></div>
      <Link href="/Login" className='border-2 border-black tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-black hover:text-white hover:font-normal'>
        Sign In
      </Link>
    </div>
  )
}