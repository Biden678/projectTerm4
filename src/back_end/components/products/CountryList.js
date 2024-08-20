import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CountryList(props) {
    const { handleFetchCountries, setCountries, countries } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newCountry, setNewCountry] = useState({ name: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCountryId, setEditCountryId] = useState(null);
    // kiểm tra xem nếu cate có product > hog xóa
    const [productCountryIds, setProductCountryIds] = useState([]);
    const [inputErrors, setInputErrors] = useState({ name: '' });

    // search
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        handleFetchCountries();
        fetchProductCountryIds();
    }, []);



    async function fetchProductCountryIds() {
        try {
            const response = await axios.get("http://localhost:9999/api/products");
            if (response?.status === 200) {
                const countryIds = response.data.map(product => product.country.country_id);
                setProductCountryIds(countryIds);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newCountry.name.trim()) {
            errors.name = 'Name Country is required';
            isValid = false;
        } else if (newCountry.name.length < 2 || newCountry.name.length > 30) {
            errors.name = 'Name Country must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newCountry.name)) {
            errors.name = 'Name Country cannot contain special characters';
            isValid = false;
        } else if (countries.some(country => country.name.toLowerCase() === newCountry.name.toLowerCase())) {
            errors.name = 'Name country already exists';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };
    useEffect(() => {
        validateInputs();
    }, [newCountry]);

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditCountryId(null);
        setInputErrors({ name: '' });
        setNewCountry({ name: '' });
        setHasSubmitted(false);
    };

    const handleAddCountry = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post("http://localhost:9999/api/country", newCountry);
            handleFetchCountries();
            fetchProductCountryIds();
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
            console.error("Error adding new country:", error);
        }
    };

    const handleEditCountry = (id) => {
        const countryToEdit = countries.find(country => country.country_id === id);
        setEditCountryId(id);
        setNewCountry(countryToEdit);
        setIsEditing(true);
        setInputErrors({ name: '' });
    };

    const handleUpdateCountry = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post(`http://localhost:9999/api/country`, newCountry);
            handleFetchCountries();
            fetchProductCountryIds();
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
            console.error("Error updating country:", error);
        }
    };

    const handleDeleteCountry = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/country/${id}`);
            handleFetchCountries();
            fetchProductCountryIds();
            toast.error('Deleted Country!', {
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
            toast.success('Country deleted successfully!', {
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
            console.error("Error deleting country:", error);
        }
    };

    useEffect(() => {
        handleSearchCountries();
    }, [searchTerm]);
    const handleSearchCountries = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/countries`, {
                params: { name: searchTerm }
            });
            if (response?.status === 200) {
                setCountries(response.data);
            }
        } catch (error) {
            console.error("Error searching countries:", error);
        }
    };

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 4;

    useEffect(() => {
        setTotalPages(Math.ceil(countries.length / PAGE_SIZE));
    }, [countries]);
    const displayedCountries = countries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);


    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Countries</h3>
                        <div className='m-3 row'>
                            <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search by country'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {(isAdding || isEditing) && (
                            <form>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editCountryId} />
                                )}
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameCountry" className="form-label" style={{ float: 'left' }}>
                                        Name Country
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.name ? 'is-invalid' : ''}`}
                                        id="nameCountry"
                                        value={newCountry.name}
                                        onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.name && <div className="invalid-feedback">{inputErrors.name}</div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateCountry : handleAddCountry}>
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
                                            <h6 className="fw-semibold mb-0">Name Country</h6>
                                        </th>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedCountries?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditCountry(item.country_id)}>Edit</button>
                                                {!productCountryIds.includes(item.country_id) && (
                                                    <button
                                                        className="btn btn-outline-danger btn-small"
                                                        style={{ width: 'auto' }}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this country?')) {
                                                                handleDeleteCountry(item.country_id);
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

export default CountryList;
