import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WhoUseList(props) {
    const { handleFetchWhouses, setWhouses, whouses } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newWhouse, setNewWhouse] = useState({ name: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editWhouseId, setEditWhouseId] = useState(null);
    // kiểm tra xem nếu cate có product > hog xóa
    const [productWhouseIds, setProductWhouseIds] = useState([]);
    const [inputErrors, setInputErrors] = useState({ name: '' });

    // search
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        handleFetchWhouses();
        fetchProductWhouseIds();
    }, []);



    async function fetchProductWhouseIds() {
        try {
            const response = await axios.get("http://localhost:9999/api/products");
            if (response?.status === 200) {
                const whouseIds = response.data.map(product => product?.whouse?.whouse_id);
                setProductWhouseIds(whouseIds);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newWhouse.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (newWhouse.name.length < 2 || newWhouse.name.length > 30) {
            errors.name = 'Name must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newWhouse.name)) {
            errors.name = 'Name cannot contain special characters';
            isValid = false;
        } else if (whouses.some(whouse => whouse.name.toLowerCase() === newWhouse.name.toLowerCase())) {
            errors.name = 'This have already exists';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };

    useEffect(() => {
        validateInputs();
    }, [newWhouse]);

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditWhouseId(null);
        setInputErrors({ name: '' });
        setNewWhouse({ name: '' });
        setHasSubmitted(false);
    };

    const handleAddWhouse = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post("http://localhost:9999/api/whouse", newWhouse);
            handleFetchWhouses();
            fetchProductWhouseIds();
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
            console.error("Error adding new Who Use:", error);
        }
    };

    const handleEditWhouse = (id) => {
        const whouseToEdit = whouses.find(whouse => whouse?.whouse_id === id);
        setEditWhouseId(id);
        setNewWhouse(whouseToEdit);
        setIsEditing(true);
        setInputErrors({ name: '' });
    };

    const handleUpdateWhouse = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post(`http://localhost:9999/api/whouse`, newWhouse);
            handleFetchWhouses();
            fetchProductWhouseIds();
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
            console.error("Error updating whouse:", error);
        }
    };

    const handleDeleteWhouse = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/whouse/${id}`);
            handleFetchWhouses();
            fetchProductWhouseIds();
            toast.error('Deleted Whouse!', {
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
            toast.success('Whouse deleted successfully!', {
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
            console.error("Error deleting Whouse:", error);
        }
    };

    useEffect(() => {
        handleSearchWhouses();
    }, [searchTerm]);
    const handleSearchWhouses = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/whouses`, {
                params: { name: searchTerm }
            });
            if (response.status === 200) {
                setWhouses(response.data);
            }
        } catch (error) {
            console.error("Error searching Who Uses:", error);
        }
    };
    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 4;

    useEffect(() => {
        setTotalPages(Math.ceil(whouses.length / PAGE_SIZE));
    }, [whouses]);
    const displayedWhouses = whouses.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">The type of person who might take drugs</h3>
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
                        {(isAdding || isEditing) && (
                            <form>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editWhouseId} />
                                )}
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameWhouse" className="form-label" style={{ float: 'left' }}>
                                        Name :
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.name ? 'is-invalid' : ''}`}
                                        id="nameWhouse"
                                        value={newWhouse.name}
                                        onChange={(e) => setNewWhouse({ ...newWhouse, name: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.name && <div className="invalid-feedback">{inputErrors.name}</div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateWhouse : handleAddWhouse}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}
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
                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Name</h6>
                                        </th>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedWhouses?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.name}</td>
                                            <td>
                                                <button
                                                    className="btn btn-outline-primary btn-small"
                                                    style={{ width: 'auto' }}
                                                    onClick={() => handleEditWhouse(item?.whouse_id)}>
                                                    Edit
                                                </button>
                                                {!productWhouseIds.includes(item?.whouse_id) && (
                                                    <button
                                                        className="btn btn-outline-danger btn-small"
                                                        style={{ width: 'auto' }}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this one?')) {
                                                                handleDeleteWhouse(item?.whouse_id);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhoUseList;
