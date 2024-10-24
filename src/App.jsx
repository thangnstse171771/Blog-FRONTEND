import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/users', formData);
    setFormData({ name: '', email: '', message: '' });
    fetchUsers();  // refresh the list of users
  };

  return (
    <div className="container">
      <h1>Simple Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="Message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Submissions</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>{user.name}</strong> ({user.email}): {user.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
