import { Voter } from '@prisma/client';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';

interface FormProps {
  buttonName: string;
  voter: Voter | null | undefined;
  onUpdate: (updatedVoter: Voter) => void;
}

  const Form = ({ buttonName, voter, onUpdate }: FormProps) => {
  const [name, setName] = useState(voter?.name || '');
  const [email, setEmail] = useState(voter?.email || '');
  const [orgName, setOrgName] = useState(voter?.org_name || '');
  const [employee_id, setEmpCode] = useState(voter?.employee_id|| '');
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedVoter: Voter = {
        id: voter?.id || '',
        name: name || '',
        email: email || '',
        org_name: orgName || '',
        employee_id: employee_id || '',
        userId: voter?.userId || '',
        candidateId: null
    };
    await onUpdate(updatedVoter);
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
              <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
                <BiUser className="text-gray-400 m-2" />
                <div className="relative">
                  <input
                    type="text"
                    id="employee_id"
                    value={employee_id}
                    onChange={(e) => setEmpCode(e.target.value)}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Employee ID"
                  />
                </div>
              </div>
      <button type="submit">{buttonName}</button>
    </form>
    </>
  );
};

export default Form;
