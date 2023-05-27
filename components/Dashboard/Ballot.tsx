import React, { FormEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

type Props = {}

interface Candidate {
  id: number
  candidate: string
  agenda: string | null
  image: string
}

export default function Ballot({ }: Props) {
  const [selected, setSelected] = useState('')
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  const handleOptionClick = (option: string) => {
    setSelected(option)
  }

  const handleVote = (e: FormEvent) => {
    e.preventDefault()
    alert('Voted for' + selected)
  }

  const fetchCandidates = async () => {
    const res = await axios.get('/api/voting/ballot')
    .then((res) => {
      console.log(res.data.candidates)
      setCandidates(res.data)
      console.log(candidates)
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchCandidates()
  }, [])

  return (
    <div className="flex flex-col w-screen px-4 md:px-8 py-8 items-center lg:justify-center min-h-screen">
      <h1 className="text-2xl w-full lg:w-fit font-bold mb-4">Choose Candidate</h1>
      <form className="flex flex-col w-full items-center" onSubmit={handleVote}>
        <div className='lg:grid lg:grid-cols-2 xl:grid-cols-3 w-full gap-10 lg:px-10 xl:px-20'>
          {candidates.map((option) => (
          <div key={option.id}
              className={`bg-white w-full border-2 border-gray-300 flex space-x-10 items-center shadow-md space-y-2 rounded-lg mb-4 p-4 cursor-pointer hover:bg-green-light hover:border-green-light ${
                selected === `${option.candidate}` ? "border-green-dark bg-green-light hover:border-green-dark" : ""
              }`}
              onClick={() => handleOptionClick(option.candidate)}
            >
              {!option.image && (
                <div className="max-w-lg mx-auto my-10 bg-white rounded-lg shadow-md p-5">
                <img className="w-32 h-32 rounded-full mx-auto" src="/images/placeholder.png" alt="Profile picture">
                  </img>
                  </div>)}
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
