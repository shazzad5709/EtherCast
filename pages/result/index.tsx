import axios from 'axios'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Result({ }: Props) {
  const [elections, setElections] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchElections = async () => {
    const res = await axios.get('/api/data/elections/elections')
      .then((res) => {
        console.log(res.data)
        setElections(res.data)
        console.log(elections)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchElections()
  }, [])

  return (
    <div className='flex h-screen items-center justify-center'>
      {elections.map((election) => (
        <div key={election.id} className='scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white overflow-y-scroll'>
          <h1>{election.title}</h1>
          <h2>{election.org_name}</h2>
        </div>
      ))}
    </div>
  )
}