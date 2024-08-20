
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import ChangePass from '../../component/User/ChangePass';

import '../../css/User/Login.css';

function PasswordChange(props) {
    return (
        <div>
            <div>
                <Header />
                <ChangePass />
                <Footer />
            </div>
        </div>
    );
}

export default PasswordChange;