// components/BlogPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BlogPage({ currentUser, posts, setPosts, friends }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const userFriends = friends[currentUser] || [];

  const handlePost = (e) => {
    e.preventDefault();
    if (!content.trim() && !image) return;

    const newPost = {
      author: currentUser,
      content,
      likes: 0,
      image: image ? URL.createObjectURL(image) : null,
    };

    setPosts((prev) => [...prev, newPost]);
    setContent('');
    setImage(null);
  };

  const handleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };

  const visiblePosts = posts.filter(
    (post) => post.author === currentUser || userFriends.includes(post.author)
  );

  return (
    <div className="container">
      <h2>Welcome, {currentUser}</h2>
      <form onSubmit={handlePost}>
        <label>Add Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <textarea
          placeholder="Write your blog..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Post</button>
      </form>

      <h3>Posts from You and Your Friends</h3>
      <div className="scroll-area">
        {visiblePosts.length === 0 && <p>No posts to show.</p>}
        {visiblePosts.map((post, index) => (
          <div className="blog-post" key={index}>
            <strong>{post.author}</strong>
            {post.image && (
              <img
                src={post.image}
                alt="blog upload"
                className="blog-image"
              />
            )}
            <p>{post.content}</p>
            <button onClick={() => handleLike(index)}>
              Like ({post.likes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogPage;
