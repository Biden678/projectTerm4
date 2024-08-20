import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import CountryList from '../products/CountryList';

function CountryAdminPage(props) {
    return (
        <div>
        <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <Sidebar />


            <div class="body-wrapper">
                {/* <!--  Header Start --> */}
                <Header />
                {/* <!--  Header End --> */}
                <br />
                <div class="container-fluid">
                    <CountryList />
                </div>
            </div>


        </div>

    </div >
    );
}

export default CountryAdminPage;