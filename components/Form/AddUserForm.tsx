import React from 'react'
import { BiIdCard, BiPlus, BiUser } from 'react-icons/bi'
import Success from "../success"
import Bug from "../bug"
import { useQueryClient, useMutation } from 'react-query'
import { addUser, getUsers } from '../../lib/helper'
import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { MdKeyboardBackspace } from 'react-icons/md'
import AddElecOffiForm from '../../components/AddElecOffiForm'
import useMultiStepForm from '../../pages/VoterApply/useMultiStepForm'
import axios from 'axios'
import Router from 'next/router'
import { FaVoteYea } from 'react-icons/fa'


type FormData = {
  firstname: string
  lastname: string
  email: string
  elCode: string
  role: string
}

const INITIAL_DATA: FormData = {
  firstname: '',
  lastname: '',
  email: '',
  elCode: '',
  role: '',
}

export default function AddUserForm(props:any) {
  const [data, setData] = useState(INITIAL_DATA)
  const [error, setError] = useState<any>();

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  } 

  const addUser = async () => {
    try{
      const res = await axios.post(
        '/api/users/addOfficer',
        {
          data
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }
      ).then(
         () => {
          Router.reload()
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
    } catch (error) {
      console.log(error)
   }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()

    return addUser()
  }

  return (
    <form onSubmit={onSubmit}>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' 
        type="text" name='firstname' placeholder='First Name' 
        value={data.firstname} onChange={e => updateFields({firstname: e.target.value})} />
    </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' 
        type="text" name='lastname' placeholder='Last Name' 
        value={data.lastname} onChange={e => updateFields({lastname: e.target.value})} />
    </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="email" 
        name='email' placeholder='Email' value={data.email} 
        onChange={e => updateFields({email: e.target.value})} />
    </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiIdCard className='text-gray-400 m-2' />
      <input required className='bg-gray-100 flex-1 outline-none' 
      type="text" name='role' placeholder='Role' 
      value={data.role} onChange={e => updateFields({role: e.target.value})} />
    </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <FaVoteYea className='text-gray-400 m-2' />
      <input required className='bg-gray-100 flex-1 outline-none' type="number" 
      name='elCode' placeholder='Election Code' value={data.elCode} onChange={e => updateFields({elCode: e.target.value})} />
    </div>

    <button type='submit' className='border-2 tracking-[2px] border-cyan-800 mb-4 mt-4 rounded-full px-12 py-2 font-semibold inline-block text-cyan-800 hover:bg-cyan-800 hover:text-white'>
                    Add Officers
                  </button>
    
  </form>
  )
}

