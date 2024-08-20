
import Footer from '../component/Footer';
import Header from '../component/Header';
import Medicine from '../component/shop/Medicine';
import '../css/bootstrap.min.css';
import '../css/style.css';


function Shop() {

    return (
        <div>
            <Header />
            <Medicine />
            <Footer/>
        </div>
    );
}

export default Shop;