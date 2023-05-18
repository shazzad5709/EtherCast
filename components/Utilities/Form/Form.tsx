import React, { useEffect, useState } from "react";
import Button from "../Button";
import { BiUser, BiIdCard, BiEdit, BiTrashAlt } from "react-icons/bi";
import axios from "axios";
import { Chairman } from "@prisma/client";
import { render } from "react-dom";
import useSWR from "swr";
import ChairmanTable from "./ChairmanTable";

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

interface Officer {
  id: string;
  name: string;
  email: string;
  org_name: string;
}

export default function Form({ buttonName }: Props) {
  const [records, setRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState<FormData | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org_name, setorg_name] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [showForm, setShowForm] = useState(false); // initial state is false

  const getUsers = async () => {
    const response = await axios.get("/api/data/createdChairman");
    return response.data;
  };

  // const { data: users, error } = useSWR<Chairman[]>(
  //   "/api/data/createdChairman",
  //   getUsers
  // );

  // if (!users) {
  //   return <div>Loading...</div>;
  // }

  async function fetchUsersByElectionCode() {
    // try {
    //   const response =  await axios.get(`/api/dataOfficer/createdOfficer?election_id=1`);
    //   setUsers(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await axios
      .post("/api/data/createdChairman", {
        name: name,
        email: email,
        org_name: org_name,
      })
      .catch((err) => {
        alert("You DEAD");
      });
    const election_id = "1";

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
        <ChairmanTable />
        {/* <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"> */}
          {/* <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.org_name}
                    </td> */}
                    {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button type="button" onClick={() => handleEdit(user.id)}>
                <BiEdit size={25} color={"rgb(0, 131, 143)"} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(user.id)}
                >
                <BiTrashAlt size={25} color={"rgb(244,63,94)"}/>
                </button>
              </td> */}
                  {/* </tr>
                ))}
              </tbody> */}
            {/* </table> */}
          {/* </div> */}
        </div>
      
    </>
  );
}
