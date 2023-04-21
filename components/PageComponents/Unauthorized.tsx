import Link from 'next/link'
import React from 'react'

type Props = {
  path: string
}

export default function Unauthorized({ path }: Props) {
  return (
    <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-4">
      <h1 className="text-3xl">403</h1>
      <div className='border-l-2 h-10 border-black inline-block'></div>
      <h2 className="text-xl">You do not have access to this page.</h2>
      <div className='border-l-2 h-10 border-black inline-block'></div>
      <Link href={path} className='border-2 border-black tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-black hover:text-white hover:font-normal'>
        Home
      </Link>
    </div>
  )
}