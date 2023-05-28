import React, { useEffect, useState } from "react";
import Button from "../Button";
import { BiUser, BiIdCard, BiEdit, BiTrashAlt } from "react-icons/bi";
import axios from "axios";
import { Chairman } from "@prisma/client";
import { render } from "react-dom";
import useSWR from "swr";
import ChairmanTable from "../../Table/AdminTable";
import { InfinitySpin } from "react-loader-spinner";
import toast from "react-hot-toast";

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


export default function Form({ buttonName }: Props) {
  const [selectedRecord, setSelectedRecord] = useState<FormData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org_name, setorg_name] = useState("");
  const [showForm, setShowForm] = useState(false); // initial state is false
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const res = await axios
      .post("./api/data/Admin/createdChairman", {
        name: name,
        email: email,
        org_name: org_name,
      })
      .then((res) => {
        toast.success("Chairman Added Successfully");
      })
      .catch((err) => {
        toast.error(err.response.data.message)
      });
    const election_id = "1";

    setSelectedRecord(null);
    setName("");
    setEmail("");
    setorg_name("");
    toggleForm();
    setLoading(false);
  };


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handleorg_nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setorg_name(event.target.value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
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
    <>
      <div>
        <div className="flex w-full flex-col">
          <button
            type='submit'
            className='w-40 text-white bg-green hover:bg-primary-700 font-medium
            rounded-lg text-md px-5 py-2.5 text-center'
            onClick={toggleForm}>Add Chairman</button>
        
        </div>
        <br />
        <div>
          {showForm && (
            <div >
            <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
              <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>

                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                  <h4 className='text-xl font-bold leading-tight tracking-tight md:text-xl'>
                    Add New Chairman
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

                    <div className="relative">
                      <button
                        type='submit'
                        className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                      >
                        {selectedRecord ? "Update Info" : "Add Chairman"}
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
