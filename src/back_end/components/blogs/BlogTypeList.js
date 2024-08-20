import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlogTypeList(props) {
    const { handleFetchTypes, setTypes, types } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newType, setNewType] = useState({ type: '', description: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTypeId, setEditTypeId] = useState(null);
    const [blogTypeIds, setBlogTypeIds] = useState([]);
    const [inputErrors, setInputErrors] = useState({ type: '', description: '' });
    // search
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        handleFetchTypes();
        fetchBlogTypeIds();
    }, []);

    const truncate = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    };

    async function fetchBlogTypeIds() {
        try {
            const response = await axios.get("http://localhost:9999/api/blog");
            if (response.status === 200) {
                const typeIds = response.data.map(blog => blog.typeid.id);
                setBlogTypeIds(typeIds);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newType.type.trim()) {
            errors.type = 'type is required';
            isValid = false;
        } else if (newType.type.length < 2 || newType.type.length > 30) {
            errors.type = 'type must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9.,-_ ]+$/.test(newType.type)) {
            errors.type = 'type cannot contain special characters';
            isValid = false;
        } else if (types.some(type => type.type.toLowerCase() === newType.type.toLowerCase())) {
            errors.type = 'Type already exists';
            isValid = false;
        }

        if (!newType.description.trim()) {
            errors.description = 'description is required';
            isValid = false;
        } else if (newType.description.length < 2 || newType.description.length > 300) {
            errors.description = 'description must be between 2 and 300 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9., ]+$/.test(newType.description)) {
            errors.description = 'description cannot contain special characters';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditTypeId(null);
        setInputErrors({ type: '', description: '' });
        setNewType({ type: '', description: '' });
        setHasSubmitted(false);
    };

    const handleAddType = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post("http://localhost:9999/api/blog/type", newType);
            handleFetchTypes();
            fetchBlogTypeIds();
            handleCancel();

            toast.success('ADDED SUSSESSFULLY 🦄', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false,
            });


        } catch (error) {
            console.error("Error adding new type:", error);
        }
    };

    const handleEditType = (id) => {
        const typeToEdit = types.find(t => t.id === id);
        setEditTypeId(id);
        setNewType(typeToEdit);
        setIsEditing(true);
        setInputErrors({ type: '', description: '' });
    };

    const handleUpdateType = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post(`http://localhost:9999/api/blog/type`, newType);
            handleFetchTypes();
            fetchBlogTypeIds();
            handleCancel();
            toast.success('UPDATE successfully 👌', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false,
            });
        } catch (error) {
            console.error("Error updating type:", error);
        }
    };

    const handleDeleteType = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/blog/type/${id}`);
            handleFetchTypes();
            fetchBlogTypeIds();
            toast.error('Deleted type!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false,
            });
            toast.success('Type deleted successfully!', {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false,
            });
        } catch (error) {
            console.error("Error deleting type:", error);
        }
    };

    useEffect(() => {
        handleSearchTypes();
    }, [searchTerm]);

    const handleSearchTypes = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/blog/type`, {
                params: { name: searchTerm }
            });
            if (response.status === 200) {
                setTypes(response.data);
            }
        } catch (error) {
            console.error("Error searching types:", error);
        }
    };

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 5;

    useEffect(() => {
        setTotalPages(Math.ceil(types.length / PAGE_SIZE));
    }, [types]);
    const displayedTypes = types.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">

                <div className="card w-100">

                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    <div className="card-body p-4">
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
                        <br/>
                        <h3 className="fw-semibold mb-4">Types</h3>
                        <div className='m-3 row'>
                            <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search by type'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {(isAdding || isEditing) && (
                            <form>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editTypeId} />
                                )}
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameType" className="form-label" style={{ float: 'left' }}>
                                        type
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.type ? 'is-invalid' : ''}`}
                                        id="nameType"
                                        value={newType.type}
                                        onChange={(e) => setNewType({ ...newType, type: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.type && <div className="invalid-feedback">{inputErrors.type}</div>}
                                </div>
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameDescription" className="form-label" style={{ float: 'left' }}>
                                        description
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.description ? 'is-invalid' : ''}`}
                                        id="nameDescription"
                                        value={newType.description}
                                        onChange={(e) => setNewType({ ...newType, description: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.description && <div className="invalid-feedback">{inputErrors.description}</div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateType : handleAddType}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Type</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Description</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedTypes.length > 0 ? (
                                        Array.isArray(displayedTypes) && displayedTypes?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.type}</td>
                                                <td>{truncate(item?.description, 50)}</td>
                                                <td>
                                                    <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditType(item.id)}>Edit</button>
                                                    {!blogTypeIds.includes(item.id) && (
                                                        <button
                                                            className="btn btn-outline-danger btn-small"
                                                            style={{ width: 'auto' }}
                                                            onClick={() => {
                                                                if (window.confirm('Are you sure you want to delete this type?')) {
                                                                    handleDeleteType(item.id);
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr >
                                            <td>No Blog types to display.</td>
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

export default BlogTypeList;
