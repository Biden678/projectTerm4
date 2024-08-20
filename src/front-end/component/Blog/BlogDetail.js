import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Comment } from './Comment';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import '../../css/blog/blog.css';
import axios from 'axios';

// Define schema for form validation
const schema = yup.object().shape({
  message: yup.string().required('Message is required'),
});

function BlogDetail() {
  const { id } = useParams();
  const [blogPostData, setBlogPostData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));


  console.log("user id : "+user?.cus_id);
  console.log("user name : "+user?.cus_name);
  console.log("user phone : "+user?.cus_phone);
  
  // Initialize the navigate function inside the component
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await fetch(`http://localhost:9999/api/blog/${id}`);
        const data = await response.json();
        setBlogPostData(data);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogDetail();
  }, [id]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(`http://localhost:9999/api/comment/blog/${id}`);
        const data = await response.json();
        setCommentsData(data);
        console.log(">>>comments list: ", data)
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComment();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:9999/api/comment', {
        ...data,
        blogid: { id },
        userid: { id: 2 }
      }, {
        headers: { 'Content-Type': 'application/json' }
      });



      if (response.status === 200) {
        const newComment = response.data;
        const addToTree = (comments, newComment) => {
          return comments.map((comment) => {
            if (comment.id === newComment.parent?.id) {
              return {
                ...comment,
                children: [...(comment.children || []), newComment],
              };
            } else if (comment.children && Array.isArray(comment.children)) {
              return {
                ...comment,
                children: addToTree(comment.children, newComment),
              };
            }
            return comment;
          });
        };

        const newCommentWithTimestamps = {
          ...newComment,
          children: newComment.children || [],
        };

        if (newComment.parent && newComment.parent.id) {
          setCommentsData((prevComments) =>
            addToTree(newCommentWithTimestamps, prevComments)
          );
        } else {
          setCommentsData((prevComments) => [newCommentWithTimestamps, ...prevComments]);
        }
        reset();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleDelete = async (id, isReply = false) => {
    try {
      const url = `http://localhost:9999/api/comment/${id}`;
      const res = await axios.delete(url);

      if (res.status === 204) {
        const removeCommentFromTree = (comments, commentId) => {
          return comments
            .map((comment) => {
              if (comment.id === commentId) {
                return null;
              } else if (comment.children && comment.children.length > 0) {
                return {
                  ...comment,
                  children: removeCommentFromTree(comment.children, commentId),
                };
              }
              return comment;
            })
            .filter((comment) => comment !== null);
        };
        setCommentsData((prevComments) => removeCommentFromTree(prevComments, id));

      }
    } catch (error) {
      console.error('Error deleting comment or reply:', error);
    }
  };

  const handleReply = async (commentId, replyMessage) => {
    try {
      const response = await axios.post('http://localhost:9999/api/comment', {
        parent: { id: commentId },
        message: replyMessage,
        blogid: { id },
        userid: { id: 1 }
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        const newReply = response.data;
        const addToTree = (comments, newComment) => {
          return comments.map((comment) => {
            if (comment.id === newComment.parent?.id) {
              return {
                ...comment,
                children: [...(comment.children || []), newComment],
              };
            } else if (comment.children && Array.isArray(comment.children)) {
              return {
                ...comment,
                children: addToTree(comment.children, newComment),
              };
            }
            return comment;
          });
        };

        const newCommentWithTimestamps = {
          ...newReply,
          children: newReply.children || [],
        };

        if (newReply.parent && newReply.parent.id) {
          setCommentsData((prevComments) =>
            addToTree(prevComments, newCommentWithTimestamps)
          );
        } else {
          setCommentsData((prevComments) => [...prevComments, newCommentWithTimestamps]);
        }
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    }
  };

  const handleEdit = async (commentId, message) => {
    const updateCommentInTree = (comments, commentId, updatedContent) => {
      const currentTime = new Date().toISOString();
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            message: updatedContent,
            updatedAt: currentTime,
          };
        } else if (comment.children && comment.children.length > 0) {
          return {
            ...comment,
            children: updateCommentInTree(comment.children, commentId, updatedContent),
          };
        }
        return comment;
      });
    };

    try {
      const res = await axios.put(`http://localhost:9999/api/comment/${commentId}`, {
        message
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.status === 200) {
        setCommentsData((prevComments) =>
          updateCommentInTree(prevComments, commentId, message)
        );
      }


    } catch (error) {
      console.log(">>>Error: ", error)
    }

  }


  if (!blogPostData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-wrapper">
      <section className="section blog-wrap">
        <div className="container">
          <div className="row" style={{ marginTop: '15%' }}>
            <div className="col-lg-12">
              <div className="mb-4">
                <button className="btn btn-secondary" onClick={() => navigate('/blog')}>
                  Back to Blog List
                </button>
              </div>
              <div className="col-lg-12 row">
                <div className="single-blog-item col-lg-12" style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src={`http://localhost:9999/api/blog/getImage/${blogPostData.image}`} alt="" className="img-fluid rounded" style={{ width: '500px', height: 'auto' }} />
                </div>
                <div className="blog-item-content col-lg-12">
                  <div className="blog-item-meta">
                    <span>{blogPostData.typeid?.type}</span>
                    <span>{format(new Date(blogPostData.date), 'yyyy-MM-dd')}</span>
                  </div>
                  <h1 className="mt-3 mb-4">{blogPostData.title}</h1>
                  <p
                    className="lead mb-4"
                    style={{
                      whiteSpace: 'pre-wrap', // Preserves whitespace and line breaks
                      overflowWrap: 'break-word', // Prevents long words from overflowing
                      wordBreak: 'break-word', // Breaks long words if necessary
                    }}
                    dangerouslySetInnerHTML={{ __html: blogPostData.content }}
                  ></p>
                </div>
              </div>

              <div className="col-lg-12">
                <form className="comment-form my-5" onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="mb-4">Write a comment</h4>
                  <textarea
                    className="form-control mt-4"
                    rows="6"
                    placeholder="Message"
                    {...register('message')}
                  ></textarea>
                  {errors.message && <p className="text-danger">{errors.message.message}</p>}
                  <button type="submit" className="btn btn-main mt-3">Submit</button>
                </form>
              </div>

              <div className="col-lg-12">
                <div className="comment-area mt-4 mb-5">
                  <h4 className="mb-4">Comments</h4>
                  <ul className="comment-tree list-unstyled">
                    
                    {commentsData.map((comment) => (
                      <Comment
                        key={comment.id}
                        id={comment.id}
                        name={comment.name}
                        createdAt={comment.createdAt}
                        message={comment.message}
                        replies={comment.children}
                        onReply={handleReply}
                        onDelete={handleDelete}
                        onUpdate={handleEdit}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogDetail;