import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineMail } from 'react-icons/ai'
import { VscMention } from 'react-icons/vsc'
import { useRouter } from 'next/router'


const ForgotPass = () => {
    return (
        <div className='bg-[#f4f4f4] font-poppins h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
            <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                {/* Sign in */}
                <div className='w-3/5 p-5'>
                    <div className='text-left font-bold font-poppins tracking-[7px] uppercase'>
                        Ethercast
                    </div>
                    <div className='py-10'>
                        <h2 className='text-3xl font-poppins mb-2 text-cyan-800'>Forgot Password</h2>
                        <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
                        
                            <form className='flex flex-col items-center' method='POST' action='/api/forgot' >
                            <br />
                            <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                                <AiOutlineMail className='text-gray-400 m-2' />
                                <input  className='bg-gray-100 flex-1 outline-none' type="password" name='password' placeholder='Password' required
                            //     value={password}
                            //      onChange={(e) => setUsername(e.target.value)} 
                            />
                            </div>
                            <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                                <VscMention className='text-gray-400 m-2' />
                                <input  className='bg-gray-100 flex-1 outline-none' type="cpassword" name='cpassword' placeholder='Confirm Password' required
                            //      value={cpassword}
                            //      onChange={(e) => setUsername(e.target.value)} 
                            />
                            </div>
                            
                            <div className='flex flex-col items-center w-64 mb-5'>
                                <button   type='submit' className='border-2 border-cyan-800 mb-4 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'>
                                   Continue
                                </button>
                                {/* {data && <div>{JSON.stringify(data)}</div>} */}
                                {/* {error && <div>{error}</div>} */}
                                <br />

                                <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
                                <Link href='/Login' className='font-poppins hover:text-cyan-800'>
                                    - Already have an account? Sign In! -
                                </Link>
                            </div>
                           
                            </form>
                        <form className='flex flex-col items-center' method='POST' action='/api/forgot' >
                            
                            <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                                <AiOutlineMail className='text-gray-400 m-2' />
                                <input className='bg-gray-100 flex-1 outline-none' type="email" name='email' placeholder='Email' required
                              />
                            </div>
                            <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                                <VscMention  className='text-gray-400 m-2' />
                                <input className='bg-gray-100 flex-1 outline-none' type="username" name='username' placeholder='Username' required
                             />
                            </div>
                            
                            <div className='flex flex-col items-center w-64 mb-5'>
                                <button /*onClick={sendResetEmail}*/ type='submit' className='border-2 border-cyan-800 mb-4 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'>
                                    Reset Password
                                </button>
                                
                                <br />
                                <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
                                <Link href='/Login' className='font-poppins hover:text-cyan-800'>
                                    - Already have an account? Sign In! -
                                </Link>
                            </div>
                            </form>
                    </div>
                </div>
    
                {/* Voter Application */}
                <div className='w-2/5 px-12 py-36 bg-cyan-800 text-white rounded-r-2xl'>
                    {/* <h2 className='text-3xl font-poppins mb-2'>Apply as a Voter</h2>
                    <div className='border-2 w-10 border-white inline-block mb-2'></div>
                    <p className='mb-10'>Fill up personal information to apply as a voter.</p>
                    <Link href="#Application" className='border-2 border-white rounded-full px-12 py-2 font-semibold inline-block hover:bg-white hover:text-cyan-800'>
                        Apply
                    </Link> */}
                </div>
            </div>
        </div>
      )
}

export default ForgotPass