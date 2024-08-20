import React from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import Results from '../../component/health/Results';

const HealthResult = () => {
  return (
    <div>
      <Header />
      <br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <Results />
      <Footer />
    </div>
  );
};

export default HealthResult;
