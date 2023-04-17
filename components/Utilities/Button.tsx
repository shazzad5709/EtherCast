import { log } from 'console';
import React from 'react'

type Props = {
  label: string;
  secondary?: boolean;
  large?: boolean;
  dynamic?: boolean;
}

export default function Button({ label, secondary, large, dynamic }: Props) {
  return (
    <button
      className={`
        rounded-xl
        transition
        border-0
        text-white
        ${secondary? 'bg-black border-black' : 'bg-green border-green hover:bg-[#178A5E]'}
        ${large? 'text-[16px] md:text-[18px]' : 'text-[14px] md:text-[16px]'}
        ${large? 'px-5' : 'px-4'}
        ${(large && !dynamic)? 'w-[120px] md:w-[130px]' : 'w-[100px] md:w-[110px]'}
        ${(large)? 'h-11' : 'h-9'}
        ${dynamic? 'w-full md:w-full' : ''}
      `}
    >
      {label}
    </button>
  )
}