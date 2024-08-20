import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useParams } from "react-router-dom";

function OrderDetail() {
    const { navigate } = useContext(AuthContext);

    const { cid } = useParams();
    console.log("cid : " +cid);
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState({});


    const fetchGetAllOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/orders/${cid}`);
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

    const updateOrderTo2 = async (orderId) => {
        try {
            const orderToUpdate = orders.find(order => order.id_order === orderId);
            if (orderToUpdate) {
                const updatedOrder = { ...orderToUpdate, o_status: 2 };
                const response = await axios.post(`http://localhost:9999/api/order`, updatedOrder);
                fetchGetAllOrders();
            }
        } catch (error) {
            console.error("Failed to update order status:", error);
        }
    };

    return (
        <div>

            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <h1 className="m-5">
                        Orders Page
                    </h1>
                    {orders.length ? (
                        <div className="container-fluid py-5">
                            <div className="container py-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Address</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Date</th>

                                                <th scope="col">Items</th>

                                                <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.address}</td>
                                                    <td>{order.phone}</td>
                                                    <td>{formatDateTime(order.date)}</td>
                                                    <td>
                                                        {orderItems[order?.id_order]?.map((item) => (
                                                            <li key={item?.id}>
                                                                {item?.item}
                                                            </li>
                                                        ))}
                                                    </td>

                                                    <td>{order.o_status == 1 ?
                                                        <>
                                                            <button className="btn btn-outline-success" onClick={() => updateOrderTo2(order.id_order)}>Nhận đơn đi giao</button>
                                                        </>
                                                        : order.o_status == 2 ? 'Đang Giao Hàng' : order.o_status == 3 ? <><p style={{ color: "green" }}>Giao Hàng Thành Công</p></> : ''}</td>
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
                                        <h1 className="display-1">Not Have Any Orders Here</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>



        </div>
    );
}

export default OrderDetail;
