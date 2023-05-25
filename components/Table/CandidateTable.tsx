import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import user from '../../model/user';
import Form from '../UpdatedForm/CanidateUpdate';
import {InfinitySpin} from "react-loader-spinner";

interface Candidate {
  id: string;
  agenda:string | null,
  symbol:string | null,
  name: string | null ; // Add the name property here
  email: string | null ; // Add the email property here
  userId: string ;
  voterId: string | null;
  voteCount: number;
}



const CandidateTable = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchCandidate = async () => {
    try {
      const response = await axios.get('/api/data/Candidate/candidateInfo');
      setCandidates(response.data);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong while fetching Officers.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidate();
    const interval = setInterval(fetchCandidate, 50);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleEdit = (id: string) => {
    const candidate = candidates.find((candidate) => candidate.id === id);
    setSelectedCandidate(candidate !== undefined ? candidate : null);
    toggleForm();
  };

  const handleUpdate = async (updatedCandidate: Candidate) => {
    try {
      await axios.put(`/api/data/Candidate/${updatedCandidate.id}`, updatedCandidate);
      fetchCandidate(); // Fetch the updated data after updating
      setSelectedCandidate(null);
      toggleForm();
    } catch (error) {
      console.log('Something went wrong while updating Officer.');
    }
  };

//   const handleDelete = async (id: string) => {
//     try {
//       await axios.delete(`/api/data/Chairman/${id}`);
//       fetchCandidate(); // Fetch the updated data after deleting
//     } catch (error) {
//       console.log('Something went wrong while deleting Officer.');
//     }
//   };

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

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
    <div>
    {showForm && (
        <Form
          buttonName="Update User"
          candidate={selectedCandidate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
    <br /><br />
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
                Agenda
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {candidate.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {candidate.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {candidate.symbol}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {candidate.agenda}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button type="button" onClick={() => handleEdit(candidate.id)}>
                    <BiEdit size={25} color="rgb(0, 131, 143)" />
                  </button>
                  {/* <button
                    type="button"
                    onClick={() => handleDelete(candidate.id)}
                  >
                    <BiTrashAlt size={25} color="rgb(244,63,94)" />
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default CandidateTable;
