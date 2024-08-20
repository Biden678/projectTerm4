import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

function Cart() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const { navigate } = useContext(AuthContext);

    const [carts, setCarts] = useState([]);
    const [products, setProducts] = useState([]);
    const [productImages, setProductImages] = useState({});
    const [isOutOfStock, setIsOutOfStock] = useState(false);

    const fetchCartsAndUpdatePrices = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/carts/${user.cus_id}`);
            if (response.status === 200) {
                const updatedCarts = response.data.map(async (cart) => {
                    try {
                        const priceResponse = await axios.get(`http://localhost:9999/api/ups/${cart.pro_id}`);
                        if (priceResponse.status === 200) {
                            const unitPrices = priceResponse.data;
                            if (cart.type_unit === 1) {
                                if (cart.option_unit === 1) {
                                    cart.price_unit = unitPrices.price_box;
                                } else if (cart.option_unit === 2) {
                                    cart.price_unit = unitPrices.price_pack;
                                } else if (cart.option_unit === 3) {
                                    cart.price_unit = unitPrices.price_pill;
                                }
                            } else if (cart.type_unit === 2) {
                                if (cart.option_unit === 4) {
                                    cart.price_unit = unitPrices.price_other;
                                }
                            }
                        }
                    } catch (error) {
                        console.error("Error fetching unit prices:", error);
                    }
                    return cart;
                });

                const resolvedCarts = await Promise.all(updatedCarts);
                setCarts(resolvedCarts);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    };

    useEffect(() => {
        fetchCartsAndUpdatePrices();
    }, []);

    useEffect(() => {
        async function fetchProductDetails() {
            if (carts.length > 0) {
                try {
                    const productRequests = carts.map((cart) => axios.get(`http://localhost:9999/api/product/${cart.pro_id}`));
                    const productResponses = await Promise.all(productRequests);
                    const productData = productResponses.map((response) => response.data);
                    setProducts(productData);

                    // Fetch product images
                    const imageRequests = productData.map((product) => axios.get(`http://localhost:9999/api/productImages/${product.pro_id}`));
                    const imageResponses = await Promise.all(imageRequests);
                    const images = {};
                    let outOfStock = false;
                    imageResponses.forEach((response, index) => {
                        if (response.status === 200 && response.data.length > 0) {
                            images[productData[index].pro_id] = response.data[0].image_path;
                        }
                        const product = productData[index];
                        if (
                            (carts[index].option_unit === 1 && product.unitPriceStatus.quantity_box === 0) ||
                            (carts[index].option_unit === 2 && product.unitPriceStatus.quantity_pack === 0) ||
                            (carts[index].option_unit === 3 && product.unitPriceStatus.quantity_pill === 0) ||
                            (carts[index].option_unit === 4 && product.unitPriceStatus.quantity_other === 0)
                        ) {
                            outOfStock = true;
                        } else if (product.banner == false) {
                            outOfStock = true;
                        }
                    });
                    setIsOutOfStock(outOfStock);
                    setProductImages(images);
                } catch (error) {
                    console.error("Something went wrong while fetching product details:", error);
                }
            }
        }

        fetchProductDetails();
    }, [carts]);
    const totalAmount = carts.reduce((sum, cart) => sum + cart.price_unit * cart.quantity_unit, 0).toFixed(2);

    const handleDeleteCartItem = async (cartId) => {
        try {
            await axios.delete(`http://localhost:9999/api/cart/${cartId}`);
            fetchCartsAndUpdatePrices();
        } catch (error) {
            console.log("Something went wrong while deleting cart item:", error);
        }
    };

    function handleCheckOut() {
        navigate("/checkout");
    }

    const handleQuantityChange = (cartId, newQuantity) => {
        setCarts((prevCarts) =>
            prevCarts.map((cart) =>
                cart.id_cart === cartId ? { ...cart, quantity_unit: newQuantity } : cart
            )
        );
    };

    const handleIncreaseQuantity = async (cartId) => {
        const cart = carts.find((cart) => cart.id_cart === cartId);
        const product = products.find((p) => p.pro_id === cart.pro_id);

        if (cart.type_unit === 1) {
            if (cart.option_unit === 1 && cart.quantity_unit < product.unitPriceStatus.quantity_box) {
                handleQuantityChange(cartId, cart.quantity_unit + 1);
            } else if (cart.option_unit === 2 && cart.quantity_unit < product.unitPriceStatus.quantity_pack) {
                handleQuantityChange(cartId, cart.quantity_unit + 1);
            } else if (cart.option_unit === 3 && cart.quantity_unit < product.unitPriceStatus.quantity_pill) {
                handleQuantityChange(cartId, cart.quantity_unit + 1);
            } else {
                alert("You cannot add more quantity than is in stock.");
                return;
            }
        } else if (cart.type_unit === 2) {
            if (cart.option_unit === 4 && cart.quantity_unit < product.unitPriceStatus.quantity_other) {
                handleQuantityChange(cartId, cart.quantity_unit + 1);
            } else {
                alert("You cannot add more quantity than is in stock.");
                return;
            }
        }

        try {
            await axios.post(`http://localhost:9999/api/cart`, {
                ...cart,
                quantity_unit: cart.quantity_unit + 1,
            });
        } catch (error) {
            console.log("fail :", error);
        }

        fetchCartsAndUpdatePrices();
    };

    const handleDecreaseQuantity = async (cartId) => {
        const cart = carts.find((cart) => cart.id_cart === cartId);
        if (cart.quantity_unit > 1) {
            handleQuantityChange(cartId, cart.quantity_unit - 1);

            try {
                await axios.post(`http://localhost:9999/api/cart`, {
                    ...cart,
                    quantity_unit: cart.quantity_unit - 1,
                });
            } catch (error) {
                console.log("fail :", error);
            }

            fetchCartsAndUpdatePrices();
        }
    };

    console.log("soul out :" + isOutOfStock);

    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Your Cart</h1>

            </div>
            {user ? (
                carts.length ? (
                    <>
                        <div className="container-fluid py-5">
                            <h1></h1>
                            <div className="container py-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Products</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Unit Type</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                                <th scope="col">Handle</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {carts.map((cart, index) => {
                                                const product = products.find(p => p.pro_id === cart.pro_id);
                                                const isSoldOut = (
                                                    (cart.option_unit === 1 && product?.unitPriceStatus.quantity_box === 0) ||
                                                    (cart.option_unit === 2 && product?.unitPriceStatus.quantity_pack === 0) ||
                                                    (cart.option_unit === 3 && product?.unitPriceStatus.quantity_pill === 0) ||
                                                    (cart.option_unit === 4 && product?.unitPriceStatus.quantity_other === 0)
                                                );
                                                const isNotFound = (product?.banner == false);
                                                return (
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            <div className="fruite-img" style={{ height: '200px', overflow: 'hidden' }}>
                                                                {isSoldOut && (
                                                                    <div className="position-absolute" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                                                                        <span className="text-danger font-weight-bold" style={{ fontSize: '24px' }}>SOLD OUT</span>
                                                                    </div>
                                                                )}
                                                                {isNotFound && (
                                                                    <div className="position-absolute" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                                                                        <span className="text-danger font-weight-bold" style={{ fontSize: '24px' }}>SOLD OUT</span>
                                                                    </div>
                                                                )}
                                                                <img
                                                                    src={`http://localhost:9999/api/getImage/${productImages[product?.pro_id]}`}
                                                                    className="img-fluid w-100 h-100"
                                                                    style={{ objectFit: 'cover', borderRadius: '20px' }}
                                                                />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <p className="mb-0 mt-4">{cart?.name}</p>
                                                        </td>
                                                        <td>
                                                            <p className="mb-0 mt-4">
                                                                {cart?.option_unit === 1 ? 'Box' :
                                                                    cart?.option_unit === 2 ? 'Pack' :
                                                                        cart?.option_unit === 3 ? 'Pill' :
                                                                            cart?.option_unit === 4 ? 'Other' : ''}
                                                            </p>
                                                        </td>
                                                        <td>
                                                            <p className="mb-0 mt-4">${cart?.price_unit}</p>
                                                        </td>
                                                        <td>
                                                            <div className="input-group d-flex align-items-center quantity mt-4">
                                                                {!isSoldOut && !isNotFound &&(
                                                                    <button
                                                                        className="btn btn-outline-success form-control"
                                                                        type="button"
                                                                        onClick={() => handleDecreaseQuantity(cart.id_cart)}
                                                                    >
                                                                        -
                                                                    </button>
                                                                )}
                                                                <input type="number" className="form-control text-center" value={cart?.quantity_unit} readOnly />
                                                                {!isSoldOut && !isNotFound && (
                                                                    <button
                                                                        className="btn btn-outline-success form-control"
                                                                        type="button"
                                                                        onClick={() => handleIncreaseQuantity(cart.id_cart)}
                                                                    >
                                                                        +
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <p className="mb-0 mt-4">${(cart.price_unit * cart.quantity_unit).toFixed(2)}</p>
                                                        </td>
                                                        <td>
                                                            <button className="btn border mt-4" onClick={() => handleDeleteCartItem(cart.id_cart)}>
                                                                <i className="fa fa-times text-danger"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="row g-4 justify-content-end">
                                    <div className="col-8"></div>
                                    <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                                        <div>
                                            <div className="p-4">
                                                <h1 className="display-6 mb-4">Cart Total</h1>
                                                <div className="d-flex justify-content-between mb-4">
                                                    <h5 className="mb-0 me-4">Subtotal:</h5>
                                                    <p className="mb-0">${carts.reduce((sum, cart) => sum + cart.price_unit * cart.quantity_unit, 0).toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                                <h5 className="mb-0 ps-4 me-4">Total</h5>
                                                <p className="mb-0 pe-4">${totalAmount}</p>
                                            </div>
                                            <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase m-4" onClick={handleCheckOut} disabled={isOutOfStock} style={{ width: "90%" }} type="button">Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="container-fluid py-5">
                            <div className="container py-5 text-center">
                                <div className="row justify-content-center">
                                    <div className="col-lg-12">
                                        <h1 className="display-1">Have Not Thing Here</h1>
                                        <h1 className="mb-4">Find Something At Shop</h1>

                                        <a className="btn border-secondary rounded-pill py-3 px-5" href="/shop">Go Back To Shop</a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            ) : (
                <>
                    <div className="container-fluid py-5">
                        <div className="container py-5 text-center">
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
                                    <h1 className="display-1">Have Not Thing Here</h1>
                                    <h1 className="mb-4">Find Something New</h1>
                                    <p className="mb-4">Login to Shopping Now!</p>
                                    <a className="btn border-secondary rounded-pill py-3 px-5" href="/login">Go To Login</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
