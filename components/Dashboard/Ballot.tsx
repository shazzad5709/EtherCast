import React, { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'
import VotingContract from '../../contract/abi.json'
import toast from 'react-hot-toast'

type Props = {}

interface Candidate {
  address: number
  agenda: string
  email: string
  id: string
  name: string
  symbol: string
  voterId: string
  image: string | null
}

export default function Ballot({ }: Props) {

  const [selected, setSelected] = useState('')
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)

  function convertToUint256(hexString: string): string {
    if (hexString.startsWith('0x')) {
      hexString = hexString.slice(2)
    }
  
    const paddedHexString = hexString.padStart(64, '0')
  
    return '0x' + paddedHexString
  }

  const handleOptionClick = (option: string) => {
    setSelected(option)
  }

  const handleVote = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const vote = candidates.find((item) => item.email === selected)

    // console.log(vote?.address)
    if (typeof window !== 'undefined') {
      const signer = new ethers.Wallet(localStorage.getItem('voterPrivateKey')!, new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY));
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, VotingContract, signer);
      const election_code = convertToUint256(vote.voter.electionId)
      console.log(election_code)
      try {
        const tx = contract.voting(election_code, vote.address)
        await tx.wait()

        toast.success('Vote submitted successfully')
        setLoading(false)
      }      
      catch (err) {
        console.log(err)
        toast.error('Vote submission failed')
        setLoading(false)
      }
    }
  }

  const fetchCandidates = async () => {
    const res = await axios.get('/api/voting/ballot')
      .then((res) => {
        console.log(res.data)
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

  //TODO: Add loading spinner
  // if (loading) {
    
  // }

  return (
    <div className="flex flex-col w-screen px-4 md:px-8 py-8 items-center lg:justify-center min-h-screen">
      <h1 className="text-2xl w-full lg:w-fit font-bold mb-4">Choose Candidate</h1>
      <form className="flex flex-col w-full items-center" onSubmit={handleVote}>
        <div className='lg:grid lg:grid-cols-2 xl:grid-cols-3 w-full gap-10 lg:px-10 xl:px-20'>
          {candidates.map((option) => (
            <div key={option.id}
              className={`bg-white w-full border-2 border-gray-300 flex space-x-10 items-center shadow-md space-y-2 rounded-lg mb-4 p-4 cursor-pointer hover:bg-green-light hover:border-green-light ${selected === `${option.email}` ? "border-green-dark bg-green-light hover:border-green-dark" : ""
                }`}
              onClick={() => handleOptionClick(option.email)}
            >
              {!option.image && (
                
                <img className="w-32 h-32 rounded-full" src="/images/placeholder.png" alt="Profile picture">
                  </img>
                  )}
                  {option.image && (
                    <img src={option.image} className='rounded-full' width={80} height={80} alt={''} />
                  )}
              <div className='space-y-2'>
                <h2 className="text-xl font-bold">{option.name}</h2>
                <p className="text-gray-800 text-lg">{option.symbol}</p>
                <p className="text-gray-600">{option.agenda}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className={`bg-green text-white w-full hover:bg-green-dark md:w-fit md:px-16 py-2 px-4 rounded-lg ${selected ? "" : "opacity-50  cursor-not-allowed"
            }`}
          disabled={!selected}
        >
          Submit
        </button>
      </form>
    </div>
  )
}
