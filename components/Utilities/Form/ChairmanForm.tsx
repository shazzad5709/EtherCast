import React, { useEffect, useState } from "react";
import Button from "../Button";
import { BiUser, BiIdCard, BiEdit, BiTrashAlt } from "react-icons/bi";
import axios from "axios";
import { render } from "react-dom";
import useSWR from "swr";
import ChairmanTable from "../../Table/AdminTable";
import { toast } from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";
import { set, trusted } from "mongoose";

type Props = {
  buttonName: string;
};

interface FormData {
  id: number;
  name: string;
  email: string;
  org_name: string;
  employee_id: string;
  election_id: string;
}
interface Chairman {
  id: string;
  org_name: string;
  name: string | null;
  email: string | null;
  userId: string; // Add the userId property here
  electionCreated: string;
}


export default function Form({ buttonName }: Props) {
  const [chairmen, setChairmen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FormData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org_name, setorg_name] = useState("");
  const [employee_id, setEmpCode] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showButton,setShowButton] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchChairmen = async () => {
      try {
        const response = await axios.get('/api/data/Admin/check');
        const data = response.data;
        // console.log(data);
        setChairmen(data);
        setLoading(false);

        // Check the value of chairmen
        if (data) {
          
          setShowButton(false); // Don't show the form
        } else {
          setShowButton(true); // Show the form
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchChairmen();
    
  }, []); // Call fetchChairmen on component mount (empty dependency array)
  
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    const res = await axios
      .post("./api/data/Chairman/createdOfficer", {
        name: name,
        email: email,
        org_name: org_name,
        employee_id: employee_id,

      })
      .then((res) => {
        toast.success("Officer Added Successfully");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });

    setSelectedRecord(null);
    setName("");
    setEmail("");
    setorg_name("");
    setEmpCode("");
    toggleForm();
    setLoading(false);
  };


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmpCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmpCode(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleorg_nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setorg_name(event.target.value);
  };

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };
    
  
  // fetchChairmen()

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
    <>

      <div>
        {showButton && (
          
        <div className="flex flex-col">
          <button
            type='submit'
            className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            onClick={toggleForm}>Add Officer</button>
        
        </div>)}
        {!showButton && (
          <div className="bg-white-500 text-center text-red font-semibold rounded-lg p-4">
          Election has been created. Can't Add Officers
        </div>
        
        )}
        <div>
          {showForm && (
            <div >
              <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
                <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>

                  <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h4 className='text-xl font-bold leading-tight tracking-tight md:text-xl'>
                      Add New Officer
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
                          htmlFor='org_name'
                          className='block mb-2 text-sm font-medium'
                        >
                          Organization Name
                        </label>
                        <input
                          type='text'
                          name='org_name'
                          id="org_name"
                          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                          placeholder='IIT'
                          required
                          value={org_name}
                          onChange={handleorg_nameChange}
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
                          value={employee_id}
                          onChange={handleEmpCodeChange}
                        />
                      </div>


                      <div className="relative">
                        <button
                          type='submit'
                          className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        >
                          {selectedRecord ? "Update Info" : "Add Officer"}
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
