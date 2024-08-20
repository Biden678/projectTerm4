import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Contact from './shop/Contact';

function ContactPage(props) {
    return (
        <div>
            <Header />
            <Contact />
            <Footer />
        </div>
    );
}

export default ContactPage;