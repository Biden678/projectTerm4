import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../contexts/AuthContext';

function PrescribeList(props) {
    const { handleFetchPrescribes, setPrescribes, prescribes } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newPrescribe, setNewPrescribe] = useState({ name: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editPrescribeId, setEditPrescribeId] = useState(null);
    // kiểm tra xem nếu cate có product > hog xóa
    const [productPrescribeIds, setProductPrescribeIds] = useState([]);
    const [inputErrors, setInputErrors] = useState({ name: '' });

    // search
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        handleFetchPrescribes();
        fetchProductPrescribeIds();
    }, []);



    async function fetchProductPrescribeIds() {
        try {
            const response = await axios.get("http://localhost:9999/api/products");
            if (response?.status === 200) {
                const prescribeIds = response.data.map(product => product.prescribe.prescribe_id);
                setProductPrescribeIds(prescribeIds);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newPrescribe.name.trim()) {
            errors.name = 'Name Prescribe is required';
            isValid = false;
        } else if (newPrescribe.name.length < 2 || newPrescribe.name.length > 30) {
            errors.name = 'Name Prescribe must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ,]+$/.test(newPrescribe.name)) {
            errors.name = 'Name Prescribe cannot contain special characters, except commas ","';
            isValid = false;
        } else if (prescribes.some(prescribe => prescribe.name.toLowerCase() === newPrescribe.name.toLowerCase())) {
            errors.name = 'Name prescribe already exists';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };
    useEffect(() => {
        validateInputs();
    }, [newPrescribe]);

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditPrescribeId(null);
        setInputErrors({ name: '' });
        setNewPrescribe({ name: '' });
        setHasSubmitted(false);
    };

    const handleAddPrescribe = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post("http://localhost:9999/api/prescribe", newPrescribe);
            handleFetchPrescribes();
            fetchProductPrescribeIds();
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
            console.error("Error adding new prescribe:", error);
        }
    };

    const handleEditPrescribe = (id) => {
        const prescribeToEdit = prescribes.find(prescribe => prescribe.prescribe_id === id);
        setEditPrescribeId(id);
        setNewPrescribe(prescribeToEdit);
        setIsEditing(true);
        setInputErrors({ name: '' });
    };

    const handleUpdatePrescribe = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post(`http://localhost:9999/api/prescribe`, newPrescribe);
            handleFetchPrescribes();
            fetchProductPrescribeIds();
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
            console.error("Error updating prescribe:", error);
        }
    };

    const handleDeletePrescribe = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/prescribe/${id}`);
            handleFetchPrescribes();
            fetchProductPrescribeIds();
            toast.error('Deleted Prescribe!', {
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
            toast.success('Prescribe deleted successfully!', {
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
            console.error("Error deleting prescribe:", error);
        }
    };

    useEffect(() => {
        handleSearchPrescribes();
    }, [searchTerm]);
    const handleSearchPrescribes = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/prescribes`, {
                params: { name: searchTerm }
            });
            if (response?.status === 200) {
                setPrescribes(response.data);
            }
        } catch (error) {
            console.error("Error searching prescribes:", error);
        }
    };

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 4;

    useEffect(() => {
        setTotalPages(Math.ceil(prescribes.length / PAGE_SIZE));
    }, [prescribes]);
    const displayedPrescribes = prescribes.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Prescribes</h3>
                        <div className='m-3 row'>
                            <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search by prescribe'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {(isAdding || isEditing) && (
                            <form>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editPrescribeId} />
                                )}
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="namePrescribe" className="form-label" style={{ float: 'left' }}>
                                        Name Prescribe
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.name ? 'is-invalid' : ''}`}
                                        id="namePrescribe"
                                        value={newPrescribe.name}
                                        onChange={(e) => setNewPrescribe({ ...newPrescribe, name: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.name && <div className="invalid-feedback">{inputErrors.name}</div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdatePrescribe : handleAddPrescribe}>
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
                                            <h6 className="fw-semibold mb-0">Name Prescribe</h6>
                                        </th>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedPrescribes?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditPrescribe(item.Prescribe_id)}>Edit</button>
                                                {!productPrescribeIds.includes(item.prescribe_id) && (
                                                    <button
                                                        className="btn btn-outline-danger btn-small"
                                                        style={{ width: 'auto' }}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this prescribe?')) {
                                                                handleDeletePrescribe(item.prescribe_id);
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

export default PrescribeList;
