import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Unauthenticated({}: Props) {
  return (
    <div className="bg-g h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
      <h1 className="text-3xl">401</h1>
      <div className='border-l-2 h-10 border-black inline-block'></div>
      <h2 className="text-xl">Please Sign In</h2>
      <div className='border-l-2 h-10 border-black inline-block'></div>
      <Link href="/signin" className='border-2 border-black tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-black hover:text-white hover:font-normal'>
        Sign In
      </Link>
    </div>
  )
}