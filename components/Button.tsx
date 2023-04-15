import React from 'react'

type Props = {
  label: string;
  secondary?: boolean;
  large?: boolean;
}

export default function Button({ label, secondary, large }: Props) {
  return (
    <button
      className={`
        rounded-xl
        transition
        border-2
        text-white
        ${secondary? 'bg-black' : 'bg-purple-dark hover:bg-purple-darker'}
        ${large? 'text-[16px] md:text-[18px]' : 'text-[14px] md:text-[16px]'}
        ${large? 'px-5' : 'px-4'}
        ${large? 'w-[120px] md:w-[130px]' : 'w-[100px] md:w-[110px]'}
        ${large? 'h-11' : 'h-9'}
      `}
    >
      {label}
    </button>
  )
}