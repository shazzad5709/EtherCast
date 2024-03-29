import React, { useEffect, useState } from "react";
import Button from "../Button";
import { BiUser, BiIdCard, BiEdit, BiTrashAlt } from "react-icons/bi";
import axios from "axios";

type Props = {
  buttonName: string;
};

interface FormData {
  id: number;
  name: string;
  email: string;
  agenda : string;
  symbol:string;
}


export default function Form({ buttonName }: Props) {
  const [selectedRecord, setSelectedRecord] = useState<FormData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [agenda, setagenda] = useState("");
  const [symbol, setSymbol] = useState("");
  const [showForm, setShowForm] = useState(false); // initial state is false

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const res = await axios
    //   .post("./api/data/Candidate/candidateInfo", {
    //     name: name,
    //     email: email,
    //     agenda: agenda,
    //     symbol: symbol,
       
    //   })
    //   .catch((err) => {
    //     alert("You DEAD=========");
    //   });
    
    // const res = awi
    // setSelectedRecord(null);
    // setName("");
    // setEmail("");
    // setagenda("");
    // toggleForm();
  };


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmpCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleagendaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setagenda(event.target.value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div>
        <div className="flex flex-col">
        <button
                type='submit'
                className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
               onClick={toggleForm}>Add Officer</button>
        </div>
        <div>
          {showForm && (
            <div >
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
              <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h4 className='text-xl font-bold leading-tight tracking-tight md:text-xl'>
              Create Candidate
            </h4>
            
            <form className='space-y-4 md:space-y-6' method='POST' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium'
                >
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Name'
                  required
                  value={name}
                  onChange={handleNameChange}
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium'
                >
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='username@example.com'
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div>
                <label
                  htmlFor='agenda'
                  className='block mb-2 text-sm font-medium'
                >
                  Organization Name
                </label>
                <input
                  type='text'
                  name='agenda'
                  id="agenda"
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='IIT'
                  required
                  value={agenda}
                  onChange={handleagendaChange}
                />
              </div>
              
              <div>
                <label
                  htmlFor='empCode'
                  className='block mb-2 text-sm font-medium'
                >
                  Employee Code
                </label>
                <input
                  type='text'
                  name='empCode'
                  id="empCode"
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='123'
                  required
                  value={symbol}
                    onChange={handleEmpCodeChange}
                />
              </div>


              <div className="relative">
              <button
                type='submit'
                className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                {selectedRecord ? "Update Info" : "Create Chairman"}
              </button>
                {/* <button type="submit">
                  {selectedRecord ? "Update Info" : "Create"}
                </button> */}
                {selectedRecord && (
                  <button type="button" onClick={() => setSelectedRecord(null)}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
            </div>
            </div>
            </div>
            </div>

          )}
        </div>
        
        </div>
      
    </>
  );
}
