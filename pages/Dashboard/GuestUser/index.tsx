import React, { FormEvent } from 'react';
import { BiLogOutCircle, BiUser } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { MdLockOutline, MdNotificationsActive } from 'react-icons/md';
import Link from 'next/link';



const GuestUser = () => {

    function handleResult(event: FormEvent<HTMLFormElement>): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className='bg-[#f4f4f4] font-poppins h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
           
            <div className='w-3/5 p-5'>
                <div className='text-left font-bold tracking-[7px] uppercase hover:text-cyan-800'>
                    <Link href='/'>Ethercast</Link>
                </div>
                <div className='py-10'>
                    <h2 className='pt-12 text-3xl mb-2 text-cyan-800'>Election Result</h2>
                    <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
                    <form className='flex flex-col items-center' onSubmit={handleResult}>
                        
                        <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                            <MdLockOutline className='text-gray-400 m-2' />
                            <input className='bg-gray-100 flex-1 outline-none' type="number" name='electioncode' placeholder='Election Code' required/>
                        </div>
                        <div className='flex flex-col items-center w-64 mb-5'>
                            <button type='submit' className='border-2 border-cyan-800 tracking-[2px] mb-4 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'>
                               Result
                            </button>
                           
                        </div>
                    </form>
                </div>
            </div>

            {/* Voter Application */}
            <div className='w-2/5 px-12 py-36 bg-cyan-800 text-white rounded-r-2xl'>
                <h2 className='text-3xl mb-2'>Want to know the Result?</h2>
                <div className='border-2 w-10 border-white inline-block mb-2'></div>
                <p className='mb-10'>Fill up required election information to see.</p>
                
            </div>
        </div>
    </div>
  );
};

export default GuestUser;
