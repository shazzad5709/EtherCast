import { Chairman } from '@prisma/client';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';

interface FormProps {
    buttonName: string;
    chairman: Chairman | undefined | null;
    onUpdate: (updatedChairman: Chairman) => void;
  }


  const Form = ({ buttonName, chairman, onUpdate }: FormProps) => {
  const [name, setName] = useState(chairman?.name || '');
  const [email, setEmail] = useState(chairman?.email || '');
  const [orgName, setOrgName] = useState(chairman?.org_name || '');
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedChairman: Chairman = {
      id: chairman?.id || '',
      name: name || '',
      email: email || '',
      org_name: orgName || '',
      userId: chairman?.userId || '',
      electionId: null,
      privateKey: null,
      electionCreated: false
    };
    await onUpdate(updatedChairman);
  };
  

  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
      <BiUser className="text-gray-400 m-2" />
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Org Name"
                  />
                </div>
              </div>
      <button type="submit">{buttonName}</button>
    </form>
    </>
  );
};

export default Form;
