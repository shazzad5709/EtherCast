import React, { useState } from 'react'
import Button from './Button'

type Props = {
  buttonName: string
}
interface FormData {
  name: string;
  email: string;
  orgName: string;
  empCode: string; // Update type to string
}

export default function Form({ buttonName }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    orgName: '',
    empCode: ''
  });

  const [tableData, setTableData] = useState<FormData[]>([]); // Update type to FormData[]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({
      name: '',
      email: '',
      orgName: '',
      empCode: ''
    });
  };
 
  return (
    <>
    <form onSubmit={handleSubmit}>
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
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name} // Bind input value to state
                    onChange={handleChange} // Bind input change event to event handler
                    className="h-10 w-full border-b-2 border-gray-300 text-black focus:outline-none focus:border-rose-600"
                    placeholder="Name"
                  />

                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />

                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="orgName"
                    name="orgName"
                    type="text"
                    value={formData.orgName}
                    onChange={handleChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Org Name"
                  />

                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="empCode"
                    name="empCode"
                    type="text"
                    value={formData.empCode}
                    onChange={handleChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Employee Code"
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
  </form>
  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
		<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
			<table className="min-w-full leading-normal">
					<thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
								Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Email</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Organization Name</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Employee Code</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {data.name}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {data.email}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {data.orgName}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {data.empCode}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  </div>
  </>
  )
}
