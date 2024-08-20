import BlogDetail from '../component/Blog/BlogDetail';
import Footer from '../component/Footer';
import Header from '../component/Header';
import '../css/bootstrap.min.css';
import '../css/style.css';



function BlogDetailPage() {

    return (
        <div>
            <Header />
            <BlogDetail/>
            <Footer/>
        </div>
    );
}

export default BlogDetailPage;