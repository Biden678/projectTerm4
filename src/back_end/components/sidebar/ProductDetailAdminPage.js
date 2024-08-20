import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import ProductDetailBasicList from '../product/ProductDetailBasicList';
import ProductDetailIMGList from '../product/productPriceAndImage/ProductDetailIMGList';
import ProductDetailUPS from '../product/productPriceAndImage/ProductDetailUPS';

function ProductDetailAdminPage(props) {
    const [imageExists, setImageExists] = useState(0);

    const handleImageExists = (newNumber) => {
        setImageExists(newNumber);
        console.log("imageExists : " + imageExists);
    };

    return (
        <div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <br />
                    <div className="container-fluid row">
                        <ProductDetailBasicList imageExists={imageExists} onIMGChange={handleImageExists} />
                        <ProductDetailIMGList imageExists={imageExists} onIMGChange={handleImageExists} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailAdminPage;
