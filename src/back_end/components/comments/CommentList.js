import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function CommentList(props) {
    const { handleFetchComments, setComments, comments } = useContext(AuthContext);
    const [searchTerm, setSearchTerm] = useState('');



    useEffect(() => {
        handleFetchComments();
    }, []);

    // const truncate = (str, maxLength) => {
    //     if (str.length > maxLength) {
    //         return str.substring(0, maxLength) + '...';
    //     }
    //     return str;
    // };

    const handleEditComment = async (id) => {
        try {
            const response = await axios.get(`http://localhost:9999/api/comment/${id}`);
            const comment = response.data;
            const newStatus = comment.status === 1 ? 2 : 1;

            console.log(`Current status: ${comment.status}, New status: ${newStatus}`);

            await axios.put(`http://localhost:9999/api/comment/status/${id}`, {
                status: newStatus
            });

            // Log the updated comment status
            console.log('Updated comment status:', { id, newStatus });

            setComments(prevComments =>
                prevComments.map(c =>
                    c.id === id ? { ...c, status: newStatus } : c
                )
            );
        } catch (error) {
            console.error('Failed to update comment status:', error);
        }
    };

    useEffect(() => {
        handleSearchComments();
    }, [searchTerm]);

    const handleSearchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/comment`, {
                params: { name: searchTerm }
            });
            if (response.status === 200) {
                setComments(response.data);
            }
        } catch (error) {
            console.error("Error searching Comments:", error);
        }
    };

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 7;

    useEffect(() => {
        setTotalPages(Math.ceil(comments.length / PAGE_SIZE));
    }, [comments]);
    const displayedComments = comments.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);


    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    {/* phân trang */}
                    <div className="d-flex justify-content-between mt-3">
                        <div className="d-flex">
                            <button
                                className="btn btn-outline-primary me-2 ti"
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                &#xea19;
                            </button>
                            <button
                                className="btn btn-outline-primary me-2 ti"
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                &#xea1f;
                            </button>
                        </div>
                        <div>
                            Page {currentPage} of {totalPages}
                        </div>
                    </div>
                    <br />

                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Comments</h3>
                        <div className='m-3 row'>
                            <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search . . .'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">ID</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">User</h6>
                                        </th>
                                        {/* <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Message</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Date</h6>
                                        </th> */}
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Blog Post</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Reply to Comment</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Status</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedComments.length > 0 ? (
                                        Array.isArray(displayedComments) && displayedComments.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.userid?.name || 'N/A'}</td>
                                                {/* <td>{truncate(item.message, 30)}</td>
                                                    <td>{format(new Date(item.updatedAt), 'yyyy-MM-dd')}</td> */}
                                                <td>{item.blogid?.id || 'N/A'}</td>
                                                <td>{item.parent?.id || 0}</td>
                                                <td>
                                                    <button
                                                        className={`btn btn-small ${item.status === 1 ? 'btn-outline-primary' : 'btn-outline-danger'}`}
                                                        style={{ width: 'auto' }}
                                                        onClick={() => handleEditComment(item.id)}
                                                    >
                                                        {item.status === 1 ? 'Show' : 'Hide'}
                                                    </button>
                                                </td>
                                                <td>
                                                    <Link to={`/cmtDetailAdminPage/${item.id}`} aria-expanded="false">
                                                        <button className="btn btn-outline-dark btn-small ti" style={{ width: 'auto' }}>&#xeac3;</button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">No comments found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>


                    </div>
                </div>

            </div>

        </div>

    );
}

export default CommentList;
