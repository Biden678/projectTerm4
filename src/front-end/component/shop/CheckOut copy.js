import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

function CheckOut() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const [carts, setCarts] = useState([]);
    const { navigate } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        async function handleCartsByCusId() {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:9999/api/carts/${user?.cus_id}`);
                    if (response.status === 200) {
                        setCarts(response.data);
                    }
                } catch (error) {
                    console.log("Something went wrong:", error);
                }
            } else {
                alert("Hãy đăng nhập trước nhé !");
                navigate('/login');
            }
        }
        handleCartsByCusId();
    }, [navigate]);

    useEffect(() => {
        if (!scriptLoaded) {
            const script = document.createElement("script");
            script.src = "https://www.paypal.com/sdk/js?client-id=ATGXcrNc5l8akd8iyRwk-OI4GXTyXAQy_nybdU9fGSfHpFA3crp3AUjbFIHEKYuiGyTkLpczjCgFS2GH";
            script.async = true;

            script.onload = () => {
                setScriptLoaded(true);
                setLoading(false);
            };

            script.onerror = () => {
                console.error("Failed to load the PayPal script.");
                toast.error('Failed to load PayPal script!', {
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
                setLoading(false);
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [scriptLoaded]);

    useEffect(() => {
        if (scriptLoaded) {
            window.paypal
                .Buttons({
                    createOrder: function (data, actions) {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: `${totalAmount}`,
                                    },
                                },
                            ],
                        });
                    },
                    onApprove: function (data, actions) {
                        handleOrderClick();
                        handleUpdateQtyUnitPrice();
                        handleDeleteCartByCusId();
                        handlePayingSuccessBackToHomeClick();
                    },
                    onError: function (err) {
                        console.error("PayPal error:", err);
                        toast.error('Paying have something wrong!', {
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
                    },
                })
                .render("#paypal-button-container");
        }
    }, [scriptLoaded]);

    function handlePayingSuccessBackToHomeClick() {
        toast.success('🦄 Paying successfully!', {
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
        navigate("/");
    };

    const handleBackButtonClick = () => {
        const shouldCancel = window.confirm("Bạn thật sự muốn cancel và quay về trang chính?");
        if (shouldCancel) {
            navigate("/");
        }
    };

    async function handleOrderClick() {
        const realTime = new Date().toISOString();
        const orderData = {
            cus_id: user?.cus_id,
            date: realTime,
            total: totalAmount,
            o_status: 1,
            address: user?.address,
            phone: user?.phone,
        };

        try {
            const response = await axios.post("http://localhost:9999/api/order", orderData);
            console.log("Order created:", response.data);
        } catch (error) {
            console.error("Error creating order:", error);
        }

        try {
            for (let cart of carts) {
                const orderItemData = {
                    item: cart.name,
                    unit_price: cart.price_unit,
                    qty: cart.quantity_unit,
                    amount: (cart.price_unit * cart.quantity_unit).toFixed(2),
                    date: realTime,
                };

                const orderItemResponse = await axios.post("http://localhost:9999/api/orderitem", orderItemData);
                console.log("Order item created:", orderItemResponse.data);
            }
        } catch (error) {
            console.error("Error creating order items:", error);
        }
    }

    const unitPrices = {};
    async function handleUpdateQtyUnitPrice() {
        for (let cart of carts) {
            try {
                const response = await axios.get(`http://localhost:9999/api/ups/${cart?.pro_id}`);
                if (response.status === 200) {
                    Object.assign(unitPrices, response.data);
                    unitPrices.product = { pro_id: cart?.pro_id };
                    if (cart?.type_unit === 1) {
                        if (cart?.option_unit === 1) {
                            unitPrices.quantity_box -= cart.quantity_unit;
                        } else if (cart?.option_unit === 2) {
                            unitPrices.quantity_pack -= cart.quantity_unit;
                        } else if (cart?.option_unit === 3) {
                            unitPrices.quantity_pill -= cart.quantity_unit;
                        }
                    } else if (cart?.type_unit === 2) {
                        if (cart?.option_unit === 4) {
                            unitPrices.quantity_other -= cart.quantity_unit;
                        }
                    }
                    await axios.post(`http://localhost:9999/api/ups`, unitPrices);
                    for (let key in unitPrices) {
                        delete unitPrices[key];
                    }
                }
            } catch (error) {
                console.log("Something went wrong:", error);
            }
        }
    }

    async function handleDeleteCartByCusId() {
        try {
            const response = await axios.delete(`http://localhost:9999/api/ups/cart/${user?.cus_id}`);
            if (response.status === 204) {
                console.log("Cart deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting cart:", error);
        }
    }

    const totalAmount = carts.reduce((sum, cart) => sum + cart.price_unit * cart.quantity_unit, 0).toFixed(2);

    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Check out</h1>
            </div>

            <div className="container-fluid py-5 mt-5">
                <div className="container py-5">
                    <div className="text-center mx-auto pb-5 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600 }}>
                        <h5 className="text-primary">Have A Nice Day My Customer</h5>
                        <h1 className="mb-3">Check out Page</h1>
                    </div>

                    <p className="mb-4 text-primary">Billing Information</p>
                    <div className="row g-5">
                        <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                            <div className="p-5 rounded contact-form">
                                {carts.map(cart => (
                                    <div key={cart.id_cart}>
                                        <div className="d-flex justify-content-between">
                                            <p className="mb-0">{cart.name}{cart.option_unit == 1 ? " (Box)" : cart.option_unit == 2 ? " (Pack)" : cart.option_unit == 3 ? " (Pill)" : ''} : {cart.price_unit}x{cart.quantity_unit}$</p>
                                            <p className="mb-0">{(cart.price_unit * cart.quantity_unit).toFixed(2)} $</p>
                                        </div>
                                        <hr className="mt-2" />
                                    </div>
                                ))}
                                <div className="d-flex justify-content-between">
                                    <p className="mb-0 text-primary">Total</p>
                                    <p className="mb-0 text-primary">{totalAmount} $</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-start row" style={{ maxWidth: '100%' }}>
                        <div className="col-lg-4">
                            <button
                                className="btn btn-outline-primary py-3 px-5"
                                type="button"
                                style={{ width: '100%' }}
                                onClick={handleBackButtonClick}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="col-lg-8">
                            {loading ? (
                                <div className="text-center">
                                    <p>Loading PayPal...</p>
                                </div>
                            ) : (
                                <div id="paypal-button-container"></div>
                            )}
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default CheckOut;
