import React from 'react'
import Admin from '../../components/Dashboard/Admin'
import { useSession } from 'next-auth/react'
import Unauthorized from '../../components/PageComponents/Unauthorized'
import Unauthenticated from '../../components/PageComponents/Unauthenticated'

type Props = {}

export default function AdminLanding({}: Props) {
  const {data:session, status} = useSession()
  if(status==='authenticated') {
    if(session?.user?.role === 'ADMIN') {
      return (
        <Admin />
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