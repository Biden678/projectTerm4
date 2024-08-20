import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import PrescribeList from '../products/PrescribeList';

function PrescribeAdminPage(props) {
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
                    <PrescribeList />
                </div>
            </div>


        </div>

    </div >
    );
}

export default PrescribeAdminPage;