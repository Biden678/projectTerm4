import React from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import TopicsList from '../../component/health/TopicsList';
import '../../css/bootstrap.min.css';
import '../../css/style.css';

const HealthPage = () => {
  return (
    <div>
      <Header />
<br/><br/><br/><br/><br/>
      <TopicsList />
      
      <Footer />
    </div>
  );
};

export default HealthPage;
