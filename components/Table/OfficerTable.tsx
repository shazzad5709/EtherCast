import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiEdit, BiTrashAlt, BiAddToQueue } from 'react-icons/bi';
import Form from '../UpdatedForm/ChairmanUpdate';
import { InfinitySpin } from "react-loader-spinner";

import { TiTick } from 'react-icons/ti';
import { toast } from 'react-hot-toast';

interface Voter {
  id: string;
  org_name: string;
  employee_id: string;
  name: string | null;
  email: string | null;
  userId: string;
  isCandidate: boolean;
}
interface User {
  id: string;
  org_name: string;
  employee_id: string;
  name: string | null;
  email: string | null;
  userId: string;
  role: string;
}



const ChairmanTable = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [user, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [showButton,setShowButton] = useState(false);

  useEffect(() => {
    const fetchChairmen = async () => {
      try {
        const response = await axios.get('/api/data/Admin/check');
        const data = response.data;
        
        if (data) {
          
          setShowButton(true); //  show button
        } else {
          setShowButton(false); // don't Show the button
        }
      } catch (error) {
        // setLoading(false);
      }
    };

    fetchChairmen();
    
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchVoters = async () => {
    try {
      const response = await axios.get('/api/data/Officer/createdVoter');
      setVoters(response.data);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong while fetching Voters.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoters();
    // const interval = setInterval(fetchOfficers, 50000);

    // return () => clearInterval(interval);
  }, [voters]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/data/User/createdUser');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong while fetching Voters.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // const interval = setInterval(fetchUsers, 50);

    // return () => clearInterval(interval);
  }, [user]);

  const handleEdit = (id: string) => {
    const voter = voters.find((voter) => voter.id === id);
    setSelectedVoter(voter !== undefined ? voter : null);
    toggleForm();
  };

  const handleUpdate = async (updatedVoter: Voter) => {
    try {
      await axios.put(`/api/data/Officer/${updatedVoter.id}`, updatedVoter);
      fetchVoters();
      setSelectedVoter(null);
      toggleForm();
    } catch (error) {
      console.log('Something went wrong while updating Votersssssss');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/data/Officer/${id}`);
      fetchVoters();
    } catch (error) {
      console.log('Something went wrong while deleting Voterssssss.');
    }
  };

  const handleCandidacy = async (id: any) => {
    try {
      await axios.put(`/api/data/User/${id}`, { role: 'CANDIDATE' });

      fetchUsers();
      toast.success('User is now a candidate');
    } catch (error) {
      console.log('Something went wrong while updating the role.');
    }
    createCandidates();
  };


  const createCandidates = async () => {
    try {
      const response = await axios.post('/api/data/Officer/createCandidate');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error creating candidates:', error);
    }
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

  // if (error) {
  //   // return <p>Error: {error}</p>;
  //   alert(error);
  // }

  return (
    <>
      <div>
        {showForm && (
          <Form
            buttonName="Update User"
            voter={selectedVoter}
            onUpdate={handleUpdate}
          />
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
                {showButton && (
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Candidacy
                </th>
                )}
                {showButton && (
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
                )}
              </tr>
            </thead>
            <tbody>
              {voters.map((voter) => (
                <tr key={voter.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {voter.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {voter.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {voter.org_name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {voter.employee_id}
                  </td>
                  {showButton && (
                  <td className="px-5 py-5 border-b flex items-center justify-center border-gray-200 bg-white text-sm">
                    <button type="button" onClick={() => handleCandidacy(voter.id)}>
                      {!voter.isCandidate ? (

                        <BiAddToQueue size={25} color="rgb(27, 166, 43)" />
                      ) : (
                        <TiTick size={37} color="rgb(0, 131, 143)" />
                      )}
                    </button>
                  </td>
                  )}
                  {showButton && (
                  <td className="px-5 py-5 border-b  border-gray-200 bg-white text-sm">
                    <button type="button" onClick={() => handleEdit(voter.id)}>
                      <BiEdit size={25} color="rgb(0, 131, 143)" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(voter.id)}
                    >
                      <BiTrashAlt size={25} color="rgb(244,63,94)" />
                    </button>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ChairmanTable;
