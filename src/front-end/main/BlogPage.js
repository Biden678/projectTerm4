import Blog from '../component/Blog/Blog';
import Footer from '../component/Footer';
import Header from '../component/Header';
import '../css/bootstrap.min.css';
import '../css/style.css';



function BlogPage() {

    return (
        <div>
            <Header />
            <Blog/>
            <Footer/>
        </div>
    );
}

export default BlogPage;