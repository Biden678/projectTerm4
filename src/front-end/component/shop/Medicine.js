import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';


function Medicine() {
    const { handleFetchProducts, setProducts, products, navigate } = useContext(AuthContext);
    const [productImages, setProductImages] = useState({});
    const user = JSON.parse(sessionStorage.getItem("user"));

    useEffect(() => {
        async function fetchProductImages() {
            const images = {};
            for (const product of products) {
                try {
                    const response = await axios.get(`http://localhost:9999/api/productImages/${product.pro_id}`);
                    if (response.status === 200 && response.data.length > 0) {
                        images[product.pro_id] = response.data[0].image_path;
                    }
                } catch (error) {
                    console.log("Something went wrong while fetching images:", error);
                }
            }
            setProductImages(images);
        }

        if (products.length > 0) {
            fetchProductImages();
        }
    }, [products]);

    useEffect(() => {
        handleFetchProducts();
    }, []);

    const truncateName = (name) => {
        return name.length > 16 ? name.substring(0, 16) + "..." : name;
    };
    const truncateDescription = (description) => {
        return description.length > 25 ? description.substring(0, 25) + "..." : description;
    };
    const handleAddToCart = async (product) => {
        if (!user) {
            alert("Login first, please !");
            navigate('/login');
        } else {
            try {
                // Fetch existing cart items for the user
                const existingCartResponse = await axios.get(`http://localhost:9999/api/carts/${user.cus_id}`);
                let existingCart = existingCartResponse.data;

                // Check if the product is already in the cart
                const existingCartItem = existingCart.find(item => item.pro_id === product.pro_id);

                // Calculate available quantity based on selected unit
                let availableQuantity = 0;
                if (product.unitPriceStatus.status === 1) {
                    availableQuantity = product.unitPriceStatus.quantity_box;
                } else {
                    availableQuantity = product.unitPriceStatus.quantity_other;
                }

                if (existingCartItem) {
                    // Update the quantity if the product is already in the cart
                    if (existingCartItem.quantity_unit + 1 > availableQuantity) {
                        alert("You cannot add more quantity than available in stock. Check Your Cart!");
                    } else {
                        existingCartItem.quantity_unit += 1;
                        const updateResponse = await axios.post(`http://localhost:9999/api/cart`, existingCartItem);
                        if (updateResponse.status === 201) {
                            alert("This product already exists in the cart and the quantity has been updated!");
                            toast.success('Check Your Cart👌', {
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
                } else {
                    // Add a new item to the cart if the product is not in the cart
                    const cartItem = {
                        option_unit: product.unitPriceStatus.status === 1 ? 1 : 4,
                        name: product.name,
                        type_unit: product.unitPriceStatus.status,
                        quantity_unit: 1,
                        price_unit: product.unitPriceStatus.status === 1 ? product.unitPriceStatus.price_box : product.unitPriceStatus.price_other,
                        cus_id: user.cus_id,
                        pro_id: product.pro_id
                    };

                    if (cartItem.quantity_unit > availableQuantity) {
                        alert("You cannot add more quantity than is in stock.");
                    } else {
                        const response = await axios.post('http://localhost:9999/api/cart', cartItem);
                        if (response.status === 201) {
                            toast.success('Check Your Cart👌', {
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
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        }
    };


    return (

        <div>
            <div class="container-fluid page-header py-5">
                <h1 class="text-center text-white display-6">Shop's Elixir</h1>
            </div>

            {/* <!-- Fruits Shop Start--> */}
            <div className="fruite py-5">
                <div className="container py-5">
                    <div className="tab-class text-center">
                        <div className="row g-4">
                            <div className="col-lg-4 text-start">
                                <h1>Our Elixir</h1>
                            </div>
                            <div className="col-lg-8 text-end">
                                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                                    <li className="nav-item">
                                        <a className="d-flex m-2 py-2 bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                            <span className="text-dark" style={{ width: '130px' }}>All Products</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                            <span className="text-dark" style={{ width: '130px' }}>Bán Chạy</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                            <span className="text-dark" style={{ width: '130px' }}>Giá thấp</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="d-flex py-2 m-2 bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                            <span className="text-dark" style={{ width: '130px' }}>Giá Cao</span>
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>





                        <div className="tab-content">

                            {/* ================================================================================================================================== */}

                            {/* tab-1 tab-2 tab-3 tab-4 tab-5 */}

                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="row g-4">
                                    {products.filter(product => product.banner).map(product => (
                                        <div className="col-md-6 col-lg-4 col-xl-3" key={product.pro_id}>
                                            <div className="rounded position-relative fruite-item">
                                                <div className="fruite-img" style={{ height: '300px', overflow: 'hidden' }}>
                                                    <a href={`/shopdetail/${product.pro_id}`}>
                                                        <img
                                                            src={`http://localhost:9999/api/getImage/${productImages[product.pro_id]}`}
                                                            className="img-fluid w-100 h-100"
                                                            style={{ objectFit: 'cover' }}
                                                            alt={product?.name}
                                                        />
                                                    </a>
                                                </div>
                                                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>
                                                    {product?.category?.name}
                                                </div>
                                                <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', right: '10px' }}>
                                                    {product.unitPriceStatus?.status === 1 ? (product.unitPriceStatus.quantity_box != 0 ? <>Stock : {product.unitPriceStatus.quantity_box}</> : <><span style={{ color: 'red' }}>Sold  Out</span></>) : (product.unitPriceStatus.quantity_other != 0 ? <>Stock : {product.unitPriceStatus.quantity_other}</> : <><span style={{ color: 'red' }}>Sold Out</span></>)}
                                                </div>
                                                <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                                                    <h4>{truncateName(product.name)}</h4>
                                                    <p>{truncateDescription(product.description)}</p>
                                                    <div className="d-flex justify-content-between flex-lg-wrap">
                                                        <p className="text-dark fs-5 fw-bold mb-0">
                                                            ${product?.unitPriceStatus?.status === 1 ? product.unitPriceStatus.price_box : product?.unitPriceStatus?.price_other} / {product?.unitPriceStatus?.status === 1 ? 'Box' : product?.unitPriceStatus?.name_other}
                                                        </p>

                                                        {product.unitPriceStatus?.status === 1 ? (product.unitPriceStatus.quantity_box != 0 ? <>
                                                            <button onClick={() => handleAddToCart(product)} className="btn border border-secondary rounded-pill px-3 text-primary">
                                                                Add to <i className="fa fa-shopping-bag text-primary"></i>
                                                            </button>
                                                        </> : <>
                                                            <button onClick={() => handleAddToCart(product)} className="btn border border-secondary rounded-pill px-3 text-primary">
                                                                <del>Add to <i className="fa fa-shopping-bag text-primary"></i></del>
                                                            </button>
                                                        </>) : (product.unitPriceStatus.quantity_other != 0 ? <>
                                                            <button onClick={() => handleAddToCart(product)} className="btn border border-secondary rounded-pill px-3 text-primary">
                                                                Add to <i className="fa fa-shopping-bag text-primary"></i>
                                                            </button>
                                                        </> : <>
                                                            <button onClick={() => handleAddToCart(product)} className="btn border border-secondary rounded-pill px-3 text-primary">
                                                                <del>Add to <i className="fa fa-shopping-bag text-primary"></i></del>
                                                            </button>
                                                        </>)}


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Fruits Shop End--> */}
        </div>

    );

}

export default Medicine;