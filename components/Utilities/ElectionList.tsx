import React from 'react'

type Props = {
  code: number
  name: string
  org: string
  applyDeadline: string
  voteStart: string
  applied?: boolean
}

export default function ElectionList({ code, name, org, applyDeadline, voteStart, applied }: Props) {
  return (
    <figure className="flex px-10 py-6 flex-col lg:flex-row items-center justify-center lg:justify-between text-center bg-white border-b border-gray-200">
      <blockquote className="text-black">
        <h3 className="text-lg lg:text-left font-semibold"> {name} </h3>
        <p className="font-semibold lg:text-left"> {org} </p>
      </blockquote>
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
            <button className='bg-green hover:bg-green-dark text-white py-1 lg:py-2 px-6 lg:px-10 rounded-lg'>Apply</button>
          </figcaption>
        ): (<></>)}
      </div>
    </figure>
  )
}