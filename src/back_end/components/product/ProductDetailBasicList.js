    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import 'react-toastify/dist/ReactToastify.css';
    import { useParams } from 'react-router-dom';
    import { toast } from 'react-toastify';

    function ProductDetailBasicList({ imageExists }) {
        const { proId } = useParams();
        const [product, setProduct] = useState(null);
        const [isSaleUPS, setIsSaleUPS] = useState(false);

        useEffect(() => {
            async function handleFetchProduct() {
                try {
                    const response = await axios.get(`http://localhost:9999/api/product/${proId}`);
                    if (response.status === 200) {
                        setProduct(response.data);
                        setIsSaleUPS(response.data.banner);
                    }
                } catch (error) {
                    console.log("Something Wrong:", error);
                }
            }
            handleFetchProduct();
        }, [proId]);

        if (!product) {
            return <div>Loading...</div>;
        }

    const handleUpdateSale = async () => {
        if (!product?.unitPriceStatus?.status) {
            toast.error('Please enter the correct QUANTITY and PRICE for the product before selling!', {
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
            return;
        }
        if(imageExists < 1){
            toast.error('Please update at least 1 IMAGE for the product before selling', {
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
            return;
        }
        const updatedStatus = {
            ...product,
            pro_id: proId,
            banner: !isSaleUPS
        };
        try {
            await axios.post(`http://localhost:9999/api/product`, updatedStatus);
            setProduct(updatedStatus);
            setIsSaleUPS(!isSaleUPS);
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

    return (
        <div className="col-lg-12"><p>Number of Images: {imageExists}</p>
            <div className="d-flex align-items-stretch">
                <div className="card w-100">
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Product Detail <i className='ti'>&#xea0f;</i>
                            <button className={'btn btn-outline-' + (isSaleUPS ? 'dark' : 'success')} style={{ width: 'auto' , float:'right'}} onClick={handleUpdateSale}>
                                {isSaleUPS ? 'Stop Selling' : 'Sell This Product'}
                            </button>
                            <a href={`/productUPSAdminPage/${product?.pro_id}`}>
                            <span> </span><i className='ti'>&#xee1e;</i> Unit Price Status 
                            </a>
                        </h3>

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <tbody>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Name : </h6>
                                        </th>
                                        <td>{product?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Alphabet : </h6>
                                        </th>
                                        <td>{product?.alphabet}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Dosage forms : </h6>
                                        </th>
                                        <td>{product?.dbc}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Specifications : </h6>
                                        </th>
                                        <td>{product?.qc}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Ingredient : </h6>
                                        </th>
                                        <td>{product?.tp}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Contraindicated : </h6>
                                        </th>
                                        <td>{product?.ccd}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Producer : </h6>
                                        </th>
                                        <td>{product?.producer}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Medication requires prescription : </h6>
                                        </th>
                                        <td>{product?.tckt === false ? (<span style={{ color: 'green', fontWeight: 'bold' }}>Can Buy</span>) : (<span style={{ color: 'red' }}>Need Doc's Permission</span>)}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Description : </h6>
                                        </th>
                                        <td>{product?.description}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Subjects of use : </h6>
                                        </th>
                                        <td>{product?.whouse?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Sale status : </h6>
                                        </th>
                                        <td>{product?.banner === false ? (<span style={{ color: 'red' }}>NOT YET</span>) : (<span style={{ color: 'green' }}>SALE</span>)}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Category : </h6>
                                        </th>
                                        <td>{product?.category?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Country : </h6>
                                        </th>
                                        <td>{product?.country?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Prescribe : </h6>
                                        </th>
                                        <td>{product?.prescribe?.name}</td>
                                    </tr>
                                    <tr>
                                        <th className="border-bottom-0" style={{ width: '30%' }}>
                                            <h6 className="fw-semibold mb-0">Brand : </h6>
                                        </th>
                                        <td>{product?.brand?.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductDetailBasicList;
