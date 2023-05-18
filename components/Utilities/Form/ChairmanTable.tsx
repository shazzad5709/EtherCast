import { useEffect, useState } from 'react';
import axios from 'axios';

interface Chairman {
  id: string;
  org_name: string;
  name: string;
  email: string;
}

const ChairmanTable = () => {
  const [chairmen, setChairmen] = useState<Chairman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchChairmen = async () => {
      try {
        const response = await axios.get('../api/data/createdChairman');
        setChairmen(response.data);
        setLoading(false);
      } catch (error) {
        // console.log(error+"000000000000000000")
        setError('Something went wrong while fetching chairmen.');
        setLoading(false);
      }
    };

    fetchChairmen();
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Org Name</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {chairmen.map((chairman) => (
          <tr key={chairman.id}>
            <td>{chairman.org_name}</td>
            <td>{chairman.name}</td>
            <td>{chairman.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ChairmanTable;
