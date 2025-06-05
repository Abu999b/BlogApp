// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BlogPage from './components/BlogPage';
import Friends from './components/Friends';
import Navbar from './components/Navbar';

function App() {
  const [users, setUsers] = useState({}); // { username: password }
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]); // { author, content, likes }
  const [friends, setFriends] = useState({}); // { username: [friendUsernames] }
  const [friendRequests, setFriendRequests] = useState({}); // { username: [requesterUsernames] }

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      {currentUser && (
        <Navbar currentUser={currentUser} handleLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/" element={<Navigate to={currentUser ? "/blog" : "/login"} />} />
        <Route
          path="/register"
          element={<Register users={users} setUsers={setUsers} />}
        />
        <Route
          path="/login"
          element={<Login users={users} setCurrentUser={setCurrentUser} />}
        />
        <Route
          path="/blog"
          element={
            <BlogPage
              currentUser={currentUser}
              posts={posts}
              setPosts={setPosts}
              friends={friends}
            />
          }
        />
        <Route
          path="/friends"
          element={
            <Friends
              currentUser={currentUser}
              users={users}
              friends={friends}
              setFriends={setFriends}
              friendRequests={friendRequests}
              setFriendRequests={setFriendRequests}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
