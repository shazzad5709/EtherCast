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
    <div className='relative flex md:hidden w-full'>
      <p className='text-white px-8'>{ label }</p>
    </div>
  )
}