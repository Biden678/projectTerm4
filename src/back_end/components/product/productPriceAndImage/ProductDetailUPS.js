import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductDetailUPS(props) {
    const { proId } = useParams();
    const [productPrice, setProductPrice] = useState(null);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showBoxPackPill, setShowBoxPackPill] = useState(true);
    const [editProductPrice, setEditProductPrice] = useState({ usp_id: '', quantity_box: '', quantity_pack: '', quantity_pill: '', price_box: '', price_pack: '', price_pill: '', name_other: '', price_other: '', quantity_other: '', status: '', product: { pro_id: '' } });
    const [isEditing, setIsEditing] = useState(false);
    const [inputErrors, setInputErrors] = useState({ usp_id: '', quantity_box: '', quantity_pack: '', quantity_pill: '', price_box: '', price_pack: '', price_pill: '', name_other: '', price_other: '', quantity_other: '', status: '', product: { pro_id: '' } });

    async function handleFetchProductPrice() {
        try {
            const response = await axios.get(`http://localhost:9999/api/ups/${proId}`);

            console.log("response : " + response.data);
            if (response.status === 200) {
                setProductPrice(response.data);
            }
        } catch (error) {
            console.log("Something Wrong:", error);
        } 
    }

    const validateInputBoxPackPill = () => {
        let isValid = true;
        const errors = {};

        if (!/^\d+$/.test(editProductPrice.quantity_box)) {
            errors.quantity_box = 'Quantity Box must be a number';
            isValid = false;
        }

        if (!/^\d+$/.test(editProductPrice.quantity_pack)) {
            errors.quantity_pack = 'Quantity Pack must be a number';
            isValid = false;
        }

        if (!/^\d+$/.test(editProductPrice.quantity_pill)) {
            errors.quantity_pill = 'Quantity Pill must be a number';
            isValid = false;
        }

        if (!/^\d+(\.\d{1,2})?$/.test(editProductPrice.price_box)) {
            errors.price_box = 'Price Box must be a valid number';
            isValid = false;
        }

        if (!/^\d+(\.\d{1,2})?$/.test(editProductPrice.price_pack)) {
            errors.price_pack = 'Price Pack must be a valid number';
            isValid = false;
        }

        if (!/^\d+(\.\d{1,2})?$/.test(editProductPrice.price_pill)) {
            errors.price_pill = 'Price Pill must be a valid number';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };
    const validateInputOther = () => {
        let isValid = true;
        const errors = {};


        if (editProductPrice.name_other.length < 2 || editProductPrice.name_other.length > 30) {
            errors.name_other = 'Name must be between 2 and 30 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(editProductPrice.name_other)) {
            errors.name_other = 'Name cannot contain special characters';
            isValid = false;
        }

        if (!/^\d+(\.\d{1,2})?$/.test(editProductPrice.price_other)) {
            errors.price_other = 'Price Other must be a valid number';
            isValid = false;
        }

        if (!/^\d+$/.test(editProductPrice.quantity_other)) {
            errors.quantity_other = 'Quantity Other must be a number';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };


    const handleCancel = () => {
        setIsEditing(false);
        setInputErrors({ usp_id: '', quantity_box: '', quantity_pack: '', quantity_pill: '', price_box: '', price_pack: '', price_pill: '', name_other: '', price_other: '', quantity_other: '', status: '', product: { pro_id: '' } });
        setEditProductPrice({ usp_id: '', quantity_box: '', quantity_pack: '', quantity_pill: '', price_box: '', price_pack: '', price_pill: '', name_other: '', price_other: '', quantity_other: '', status: '', product: { pro_id: '' } });
        setHasSubmitted(false);
    };

    const handleUpdate = async () => {
        setHasSubmitted(true);

        let updatedProductPrice;

        if (showBoxPackPill) {
            updatedProductPrice = {
                ...editProductPrice,
                usp_id: proId,
                name_other: null,
                quantity_other: '',
                price_other: '',
                product: {
                    pro_id: proId,
                },
                status: 1
            };

            setEditProductPrice(updatedProductPrice);
            if (!validateInputBoxPackPill()) {
                return;
            }
        } else {
            updatedProductPrice = {
                ...editProductPrice,
                quantity_box: '',
                quantity_pack: '',
                quantity_pill: '',

                price_box: '',
                price_pack: '',
                price_pill: '',
                usp_id: proId,
                product: {
                    pro_id: proId,
                },
                status: 2
            };

            setEditProductPrice(updatedProductPrice);
            if (!validateInputOther()) {
                return;
            }
        }

        try {
            await axios.post(`http://localhost:9999/api/ups`, updatedProductPrice);
            handleFetchProductPrice();
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



    const handleEdit = (id) => {
        setEditProductPrice(productPrice);
        setEditProductPrice(prevState => ({
            ...prevState,
            quantity_box: '',
            price_box: '',
            quantity_pack: '',
            price_pack: '',
            quantity_pill: '',
            price_pill: '',
            name_other: '',
            quantity_other:'',
            price_other: '',
        }));
        setIsEditing(true);
        setInputErrors({ usp_id: '', quantity_box: '', quantity_pack: '', quantity_pill: '', price_box: '', price_pack: '', price_pill: '', name_other: '', price_other: '', quantity_other: '', status: '', product: { pro_id: '' } });
    };

    useEffect(() => {
        handleFetchProductPrice();
    }, [proId]);



    return (
        <div>

            <div className="d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isEditing ? handleCancel : () => setShowBoxPackPill(productPrice?.status == true ? true : false) & setIsEditing(true) & handleEdit(productPrice?.usp_id)}>
                        {isEditing ? 'Cancel' : 'Update'}
                    </button>

                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Unit Price Status</h3>

                        {(isEditing) && (
                            <form className='row'>
                                <div className="mb-3 col-lg-12">
                                    <label className="form-label" style={{ float: 'left' }}>
                                        <input
                                            type="radio"
                                            name="productType"
                                            checked={showBoxPackPill}
                                            onChange={() => setShowBoxPackPill(true)}
                                        />
                                        Box, Pack, Pill
                                    </label>
                                    <label className="form-label" style={{ float: 'left', marginLeft: '10px' }}>
                                        <input
                                            type="radio"
                                            name="productType"
                                            checked={!showBoxPackPill}
                                            onChange={() => setShowBoxPackPill(false)}
                                        />
                                        Other
                                    </label>
                                </div>
                                {showBoxPackPill ? (
                                    <>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="quantity_box" className="form-label" style={{ float: 'left' }}>
                                                Quantity Box:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="number"
                                                className={`form-control ${hasSubmitted && inputErrors.quantity_box ? 'is-invalid' : ''}`}
                                                id="quantity_box"
                                                value={editProductPrice.quantity_box}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, quantity_box: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.quantity_box && <div className="invalid-feedback">{inputErrors.quantity_box}</div>}
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="price_box" className="form-label" style={{ float: 'left' }}>
                                                Price Box:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="number"
                                                className={`form-control ${hasSubmitted && inputErrors.price_box ? 'is-invalid' : ''}`}
                                                id="price_box"
                                                value={editProductPrice.price_box}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, price_box: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.price_box && <div className="invalid-feedback">{inputErrors.price_box}</div>}
                                        </div>
                                        <p>( Suggest : 1 box equals how many packs? Multiply that number by the quantity of boxes )</p>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="quantity_pack" className="form-label" style={{ float: 'left' }}>
                                                Quantity Pack:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="number"
                                                className={`form-control ${hasSubmitted && inputErrors.quantity_pack ? 'is-invalid' : ''}`}
                                                id="quantity_pack"
                                                value={editProductPrice.quantity_pack}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, quantity_pack: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.quantity_pack && <div className="invalid-feedback">{inputErrors.quantity_pack}</div>}
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="price_pack" className="form-label" style={{ float: 'left' }}>
                                                Price Pack:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="number"
                                                className={`form-control ${hasSubmitted && inputErrors.price_pack ? 'is-invalid' : ''}`}
                                                id="price_pack"
                                                value={editProductPrice.price_pack}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, price_pack: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.price_pack && <div className="invalid-feedback">{inputErrors.price_pack}</div>}
                                        </div>
                                        <p>( Suggest : 1 pack equals how many pills? Multiply that number by the quantity of packs )</p>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="quantity_pill" className="form-label" style={{ float: 'left' }}>
                                                Quantity Pill:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="number"
                                                className={`form-control ${hasSubmitted && inputErrors.quantity_pill ? 'is-invalid' : ''}`}
                                                id="quantity_pill"
                                                value={editProductPrice.quantity_pill}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, quantity_pill: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.quantity_pill && <div className="invalid-feedback">{inputErrors.quantity_pill}</div>}
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="price_pill" className="form-label" style={{ float: 'left' }}>
                                                Price Pill:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="number"
                                                className={`form-control ${hasSubmitted && inputErrors.price_pill ? 'is-invalid' : ''}`}
                                                id="price_pill"
                                                value={editProductPrice.price_pill}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, price_pill: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.price_pill && <div className="invalid-feedback">{inputErrors.price_pill}</div>}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-3 col-lg-12">
                                            <label htmlFor="name_other" className="form-label" style={{ float: 'left' }}>
                                                Name Other:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="text"
                                                className={`form-control ${hasSubmitted && inputErrors.name_other ? 'is-invalid' : ''}`}
                                                id="name_other"
                                                value={editProductPrice.name_other}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, name_other: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.name_other && <div className="invalid-feedback">{inputErrors.name_other}</div>}
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="price_other" className="form-label" style={{ float: 'left' }}>
                                                Price Other:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="number"
                                                className={`form-control ${hasSubmitted && inputErrors.price_other ? 'is-invalid' : ''}`}
                                                id="price_other"
                                                value={editProductPrice.price_other}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, price_other: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.price_other && <div className="invalid-feedback">{inputErrors.price_other}</div>}
                                        </div>
                                        <div className="mb-3 col-lg-6">
                                            <label htmlFor="quantity_other" className="form-label" style={{ float: 'left' }}>
                                                Quantity Other:
                                            </label>
                                            <input
                                                placeholder='Enter . . .'
                                                type="number"
                                                className={`form-control ${hasSubmitted && inputErrors.quantity_other ? 'is-invalid' : ''}`}
                                                id="quantity_other"
                                                value={editProductPrice.quantity_other}
                                                onChange={(e) => setEditProductPrice({ ...editProductPrice, quantity_other: e.target.value })}
                                            />
                                            {hasSubmitted && inputErrors.quantity_other && <div className="invalid-feedback">{inputErrors.quantity_other}</div>}
                                        </div>
                                    </>
                                )}

                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                    Update
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <tbody>

                                    {/* Other */}
                                    {productPrice?.status == 2 ? (
                                        <tr>
                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">N.Other : </h6>
                                            </th>
                                            <td>{productPrice?.name_other}</td>

                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">Q.Other : </h6>
                                            </th>
                                            <td>{productPrice?.quantity_other}</td>

                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">P.Name : </h6>
                                            </th>
                                            <td>{productPrice?.price_other}$</td>
                                        </tr>
                                    ) : ''
                                    }


                                    {/* In Set Box Pack Pill */}
                                    {productPrice?.status == 1 ? (
                                        <tr>
                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">Q.Box : </h6>
                                            </th>
                                            <td>{productPrice?.quantity_box}</td>

                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">P.Box : </h6>
                                            </th>
                                            <td>{productPrice?.price_box}$</td>
                                        </tr>
                                    ) : ''
                                    }
                                    {productPrice?.status == 1 ? (
                                        <tr>
                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">Q.Pack : </h6>
                                            </th>
                                            <td>{productPrice?.quantity_pack}</td>

                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">P.Pack : </h6>
                                            </th>
                                            <td>{productPrice?.price_pack}$</td>
                                        </tr>
                                    ) : ''
                                    }
                                    {productPrice?.status == 1 ? (
                                        <tr>
                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">Q.Pill : </h6>
                                            </th>
                                            <td>{productPrice?.quantity_pill}</td>

                                            <th className="border-bottom-0" style={{ width: '30%' }}>
                                                <h6 className="fw-semibold mb-0">P.Pill : </h6>
                                            </th>
                                            <td>{productPrice?.price_pill}$</td>
                                        </tr>
                                    ) : ''
                                    }



                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailUPS;
