import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import UserList from './management/UserList';
// import UserList from './management/UserList';

function ManageUserPage(props) {
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
                       <UserList/>
                        {/*  */}
                    </div>
                </div>


            </div>

        </div >
    );
}

export default ManageUserPage;