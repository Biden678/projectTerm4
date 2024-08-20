import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

function Order() {
    const { navigate } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState({});


    const fetchGetAllOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/orders`);
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
    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 4;

    useEffect(() => {
        setTotalPages(Math.ceil(orders.length / PAGE_SIZE));
    }, [orders]);
    const displayedOrders = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    return (
        <div>

            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <h1 className="m-5">
                        Orders Page
                    </h1>
                    {/* phân trang */}
                    <div className="d-flex justify-content-between m-5">
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
                    {displayedOrders.length ? (
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
                                                            <button className="btn btn-outline-success" onClick={() => updateOrderTo2(order.id_order)}>Receive Order</button>
                                                        </>
                                                        : order.o_status == 2 ? 'Shipping' : order.o_status == 3 ? <><p style={{ color: "green" }}>Successful Delivery</p></> : ''}
                                                    </td>
                                                    {/* <td>
                                                        <button className="btn btn-info" onClick={() => navigate(`/orderDetailAdminPage/${order.id_order}`)}>Detail</button>
                                                    </td> */}
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

export default Order;
