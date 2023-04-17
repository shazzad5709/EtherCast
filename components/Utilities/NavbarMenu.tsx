import React, { useCallback, useState } from 'react'
import { IconType } from 'react-icons/lib'

type Props = {
  label: string
  icon: IconType
  href?: string
  onClick?: () => void
}

export default function ({ label, icon: Icon, href, onClick }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-black relative flex py-4 md:hidden w-full'>
        <p className='text-xl'>{label}</p>
      </div>
  )
}