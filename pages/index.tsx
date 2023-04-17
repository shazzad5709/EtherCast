import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Landing from '../components/PageComponents/Landing'
import Admin from '../components/Dashboard/Admin'

export default function Home() {
  return (
    <>            
      {/* <Landing />   */}
      <Admin />
    </>
  )
}
