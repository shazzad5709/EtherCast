import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2';
import VotingContract from '../../contract/abi.json'
import Testing from './testing';
import Result from '../../components/Utilities/Result/DynamicDonought';

type Props = {}

interface Candidate {
  id: string
  name: string
  image: string
  votes: number
}

export default function Election({ }: Props) {
  const [chartData, setChartData] = useState(null);

  const { electionId } = useRouter().query
  const [candidates, setCandidates] = useState<[]>([])

  

  const fetchVoteCounts = async () => {
    // fetch data about the election from contract
    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY)
  }

  useEffect(() => {
    // fetch data about the election from contract
    fetchVoteCounts()

    // set candidates
  }, [])

  

  function convertToUint256(hexString: string): string {
    if (hexString.startsWith('0x')) {
      hexString = hexString.slice(2)
    }
  
    const paddedHexString = hexString.padStart(64, '0')
  
    return '0x' + paddedHexString
  }

  return (
    <>
    {/* <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Organization Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {candidate.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {candidate.image}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {candidate.org_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> */}
    <Testing />
    {/* <Result /> */}
      </>
  )
}