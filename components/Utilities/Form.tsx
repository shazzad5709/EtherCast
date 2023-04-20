import React, { useState } from 'react'
import Button from './Button'
import { BiUser, BiIdCard } from 'react-icons/bi';
import { FaVoteYea } from 'react-icons/fa';

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
    setOrgName('');
    setEmpCode('');
    toggleForm()
  };

  const handleEdit = (id: number) => {
    toggleForm()
    const selectedRecord = records.find((record) => record.id === id);
    if (selectedRecord) {
      setSelectedRecord(selectedRecord);
      setName(selectedRecord.name);
      setEmail(selectedRecord.email);
      setOrgName(selectedRecord.orgName);
      setEmpCode(selectedRecord.empCode);
    }
  };

  const handleDelete = (id: number) => {
    // toggleForm()
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
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
      <div className="relative">
                  <input  type="text" id="name" value={name} onChange={handleNameChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-black focus:outline-none focus:border-rose-600"
                    placeholder="Name"
                  />

                </div>
                </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
      <div className="relative">
                  <input  type="email" id="email" value={email} onChange={handleEmailChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Email address"
                  />

                </div></div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
      <div className="relative">
                  <input  type="text" id="orgName" value={orgName} onChange={handleOrgNameChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Org Name"
                  />

                </div></div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <FaVoteYea className='text-gray-400 m-2' />
      <div className="relative">
                  <input  type="text" id="empCode" value={empCode} onChange={handleEmpCodeChange}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Employee Code"
                  />

                </div></div>
    
       
                <div className="relative">
                <button type="submit">{selectedRecord ? 'Update' : 'Create'}</button>
        {selectedRecord && (
          <button type="button" onClick={() => setSelectedRecord(null)}>
            Cancel
          </button>
        )}
               
             
            
          
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
                    
                <button type="button"  onClick={() => handleEdit(record.id)} >
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
