import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function Sidebar({ setSearchKeyword, setBlogs, setFindBlogByType }) {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch('http://localhost:9999/api/blog/lasted')
      .then(response => response.json())
      .then(data => setLatestBlogs(data.slice(0, 3)))
      .catch(error => console.error('Error fetching latest blogs:', error));

    fetch('http://localhost:9999/api/blog/type')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));

    // Fetch topics as categories from the BlogType endpoint
    fetch('http://localhost:9999/api/blog/byType')
      .then(response => response.json())
      .then(data => {
        setTopics(data);
        console.log('Fetched topics:', data);
      })
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  const handleCategoryClick = async (topic) => {
    try {
      const response = await fetch(`http://localhost:9999/api/blog/byType/${topic.id}`);
      const data = await response.json();
      setFindBlogByType(topic.id);
      setBlogs(data);
      setCurrentPage(0);
    } catch (error) {
      console.error('Error fetching blogs by category:', error);
    }
  };

  return (
    <div className="col-lg-4">
      <div className="sidebar-wrap">
        <div className="sidebar-widget search card p-4 mb-3 border-0">
          <input
            type="text"
            className="form-control"
            placeholder="search"
            onChange={e => setSearchKeyword(e.target.value)}
          />
        </div>

        <div className="sidebar-widget latest-post card border-0 p-4 mb-3">
          <h5>Latest Blogs</h5>
          {latestBlogs.map(blog => (
            <div className="media border-bottom py-3" key={blog.id}>
              <div className='row'>
                <div className='col-4'>
                  <a href={`/blog/detail/${blog.id}`}><img className="mr-4" src={`http://localhost:9999/api/blog/getImage/${blog.image}`} alt="blog" style={{ width: '100%', height: '70px' }} /></a>
                </div>
                <div className='col-8'>
                  <div className="media-body">
                    <h6 className="my-2"><a href={`/blog/detail/${blog.id}`}>{blog.title}</a></h6>
                    <span className="text-sm text-muted">{format(new Date(blog.date), 'yyyy-MM-dd')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sidebar-widget bg-white rounded tags p-4 mb-3">
          <h5 className="mb-4">Featured Topics</h5>
          <div className="category-links">
            {Array.isArray(topics) && topics.map(topic => (
              <a href="#" key={topic.id} className="category-link" onClick={() => handleCategoryClick(topic)}>
                {topic.type}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
