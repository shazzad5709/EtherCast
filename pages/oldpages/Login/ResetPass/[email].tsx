import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { MdLockOutline } from 'react-icons/md'
import useResetPass from './useResetPass';


type Props = {}

export default function ResetPass({}: Props) {
  const [password, setPassword] = useState<any>();
  const [confirmPassword, setConfirmPassword] = useState<any>();
  const [error, setError] = useState<any>();
  const [otpinput, setOtpinput] = useState<any>();

  const router = useRouter()
  const email = router.query.email

  const savePass = async () => {
    if(password != confirmPassword) {
      setError(
        <div>
          <div className="bg-blue-100 border text-center border-blue-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <strong className="text-center">Password does not match</strong>
          </div>
        </div>
      )
    } else {
      const res = await axios.put(
        '/api/resetPass',
        {
          email: email,
          password: password
        }
      ).then(
         () => {
          router.push('/Login/ResetPass/resetSuccess')
        }
      ).catch(err => 
        setError(
          <div>
            <div className="bg-blue-100 border text-center border-blue-400 text-red-700 px-4 py-2 rounded relative" role="alert">
              <strong className="font-bold text-center">{err}</strong>
            </div>
          </div>
        )
      )
    } 
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    savePass()
  }

  const OTPSubmit = async (e: any) => {
    e.preventDefault()
    const res = await axios.post(
      '/api/verifyOTP',
      {
        email: email,
        otp: otpinput
      }
    ).then(
      () => {
        next()
      }
    ).catch(err =>
      alert('Enter correct OTP')
      // setError(
      //   <div>
      //     <div className="bg-blue-100 border text-center border-blue-400 text-red-700 px-4 py-2 rounded relative" role="alert">
      //       <strong className="font-bold text-center">{err}</strong>
      //     </div>
      //   </div>
      // )
    )
  }

  const {
    steps, currentStepIdx, step, next
  } = useResetPass([
    <>
      <div className='bg-[#f4f4f4] font-poppins h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex max-w-4xl'>
          <div className='p-5'>
            <div className='py-10 px-10'>
              <h2 className='text-3xl font-poppins mb-2 text-cyan-800'>
                  Enter OTP
              </h2>
              <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
              <p className='text-lg pb-5'></p>
              <form onSubmit={OTPSubmit} className='flex flex-col items-center'>
                <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                  <MdLockOutline className='text-gray-400 m-2' />
                  <input
                      className='bg-gray-100 flex-1 outline-none'
                      type='text'
                      name='OTP'
                      placeholder='New OTP'
                      required
                      value={otpinput}
                      onChange={(e) => setOtpinput(e.target.value)}
                  />
                </div>
                <div className='flex flex-col items-center w-64 mb-5'>
                  <button
                      type='submit'
                      className='border-2 border-cyan-800 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'
                  >
                      Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
    ,
    <>
      <div className='bg-[#f4f4f4] font-poppins h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
        <div className='bg-white rounded-2xl shadow-2xl flex max-w-4xl'>
          <div className='p-5'>
            <div className='py-10 px-10'>
              <h2 className='text-3xl font-poppins mb-2 text-cyan-800'>
                  Set New Password
              </h2>
              <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
              <p className='text-lg pb-5'></p>
              <form onSubmit={onSubmit} className='flex flex-col items-center'>
                <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                  <MdLockOutline className='text-gray-400 m-2' />
                  <input
                      className='bg-gray-100 flex-1 outline-none'
                      type='password'
                      name='newpassword'
                      placeholder='New Password'
                      required
                      defaultValue={''}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                  <MdLockOutline className='text-gray-400 m-2' />
                  <input
                      className='bg-gray-100 flex-1 outline-none'
                      type='password'
                      name='confirmpassword'
                      placeholder='Confirm Password'
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className='flex flex-col items-center w-64 mb-5'>
                  <button
                      type='submit'
                      className='border-2 border-cyan-800 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'
                  >
                      Save Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ])

  return (
    <>
      {step}
    </>
    
  )
}