import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  code: number
  name: string
  org: string
  applyDeadline: string
  voteStart: string
  applied?: boolean
  started?: boolean
}

export default function ElectionList({ code, name, org, applyDeadline, voteStart, applied, started }: Props) {
  const router = useRouter()

  const handleApply = () => {
    router.push(`/voter/elections/apply?code=${code}`)
  }

  const handleVote = () => {
    router.push(`/voter/voting/ballot?code=${code}`)
  }

  return (
    <figure className="flex px-10 py-6 flex-col lg:flex-row items-center justify-center lg:justify-between text-center bg-white border-b border-gray-200">
      <blockquote className="text-black">
        <h3 className="text-lg lg:text-left font-semibold"> {name} </h3>
        <p className="font-semibold lg:text-left"> {org} </p>
      </blockquote>
      {started ? (
        
        <figcaption className="flex flex-col lg:flex-row space-x-12 space-y-2 mt-2 lg:mt-0 items-center justify-center">
          <div className="text-lg pt-2 text-red"> Voting ends: {voteStart} </div>
          <button onClick={handleVote} className='bg-green hover:bg-green-dark text-white py-1 lg:py-2 px-6 md:px-12 rounded-lg'>Vote</button>
        </figcaption>
      ): (
        <div className='flex lg:space-x-12 xl:space-x-24 flex-col lg:flex-row'>
          <figcaption className="flex items-center justify-center">
            <div className="font-medium lg:text-left">
              {applied ? (
                  <div className="text-lg text-green"> Voting starts: {voteStart} </div>
                  ) : (
                <>
                  <div className='text-sm font-semibold'> Apply within:  {applyDeadline} </div>
                  <div className="text-sm text-gray-500"> Voting starts: {voteStart} </div>
                </>
              )}
            </div>
          </figcaption>
          {!applied ? (
            <figcaption className="flex mt-2 lg:mt-0 items-center justify-center">
              <button onClick={handleApply} className='bg-green hover:bg-green-dark text-white py-1 lg:py-2 px-6 lg:px-10 rounded-lg'>Apply</button>
            </figcaption>
          ): (<></>)}
      </div>
      )}
    </figure>
  )
}