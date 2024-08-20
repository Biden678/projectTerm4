import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

function Order() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const { navigate } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState({});

    const fetchGetAllOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/orders/${user?.cus_id}`);
            if (response.status === 200) {
                setOrders(response.data);
                fetchOrderItemsForOrders(response.data);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    };

    const fetchOrderItemsForOrders = async (orders) => {
        try {
            const items = {};
            for (const order of orders) {
                const response = await axios.get(`http://localhost:9999/api/order/items`, {
                    params: { date: order.date },
                });
                if (response.status === 200) {
                    items[order?.id_order] = response.data;
                }
            }
            setOrderItems(items);
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    };

    useEffect(() => {
        fetchGetAllOrders();
    }, []);
    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(date);
    };
    const updateOrderTo3 = async (orderId) => {
        try {
            const orderToUpdate = orders.find(order => order.id_order === orderId);
            if (orderToUpdate) {
                const updatedOrder = { ...orderToUpdate, o_status: 3 };
                await axios.post(`http://localhost:9999/api/order`, updatedOrder);
                fetchGetAllOrders();
            }
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };
    console.log(user);
    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Your Order</h1>
            </div>
            {user ? (
                orders.length ? (
                    <div className="container-fluid py-5">
                        <div className="container py-5">
                            <h4>
                                Name : {user.cus_name} ({user.cus_phone})
                            </h4>
                            <h3>
                                Address : {user.cus_address}
                            </h3>

                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {/* <th scope="col">Address</th>
                                            <th scope="col">Phone</th> */}
                                            <th scope="col">Date</th>

                                            <th scope="col">Items</th>
                                            <th scope="col">Qty X Price = Subtotal</th>
                                            <th scope="col">Total</th>

                                            <th scope="col">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={index}>
                                                {/* <td>{order?.address}</td>
                                                <td>{order?.phone}</td> */}
                                                <td>{formatDateTime(order?.date)}</td>
                                                <td>
                                                    {orderItems[order?.id_order]?.map((item) => (
                                                        <li key={item?.id}>
                                                            {item?.item}
                                                        </li>
                                                    ))}
                                                </td>
                                                <td>
                                                    {orderItems[order?.id_order] ? (
                                                        <ul>
                                                            {orderItems[order?.id_order]?.map((item) => (
                                                                <li key={item?.id}>
                                                                    ${item?.unit_price} x {item?.qty} = ${item?.amount}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : ''}
                                                </td>
                                                <td>${order.total}</td>

                                                <td>{order.o_status == 1 ? "Waiting..." : order.o_status == 2 ?
                                                    <>
                                                        <button className="btn btn-outline-success" onClick={() => updateOrderTo3(order.id_order)}>Confirm Received</button>
                                                    </>
                                                    : order.o_status == 3 ? <><span style={{color:"green"}}>Confirmed Successfully</span></> : '' }</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container-fluid py-5">
                        <div className="container py-5 text-center">
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <h1 className="display-1">Have Not Thing Here</h1>
                                    <h1 className="mb-4">Find Something At Shop</h1>
                                    <a className="btn border-secondary rounded-pill py-3 px-5" onClick={() => navigate("/shop")}>
                                        Go Back To Shop
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                <div className="container-fluid py-5">
                    <div className="container py-5 text-center">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
                                <h1 className="display-1">Have Not Thing Here</h1>
                                <h1 className="mb-4">Find Something New</h1>
                                <p className="mb-4">Login to Shopping Now!</p>
                                <a className="btn border-secondary rounded-pill py-3 px-5" onClick={() => navigate("/shop")}>
                                    Go To The Shop
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Order;
