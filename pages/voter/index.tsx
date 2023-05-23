import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';
import {InfinitySpin} from "react-loader-spinner";

type Props = {}

export default function Voter({}: Props) {
  const router = useRouter()

  useEffect(() => {
    router.push('/voter/elections')
  }, [])

  return (
    <div className='flex h-screen items-center justify-center text-2xl'>
    <InfinitySpin 
      width='200'
      color="#4fa94d"
    />
    </div>
  )
}