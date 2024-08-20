import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function ProductList(props) {
    const { handleFetchProducts, setProducts, products,
        handleFetchBrands, brands,
        handleFetchCategories, categories,
        handleFetchCountries, countries,
        handleFetchPrescribes, prescribes,
        handleFetchWhouses, whouses,
    } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', alphabet: '', dbc: '', qc: '', tp: '', ccd: '', producer: '', tckt: '', description: '', category: { category_id: '' }, country: { country_id: '' }, prescribe: { prescribe_id: '' }, brand: { brand_id: '' }, whouse: { whouse_id: '' }, banner: 'false' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editProductId, setEditProductId] = useState(null);
    // kiểm tra xem nếu cate có product > hog xóa
    const [inputErrors, setInputErrors] = useState({ name: '', alphabet: '', dbc: '', qc: '', tp: '', ccd: '', producer: '', tckt: '', description: '', category: { category_id: '' }, country: { country_id: '' }, prescribe: { prescribe_id: '' }, brand: { brand_id: '' }, whouse: { whouse_id: '' }, banner: 'false' });

    // search
    const [searchTerm, setSearchTerm] = useState('');




    useEffect(() => {
        handleFetchProducts();
        handleFetchBrands();
        handleFetchCategories();
        handleFetchCountries();
        handleFetchPrescribes();
        handleFetchWhouses();
    }, []);



    const validateInputs = () => {
        let isValid = true;
        const errors = { name: '', alphabet: '', dbc: '', qc: '', tp: '', ccd: '', producer: '', tckt: '', description: '', category: { category_id: '' }, country: { country_id: '' }, prescribe: { prescribe_id: '' }, brand: { brand_id: '' }, whouse: { whouse_id: '' }, banner: 'false' };

        // name
        if (!newProduct.name.trim()) {
            errors.name = 'Name product is required';
            isValid = false;
        } else if (newProduct.name.length < 2 || newProduct.name.length > 30) {
            errors.name = 'Name product must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newProduct.name)) {
            errors.name = 'Name product cannot contain special characters';
            isValid = false;
        }

        // alphabet
        if (!newProduct.alphabet.trim()) {
            errors.alphabet = 'Alphabet product is required';
            isValid = false;
        }

        // dbc
        if (!newProduct.dbc.trim()) {
            errors.dbc = 'Dosage forms is required';
            isValid = false;
        } else if (newProduct.dbc.length < 2 || newProduct.dbc.length > 30) {
            errors.dbc = 'Dosage forms must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newProduct.dbc)) {
            errors.dbc = 'Dosage forms cannot contain special characters';
            isValid = false;
        }

        // qc
        if (!newProduct.qc.trim()) {
            errors.qc = 'Specifications is required';
            isValid = false;
        } else if (newProduct.qc.length < 2 || newProduct.qc.length > 30) {
            errors.qc = 'Specifications must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newProduct.qc)) {
            errors.qc = 'Specifications cannot contain special characters';
            isValid = false;
        }

        // tp
        if (!newProduct.tp.trim()) {
            errors.tp = 'Ingredient Product is required';
            isValid = false;
        } else if (newProduct.tp.length < 2 || newProduct.tp.length > 30) {
            errors.tp = 'Ingredient product must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ,.]+$/.test(newProduct.tp)) {
            errors.tp = 'Ingredient product cannot contain special characters';
            isValid = false;
        }

        // ccd
        if (!newProduct.ccd.trim()) {
            errors.ccd = 'Contraindicated Product is required';
            isValid = false;
        } else if (newProduct.ccd.length < 2 || newProduct.ccd.length > 30) {
            errors.ccd = 'Contraindicated product must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ,.]+$/.test(newProduct.ccd)) {
            errors.ccd = 'Contraindicated product cannot contain special characters';
            isValid = false;
        }

        // producer
        if (!newProduct.producer.trim()) {
            errors.producer = 'Producer Product is required';
            isValid = false;
        } else if (newProduct.producer.length < 2 || newProduct.producer.length > 30) {
            errors.producer = 'Producer product must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newProduct.producer)) {
            errors.producer = 'Producer product cannot contain special characters';
            isValid = false;
        }

        // tckt
        if (!newProduct.tckt) {
            errors.tckt = 'Prescription drugs is required';
            isValid = false;
        }

        //description
        if (!newProduct.description.trim()) {
            errors.description = 'Description is required';
            isValid = false;
        } else if (newProduct.description.length < 2 || newProduct.description.length > 500) {
            errors.description = 'Description must be between 2 and 500 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ,.]+$/.test(newProduct.description)) {
            errors.description = 'Description cannot contain special characters';
            isValid = false;
        }

        // banner
        if (!newProduct.banner.trim()) {
            errors.banner = 'banner Product is required';
            isValid = false;
        }

        // brand
        if (!newProduct.brand.brand_id.trim()) {
            errors.brand.brand_id = 'brand is required';
            isValid = false;
        }

        // country
        if (!newProduct.country.country_id.trim()) {
            errors.country.country_id = 'country is required';
            isValid = false;
        }
        // category
        if (!newProduct.category.category_id.trim()) {
            errors.category.category_id = 'category is required';
            isValid = false;
        }
        // prescribe
        if (!newProduct.prescribe.prescribe_id.trim()) {
            errors.prescribe.prescribe_id = 'prescribe is required';
            isValid = false;
        }
        // who can use
        if (!newProduct.whouse.whouse_id.trim()) {
            errors.whouse.whouse_id = 'Who can use is required';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };

    useEffect(() => {
        validateInputs();
    }, [newProduct]);


    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditProductId(null);
        setInputErrors({ name: '', alphabet: '', dbc: '', qc: '', tp: '', ccd: '', producer: '', tckt: '', description: '', category: { category_id: '' }, country: { country_id: '' }, prescribe: { prescribe_id: '' }, brand: { brand_id: '' }, whouse: { whouse_id: '' }, banner: 'false' });
        setNewProduct({ name: '', alphabet: '', dbc: '', qc: '', tp: '', ccd: '', producer: '', tckt: '', description: '', category: { category_id: '' }, country: { country_id: '' }, prescribe: { prescribe_id: '' }, brand: { brand_id: '' }, whouse: { whouse_id: '' }, banner: 'false' });
        setHasSubmitted(false);
    };


    const handleAddProduct = async () => {

        setHasSubmitted(true);
        if (!validateInputs()) {
            return;
        }

        try {
            setProducts.banner = false;
            await axios.post("http://localhost:9999/api/product", newProduct);
            handleFetchProducts();
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
            console.error("Error adding new product:", error);
        }
    };

    const handleEditProduct = (id) => {
        const productToEdit = products.find(product => product.pro_id === id);
        setEditProductId(id);
        setNewProduct({
            ...productToEdit,
            name: productToEdit.name ? productToEdit.name.toString() : '',
            alphabet: productToEdit.alphabet ? productToEdit.alphabet.toString() : '',
            dbc: productToEdit.dbc ? productToEdit.dbc.toString() : '',
            qc: productToEdit.qc ? productToEdit.qc.toString() : '',
            tp: productToEdit.tp ? productToEdit.tp.toString() : '',
            ccd: productToEdit.ccd ? productToEdit.ccd.toString() : '',
            producer: productToEdit.producer ? productToEdit.producer.toString() : '',
            tckt: productToEdit.tckt ? productToEdit.tckt : null,
            description: productToEdit.description ? productToEdit.description.toString() : '',
            category: {
                category_id: productToEdit.category?.category_id ? productToEdit.category.category_id.toString() : ''
            },
            country: {
                country_id: productToEdit.country?.country_id ? productToEdit.country.country_id.toString() : ''
            },
            prescribe: {
                prescribe_id: productToEdit.prescribe?.prescribe_id ? productToEdit.prescribe.prescribe_id.toString() : ''
            },
            brand: {
                brand_id: productToEdit.brand?.brand_id ? productToEdit.brand.brand_id.toString() : ''
            },
            whouse: {
                whouse_id: productToEdit.whouse?.whouse_id ? productToEdit.whouse.whouse_id.toString() : ''
            },
            banner: productToEdit.banner ? productToEdit.banner.toString() : 'false'
        });
        setIsEditing(true);
        setInputErrors({ name: '', alphabet: '', dbc: '', qc: '', tp: '', ccd: '', producer: '', tckt: '', description: '', category: { category_id: '' }, country: { country_id: '' }, prescribe: { prescribe_id: '' }, brand: { brand_id: '' }, whouse: { whouse_id: '' }, banner: 'false' });
    };

    const handleUpdateProduct = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post(`http://localhost:9999/api/product`, newProduct);
            handleFetchProducts();
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
            console.error("Error updating Product:", error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/product/${id}`);
            handleFetchProducts();
            toast.error('Deleted Product!', {
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
            toast.success('Product deleted successfully!', {
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
            console.error("Error deleting Product:", error);
        }
    };

    useEffect(() => {
        handleSearchProducts();
    }, [searchTerm]);
    const handleSearchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/products`, {
                params: { name: searchTerm }
            });
            if (response?.status === 200) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Error searching Products:", error);
        }
    };

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 7;

    useEffect(() => {
        setTotalPages(Math.ceil(products.length / PAGE_SIZE));
    }, [products]);
    const displayedProducts = products.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>

                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Products</h3>
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
                            <form className='row'>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editProductId} />
                                )}

                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="nameProduct" className="form-label" style={{ float: 'left' }}>
                                        Name Product
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.name ? 'is-invalid' : ''}`}
                                        id="nameProduct"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.name && <div className="invalid-feedback">{inputErrors.name}</div>}
                                </div>
                                <div className="mb-3 col-lg-3">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        Alphabet :
                                    </label>
                                    <select
                                        className={`form-select ${hasSubmitted && inputErrors.alphabet && 'is-invalid'}`}
                                        id="alphabet"
                                        value={newProduct.alphabet}
                                        onChange={(e) => setNewProduct({ ...newProduct, alphabet: e.target.value })}
                                    >
                                        <option value={""}>Choose . . . </option>
                                        <option value={"a"}>A</option>
                                        <option value={"b"}>B</option>
                                        <option value={"c"}>C</option>
                                        <option value={"d"}>D</option>
                                        <option value={"e"}>E</option>
                                        <option value={"f"}>F</option>
                                        <option value={"g"}>G</option>
                                        <option value={"h"}>H</option>
                                        <option value={"i"}>I</option>
                                        <option value={"j"}>J</option>
                                        <option value={"k"}>K</option>
                                        <option value={"l"}>L</option>
                                        <option value={"m"}>M</option>
                                        <option value={"n"}>N</option>
                                        <option value={"o"}>O</option>
                                        <option value={"p"}>P</option>
                                        <option value={"q"}>Q</option>
                                        <option value={"r"}>R</option>
                                        <option value={"s"}>S</option>
                                        <option value={"t"}>T</option>
                                        <option value={"u"}>U</option>
                                        <option value={"v"}>V</option>
                                        <option value={"w"}>W</option>
                                        <option value={"x"}>X</option>
                                        <option value={"y"}>Y</option>
                                        <option value={"z"}>Z</option>
                                    </select>
                                    {hasSubmitted && inputErrors.alphabet && (
                                        <div className="invalid-feedback">{inputErrors.alphabet}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-lg-3">
                                    <label htmlFor="typeCategory_id" className="form-label" style={{ float: 'left' }}>
                                        Categories
                                    </label>
                                    <select
                                        className={`form-select ${hasSubmitted && inputErrors.category.category_id && 'is-invalid'}`}
                                        id="typeCategory_id"
                                        value={newProduct.category.category_id}
                                        onChange={(e) => setNewProduct({
                                            ...newProduct,
                                            category: {
                                                ...newProduct.category,
                                                category_id: e.target.value
                                            }
                                        })}
                                    >
                                        <option value={""}>Choose . . .</option>
                                        {categories.map((type) => (
                                            <option key={type.category_id} value={type.category_id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {hasSubmitted && inputErrors.category.category_id && (
                                        <div className="invalid-feedback">{inputErrors.category.category_id}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-lg-3">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        Dosage forms:
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.dbc ? 'is-invalid' : ''}`}
                                        id="dbc"
                                        value={newProduct.dbc}
                                        placeholder='Enter dosage forms here . . .'
                                        onChange={(e) => setNewProduct({ ...newProduct, dbc: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.dbc && <div className="invalid-feedback">{inputErrors.dbc}</div>}
                                </div>

                                <div className="mb-3 col-lg-3">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        Specifications :
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.qc ? 'is-invalid' : ''}`}
                                        id="qc"
                                        value={newProduct.qc}
                                        placeholder='Enter specifications here . . .'
                                        onChange={(e) => setNewProduct({ ...newProduct, qc: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.qc && <div className="invalid-feedback">{inputErrors.qc}</div>}
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        Ingredient :
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.tp ? 'is-invalid' : ''}`}
                                        id="tp"
                                        value={newProduct.tp}
                                        placeholder='Enter ingredient here . . .'
                                        onChange={(e) => setNewProduct({ ...newProduct, tp: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.tp && <div className="invalid-feedback">{inputErrors.tp}</div>}
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        Contraindicated :
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.ccd ? 'is-invalid' : ''}`}
                                        id="ccd"
                                        value={newProduct.ccd}
                                        placeholder='Enter contraindicated here . . .'
                                        onChange={(e) => setNewProduct({ ...newProduct, ccd: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.ccd && <div className="invalid-feedback">{inputErrors.ccd}</div>}
                                </div>

                                <div className="mb-3 col-lg-3">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        Producer :
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.producer ? 'is-invalid' : ''}`}
                                        id="producer"
                                        value={newProduct.producer}
                                        placeholder='Enter producer here . . .'
                                        onChange={(e) => setNewProduct({ ...newProduct, producer: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.producer && <div className="invalid-feedback">{inputErrors.producer}</div>}
                                </div>

                                <div className="mb-3 col-lg-3">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        Medication Prescription :
                                    </label>
                                    <select
                                        className={`form-select ${hasSubmitted && inputErrors.tckt && 'is-invalid'}`}
                                        id="tckt"
                                        value={newProduct.tckt}
                                        onChange={(e) => setNewProduct({ ...newProduct, tckt: e.target.value })}
                                    >
                                        <option value={""}>Choose . . .</option>
                                        <option value={false}>No prescription required, can buy anyway</option>
                                        <option value={true}>Must have a doctor's prescription</option>
                                    </select>
                                    {hasSubmitted && inputErrors.tckt && <div className="invalid-feedback">{inputErrors.tckt}</div>}
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        Description :
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.description ? 'is-invalid' : ''}`}
                                        id="description"
                                        value={newProduct.description}
                                        placeholder='Enter description here . . .'
                                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.description && <div className="invalid-feedback">{inputErrors.description}</div>}
                                </div>

                                <div className="mb-3 col-lg-3">
                                    <label htmlFor="typeWho" className="form-label" style={{ float: 'left' }}>
                                        Who Can Use :
                                    </label>
                                    <select
                                        className={`form-select ${hasSubmitted && inputErrors.whouse.whouse_id && 'is-invalid'}`}
                                        id="typeWho"
                                        value={newProduct.whouse.whouse_id}
                                        onChange={(e) => setNewProduct({
                                            ...newProduct,
                                            whouse: {
                                                ...newProduct.whouse,
                                                whouse_id: e.target.value
                                            }
                                        })}
                                    >
                                        <option value={""}>Choose . . .</option>
                                        {whouses.map((type) => (
                                            <option key={type.whouse_id} value={type.whouse_id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {hasSubmitted && inputErrors.whouse.whouse_id && (
                                        <div className="invalid-feedback">{inputErrors.whouse.whouse_id}</div>
                                    )}
                                </div>


                                <div className="mb-3 col-lg-3">
                                    <label htmlFor="typePrescribe_id" className="form-label" style={{ float: 'left' }}>
                                        Prescribes
                                    </label>
                                    <select
                                        className={`form-select ${hasSubmitted && inputErrors.prescribe.prescribe_id && 'is-invalid'}`}
                                        id="typePrescribe_id"
                                        value={newProduct.prescribe.prescribe_id}
                                        onChange={(e) => setNewProduct({
                                            ...newProduct,
                                            prescribe: {
                                                ...newProduct.prescribe,
                                                prescribe_id: e.target.value
                                            }
                                        })}
                                    >
                                        <option value={""}>Choose . . .</option>
                                        {prescribes.map((type) => (
                                            <option key={type.prescribe_id} value={type.prescribe_id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {hasSubmitted && inputErrors.prescribe.prescribe_id && (
                                        <div className="invalid-feedback">{inputErrors.prescribe.prescribe_id}</div>
                                    )}
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="typeBrand_id" className="form-label" style={{ float: 'left' }}>
                                        Brands
                                    </label>
                                    <select
                                        className={`form-select ${hasSubmitted && inputErrors.brand.brand_id && 'is-invalid'}`}
                                        id="typeBrand_id"
                                        value={newProduct.brand.brand_id}
                                        onChange={(e) => setNewProduct({
                                            ...newProduct,
                                            brand: {
                                                ...newProduct.brand,
                                                brand_id: e.target.value
                                            }
                                        })}
                                    >
                                        <option value={""}>Choose . . .</option>
                                        {brands.map((type) => (
                                            <option key={type.brand_id} value={type.brand_id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {hasSubmitted && inputErrors.brand.brand_id && (
                                        <div className="invalid-feedback">{inputErrors.brand.brand_id}</div>
                                    )}
                                </div>
                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="typeCountry_id" className="form-label" style={{ float: 'left' }}>
                                        Country
                                    </label>
                                    <select
                                        className={`form-select ${hasSubmitted && inputErrors.country.country_id && 'is-invalid'}`}
                                        id="typeCountry_id"
                                        value={newProduct.country.country_id}
                                        onChange={(e) => setNewProduct({
                                            ...newProduct,
                                            country: {
                                                ...newProduct.country,
                                                country_id: e.target.value
                                            }
                                        })}
                                    >
                                        <option value={""}>Choose . . .</option>
                                        {countries.map((type) => (
                                            <option key={type.country_id} value={type.country_id}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    {hasSubmitted && inputErrors.country.country_id && (
                                        <div className="invalid-feedback">{inputErrors.country.country_id}</div>
                                    )}
                                </div>



                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateProduct : handleAddProduct}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}
                        {/* phân trang */}
                        <div className="d-flex justify-content-between mt-5">
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
                                            <h6 className="fw-semibold mb-0">Detail</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Name</h6>
                                        </th>
                                        {/* <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Alphabet</h6>
                                        </th> 
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Dosage forms</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Specifications</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Ingredient</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Contraindicated</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Producer</h6>
                                        </th>*/}
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Medication requires prescription</h6>
                                        </th>
                                        {/* <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Description</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Subjects of use</h6>
                                        </th> */}
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Sale status</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Category</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Country</h6>
                                        </th>
                                        {/* <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Prescribe</h6>
                                        </th> */}
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Brand</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action <i className="ti ti-activity"></i> <i className="ti">&#xf345;</i></h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedProducts?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <Link to={`/productDetailAdminPage/${item.pro_id}`} aria-expanded="false">
                                                    <button className="btn btn-outline-dark btn-small ti" style={{ width: 'auto' }}>&#xeac3;</button>
                                                </Link>
                                            </td>
                                            <td>{item.name}</td>
                                            {/* <td>{item.alphabet}</td> 
                                            <td>{item.dbc}</td>
                                            <td>{item.qc}</td>
                                            <td>{item.tp}</td>
                                            <td>{item.ccd}</td>
                                            <td>{item.producer}</td>*/}
                                            <td>{item.tckt == false ? (<span style={{ color: 'green', fontWeight: 'bold' }}>Can Buy</span>) : (<span style={{ color: 'red' }}>Need Doc's Permission</span>)}</td>
                                            {/* <td>{item.description}</td>
                                            <td>{item.whouse.name}</td> */}
                                            <td>{item.banner == false ? (<span style={{ color: 'red' }}>NOT YET</span>) : (<span style={{ color: 'green' }}>SALE</span>)}</td>
                                            <td>{item.category.name}</td>
                                            <td>{item.country.name}</td>
                                            {/* <td>{item.prescribe.name}</td> */}
                                            <td>{item.brand.name}</td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditProduct(item.pro_id)}>Edit</button>

                                                {item.banner == false ? (
                                                    <button
                                                        className="btn btn-outline-danger btn-small"
                                                        style={{ width: 'auto', margin: '2%' }}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this product?')) {
                                                                handleDeleteProduct(item.pro_id);
                                                            }
                                                        }}
                                                    >
                                                        <i className="ti ti-trash"></i>
                                                    </button>
                                                ) : (<span className="" style={{ color: 'green', margin: '4%' }}>SALE</span>)}

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

export default ProductList;
