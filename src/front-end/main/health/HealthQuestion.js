import React from 'react';
import Footer from '../../component/Footer';
import Header from '../../component/Header';
import '../../css/bootstrap.min.css';
import '../../css/style.css';
import QuestionForm from '../../component/health/QuestionForm';

const HealthQuestion = () => {
  return (
    <div>
      <Header />
<br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <QuestionForm />
      <Footer />
    </div>
  );
};

export default HealthQuestion;
