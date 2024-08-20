import Footer from '../component/Footer';
import Header from '../component/Header';
import AboutUs from '../component/aboutUs/AboutUs';
import '../css/bootstrap.min.css';
import '../css/style.css';



function AboutUsPage() {

    return (
        <div>
            <Header />
            <AboutUs/>
            <Footer/>
        </div>
    );
}

export default AboutUsPage;