import React, { useEffect, useState } from 'react';

const RevenueSummary = () => {
    const [totalRevenueCurrentMonth, setTotalRevenueCurrentMonth] = useState(0);
    const [totalRevenuePreviousMonth, setTotalRevenuePreviousMonth] = useState(0);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                const response = await fetch('http://localhost:9999/api/orders');
                const orderData = await response.json();

                console.log("orderData:", orderData);
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth();
                const currentYear = currentDate.getFullYear();

                const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
                const yearOfPreviousMonth = currentMonth === 0 ? currentYear - 1 : currentYear;

                console.log(`Filtering for orders in year: ${yearOfPreviousMonth}, month: ${previousMonth + 1}`);

                const totalRevenueForPreviousMonth = orderData
                    .filter(order => {
                        const orderDate = new Date(order.date);
                        console.log(`Order date: ${orderDate}, Month: ${orderDate.getMonth() + 1}, Year: ${orderDate.getFullYear()}`);
                        return orderDate.getMonth() === previousMonth && orderDate.getFullYear() === yearOfPreviousMonth;
                    })
                    .reduce((total, order) => total + order.total, 0);

                console.log("totalRevenueForPreviousMonth:", totalRevenueForPreviousMonth);
                setTotalRevenuePreviousMonth(totalRevenueForPreviousMonth);

                const totalRevenueForCurrentMonth = orderData
                    .filter(order => {
                        const orderDate = new Date(order.date);
                        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
                    })
                    .reduce((total, order) => total + order.total, 0);

                console.log("totalRevenueForCurrentMonth:", totalRevenueForCurrentMonth);
                setTotalRevenueCurrentMonth(totalRevenueForCurrentMonth);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };

        fetchRevenueData();
    }, []);

    console.log("totalRevenueCurrentMonth:", totalRevenueCurrentMonth);
    console.log("totalRevenuePreviousMonth:", totalRevenuePreviousMonth);

    const revenueComparison = totalRevenueCurrentMonth - totalRevenuePreviousMonth;
    const isCurrentMonthHigher = revenueComparison > 0;

    return (
        <div>
            <div className="row align-items-center">
                <div className="col-12">
                    <h5 className="card-title fw-semibold">Total revenue for the past month and this month:</h5>
                    <div className="d-flex align-items-center mb-3">
                        <p className="text-dark me-1 fs-3 mb-0">Last: +${totalRevenuePreviousMonth.toFixed(2)}</p>
                        {/* <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                            {isCurrentMonthHigher ? (
                                <i className="ti ti-arrow-up-right text-success"></i>
                            ) : (
                                <i className="ti ti-arrow-down-right text-danger"></i>
                            )}
                        </span> */}
                        <p className="text-dark me-1 fs-3 mb-0">Now: <span className="rounded-circle bg-light-success">
                            {isCurrentMonthHigher ? (
                                <i className="ti ti-arrow-up text-success"></i>
                            ) : (
                                <i className="ti ti-arrow-down text-danger"></i>
                            )}
                        </span> +${totalRevenueCurrentMonth.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RevenueSummary;
