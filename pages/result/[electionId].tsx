import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import VotingContract from '../../contract/abi.json'
import axios from 'axios'
import toast from 'react-hot-toast'

type Props = {}

interface Candidate {
  id: string
  name: string
  image: string
  voteCount: number
  address: string
  symbol:string
}

export default function Election({ }: Props) {
  const router = useRouter()
  const { electionId } = router.query
  // console.log(electionId)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [addresses, setAddresses] = useState<string[]>([])
  const [voteCounts, setVoteCounts] = useState<number[]>([])
  const [electionName, setElectionName] = useState<string>('')

  const fetchVoteCounts = async () => {
    // fetch data about the election from contract
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY)
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, VotingContract, provider)
    console.log(electionId)
    const election_code = convertToUint256(electionId!.toString())

    try {
      const tx = await contract.getResults(election_code)

      setAddresses(tx[0])
      setVoteCounts(tx[1])

      const res = await axios.get(`/api/data/elections/${electionId}`)
      console.log(res.data)
      setCandidates(res.data)
      setElectionName(res.data[0].voter.election.title)
    } catch (err) {
      console.log(err)
      toast.error('err.errorArgs')
      await router.push('/result')
    }
  }

  useEffect(() => {
    if(electionId)
      fetchVoteCounts()
  }, [electionId])

  
  function convertToUint256(hexString: string): string {
    if (hexString.startsWith('0x')) {
      hexString = hexString.slice(2)
    }
  
    const paddedHexString = hexString.padStart(64, '0')
  
    return '0x' + paddedHexString
  }

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="px-10 py-8 inline-block min-w-full">
        <p className='w-full text-center pb-6 text-2xl font-bold tracking-[2px] uppercase'>{electionName}</p>
        <table className=" min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-green bg-green-dark text-left text-sm font-semibold text-white uppercase tracking-[2px]">
                Symbol
              </th>
              <th className="px-5 py-3 border-b-2 border-green bg-green-dark text-left text-sm font-semibold text-white uppercase tracking-[2px]">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-green bg-green-dark text-left text-sm font-semibold text-white uppercase tracking-[2px]">
                Vote Count
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="px-5 py-5  border-b border-green bg-white text-md">
                  {candidate.symbol}
                </td>
                <td className="px-5 py-5 border-b border-green bg-white text-md">
                  {candidate.name}
                </td>
                <td className="px-5 py-5 border-b border-green bg-white text-md">
                  {voteCounts[addresses.indexOf(candidate.address)]? Number(voteCounts[addresses.indexOf(candidate.address)]) : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}