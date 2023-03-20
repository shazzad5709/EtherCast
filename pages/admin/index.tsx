'use Client'

import React from "react"
import { BiUserPlus } from "react-icons/bi"
import Navbar from "../../components/navbar"
import Table from "../../components/table"
import Form from "../../components/Form"
import { useSession } from "next-auth/react"
import Link from "next/link"
type Props = {};

const Admin = (props: Props) => {
  const { data: session, status } = useSession()
  const user = session?.user

  if (status === "authenticated") {
    const data = JSON.stringify(user)
    let parsedMap = JSON.parse(data)
    if(parsedMap._doc.usertype === 'admin') {
      return (
        <>
          <div>
            <div className="dark:bg-zinc-800 [&>*]:leading-[1.6]">
              <Navbar />
              <div
                className="min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-60"
                id="content"
              >
                <div className="py-12 text-center">
                  <div
                    className="min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-24"
                    id="content"
                  >
                    <div className="container mx-auto flex justify-between py-5 border-b">
                      <div className="left flex gap-3">
                        <div className="flex mb-2 mx-4 my-10 justify-start items-center gap-4 pl-5 hover:bg-cyan-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                          <BiUserPlus className="text-2xl text-gray-600 group-hover:text-white " />
                          <button className="text-base text-gray-800 group-hover:text-white font-semibold ">
                            Add Election Officers
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="container mx-auto py-5">
                      <Form />
                    </div>
                    <br />
                    <div className="container mx-auto">
                      <Table />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
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

export default Admin