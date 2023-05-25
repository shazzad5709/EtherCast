import Link from 'next/link'
import React from 'react'
import Button from '../Utilities/Button'
import Image from 'next/image'

type Props = {}

export default function ({ }: Props) {
  return (
    <div className='h-screen box-border bg-cover bg-[url("/candlebg.svg")]'>
      <div className='flex flex-col-reverse justify-end md:justify-center mt-10 md:mt-0 items-center gap-10 md:gap-12 lg:gap-[200px] md:pl-10 h-screen md:flex-row'>
        <div className='flex flex-col space-y-2 justify-center items-center'>
          <h1 className='uppercase tracking-[6px] text-3xl font-bold lg:text-5xl'>
            Ethercast
          </h1>
          <p className='text-xl text-gray-700 lg:text-2xl'>
            A Blockchain based E-Voting System
          </p>
          <div className='flex space-x-6 pt-2 md:pt-5 md:space-x-8'>
            <Link href='/signin'><Button label='Sign In' large /></Link>
            <Link href='/Guest'><Button label='Sign Up' large /></Link>
          </div>
          <div className='flex pt-2 md:pt-5'>
            <Link href='/Guest'><Button label='Continue as Guest' large dynamic /></Link>
          </div>
        </div>
        <div className='flex flex-col md:flex-row'>
          <Image src={'/hero.jpg'} className='animate-monitor opacity-0 z-0' alt={'monitor img'} height={400} width={450} />
          <Image src={'/eth.svg'} className='hidden absolute w-[12%] mt-[9.5%] ml-[18%] animate-eth opacity-0 z-2 xl:block' alt={'eth img'} height={100} width={100} />
        </div>
      </div>
    </div>
  )
}