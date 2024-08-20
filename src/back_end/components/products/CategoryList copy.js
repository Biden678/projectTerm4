import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CategoryList(props) {
    const { handleFetchCategories, setCategories, categories } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editCategoryId, setEditCategoryId] = useState(null);
    // kiểm tra xem nếu cate có product > hog xóa
    const [productCategoryIds, setProductCategoryIds] = useState([]);
    const [inputErrors, setInputErrors] = useState({ name: '' });

    // search
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        handleFetchCategories();
        fetchProductCategoryIds();
    }, []);



    async function fetchProductCategoryIds() {
        try {
            const response = await axios.get("http://localhost:9999/api/products");
            if (response?.status === 200) {
                const categoryIds = response.data.map(product => product.category.category_id);
                setProductCategoryIds(categoryIds);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newCategory.name.trim()) {
            errors.name = 'Name Category is required';
            isValid = false;
        } else if (newCategory.name.length < 2 || newCategory.name.length > 30) {
            errors.name = 'Name Category must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newCategory.name)) {
            errors.name = 'Name Category cannot contain special characters';
            isValid = false;
        } else if (categories.some(category => category.name.toLowerCase() === newCategory.name.toLowerCase())) {
            errors.name = 'Name Category already exists';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };
    useEffect(() => {
        validateInputs();
    }, [newCategory]);

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditCategoryId(null);
        setInputErrors({ name: '' });
        setNewCategory({ name: '' });
        setHasSubmitted(false);
    };

    const handleAddCategory = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post("http://localhost:9999/api/category", newCategory);
            handleFetchCategories();
            fetchProductCategoryIds();
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
            console.error("Error adding new category:", error);
        }
    };

    const handleEditCategory = (id) => {
        const categoryToEdit = categories.find(category => category.category_id === id);
        setEditCategoryId(id);
        setNewCategory(categoryToEdit);
        setIsEditing(true);
        setInputErrors({ name: '' });
    };

    const handleUpdateCategory = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post(`http://localhost:9999/api/category`, newCategory);
            handleFetchCategories();
            fetchProductCategoryIds();
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
            console.error("Error updating category:", error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/category/${id}`);
            handleFetchCategories();
            fetchProductCategoryIds();
            toast.error('Deleted Category!', {
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
            toast.success('Category deleted successfully!', {
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
            console.error("Error deleting category:", error);
        }
    };

    useEffect(() => {
        handleSearchCategories();
    }, [searchTerm]);
    const handleSearchCategories = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/categories`, {
                params: { name: searchTerm }
            });
            if (response?.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error("Error searching categories:", error);
        }
    };

    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Categories</h3>
                        <div className='m-3 row'>
                            <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search by category'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {(isAdding || isEditing) && (
                            <form>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editCategoryId} />
                                )}
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameCategory" className="form-label" style={{ float: 'left' }}>
                                        Name Category
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.name ? 'is-invalid' : ''}`}
                                        id="nameCategory"
                                        value={newCategory.name}
                                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.name && <div className="invalid-feedback">{inputErrors.name}</div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateCategory : handleAddCategory}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Name Category</h6>
                                        </th>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditCategory(item.category_id)}>Edit</button>
                                                {!productCategoryIds.includes(item.category_id) && (
                                                    <button
                                                        className="btn btn-outline-danger btn-small"
                                                        style={{ width: 'auto' }}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this category?')) {
                                                                handleDeleteCategory(item.category_id);
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

export default CategoryList;
