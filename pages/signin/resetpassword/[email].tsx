import Link from 'next/link'
import React, { FormEvent, useCallback, useState } from 'react'
import useResetPass from '../../../hooks/useResetPass'
import { is } from 'date-fns/locale'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import Timer from '../../../components/Utilities/Timer'
import { set } from 'mongoose'

type Props = {}

export default function ResetPassword({}: Props) {

  const router = useRouter();
  const email = router.query.email as string;

  const [otp, setOtp] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOTPValid, setIsOTPValid] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleProceed = async (e: FormEvent) => {
    e.preventDefault();
    // sendOTP(email);
    try {
      const response = await axios.post('/api/otp/checkOTP', {
        otp,
        email,
      });
      console.log("OTP checking")
      if (response.status === 200) {
        setIsOTPValid(true);
        toast.success('OTP verified successfully');
        next();
        // router.push(`/signin/resetpassword/${email}`);
      } else {
        setIsOTPValid(false);
      }
    } catch (error) {
      console.error('Error checking OTP:', error);
      // Handle error case
    }
  };
  
  const resendOTP = async (e:FormEvent) => {
    setClicked(true);
    e.preventDefault();
    try {
      const response = await axios.post('/api/otp/resendOTP', {
        email,
      });
      if (response.status === 200) {
        toast.success('OTP sent successfully');
        // Handle success case (e.g., redirect the user to a success page)
      } else {
        toast.error('Failed to send OTP');
        // Handle error case (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      // Handle error case (e.g., show an error message to the user)
    }
  };



  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
  
    if (newpassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.put('/api/users/updatePassword', {
        email,
        password: newpassword,
      });
  
      if (response.status === 200) {
        toast.success('Password updated successfully');
        // Handle success case (e.g., redirect the user to a success page)
        router.push('http://localhost:3000/signin');
      } else {
        toast.error('Failed to update password');
        // Handle error case (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error updating password:', error);
      // Handle error case (e.g., show an error message to the user)
    }
  };
  

  const {
    steps, currentStepIdx, step, next
  } = useResetPass([
    <div className='bg-gray-100 h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0'>
          <Link
            href='/'
            className='flex justify-center pt-6 items-center text-2xl font-semibold'
          >
            EtherCast
          </Link>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
              Account Recovery
            </h1>
            <form className='space-y-4 md:space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium'
                >
                  Enter OTP
                </label>
                <input
                  type='number'
                  name='otp'
                  id='otp'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='123456'
                  required
                />
              </div>
              <div className='py-2'>
                <button
                  onClick={handleProceed}
                  type='submit'
                  className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  Proceed
                </button>
                <div className='flex mt-4 items-center justify-between'>
                  <p className='text-sm font-light'>
                    Didn't receive the code?{' '}
                    <Link
                      href='#'
                      className='font-semibold text-primary-600 hover:underline'
                      onClick={resendOTP}
                    >
                      
                      Resend code
                    </Link>
                    {/* <Timer /> */}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    ,
    <div className='bg-gray-100 h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0'>
          <Link
            href='/'
            className='flex justify-center pt-6 items-center text-2xl font-semibold'
          >
            EtherCast
          </Link>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
              Password Reset
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
            <div>
                <label
                  htmlFor='newpassword'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  New Password
                </label>
                <input
                  type='password'
                  name='newpassword'
                  id='newpassword'
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='confirmpassword'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirmpassword'
                  id='confirmpassword'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <div className='py-2'>
                <button
                  onClick={handleReset}
                  type='submit'
                  className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  Set New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ])
    

  return (
    <>
      {step}
    </>
  )
}

