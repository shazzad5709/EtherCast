import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {}

export default function SignUp({}: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const router = useRouter();
  const [role, setRole] = useState('')
  const {data: session, status: loading} = useSession()

  useEffect(() => {
    if(session) {
      setRole((session?.user?.role).toLowerCase())
      router.push(`/${role}`)
    }
  }, [session, loading])
  

  const redirectToSuccess = async() => {
    const res: any =
      await signIn('credentials', {
        redirect: false,
        email: email,
        password: password,
        callbackUrl: `${window.location.origin}`
      })

    console.log(res);
    
    router.push(`${session?.user?.role}`)
  }

  const signupUser = async () => {
    if(password !== confirmpassword) {
      toast.error('Password does not match')
    }

    if (password.length < 5) {
      toast.error("Password too short");
    }

    const res = await axios.post(
      '/api/SignUp',
      {
        name,
        email,
        password
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then(
      () => {
        redirectToSuccess()
      }
    ).catch(error =>
        toast.error(error)
      )
  }

  const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signupUser()
  }

  
  return (
    <div className='bg-gray-100 h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <Link
            href='/'
            className='flex justify-center pt-6 items-center text-2xl font-semibold'
          >
            EtherCast
          </Link>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-xl'>
              Create your EtherCast account
            </h1>
            <form className='space-y-4 md:space-y-6' method='POST' onSubmit={handleSignUp}>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* <div>
                <label
                  htmlFor='username'
                  className='block mb-2 text-sm font-medium'
                >
                  Username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Username'
                  required
                />
              </div> */}
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium'
                >
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='username@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirmpassword'
                  id='confirmpassword'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                  value={confirmpassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Sign up
              </button>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-light'>
                  Already have an account?{' '}
                  <Link
                    href='#'
                    className='font-semibold text-primary-600 hover:underline'
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}