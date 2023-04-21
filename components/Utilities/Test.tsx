import { useState } from 'react';

type Record = {
  id: number;
  name: string;
  email: string;
};

export default function Test() {
  const [records, setRecords] = useState<Record[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = new Date().getTime();
    const newRecord = { id, name, email };

    let newRecords;
    if (selectedRecord) {
      newRecords = records.map((record) =>
        record.id === selectedRecord.id ? newRecord : record
      );
    } else {
      newRecords = [...records, newRecord];
    }

    setRecords(newRecords);
    setSelectedRecord(null);
    setName('');
    setEmail('');
  };

  const handleEdit = (id: number) => {
    const selectedRecord = records.find((record) => record.id === id);
    if (selectedRecord) {
      setSelectedRecord(selectedRecord);
      setName(selectedRecord.name);
      setEmail(selectedRecord.email);
    }
  };

  const handleDelete = (id: number) => {
    const newRecords = records.filter((record) => record.id !== id);
    setRecords(newRecords);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={handleEmailChange} />
        </div>
        <button type="submit">{selectedRecord ? 'Update' : 'Create'}</button>
        {selectedRecord && (
          <button type="button" onClick={() => setSelectedRecord(null)}>
            Cancel
          </button>
        )}
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>
                <button type="button" onClick={() => handleEdit(record.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(record.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
