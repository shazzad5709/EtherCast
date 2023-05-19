import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import user from '../../../model/user';
import Form from './UpdateForm';

interface Chairman {
  id: string;
  org_name: string;
  name: string;
  email: string;
  userId: string; // Add the userId property here
}

const ChairmanTable = () => {
  const [chairmen, setChairmen] = useState<Chairman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedChairman, setSelectedChairman] = useState<Chairman | null>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchChairmen = async () => {
      try {
        const response = await axios.get('/api/data/createdChairman');
        setChairmen(response.data);
        setLoading(false);
      } catch (error) {
        setError('Something went wrong while fetching chairmen.');
        setLoading(false);
      }
    };

    fetchChairmen();
  }, []);

  const handleEdit = (id: string) => {
    const chairman = chairmen.find((chairman) => chairman.id === id);
    setSelectedChairman(chairman !== undefined ? chairman : null);
    toggleForm();
  };

  const handleUpdate = async (updatedChairman: Chairman) => {
    try {
      await axios.put(`/api/data/${updatedChairman.id}`, updatedChairman);
      const updatedChairmen = chairmen.map((chairman) =>
        chairman.id === updatedChairman.id ? updatedChairman : chairman
      );
      setChairmen(updatedChairmen);
      setSelectedChairman(null);
      toggleForm();
    } catch (error) {
      console.log('Something went wrong while updating chairman.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/data/${id}`);
      const newChairmen = chairmen.filter((chairman) => chairman.id !== id);
      setChairmen(newChairmen);
    } catch (error) {
      console.log('Something went wrong while deleting chairman.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
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
          chairman={selectedChairman}
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
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {chairmen.map((chairman) => (
              <tr key={chairman.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {chairman.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {chairman.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {chairman.org_name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <button type="button" onClick={() => handleEdit(chairman.id)}>
                    <BiEdit size={25} color="rgb(0, 131, 143)" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(chairman.id)}
                  >
                    <BiTrashAlt size={25} color="rgb(244,63,94)" />
                  </button>
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

export default ChairmanTable;
