import React, { useCallback, useState } from 'react'
import { IconType } from 'react-icons/lib'

type Props = {
  label: string
  icon: IconType
  href?: string
  onClick?: () => void
}

export default function NavbarOptions({ label, icon: Icon, href, onClick }: Props) {
  // const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    alert('clicked')
  }, [])

  return ( 
    <div onClick={handleClick} className='hidden lg:w-full p-3 lg:pr-8 md:flex rounded-lg lg:flex-row items-center hover:bg-green-light hover:text-green-dark hover:cursor-pointer hover:drop-shadow-md'>
      <div className='relative space-x-3 md:w-[36px] lg:w-fit flex items-start justify-center cursor-pointer'>
        <Icon size={24} />
        <p className='hidden lg:block text-xl'>{label}</p>
      </div>
    </div>
  )
}