import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../../css/User/DetailProduct.css';
import Comment from './Comment/Comment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../contexts/AuthContext';

function MedicineDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [productImages, setProductImages] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(1); // Default to Box
    const [quantity, setQuantity] = useState(1);

    const user = JSON.parse(sessionStorage.getItem("user"));
    const { navigate } = useContext(AuthContext);

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const response = await axios.get(`http://localhost:9999/api/product/${id}`);
                setProduct(response.data);

                const imagesResponse = await axios.get(`http://localhost:9999/api/productImages/${id}`);
                setProductImages(imagesResponse.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        }

        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    useEffect(() => {
        // Set selectedUnit based on product status when product updates
        if (product && product.unitPriceStatus && product.unitPriceStatus.status === 2) {
            setSelectedUnit(4);
        } else {
            setSelectedUnit(1); // Default to Box if status is not 2
        }
    }, [product]);

    const handleAddToCart = async () => {
        if (!user) {
            alert("Please login first!");
            navigate('/login');
            return;
        }

        try {
            // Fetch existing cart items for the user
            const existingCartResponse = await axios.get(`http://localhost:9999/api/carts/${user.cus_id}`);
            let existingCart = existingCartResponse.data;

            // Check if the product is already in the cart
            const existingCartItem = existingCart.find(item => item.pro_id === product.pro_id && item.option_unit === selectedUnit);

            // Calculate total quantity including the new quantity
            let totalQuantity = quantity;
            if (existingCartItem) {
                totalQuantity += existingCartItem.quantity_unit;
            }

            // Check against the available quantity in stock
            const availableQuantity = product.unitPriceStatus?.status === 1 ? (
                selectedUnit === 1 ? product.unitPriceStatus.quantity_box :
                    selectedUnit === 2 ? product.unitPriceStatus.quantity_pack :
                        selectedUnit === 3 ? product.unitPriceStatus.quantity_pill : 0
            ) : product.unitPriceStatus?.quantity_other;

            if(availableQuantity == 0){
                alert("This product is out of stock!");
                return;
            }else if (totalQuantity > availableQuantity) {
                alert("You cannot add more quantity than available in stock! Check Your Cart.");
                return;
            }

            if (existingCartItem) {
                // Update the quantity if the product is already in the cart
                existingCartItem.quantity_unit += quantity;
                const updateResponse = await axios.post(`http://localhost:9999/api/cart`, existingCartItem);
                if (updateResponse.status === 201) {
                    toast.success('This product already exists in the cart and the quantity has been updated! Check Your Cart👌', {
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
                }
            } else {
                // Add a new item to the cart if the product is not in the cart
                const cartItem = {
                    option_unit: selectedUnit,
                    name: product.name,
                    type_unit: product.unitPriceStatus.status,
                    quantity_unit: quantity,
                    price_unit: selectedUnit === 1 ? product.unitPriceStatus.price_box :
                        selectedUnit === 2 ? product.unitPriceStatus.price_pack :
                            selectedUnit === 3 ? product.unitPriceStatus.price_pill :
                                product.unitPriceStatus.price_other,
                    cus_id: user.cus_id,
                    pro_id: product.pro_id
                };
                const response = await axios.post('http://localhost:9999/api/cart', cartItem);
                if (response.status === 201) {
                    toast.success('Product added to cart successfully! Check Your Cart👌', {
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
                }
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    };


    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Elixir Detail</h1>
            </div>

            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-12 col-xl-12">
                            <div className="row g-4">
                                <div className="col-lg-5">
                                    <div className="rounded scroll-container">
                                        {productImages.map((image, index) => (
                                            <div key={index} className="fruite-img item" style={{ height: '500px', overflow: 'hidden' }}>
                                                <img
                                                    src={`http://localhost:9999/api/getImage/${image.image_path}`}
                                                    className="img-fluid w-100 h-100"
                                                    style={{ objectFit: 'cover', borderRadius: '20px' }}
                                                    alt={`Product Image ${index + 1}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-lg-7">
                                    <p className="mb-3">{product.unitPriceStatus?.status === 1 ? (
                                        selectedUnit === 1 ? (product.unitPriceStatus.quantity_box != 0 ? <>Quantity in Stock : {product.unitPriceStatus.quantity_box}</> : <><span style={{color:'red'}}>Sold Out</span></>) :
                                            selectedUnit === 2 ? (product.unitPriceStatus.quantity_pack != 0 ? <>Quantity in Stock : {product.unitPriceStatus.quantity_pack}</> : <><span style={{color:'red'}}>Sold Out</span></>) :
                                                selectedUnit === 3 ? (product.unitPriceStatus.quantity_pill != 0 ? <>Quantity in Stock : {product.unitPriceStatus.quantity_pill}</> : <><span style={{color:'red'}}>Sold Out</span></>) : ''
                                    ) : (product.unitPriceStatus.quantity_other != 0 ? <>Quantity in Stock : {product.unitPriceStatus.quantity_other}</> : <><span style={{color:'red'}}>Sold Out</span></>)}


                                    </p>
                                    <h3 className="fw-bold mb-3">{product.name}</h3>
                                    <h1>$ {product.unitPriceStatus?.status === 1 ? (
                                        selectedUnit === 1 ? product.unitPriceStatus.price_box :
                                            selectedUnit === 2 ? product.unitPriceStatus.price_pack :
                                                selectedUnit === 3 ? product.unitPriceStatus.price_pill : ''
                                    ) : product.unitPriceStatus?.price_other} / {product.unitPriceStatus?.status === 1 ? (
                                        selectedUnit === 1 ? 'Box' :
                                            selectedUnit === 2 ? 'Pack' :
                                                selectedUnit === 3 ? 'Pill' : '')
                                        : product.unitPriceStatus?.name_other}</h1>

                                    {product?.unitPriceStatus?.status === 1 && (
                                        <h4 className="fw-bold mb-3">Select Unit :
                                            <div className='row'>
                                                <button className={`col-3 rounded-pill m-2 ${selectedUnit === 1 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedUnit(1)}>{(product.unitPriceStatus.quantity_box != 0 ? 'Box' : <><del style={{color:'red'}}>Box</del></>)}</button>
                                                <button className={`col-3 rounded-pill m-2 ${selectedUnit === 2 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedUnit(2)}>{(product.unitPriceStatus.quantity_pack != 0 ? 'Pack' : <><del style={{color:'red'}}>Pack</del></>)}</button>
                                                <button className={`col-3 rounded-pill m-2 ${selectedUnit === 3 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedUnit(3)}>{(product.unitPriceStatus.quantity_pill != 0 ? 'Pill' : <><del style={{color:'red'}}>Pill</del></>)}</button>
                                            </div>
                                        </h4>
                                    )}
                                    <p className="mb-3">Category: {product.category?.name}</p>
                                    <p className="mb-3">Brand origin : {product?.brand?.name}</p>
                                    <p className="mb-3">Producer : {product.producer}</p>
                                    <p className="mb-3">Manufacturing country : {product.country.name}</p>

                                    <div className='row'>
                                        <div className="col-6">
                                            <input
                                                type="number"
                                                className="form-control form-control-sm text-center"
                                                value={quantity}
                                                onChange={(e) => {
                                                    const value = Number(e.target.value);
                                                    if (value > 0) {
                                                        setQuantity(value);
                                                    }
                                                }}
                                            />

                                        </div>
                                        <div className="col-6">
                                            <button onClick={handleAddToCart} className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary">Add To <i className="fa fa-shopping-bag"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="mb-5">
                                    <div>
                                        <h3>Read This : {product.description}</h3>
                                        <div className="px-2">
                                            <div className="row g-4">
                                                <div className="col-12">

                                                    <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Dosage form</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{product.dbc}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row text-center align-items-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Specification</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{product.qc}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row bg-light align-items-center text-center justify-content-center py-2">
                                                        <div className="col-6">
                                                            <p className="mb-0">Ingredient</p>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="mb-0">{product.tp}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <Comment />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedicineDetail;
