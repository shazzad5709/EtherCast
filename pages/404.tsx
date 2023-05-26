import React from 'react'

type Props = {}

function Custom404({}: Props) {
  return (
    <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
      <h1 className="text-3xl">404</h1>
      <div className='border-l-2 h-10 border-black inline-block'></div>
      <h2 className="text-xl">Page not found</h2>      
    </div>
  )
}

export default Custom404