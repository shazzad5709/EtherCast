import React from 'react'
import Button from './Button'

type Props = {
  buttonName: string
}

export default function Form({ buttonName }: Props) {
  return (
    <div className=" bg-grey-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-green shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
        </div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>

            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="fname"
                    name="fname"
                    type="text"
                    className="h-10 w-full border-b-2 border-gray-300 text-black focus:outline-none focus:border-rose-600"
                    placeholder="First Name"
                  />

                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="lname"
                    name="lname"
                    type="text"
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Last Name"
                  />

                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />

                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Password"
                  />

                </div>
                <div className="relative">
                  <Button label={buttonName} dynamic large />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}