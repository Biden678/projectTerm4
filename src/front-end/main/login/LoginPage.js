
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import Login from '../../component/User/Login';

import '../../css/User/Login.css';


function LoginPage() {

    return (
        <div>
            <Header />
            <Login/>
            <Footer/>
        </div>
    );
}

export default LoginPage;