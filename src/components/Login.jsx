// components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ users, setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users[username] && users[username] === password) {
      setCurrentUser(username);
      setLoginFailed(false);
      navigate('/blog');
    } else {
      setLoginFailed(true);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      {loginFailed && (
        <>
          <p style={{ color: 'red' }}>Login failed. User not found or incorrect password.</p>
          <button onClick={() => navigate('/register')}>Register</button>
        </>
      )}
    </div>
  );
}

export default Login;
