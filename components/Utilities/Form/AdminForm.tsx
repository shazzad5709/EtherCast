import React, { useEffect, useState } from "react";
import Button from "../Button";
import { BiUser, BiIdCard, BiEdit, BiTrashAlt } from "react-icons/bi";
import axios from "axios";
import { Chairman } from "@prisma/client";
import { render } from "react-dom";
import useSWR from "swr";
import ChairmanTable from "../../Table/AdminTable";
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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

  return (
    <>
      <div>
        <div className="flex flex-col">
          <button onClick={toggleForm}>Add Chairman</button>
        </div>
        <br />
        <br />

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
        
        </div>
      
    </>
  );
}
