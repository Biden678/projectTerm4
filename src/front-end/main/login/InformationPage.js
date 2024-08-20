import React from 'react';
import Information from '../../component/User/Information';
import Header from '../../component/Header';
import Footer from '../../component/Footer';

function InformationPage(props) {
    return (
        <div>
            <Header/>
            <Information/>
            <Footer/>
        </div>
    );
}

export default InformationPage;