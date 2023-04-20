import React, { useState } from 'react'
import Button from './Button'

type Props = {
  buttonName: string
}
interface FormData {
  id: number,
  name: string;
  email: string;
  orgName: string;
  empCode: string; // Update type to string
}

export default function Form({ buttonName }: Props) {
  const [records, setRecords] = useState<FormData[]>([]);

  const [tableData, setTableData] = useState<FormData[]>([]); // Update type to FormData[]
  const [selectedRecord, setSelectedRecord] = useState<FormData | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [empCode, setEmpCode] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = new Date().getTime();
    const newRecord = { id, name, email,orgName,empCode };

    let newRecords;
    if (selectedRecord) {
      newRecords = records.map((record) =>
        record.id === selectedRecord.id ? newRecord : record
      );
    } else {
      newRecords = [...records, newRecord];
    }

    setRecords(newRecords);
    setSelectedRecord(null);
    setName('');
    setEmail('');
  };

  const handleEdit = (id: number) => {
    const selectedRecord = records.find((record) => record.id === id);
    if (selectedRecord) {
      setSelectedRecord(selectedRecord);
      setName(selectedRecord.name);
      setEmail(selectedRecord.email);
    }
  };

  const handleDelete = (id: number) => {
    const newRecords = records.filter((record) => record.id !== id);
    setRecords(newRecords);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmpCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmpCode(event.target.value);
  };

  const handleOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrgName(event.target.value);
  };

  const [showForm, setShowForm] = useState(false); // initial state is false

  const toggleForm = () => {
    setShowForm(!showForm);
  };
 
  return (
    <>
     <button onClick={toggleForm}>Add User</button>
    
    {showForm && (
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
                  <input autoComplete="off" type="text" id="name" value={name} onChange={handleNameChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-black focus:outline-none focus:border-rose-600"
                    placeholder="Name"
                  />

                </div>

                <div className="relative">
                  <input autoComplete="off" type="email" id="email" value={email} onChange={handleEmailChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />

                </div>
                <div className="relative">
                  <input autoComplete="off" type="text" id="orgName" value={orgName} onChange={handleOrgNameChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Org Name"
                  />

                </div>

                <div className="relative">
                  <input autoComplete="off" type="text" id="empCode" value={empCode} onChange={handleEmpCodeChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Employee Code"
                  />

                </div>
                <div className="relative">
                <button type="submit">{selectedRecord ? 'Update' : 'Create'}</button>
        {selectedRecord && (
          <button type="button" onClick={() => setSelectedRecord(null)}>
            Cancel
          </button>
        )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
   )}
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
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
							Action</th>
            </tr>
          </thead>
          <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.name}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.email}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.orgName}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {record.empCode}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    
                <button type="button" onClick={() => handleEdit(record.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(record.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
              
          </tbody>
      </table>

    </div>
  </div>
  </>
  )
}
