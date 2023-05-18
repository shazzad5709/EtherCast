import React, { useEffect, useState } from "react";
import Button from "../Button";
import { BiUser, BiIdCard, BiEdit, BiTrashAlt } from "react-icons/bi";
import { FaVoteYea } from "react-icons/fa";
import prisma from "../../../libs/prisma";
import { get } from "http";
import { captureRejectionSymbol } from "events";
import { set } from "mongoose";
import axios from "axios";

type Props = {
  buttonName: string;
};

interface FormData {
  id: number;
  name: string;
  email: string;
  org_name: string;
  empCode: string; 
}


export default function Form({ buttonName}: Props) {
  
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState<FormData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org_name, setorg_name] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [showForm, setShowForm] = useState(false); // initial state is false
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get('/api/data/createdChairman?election_id=1');
      setUsers(response.data);
      // const renderUser = 
      // (
      //   <>
      //     {users?.map((user) => (
      //       <tr key={user.id}>
      //         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                
      //           {user.name}
      //         </td>
      //         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      //           {user.email}
      //         </td>
      //         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      //           {user.org_name}
      //         </td>
      //         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      //           {user.empCode}
      //         </td>
      //         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
      //           <button type="button" onClick={() => handleEdit(user.id)}>
      //           <BiEdit size={25} color={"rgb(0, 131, 143)"} />
      //           </button>
      //           <button
      //             type="button"
      //             onClick={() => handleDelete(user.id)}
      //           >
      //           <BiTrashAlt size={25} color={"rgb(244,63,94)"}/>
      //           </button>
      //         </td>
      //       </tr>
      //     ))}
      //   </>
        
      // )
      console.log(response.data);
    }

    getUsers();
  }, [showForm]);

  async function fetchUsersByElectionCode() {
    try {
      const response =  await axios.get(`/api/dataOfficer/createdOfficer?election_id=1`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  
  // useEffect(() => {

    // const getRecords = async () => {
    //   const response =  await axios.get(`/api/dataOfficer/createdOfficer?election_id=1`)
    //   // const data = await response.json();
    //   setRecords(response.data);};
    //   getRecords();
    // }, []);
    //   const formData = response.data.map((officer) => ({
    //     id: officer.id.toString(),
    //     name: officer.user.name,
    //     email: officer.user.email,
    //     org_name: officer.org_name,
    //     empCode: officer.employee_id,
    //   }));
    //   setRecords(formData);
    // });


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await axios.post(
      '/api/dataOfficer/createdOfficer',
      {
        name: name,
        email: email,
        org_name: org_name,
        empCode: empCode,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }
    ).catch((err) => {
      alert('You DEAD');
    });
    const election_id = '1';
    

    // const id = new Date().getTime();
    // const newRecord = { id, name, email, org_name, empCode };
    // let newRecords;
    // if (selectedRecord) {
    //   newRecords = records.map((record) =>
    //     record.id === selectedRecord.id ? newRecord : record
    //   );
    // } else {
    //   newRecords = [...records, newRecord];
    // }

    // setRecords(newRecords);
    
    setSelectedRecord(null);
    setName("");
    setEmail("");
    setorg_name("");
    setEmpCode("");
    toggleForm();
  };

  const handleEdit = (id: number) => {
    toggleForm();
    // const selectedRecord = records.find((record) => record.id === id);
    // if (selectedRecord) {
    //   setSelectedRecord(selectedRecord);
    //   setName(selectedRecord.name);
    //   setEmail(selectedRecord.email);
    //   setorg_name(selectedRecord.org_name);
    //   setEmpCode(selectedRecord.empCode);
    // }
  };

  const handleDelete = (id: number) => {
    // toggleForm()
    // const newRecords = records.filter((record) => record.id !== id);
    // setRecords(newRecords);
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

  const handleorg_nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setorg_name(event.target.value);
  };


  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
    <div>
    <div className="flex flex-col">
    <button onClick={toggleForm}>Add User</button>
    </div>
      
      <div>
      {showForm && (
        <form onSubmit={handleSubmit}>
           <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <BiUser className="text-gray-400 m-2" />
            
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                placeholder="Name"
              />
            
          </div>
        
          <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <BiUser className="text-gray-400 m-2" />
            
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                placeholder="Email address"
              />
            
          </div>
          <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <BiUser className="text-gray-400 m-2" />
            <div className="relative">
              <input
                type="text"
                id="org_name"
                value={org_name}
                onChange={handleorg_nameChange}
                className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                placeholder="Org Name"
              />
            </div>
          </div>
          {/* <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
            <FaVoteYea className="text-gray-400 m-2" />
            <div className="relative">
              <input
                type="text"
                id="empCode"
                value={empCode}
                onChange={handleEmpCodeChange}
                className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                placeholder="Employee Code"
              />
            </div>
          </div> */}

          <div className="relative">
            <button type="submit">
              {selectedRecord ? "Update" : "Create"}
            </button>
            {selectedRecord && (
              <button type="button" onClick={() => setSelectedRecord(null)}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
      </div>
      
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Organization Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Employee Code
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </>
  );
}