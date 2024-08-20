
import Footer from '../component/Footer';
import Header from '../component/Header';
import Order from '../component/shop/Order';
import '../css/bootstrap.min.css';
import '../css/style.css';


function OrderPage() {

    return (
        <div>
            <Header />
            <Order />
            <Footer/>
        </div>
    );
}

export default OrderPage;