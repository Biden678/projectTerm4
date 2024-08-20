import React, { useState, useEffect } from 'react';
import Sidebar from './SideBar';
import axios from 'axios';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import '../../css/blog/blog.css';

const truncate = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + '...';
  }
  return str;
};

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [findBlogByType, setFindBlogByType] = useState('');
  const itemsPerPage = 6;

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 5;
  
    useEffect(() => {
      setTotalPages(Math.ceil(blogs.length / PAGE_SIZE));
    }, [blogs]);
    const displayedBlogs = blogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    
  useEffect(() => {
    if (searchKeyword === '' && findBlogByType === '') {
      fetchBlogs();
    } else if (findBlogByType === '') {
      handleSearchBlogs();
    } else if (searchKeyword === '') {
      handleFindBlogsByType();
    }
  }, [searchKeyword, currentPage, findBlogByType]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:9999/api/blog');
      if (response.status === 200) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleSearchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:9999/api/blog', {
        params: { name: searchKeyword }
      });
      if (response.status === 200) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error("Error searching blogs:", error);
    }
  };

  const handleFindBlogsByType = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/api/blog/byType/${findBlogByType}`);
      if (response.status === 200) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching blogs by type:", error);
    }
  };




  return (
    <>
      <section className="section blog-wrap bg-gray" style={{ marginTop: '11%' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12" style={{ textAlign: 'center' }}>
              <h1>Our Blogs</h1>
            </div>
            {/* phân trang */}
            <div className="d-flex justify-content-between mt-3">
              <div className="d-flex">
                <button
                  className="btn btn-outline-primary me-2 ti"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &#xea19;
                </button>
                <button
                  className="btn btn-outline-primary me-2 ti"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &#xea1f;
                </button>
              </div>
              <div>
                Page {currentPage} of {totalPages}
              </div>
            </div>
            <br />
            <div className="row" style={{ marginTop: '5%' }}>
              <div className="col-lg-8">
                <div className="row">
                  {displayedBlogs.length > 0 ? (
                    displayedBlogs.map(blog => (
                      <BlogItem
                        key={blog.id}
                        id={blog.id}
                        imgSrc={`http://localhost:9999/api/blog/getImage/${blog.image}`}
                        category={blog.typeid.type}
                        title={blog.title}
                        description={blog.content}
                        date={format(new Date(blog.date), 'yyyy-MM-dd')}
                      />
                    ))
                  ) : (
                    <div className="col-12">
                      <p>No blogs to display.</p>
                    </div>
                  )}
                </div>
              </div>
              <Sidebar
                setSearchKeyword={setSearchKeyword}
                setBlogs={setBlogs}
                setFindBlogByType={setFindBlogByType}
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

function BlogItem({ id, imgSrc, category, title, description, date }) {
  return (
    <div className="col-lg-6 col-md-6 mb-5">
      <div className="blog-item">
        <div className="fruite-img" style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
          <a href={`/blog/detail/${id}`}>
            <img
              src={imgSrc}
              className="img-fluid w-100 h-100"
              style={{ objectFit: 'cover' }}
              alt=''//{product?.name}
            />
          </a>
        </div>
        {/* <img src={imgSrc} alt="" className="img-fluid rounded" style={{ width: '100%', height: '300px' }} /> */}
        <div className="blog-item-content bg-white p-4">
          <div className="blog-item-meta d-flex py-1 px-2">
            <div className="type-date" style={{ width: '50%' }}>
              <span className="text-muted text-capitalize"><i className="ti-pencil-alt mr-2"></i>{category}</span>
            </div>
            <div className="type-date" style={{ width: '50%', textAlign: 'right' }}>
              <span className="text-muted text-capitalize"> {date}</span>
            </div>
          </div>
          <h3 className="mt-3 mb-3"><a href={`/blog/detail/${id}`}>{title}</a></h3>
          {/* <p className="content-cell">
            <div
              style={{
                whiteSpace: 'pre-wrap', // Preserves whitespace and line breaks
                overflowWrap: 'break-word', // Prevents long words from overflowing
                wordBreak: 'break-word', // Breaks long words if necessary
              }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </p> */}
          {/* <p className="mb-4">{truncate(description, 50)}</p> */}
          <a href={`/blog/detail/${id}`} className="btn btn-small btn-main btn-round-full">Learn More</a>
        </div>
      </div>
    </div>
  );
}

export default Blog;