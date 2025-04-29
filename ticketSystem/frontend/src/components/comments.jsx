import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ eventId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/event/${eventId}`);
    
        setComments(res.data.data || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [eventId]);

  const handleAddComment = async () => {
    if (!newComment || newComment.trim() === '') {
      alert('Please write a comment before submitting.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to leave a comment.');
        return;
      }

      const res = await axios.post(
        `http://localhost:5000/api/comments/event/${eventId}`,
        { content: newComment },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments((prevComments) => [...prevComments, res.data.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('There was an error adding your comment.');
    }
  };

  return (
    <div>
      <h3>Comments</h3>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <>
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id}>
                  <p>
                    <strong>{comment.user?.username || 'Unknown'}</strong>: {comment.content}
                  </p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>

          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comments;
