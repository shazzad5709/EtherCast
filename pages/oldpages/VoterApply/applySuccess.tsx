import React from 'react'

type Props = {}

export default function applySuccess({}: Props) {
  return (
    <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
      <h1 className="text-2xl">Success! </h1>
      <div className='border-l-2 h-10 border-slate-800 inline-block'></div>
      <h2 className="text-xl">Application sent for approval.</h2>      
    </div>
  )
}