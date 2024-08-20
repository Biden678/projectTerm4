import React from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Contact from '../Admin/management/Contact';

function ContactBEPage(props) {
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
                     <Contact />
                        {/*  */}
                    </div>
                </div>


            </div>
        </div>
    );
}

export default ContactBEPage;