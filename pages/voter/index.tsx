import { useRouter } from 'next/router'
import React from 'react'
import { GetServerSideProps } from 'next';

type Props = {}

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.writeHead(302, { Location: '/voter/elections' });
  context.res.end();
  
  return {
    props: {}
  };
};

export default function index({}: Props) {
  return (
    <div className='flex h-screen items-center justify-center'>Loading...</div>
  )
}