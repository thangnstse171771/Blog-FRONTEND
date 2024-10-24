import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const fetchUsers = async () => {
    const res = await axios.get(
      "https://blog-backend-xy27.onrender.com/api/users"
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "https://blog-backend-xy27.onrender.com/api/users",
      formData
    );
    setFormData({ name: "", email: "", message: "" });
    fetchUsers(); // refresh the list of users
  };

  return (
    <div className="app">
      <header>
        <div className="logo">My Blog</div>
        <nav>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="container">
          <h1>Simple Blog</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
            <button type="submit">Submit</button>
          </form>

          <h2>Submissions</h2>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <strong>{user.name}</strong> ({user.email}): {user.message}
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 My Blog. All Rights Reserved.</p>
        <p>
          Follow us on <a href="#twitter">Twitter</a> |{" "}
          <a href="#facebook">Facebook</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
