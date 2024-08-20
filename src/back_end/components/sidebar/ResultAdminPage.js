import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import ResultList from '../health/ResultList';

function ResultAdminPage(props) {
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
                  <ResultList/>
                </div>
            </div>

        </div>

    </div >
    );
}

export default ResultAdminPage;