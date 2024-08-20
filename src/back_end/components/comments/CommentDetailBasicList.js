import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { format } from 'date-fns';

function CommentDetailBasicList(props) {
    const { id } = useParams();
    const [comment, setComment] = useState(null);

    useEffect(() => {
        async function handleFetchComment() {
            try {
                const response = await axios.get(`http://localhost:9999/api/comment/${id}`);
                if (response.status === 200) {
                    setComment(response.data);
                    // setIsSale(response.data.status);
                }
            } catch (error) {
                console.log("Something Wrong:", error);
            }
        }
        handleFetchComment();
    }, [id]);

    if (!comment) {
        return <div>Loading...</div>;
    }



    return (
        <div className="col-lg-12">
            <div className="d-flex align-items-stretch">
                <div className="card w-100">
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Comment Detail
                        </h3>

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <tbody>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">ID : </h6>
                                        </th>
                                        <td>{comment.id}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">User : </h6>
                                        </th>
                                        <td>{comment.userid?.name || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Date : </h6>
                                        </th>
                                        <td>{format(new Date(comment.updatedAt), 'yyyy-MM-dd')}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Blog Post : </h6>
                                        </th>
                                        <td>{comment.blogid?.title || 'N/A'}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Message : </h6>
                                        </th>
                                        <td>{comment.message}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CommentDetailBasicList;
