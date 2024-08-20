import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import DOMPurify from 'dompurify';

function BlogDetailBasicList(props) {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        async function handleFetchBlog() {
            try {
                const response = await axios.get(`http://localhost:9999/api/blog/${id}`);
                if (response.status === 200) {
                    setBlog(response.data);
                }
            } catch (error) {
                console.log("Something Wrong:", error);
            }
        }
        handleFetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="col-lg-12">
            <style>
                {`
                    .blog-detail-table {
                        width: 100%;
                        overflow: visible;
                    }

                    .blog-detail-table .content-cell {
                        white-space: pre-wrap; /* Bảo tồn khoảng trắng và xuống dòng */
                        word-break: break-word; /* Ngắt từ dài */
                        overflow: visible; /* Đảm bảo không có tràn */
                    }

                    .card {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }

                    .table-responsive {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }

                    .table {
                        width: 100%;
                        min-width: 100%; /* Đảm bảo bảng mở rộng đầy đủ */
                        table-layout: fixed; /* Đảm bảo bảng không bị thu nhỏ */
                    }
                `}
            </style>
            <div className="d-flex align-items-stretch">
                <div className="card w-100">
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Blog Detail</h3>
                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle blog-detail-table"> {/* Thêm className */}
                                <tbody>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Image : </h6>
                                        </th>
                                        <td>
                                            <img src={`http://localhost:9999/api/blog/getImage/${blog.image}`} alt="Blog" style={{ width: '200px', height: 'auto' }} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Title : </h6>
                                        </th>
                                        <td>{blog.title}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Date : </h6>
                                        </th>
                                        <td>{format(new Date(blog.date), 'yyyy-MM-dd')}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Type : </h6>
                                        </th>
                                        <td>{blog.typeid?.type}</td>
                                    </tr>
                                    {/* <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Content : </h6>
                                        </th>
                                        <td className="content-cell">{blog.content}</td>  //Thêm className 
                                    </tr> */}

                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Content:</h6>
                                        </th>
                                        <td className="content-cell">
                                            <div
                                                style={{
                                                    whiteSpace: 'pre-wrap', // Preserves whitespace and line breaks
                                                    overflowWrap: 'break-word', // Prevents long words from overflowing
                                                    wordBreak: 'break-word', // Breaks long words if necessary
                                                }}
                                                dangerouslySetInnerHTML={{ __html: blog.content }}
                                            />
                                        </td>
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

export default BlogDetailBasicList;
