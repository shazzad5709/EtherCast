import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Landing from '../components/PageComponents/Landing'
import Admin from '../components/Dashboard/Admin'
import ElectionChairman from '../components/Dashboard/ElectionChairman'
import ElectionOfficers from '../components/Dashboard/ElectionOfficers'
import LoginPage from '../components/Utilities/Test'


export default function Home() {
  return (
    <>            
      {/* <Landing />   */}
      {/* <Admin /> */}
      {/* <ElectionChairman /> */}
      <ElectionOfficers />
      
    </>
  )
}
