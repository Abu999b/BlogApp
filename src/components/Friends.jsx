// components/Friends.jsx
import React, { useState } from 'react';

function Friends({
  currentUser,
  users,
  friends,
  setFriends,
  friendRequests,
  setFriendRequests,
}) {
  const [requestTo, setRequestTo] = useState('');
  const [message, setMessage] = useState('');

  if (!currentUser) {
    return <p>Please login to manage friends.</p>;
  }

  const incomingRequests = friendRequests[currentUser] || [];
  const currentFriends = friends[currentUser] || [];

  const sendRequest = () => {
    if (!requestTo || requestTo === currentUser) {
      setMessage('Invalid username.');
      return;
    }
    if (!users[requestTo]) {
      setMessage('User does not exist.');
      return;
    }
    if (currentFriends.includes(requestTo)) {
      setMessage('User is already your friend.');
      return;
    }
    if ((friendRequests[requestTo] || []).includes(currentUser)) {
      setMessage('Friend request already sent.');
      return;
    }

    setFriendRequests(prev => {
      const updated = { ...prev };
      if (!updated[requestTo]) updated[requestTo] = [];
      updated[requestTo].push(currentUser);
      return updated;
    });
    setMessage('Friend request sent!');
    setRequestTo('');
  };

  const acceptRequest = (requester) => {
    // Add each other as friends
    setFriends(prev => {
      const updated = { ...prev };
      if (!updated[currentUser]) updated[currentUser] = [];
      if (!updated[requester]) updated[requester] = [];

      if (!updated[currentUser].includes(requester)) updated[currentUser].push(requester);
      if (!updated[requester].includes(currentUser)) updated[requester].push(currentUser);

      return updated;
    });

    // Remove request from incoming list
    setFriendRequests(prev => {
      const updated = { ...prev };
      updated[currentUser] = updated[currentUser].filter(u => u !== requester);
      return updated;
    });
  };

  const declineRequest = (requester) => {
    setFriendRequests(prev => {
      const updated = { ...prev };
      updated[currentUser] = updated[currentUser].filter(u => u !== requester);
      return updated;
    });
  };

  return (
    <div className="container">
      <h2>Friends</h2>

      <section>
        <h3>Send Friend Request</h3>
        <input
          type="text"
          placeholder="Enter username"
          value={requestTo}
          onChange={(e) => setRequestTo(e.target.value)}
        />
        <button onClick={sendRequest}>Send Request</button>
        {message && <p>{message}</p>}
      </section>

      <section>
        <h3>Incoming Friend Requests</h3>
        {incomingRequests.length === 0 && <p>No incoming requests.</p>}
        {incomingRequests.map((user) => (
          <div key={user} style={{ marginBottom: '8px' }}>
            <span>{user}</span>
            <button onClick={() => acceptRequest(user)} style={{ marginLeft: '8px' }}>Accept</button>
            <button onClick={() => declineRequest(user)} style={{ marginLeft: '4px' }}>Decline</button>
          </div>
        ))}
      </section>

      <section>
        <h3>Your Friends</h3>
        {currentFriends.length === 0 ? (
          <p>You have no friends yet.</p>
        ) : (
          <ul>
            {currentFriends.map(friend => (
              <li key={friend}>{friend}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Friends;
