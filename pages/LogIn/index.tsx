import Link from 'next/link'
import React from 'react'
import { BiUser } from 'react-icons/bi'
import { MdLockOutline } from 'react-icons/md'
import { useRouter } from 'next/router';
import { useState } from 'react';

type Props = {}
const validAdmin = {
    username: "admin",
    password: "123",
    // code: 1245
  };
  
function Login({}: Props) {
    const [username, setUsername] = useState<any>();
  const [password, setPassword] = useState<any>();
//   const [code, setCode] = useState<number>();
  const [error, setError] = useState<any>();
  const router = useRouter();

  const handleLogin = (event:any) => {
    event.preventDefault();
    if (username === validAdmin.username && password === validAdmin.password ) {
      // Navigate to admin dashboard
      router.push("/Dashboard");
      
    } else {
      setError(
        <div>
          <div className="bg-blue-100 border text-center border-blue-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <strong className="font-bold text-center">Invalid Credentials !!!</strong>
            
          </div>
        </div>
      );
    }
  };

  return (
    <div className='bg-[#f4f4f4] font-poppins h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
            {/* Sign in */}
            <div className='w-3/5 p-5'>
                <div className='text-left font-bold tracking-[7px] uppercase hover:text-cyan-800'>
                    <Link href='/'>Ethercast</Link>
                </div>
                <div className='py-10'>
                    <h2 className='text-3xl mb-2 text-cyan-800'>Sign In</h2>
                    <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
                    <form className='flex flex-col items-center' method='POST' action='/api/login' onSubmit={handleLogin}>
                        <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                            <BiUser className='text-gray-400 m-2' />
                            <input className='bg-gray-100 flex-1 outline-none' type="text" name='username' placeholder='username'
                             value={username}
                             onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                            <MdLockOutline className='text-gray-400 m-2' />
                            <input className='bg-gray-100 flex-1 outline-none' type="password" name='password' placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <div className='flex flex-col items-center w-64 mb-5'>
                            <button type='submit' className='border-2 border-cyan-800 tracking-[2px] mb-4 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'>
                                Sign In
                            </button>
                            {error && <div>{error}</div>}
                            <br />
                            <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
                            {/* <Link href='/ForgotPass' className='font-poppins hover:text-cyan-800' /> */}
                            <Link href='/LogIn/ForgotPass' className='hover:text-cyan-800'>
                                - Forgot Password? -
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Voter Application */}
            <div className='w-2/5 px-12 py-36 bg-cyan-800 text-white rounded-r-2xl'>
                <h2 className='text-3xl mb-2'>Apply as a Voter</h2>
                <div className='border-2 w-10 border-white inline-block mb-2'></div>
                <p className='mb-10'>Fill up personal information to apply as a voter.</p>
                <Link href="/VoterApply" className='border-2 border-white tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-white hover:text-cyan-800'>
                    Apply
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Login