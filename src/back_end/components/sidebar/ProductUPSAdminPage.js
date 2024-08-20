import React, { useState } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import ProductDetailUPS from '../product/productPriceAndImage/ProductDetailUPS';

function ProductUPSAdminPage(props) {
    return (
        <div>
            <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
                data-sidebar-position="fixed" data-header-position="fixed">
                <Sidebar />
                <div className="body-wrapper">
                    <Header />
                    <br />
                    <div className="container-fluid row">
                        <ProductDetailUPS />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductUPSAdminPage;
