import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarOptions from './NavbarOptions'
import { NavbarItem } from '../../types/interfaces'
import { MdClose, MdLogout } from 'react-icons/md'
import NavbarMenu from './NavbarMenu'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { signOut } from 'next-auth/react'

type Props = {
  NavbarItems: NavbarItem[]
}

export default function Navbar({ NavbarItems }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const items = [...NavbarItems]

  

  const signOutPrompt = () => {
    if (confirm('Are you sure you want to sign out?')) {
      // TODO Sign out functionality
      console.log('Sign out')
    }
  }

  const openMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div className='sticky top-0 left-0 hidden md:flex md:flex-col md:w-fit xl:w-1/6 xl:px-10 h-screen bg-white mr-6 px-6 pt-8'>
        <div className='flex md:w-[60px]' >
          <Link href='/test'>
            <Image src='/ec-black-high.png' width={60} height={60} alt={''} />
          </Link>
        </div>
        <div className='pt-8'>
          {items.map((item) => (
            <NavbarOptions 
              key={item.id}
              label={item.label}
              icon={item.icon}
              href={item.href}
            />
          ))}
        </div>
        

        {/* TODO Display Sign in button for guest users */}
        <div onClick={() => signOut( {callbackUrl: '/'} )} className='mt-auto mb-10 hidden lg:w-full p-3 lg:pr-8 md:flex rounded-lg lg:flex-row items-center hover:bg-gray-300 hover:drop-shadow-md'>
          <div className='relative space-x-3 md:w-[36px] lg:w-fit flex items-start justify-center cursor-pointer'>
            <MdLogout size={24} />
            <p className='hidden lg:block text-xl'>Sign out</p>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className='w-full md:hidden fixed top-0 left-0'>
        {/* Add Menu open-close functionality */}
        <div className='bg-green flex justify-between px-4 py-3'>
          {isOpen && (
            <HiOutlineMenuAlt1 className='text-white mt-1 hover:cursor-pointer' size={30} onClick={openMenu}/>
          )}
          <Link href='/test'>
            <Image src='/ec-white-high.png' width={50} height={50} alt={''} />
          </Link>
          {isOpen && (
            <button onClick={signOutPrompt}>
              <MdLogout className='text-white mt-1 hover:cursor-pointer' size={30} />
            </button>
          )}
          {!isOpen && (
            <MdClose className='text-white mt-1 hover:cursor-pointer' size={30} onClick={openMenu}/>
          )}
        </div>

        {/* Mobile Menu adha bidha hoise, tel nai, kaajer kaaj agey korbo */}
        <div className='hidden bg-green h-screen'>
          <div className='absolute w-full flex flex-col md:hidden justify-between items-center'>
          {items.map((item) => (
              <NavbarMenu 
                key={item.id}
                label={item.label}
                icon={item.icon}
                href={item.href}
              />
            ))} 
          </div>
        </div>
      
      </div>
    </>

  )
}