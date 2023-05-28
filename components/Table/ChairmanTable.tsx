import { useEffect, useState } from 'react';
import axios from 'axios';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import user from '../../model/user';
import Form from '../UpdatedForm/ChairmanUpdate';
import {InfinitySpin} from "react-loader-spinner";

interface Officer {
  id: string;
  org_name: string;
  employee_id: string;
  name: string | null ; // Add the name property here
  email: string | null ; // Add the email property here
  userId: string;
}



const ChairmanTable = () => {
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedOfficer, setSelectedOfficer] = useState<Officer | null>(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    const fetchChairmen = async () => {
      try {
        const response = await axios.get('/api/data/Admin/check');
        const data = response.data;
        // console.log(data);
        
        setLoading(false);

        // Check the value of chairmen
        if (data) {
          
          setShowTable(false); // Don't show the form
        } else {
          setShowTable(true); // Show the form
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchChairmen();
    
  }, []); // Call fetchChairmen on component mount (empty dependency array)
  
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const fetchOfficers = async () => {
    try {
      const response = await axios.get('/api/data/Chairman/createdOfficer');
      setOfficers(response.data);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong while fetching Officers.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
    const interval = setInterval(fetchOfficers, 50000);
    return () => clearInterval(interval);
  }, [officers]);

  const handleEdit = (id: string) => {
    const officer = officers.find((officer) => officer.id === id);
    setSelectedOfficer(officer !== undefined ? officer : null);
    toggleForm();
  };

  const handleUpdate = async (updatedOfficer: Officer) => {
    try {
      await axios.put(`/api/data/Chairman/${updatedOfficer.id}`, updatedOfficer);
      fetchOfficers(); // Fetch the updated data after updating
      setSelectedOfficer(null);
      toggleForm();
    } catch (error) {
      console.log('Something went wrong while updating Officer.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/data/Chairman/${id}`);
      fetchOfficers(); // Fetch the updated data after deleting
    } catch (error) {
      console.log('Something went wrong while deleting Officer.');
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
    return <p>Error: Something went wrong when fetching Officers...</p>;
  }

  return (
    <>
    <div>
    {showForm && (
        <Form
          buttonName="Update User"
          officer={selectedOfficer}
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
                Employee Code
              </th>
              {showTable && (
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>)}
            </tr>
          </thead>
          <tbody>
            {officers.map((officer) => (
              <tr key={officer.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  {officer.name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  {officer.email}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  {officer.org_name}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  {officer.employee_id}
                </td>
                {showTable && (
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
                  <button type="button" onClick={() => handleEdit(officer.id)}>
                    <BiEdit size={25} color="rgb(0, 131, 143)" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(officer.id)}
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
