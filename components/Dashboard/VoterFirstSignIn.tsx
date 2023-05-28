import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Secret } from '@prisma/client'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Wallet, BigNumber, ethers } from "ethers";
import { InfinitySpin } from 'react-loader-spinner'
import { signOut, useSession } from 'next-auth/react'
import { MdLogout } from 'react-icons/md'

type Props = {}

export default function VoterFirstsignin({ }: Props) {
  const [options, setOptions] = useState<Secret[]>([])
  const [selectedOption, setSelectedOption] = useState<Secret>();
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [officerPrivateKey, setOfficerPrivateKey] = useState('')
  const router = useRouter()
  const [toggleForm, setToggleForm] = useState(true)
  const [loading, setLoading] = useState(false)
  const { data: session, status } = useSession()

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 5) {
      toast.error('Password must be at least 5 characters long');
      return;
    }

    setLoading(true);
    const res = await axios.post('/api/data/voter/activeStatus', {
      password
    })
      .then((res) => {
        toast.success('Password Updated');
        setOfficerPrivateKey(res.data.key);
        setLoading(false);
        setToggleForm(false);

      })
      .catch((err) => {
        alert('Error updating password');
        setLoading(false);
      });
  }

  async function createWallet(privateKey: string) {
    const wallet = ethers.Wallet.createRandom();

    console.log('address:', wallet.address);
    console.log('mnemonic:', wallet.mnemonic.phrase);
    console.log('privateKey:', wallet.privateKey);

    const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY);

    const signer = new ethers.Wallet(privateKey, provider);

    console.log('Starting transaction');
    if(window !== undefined) {
      try {
        const tx = await signer.sendTransaction({
          // to: '0x7285A4d191b033dd5830d1B158e89BBD57221428', //change this 'address' to wallet.address
          // to: '0x7285A4d191b033dd5830d1B158e89BBD57221428', //change this 'address' to wallet.address
          // to: '0x7285A4d191b033dd5830d1B158e89BBD57221428', //change this 'address' to wallet.address
          to: wallet.address,
          // to: new ethers.Wallet(localStorage.getItem('privateKey')!).address,
          value: ethers.utils.parseEther('0.001'),
        });
  
        await tx.wait();
        console.log('sent');
      } catch (error) {
        console.log(error);
      }
    }

    
    return wallet;
  }

  async function signMessage(signer: SignerWithAddress | Wallet) {
    let messageHash = ethers.utils.id(process.env.NEXT_PUBLIC_MESSAGE!);

    let messageHashBytes = ethers.utils.arrayify(messageHash);
    // Sign the binary data
    let flatSig = await signer.signMessage(messageHashBytes);

    // For Solidity, we need the expanded-format of a signature
    let sig = ethers.utils.splitSignature(flatSig);

    // split signature
    const v = sig.v;
    const r = sig.r;
    const s = sig.s;
    // console.log(v, r, s)
    return { messageHashBytes, v, r, s };
  }

  const handleFinish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);
    const option = options.find((item) => item.secret === selectedOption?.secret)
    if (typeof window !== 'undefined') {
      console.log('before: ' + localStorage.getItem('voterPrivateKey'))
      const signer = await createWallet(officerPrivateKey)
      // localStorage.setItem('voterPrivateKey', signer.privateKey);

      // const signer = new ethers.Wallet(localStorage.getItem('voterPrivateKey')!, new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_ALCHEMY));
      console.log(signer.privateKey)
      
      const { messageHashBytes, v, r, s } = await signMessage(signer);
      const messageString = ethers.utils.hexlify(messageHashBytes)
      const res = await axios.post('/api/data/voter/registerVoter', {
        secret: option,
        // voterAddress: '0x7285A4d191b033dd5830d1B158e89BBD57221428',
        // voterAddress: '0x7285A4d191b033dd5830d1B158e89BBD57221428',
        // voterAddress: '0x7285A4d191b033dd5830d1B158e89BBD57221428',
        voterAddress: signer.address,
        messageHashBytes: messageString,
        v: v,
        r: r,
        s: s
      })
        .then(async (res) => {
          setLoading(false);
          toast.success('Voter account created successfully');
          console.log('after: ' + localStorage.getItem('voterPrivateKey'))
          if (status === 'authenticated') {
            await router.push(`${(session?.user?.role).toLowerCase()}`);
          }
        })
        .catch((err) => {
          setLoading(false);
          alert('Error creating voter account');
        });
    }
  }

  useEffect(() => {
    fetchOptions();
  }, [toggleForm]);

  const fetchOptions = async () => {
    try {
      const response = await axios.get('/api/data/voter/secret');
      setOptions(response.data.secret);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center text-2xl'>
        <InfinitySpin
          width='200'
          color="#4fa94d"
        />
      </div>
    )
  }

  return (
    <div className='bg-gray-100 h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <div className='flex justify-between'>
              <h1 className='text-lg font-bold leading-tight tracking-tight md:text-2xl'>
                Set up new voter account
              </h1>
              <MdLogout size={24} onClick={() => signOut({ callbackUrl: '/' })} />
            </div>

            {toggleForm ? (
              <form className='space-y-4 md:space-y-6' onSubmit={handlePasswordSubmit}>

                <div>
                  <label
                    htmlFor='newpassword'
                    className='block mb-2 text-md font-medium text-gray-900'
                  >
                    New Password
                  </label>
                  <input
                    type='password'
                    name='newpassword'
                    id='newpassword'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor='confirmpassword'
                    className='block mb-2 text-md font-medium text-gray-900'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    name='confirmpassword'
                    id='confirmpassword'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className='py-2'>
                  <button
                    type='submit'
                    className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  >
                    Set New Password
                  </button>
                </div>
              </form>
            ) : (
              <form className='space-y-4 md:space-y-6' onSubmit={handleFinish}>
                <div>
                  <label
                    htmlFor='secret'
                    className='block mb-2 text-md font-medium text-gray-900'
                  >
                    Choose a secret
                  </label>
                  <select
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    name="select"
                    id="select"
                    required
                    value={selectedOption?.secret} onChange={handleOptionChange}
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {options.map((option, index) => (
                      <option className='' key={index} value={option.secret}>{option.secret}</option>
                    ))}
                  </select>
                </div>
                <div className='py-2'>
                  <button
                    type='submit'
                    className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  >
                    Finish
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div >
  )
}