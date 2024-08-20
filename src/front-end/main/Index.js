import Banner from '../component/Banner';
import Bestsaler from '../component/Bestsaler';
import Fact from '../component/Fact';
import Featurs from '../component/Featurs';
import Footer from '../component/Footer';
import Game from '../component/Game';
import Header from '../component/Header';
import Hero from '../component/Hero';
import Medicine from '../component/shop/Medicine';
import Product from '../component/Product';
import Tastimonial from '../component/Tastimonial';
import '../css/bootstrap.min.css';
import '../css/style.css';
import TopicsList from '../component/health/TopicsList';


function Index() {

    return (
        <div>
            <Header />
            <Hero />
            <Featurs />
            <Medicine />
            <TopicsList/>
            <Game />
            <Product/>
            <Banner />
            <Bestsaler />
            <Fact />
            <Tastimonial />
            <Footer/>
        </div>
    );
}

export default Index;