import React from 'react'

type Props = {}

function Success({}: Props) {
  return (
    <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
      <h1 className="text-3xl">YAY</h1>
      <div className='border-l-2 h-10 border-slate-800 inline-block'></div>
      <h2 className="text-xl">Mail sent successfully!</h2>      
    </div>
  )
}

export default Success