import React from 'react'
import Officer from '../../components/Dashboard/ElectionOfficers'
import { useSession } from 'next-auth/react'
import Unauthorized from '../../components/PageComponents/Unauthorized'
import Unauthenticated from '../../components/PageComponents/Unauthenticated'

type Props = {}

export default function OfficerLanding({}: Props) {
  const {data:session, status} = useSession()
  if(status==='authenticated') {
    if(session?.user?.role === 'OFFICER') {
      return (
        <Officer />
      )
    }
    return (
      <Unauthorized path={(session?.user?.role).toLowerCase()} />
    )
  }
  return (
    <Unauthenticated />
  )
}