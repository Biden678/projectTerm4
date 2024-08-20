import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import AnswerList from '../health/AnswerList';

function AnswerAdminPage(props) {
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
                  <AnswerList/>
                </div>
            </div>

        </div>

    </div >
    );
}

export default AnswerAdminPage;