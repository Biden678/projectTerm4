import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import AdminList from './management/AdminList';

function ManageAdminPage(props) {
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
                       <AdminList/>
                        {/*  */}
                    </div>
                </div>


            </div>

        </div >
    );
}

export default ManageAdminPage;