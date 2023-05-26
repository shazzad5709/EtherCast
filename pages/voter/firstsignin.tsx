import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Secret } from '@prisma/client'
type Props = {}

export default function Firstsignin({ }: Props) {
  const [options, setOptions] = useState<Secret[]>([])
  const [selectedOption, setSelectedOption] = useState<Secret>();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if(password.length < 5) {
      toast.error('Password must be at least 5 characters long');
      return;
    }

    const option = options.find((item) => item.secret === selectedOption?.secret)

    const res = await axios.post('/api/data/voter/activeStatus', {
      password,
      optionId: option?.id,
      })
      .then(async (res) => {
        toast.success('Voter account created successfully');
        await router.push('/voter');
      })
      .catch((err) => {
        toast.error('Error creating voter account');
      });
    }

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response = await axios.get('/api/data/voter/secret');
      setOptions(response.data.secret);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
    // console.log(selectedOption?.id)
  };

  return (
    <div className='bg-gray-100 h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-lg font-bold leading-tight tracking-tight md:text-2xl'>
              Set up new voter account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='newpassword'
                  className='block mb-2 text-md font-medium text-gray-900'
                >
                  New Password
                </label>
                <input
                  type='password'
                  name='newpassword'
                  id='newpassword'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='confirmpassword'
                  className='block mb-2 text-md font-medium text-gray-900'
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='secret'
                  className='block mb-2 text-md font-medium text-gray-900'
                >
                  Choose a secret
                </label>
                <select
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  name="select"
                  id="select"
                  required
                  value={selectedOption?.secret} onChange={handleOptionChange}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {options.map((option, index) => (
                    <option className='' key={index} value={option.secret}>{option.secret}</option>
                  ))}
                </select>
              </div>
              <div className='py-2'>
                <button
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
  )
}