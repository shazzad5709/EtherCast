import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next';


type Props = {}

export default function Voter({}: Props) {
  const router = useRouter()

  useEffect(() => {
    router.push('/voter/elections')
  }, [])

  return (
    <div className='flex h-screen items-center justify-center text-2xl'>Loading...</div>
  )
}