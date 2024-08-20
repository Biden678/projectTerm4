import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BrandList(props) {
    const { handleFetchBrands, setBrands, brands } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newBrand, setNewBrand] = useState({ name: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editBrandId, setEditBrandId] = useState(null);
    // kiểm tra xem nếu cate có product > hog xóa
    const [productBrandIds, setProductBrandIds] = useState([]);
    const [inputErrors, setInputErrors] = useState({ name: '' });

    // search
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        handleFetchBrands();
        fetchProductBrandIds();
    }, []);



    async function fetchProductBrandIds() {
        try {
            const response = await axios.get("http://localhost:9999/api/products");
            if (response?.status === 200) {
                const brandIds = response.data.map(product => product?.brand?.brand_id);
                setProductBrandIds(brandIds);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newBrand.name.trim()) {
            errors.name = 'Name is required';
            isValid = false;
        } else if (newBrand.name.length < 2 || newBrand.name.length > 30) {
            errors.name = 'Name must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newBrand.name)) {
            errors.name = 'Name cannot contain special characters';
            isValid = false;
        } else if (brands.some(brand => brand.name.toLowerCase() === newBrand.name.toLowerCase())) {
            errors.name = 'Name Brand already exists';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };
    useEffect(() => {
        validateInputs();
    }, [newBrand]);

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditBrandId(null);
        setInputErrors({ name: '' });
        setNewBrand({ name: '' });
        setHasSubmitted(false);
    };

    const handleAddBrand = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post("http://localhost:9999/api/brand", newBrand);
            handleFetchBrands();
            fetchProductBrandIds();
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
            console.error("Error adding new Brand:", error);
        }
    };

    const handleEditBrand = (id) => {
        const brandToEdit = brands.find(brand => brand?.brand_id === id);
        setEditBrandId(id);
        setNewBrand(brandToEdit);
        setIsEditing(true);
        setInputErrors({ name: '' });
    };

    const handleUpdateBrand = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post(`http://localhost:9999/api/brand`, newBrand);
            handleFetchBrands();
            fetchProductBrandIds();
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
            console.error("Error updating Brand:", error);
        }
    };

    const handleDeleteBrand = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/brand/${id}`);
            handleFetchBrands();
            fetchProductBrandIds();
            toast.error('Deleted Brand!', {
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
            toast.success('Brand deleted successfully!', {
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
            console.error("Error deleting Brand:", error);
        }
    };

    useEffect(() => {
        handleSearchBrands();
    }, [searchTerm]);
    const handleSearchBrands = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/brands`, {
                params: { name: searchTerm }
            });
            if (response?.status === 200) {
                setBrands(response.data);
            }
        } catch (error) {
            console.error("Error searching Brands:", error);
        }
    };

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 4;

    useEffect(() => {
        setTotalPages(Math.ceil(brands.length / PAGE_SIZE));
    }, [brands]);
    const displayedBrands = brands.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);


    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Brands</h3>
                        <div className='m-3 row'>
                            <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search by brand'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {(isAdding || isEditing) && (
                            <form>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editBrandId} />
                                )}
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameBrand" className="form-label" style={{ float: 'left' }}>
                                        Name :
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.name ? 'is-invalid' : ''}`}
                                        id="nameBrand"
                                        value={newBrand.name}
                                        onChange={(e) => setNewBrand({ ...newBrand, name: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.name && <div className="invalid-feedback">{inputErrors.name}</div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateBrand : handleAddBrand}>
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
                                            <h6 className="fw-semibold mb-0">Name Brand</h6>
                                        </th>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedBrands?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditBrand(item?.brand_id)}>Edit</button>
                                                {!productBrandIds.includes(item?.brand_id) && (
                                                    <button
                                                        className="btn btn-outline-danger btn-small"
                                                        style={{ width: 'auto' }}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this brand?')) {
                                                                handleDeleteBrand(item?.brand_id);
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

export default BrandList;
