// components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ currentUser, handleLogout }) {
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>MyBlogApp</div>
      <div style={styles.links}>
        <Link style={styles.link} to="/blog">Blog Feed</Link>
        <Link style={styles.link} to="/friends">Friends</Link>
        <span style={styles.user}>Hello, {currentUser}</span>
        <button style={styles.button} onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: '10px 20px',
    color: 'white',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '500',
  },
  user: {
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#0056b3',
    border: 'none',
    padding: '6px 12px',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Navbar;
