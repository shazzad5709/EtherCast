import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import user from '../../model/user';
import Form from '../UpdatedForm/AdminUpdate';
import {InfinitySpin} from "react-loader-spinner";

interface Chairman {
  id: string;
  org_name: string;
  name: string | null;
  email: string | null;
  userId: string; // Add the userId property here
}

const AdminTable = () => {
  const [chairmen, setChairmen] = useState<Chairman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedChairman, setSelectedChairman] = useState<Chairman | null>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchChairmen = async () => {
    try {
      const response = await axios.get('/api/data/Admin/createdChairman');
      setChairmen(response.data);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong while fetching chairmen.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChairmen();
    const interval = setInterval(fetchChairmen, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [chairmen, setChairmen]);

  const handleEdit = (id: string) => {
    const chairman = chairmen.find((chairman) => chairman.id === id);
    setSelectedChairman(chairman !== undefined ? chairman : null);
    toggleForm();
  };

  const handleUpdate = async (updatedChairman: Chairman) => {
    try {
      await axios.put(`/api/data/Admin/${updatedChairman.id}`, updatedChairman);
      fetchChairmen(); // Fetch the updated data after updating
      setSelectedChairman(null);
      toggleForm();
    } catch (error) {
      console.log('Something went wrong while updating chairman.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/data/Admin/${id}`);
      fetchChairmen(); // Fetch the updated data after deleting
    } catch (error) {
      console.log('Something went wrong while deleting chairman.');
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
    {/* <br /><br /> */}
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Organization Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {chairmen.map((chairman) => (
              <tr key={chairman.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  {chairman.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  {chairman.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  {chairman.org_name}
                </td>
                
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
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

export default AdminTable;
