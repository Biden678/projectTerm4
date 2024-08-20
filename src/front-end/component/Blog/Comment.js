import React, { useState } from 'react';
import { format } from 'date-fns';
import Dropdown from 'react-bootstrap/Dropdown';

export const Comment = ({ id, name, createdAt, message, replies = [], onReply, onDelete, onUpdate }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [reply, setReply] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState(message);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(id, reply);
    setReply('');
    setShowReplyForm(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onUpdate(id, editMessage);
    setIsEditing(false);
  };

  return (
    <li className="mb-5">
      <div className="comment-area-box">
        <div className="d-flex justify-content-between">
          <h5 className="mb-1">{name}</h5>
          <Dropdown>
            <Dropdown.Toggle as="span" id="dropdown-basic">
              <i className="icofont-ui-settings"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setIsEditing(true)}>Edit Comment</Dropdown.Item>
              <Dropdown.Item onClick={() => onDelete(id, false)}>Delete Comment</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="comment-meta mt-4 mt-lg-0 mt-md-0 float-lg-right float-md-right">
          <a onClick={() => setShowReplyForm(!showReplyForm)} style={{ color: 'green' }}>
            <i className="icofont-reply mr-2 text-muted"></i>Reply
          </a>
          <span className="date-comm"> | Posted {format(new Date(createdAt), 'yyyy-MM-dd')}</span>
        </div>
        <div className="comment-content mt-3">
          {isEditing ? (
            <form className="edit-form mt-4" onSubmit={handleEditSubmit}>
              <textarea
                className="form-control"
                rows="4"
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="btn btn-main mt-2">Save</button>
              <button type="button" className="btn btn-secondary mt-2 ml-2" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          ) : (
            <p>{message}</p>
          )}
        </div>
        {showReplyForm && (
          <form className="reply-form mt-4" onSubmit={handleReplySubmit}>
            <textarea
              className="form-control"
              rows="4"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write your reply..."
              required
            ></textarea>
            <button type="submit" className="btn btn-main mt-2">Submit Reply</button>
          </form>
        )}
        {replies.length > 0 && (
          <ul className="reply-list mt-3">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                id={reply.id}
                name={reply.name}
                createdAt={reply.createdAt}
                message={reply.message}
                replies={reply.children}
                onReply={onReply}
                onDelete={(id, isReply = true) => onDelete(id, isReply)} // Pass `isReply` as true
                onUpdate={onUpdate}
              />
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};
