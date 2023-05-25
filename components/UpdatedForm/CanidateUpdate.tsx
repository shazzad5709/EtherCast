import { Candidate } from '@prisma/client';
import { useState } from 'react';
import { BiUser } from 'react-icons/bi';

interface FormProps {
  buttonName: string;
  candidate: Candidate | null | undefined;
  onUpdate: (updatedCandidate: Candidate) => void;
}

  const Form = ({ buttonName, candidate, onUpdate }: FormProps) => {
  const [name, setName] = useState(candidate?.name || '');
  const [email, setEmail] = useState(candidate?.email || '');
  const [agenda, setAgenda] = useState(candidate?.agenda || '');
  const [symbol, setSymbol] = useState(candidate?.symbol|| '');
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const updatedCandidate: Candidate = {
        id: candidate?.id || '',
        name: name || '',
        email: email || '',
        agenda: agenda || '',
        symbol: symbol || '',
        voterId: '',
        voteCount: 0
    };
    await onUpdate(updatedCandidate);
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
                    id="agenda"
                    value={agenda}
                    onChange={(e) => setAgenda(e.target.value)}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Agenda"
                  />
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4">
                <BiUser className="text-gray-400 m-2" />
                <div className="relative">
                  <input
                    type="text"
                    id="symbol"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    className="h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                    placeholder="Symbol"
                  />
                </div>
              </div>
      <button type="submit">{buttonName}</button>
    </form>
    </>
  );
};

export default Form;
