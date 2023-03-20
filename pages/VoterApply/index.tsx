import React, { FormEvent } from 'react'
import Link from 'next/link'
import { MdKeyboardBackspace } from 'react-icons/md'
import { useState } from 'react'
import OrgInfoForm from '../../components/OrgInfoForm'
import useMultiStepForm from './useMultiStepForm'
import AccountInfoForm from '../../components/AccountInfoForm'

type Props = {}

type FormData = {
  name: string
  username: string
  email: string
  password: string
  confirmPassword: string
  orgName: string
  elCode: string
  emId: string
}

const INITIAL_DATA: FormData = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  orgName: '',
  elCode: '',
  emId: '',

}

function Application({}: Props) {
  const [data, setData] = useState(INITIAL_DATA)

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  } 

  const {
    steps, currentStepIdx, step, back, next
  } = useMultiStepForm([<OrgInfoForm {...data}  updateFields={updateFields} />,
                        <AccountInfoForm  {...data}  updateFields={updateFields} />])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if(currentStepIdx != steps.length - 1)
      return next()
    alert("funny sign up done")
  }

  return (
    <div className='bg-[#f4f4f4] font-poppins h-screen flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
      <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
        {/* Application */}
        <div className='w-3/5 p-5'>
          <div className='text-left font-bold tracking-[7px] uppercase hover:text-cyan-800'>
            <Link href='/'>Ethercast</Link>
          </div>
          <div className='py-10'>
            <h2 className='text-3xl mb-2 text-cyan-800'>Apply as a Voter</h2>
            <div className='border-2 w-10 border-cyan-800 inline-block mb-2'></div>
            <form onSubmit={onSubmit} className='flex flex-col items-center mt-2'>
              {step}
              <div className='flex flex-col items-center w-64 mb-5'>
                {currentStepIdx === 0 &&
                <button type='submit' className='border-2 tracking-[2px] border-cyan-800 mb-4 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'>
                  Next
                </button>}
                {currentStepIdx === 1 &&
                <div className='flex gap-2'>
                  <button onClick={back} type='button' className='tracking-[2px] mb-4 mt-4 rounded-full px-8 py-2 font-semibold text-black inline-block hover:text-cyan-800'>
                    <MdKeyboardBackspace size={30} />
                  </button>
                  <button onClick={next} type='submit' className='border-2 tracking-[2px] border-cyan-800 mb-4 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'>
                    Apply
                  </button>
                </div>
                }                            
              </div>
            </form>
          </div>
        </div>

        {/* Sign In */}
        <div className='w-2/5 px-12 py-36 bg-cyan-800 text-white rounded-r-2xl'>
          <h2 className='text-3xl mb-2'>Sign in</h2>
          <div className='border-2 w-10 border-white inline-block mb-2'></div>
          <p className='mb-10'>Already have an account? Use your EtherCast account.</p>
          <Link href="/LogIn" className='border-2 border-white tracking-[2px] rounded-full px-auto w-[160px] py-2 font-semibold inline-block hover:bg-white hover:text-cyan-800'>
            Sign In
          </Link> 
        </div>
      </div>
    </div>
  )
}

export default Application