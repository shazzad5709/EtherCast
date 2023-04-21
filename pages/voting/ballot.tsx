import React, { FormEvent, useState } from 'react'
import Image from 'next/image'

type Props = {}

export default function Ballot({ }: Props) {
  const [selected, setSelected] = useState('')

  const handleOptionClick = (option: string) => {
    setSelected(option)
  }

  const handleVote = (e: FormEvent) => {
    e.preventDefault()
    console.log('Voted for', selected)
  }

  const options = [
    {
      id: 1,
      candidate: 'Option 1',
      agenda: 'Description of option 1.',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',
    },
    {
      id: 2,
      candidate: 'Option 2',
      agenda: 'Description of option 2.',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',
    },
    {
      id: 3,
      candidate: 'Option 3',
      agenda: 'Description of option 3.',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',
    },
    {
      id: 4,
      candidate: 'Option 4',
      agenda: 'Description of option 4.',
      image: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png',
    },
  ]

  return (
    <div className="flex flex-col w-screen px-4 md:px-8 py-8 items-center lg:justify-center min-h-screen">
      <h1 className="text-2xl w-full lg:w-fit font-bold mb-4">Choose Candidate</h1>
      <form className="flex flex-col w-full items-center" onSubmit={handleVote}>
        <div className='lg:grid lg:grid-cols-2 xl:grid-cols-3 w-full gap-10'>
          {options.map((option) => (
          <div key={option.id}
              className={`bg-white w-full border-2 border-gray-300 flex space-x-10 items-center shadow-md space-y-2 rounded-lg mb-4 p-4 cursor-pointer hover:bg-green-light hover:border-green-light ${
                selected === `${option.candidate}` ? "border-green-dark bg-green-light hover:border-green-dark" : ""
              }`}
              onClick={() => handleOptionClick(option.candidate)}
            >
              <img src={option.image} className='rounded-full' width={80} height={80} alt={''} />
              <div>
                <h2 className="text-xl font-bold">{option.candidate}</h2>
                <p className="text-gray-600">{option.agenda}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className={`bg-green text-white w-full hover:bg-green-dark md:w-fit md:px-16 py-2 px-4 rounded-lg ${
            selected ? "" : "opacity-50  cursor-not-allowed"
          }`}
          disabled={!selected}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
