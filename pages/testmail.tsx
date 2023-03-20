import axios from 'axios';
import router from 'next/router';
import React from 'react'

type Props = {}

export default function Testmail({}: Props) {
  const fetchData = async (e: any) => {
    e.preventDefault()
    await axios.get('/api/data/6414ad7fec8bbdada0772fa4')
    .then(res => {
      const data = JSON.stringify(res.data)
      let parsedMap = JSON.parse(data)
      console.log(parsedMap.email)
    })
    .catch(err => {
      console.log(err)
    })
  }

  
  const sendmail = async (e: any) => {
    e.preventDefault()
    await axios.post("/api/mailservice", {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: {
        name: 'mailName',
        email: 'mailAddress',
        text: 'mailText',
      },
    }).then(() => {
      router.push('/success')
      
    })
  }

  return (
    <div className="bg-[#f4f4f4] h-screen flex items-center justify-center w-full flex-1 px-20 text-center space-x-6">
      <h1 className="text-3xl">Mail</h1>
      <div className='border-l-2 h-10 border-slate-800 inline-block'></div>
      <h2 className="text-xl">Wanna send?👉👈</h2>
      <div className='border-l-2 h-10 border-black inline-block'></div>
      <button onClick={fetchData} className='border-2 border-black tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-black hover:text-white hover:font-normal'>
        Send
      </button>
    </div>
  )
}