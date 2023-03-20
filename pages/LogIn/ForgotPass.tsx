import React, { FormEvent, useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import router from 'next/router';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { error } from 'console';

const ForgotPass = () => {
  const [email, setEmail] = useState('')
  const [err, setError] = useState<any>();

  const { data: session, status } = useSession()

  const user = session?.user
  if(status === "authenticated") {
    const data = JSON.stringify(user)
    let parsedMap = JSON.parse(data)
    
    router.push(`${parsedMap._doc.usertype}`)
  }

  const redirectToReset = async (msg: string) => {
    await axios.put("/api/saveOTP", {
      email: email,
      otp: msg
    }, {
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      }
    }).then(() => {
      router.push(`/Login/ResetPass/${email}`)
    }).catch(err => 
      setError(
        <div>
          <div className="bg-blue-100 border text-center border-blue-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <strong className="font-bold text-center">{err}</strong>
          </div>
        </div>
      )
    )
  }

  const sendMail = async () => {
      await axios.post("/api/mailservice", 
      {
          email: email,
          subject: 'Reset Password'
      },
      {
          headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          }
      }).then((msg) => {
        return redirectToReset(msg.data);
      }).catch(err => 
        alert(err)
          // setError(
          //   <div>
          //     <div className="bg-blue-100 border text-center border-blue-400 text-red-700 px-4 py-2 rounded relative" role="alert">
          //       <strong className="font-bold text-center">{err}</strong>
          //     </div>
          //   </div>
          // )
      )
  }

  const verifyEmail = async () => {
      await axios.post("/api/findUser", {
        email: email,
      },
      ).then(() => {
        sendMail()
      }).catch(err => 
        alert("User not found")
        // setError(
        //   <div>
        //     <div className="bg-blue-100 border text-center border-blue-400 text-red-700 px-4 py-2 rounded relative" role="alert">
        //       <strong className="font-bold text-center">{err}</strong>
        //     </div>
        //   </div>
        // )
      )
    }


  function onSubmit(e: FormEvent) {
    e.preventDefault()
      
    verifyEmail()
  }

  return (
    <div className='bg-[#f4f4f4] font-poppins h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
      <div className='bg-white rounded-2xl shadow-2xl flex max-w-4xl'>
        <div className='p-5'>
          <div className='py-10 px-10'>
            <h2 className='text-3xl font-poppins mb-2 text-cyan-800'>
              Account Recovery
            </h2>
            <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
            <p className='text-lg pb-5'>Enter your email.</p>
            <form onSubmit={onSubmit} className='flex flex-col items-center'>
              <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
                <AiOutlineMail className='text-gray-400 m-2' />
                <input
                  className='bg-gray-100 flex-1 outline-none'
                  type='email'
                  name='email'
                  placeholder='Email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {err && <>{err}</>}
              <div className='flex flex-col items-center w-64 mb-5'>
                <button
                  type='submit'
                  className='border-2 border-cyan-800 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;


