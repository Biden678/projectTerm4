import React, { useEffect, useState } from 'react';

const SumProductSold = () => {
    const [totalProduct, setTotalProduct] = useState(0);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                //http://localhost:5044/api/Order
                const response = await fetch('');
                const orderData = await response.json();
    
                // Calculate total revenue for all orders
                const totalProduct = orderData.length;
    
                setTotalProduct(totalProduct);
            } catch (error) {
                console.error('Error fetching revenue data:', error);
            }
        };
    
        fetchRevenueData();
    }, []);


    return (
        <div>
            <div className="row align-items-center">
                <div className="col-12">
                    <h5 className="card-title fw-semibold">Product has been sold :</h5>
                    <div className="d-flex align-items-center mb-3">
                        <span className="me-1 rounded-circle bg-light-success round-20 d-flex align-items-center justify-content-center">
                            {totalProduct > 0 ? (
                                <i className="ti ti-arrow-up-left text-success"></i>
                            ) : (
                                <i className="ti ti-arrow-down-right text-danger"></i>
                            )}
                        </span>
                        <p className="text-dark me-1 fs-3 mb-0">+{totalProduct} Sold</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SumProductSold;
