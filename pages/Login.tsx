import Link from 'next/link'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import { MdLockOutline } from 'react-icons/md'

type Props = {}

function Login({}: Props) {
  return (
    <div className='bg-[#f4f4f4] font-poppins h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
            {/* Sign in */}
            <div className='w-3/5 p-5'>
                <div className='text-left font-bold font-poppins tracking-[7px] uppercase'>
                    <Link href='/'>Ethercast</Link>
                </div>
                <div className='py-10'>
                    <h2 className='text-3xl font-poppins mb-2 text-cyan-800'>Sign In</h2>
                    <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
                    <form className='flex flex-col items-center'>
                        <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                            <BiUser className='text-gray-400 m-2' />
                            <input className='bg-gray-100 flex-1 outline-none' type="text" name='username' placeholder='username'/>
                        </div>
                        <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                            <MdLockOutline className='text-gray-400 m-2' />
                            <input className='bg-gray-100 flex-1 outline-none' type="password" name='password' placeholder='password'/>
                        </div>
                        <div className='flex flex-col items-center w-64 mb-5'>
                            <button type='submit' className='border-2 border-cyan-800 tracking-[2px] mb-4 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'>
                                Sign In
                            </button>
                            <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
                            <Link href='/ForgotPass' className='font-poppins hover:text-cyan-800'>
                                - Forgot Password? -
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Voter Application */}
            <div className='w-2/5 px-12 py-36 bg-cyan-800 text-white rounded-r-2xl'>
                <h2 className='text-3xl font-poppins mb-2'>Apply as a Voter</h2>
                <div className='border-2 w-10 border-white inline-block mb-2'></div>
                <p className='mb-10'>Fill up personal information to apply as a voter.</p>
                <Link href="/application" className='border-2 border-white tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-white hover:text-cyan-800'>
                    Apply
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login