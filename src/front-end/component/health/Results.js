import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Container, Row, Col } from 'reactstrap';
import { FaExclamationTriangle } from 'react-icons/fa'; // Import icon from react-icons library
import { useParams } from 'react-router-dom';

const Results = () => {
    // const { storedTopicId } = useParams(); // Lấy topicId từ useParams()
    const [topicScore, setTopicScore] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState('');
    const topicID = localStorage.getItem('topicId');

    useEffect(() => {
        const selectedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));
        console.log("Selected Answers From Local Storage:", selectedAnswers);
        if (!selectedAnswers) {
            console.error('No selectedAnswers found');
            setLoading(false);
            return;
        }

        console.log("selectedAnswers:"+selectedAnswers)
        const calculateScore = async () => {
            let totalScore = 0;
            let maxPossibleScore = 0; // Tính tổng điểm tối đa có thể đạt được
            for (const questionId in selectedAnswers) {
                try {
                    const response = await axios.get(`http://localhost:9999/api/health/score-question/find-by-id/${questionId}`);
                    const answerIndex = selectedAnswers[questionId];
                    const scoreForAnswer = response.data[answerIndex].score_for_answer;
                    totalScore += scoreForAnswer;

                     // Tính điểm tối đa cho mỗi câu hỏi
                     const maxScoreForQuestion = Math.max(...response.data.map(answer => answer.score_for_answer));
                     maxPossibleScore += maxScoreForQuestion;

                } catch (error) {
                    console.error('Error fetching score:', error);
                }
            }
            // Lấy điểm số của chủ đề
            try {
                const topic = await axios.get(`http://localhost:9999/api/health/question-topic/${topicID}`);
                setTopicScore(topic.data.score);
                
            } catch (error) {
                console.error('Error fetching topic score:', error);
            }
             console.log("Max Possible Score:", maxPossibleScore);
            console.log('Total Score:', totalScore);

            setTopicScore(maxPossibleScore);
            setScore(totalScore);
            setLoading(false);

        };

        calculateScore();
    }, []);


    useEffect(() => {
        if (!loading) {
            if (topicScore === 0) {
                setResult('This topic has no results');
            } else {
                const highThreshold = (3 * topicScore) / 4;
                const decentThreshold = topicScore / 2;
                const averageThreshold = topicScore / 4;

                if (score >= highThreshold) {
                    setResult('The risk of vitamin deficiency is very low');
                } else if (score >= decentThreshold) {
                    setResult('The risk of vitamin deficiency is low');
                } else if (score >= averageThreshold) {
                    setResult('The risk of vitamin deficiency is moderate');
                } else {
                    setResult('The risk of vitamin deficiency is high');
                }
            }
        }
    }, [loading, score, topicScore]);


    console.log("score : " + score);
    console.log("topicScore : " + topicScore);



    if (loading) {
        return (
            <div style={styles.loadingSpinner}>
                <Spinner color="primary" />
            </div>
        );
    }

    if (!localStorage.getItem('selectedAnswers')) {
        return <div style={styles.noAnswers}>No answers selected. Please go back and complete the test.</div>;
    }
    return (
        <Container style={styles.container}>
            <Row className="justify-content-center">
                <Col md={8} lg={12}>
                    <div style={styles.resultCard}>
                        <h2 style={styles.heading}>Your Result</h2>
                        <p style={styles.resultText}>{result}</p>
                        <p style={{ fontSize: '0.9em', textAlign: 'left', marginTop: '20px', color: '#777' }}>
                            <span style={{ marginRight: '5px', color: '#f0ad4e' }}><FaExclamationTriangle /></span>
                            Disclaimer:
                            <br />
                            *This information is for reference only and does not substitute for medical advice.
                            <br />
                            *DO NOT SELF-TREAT without consulting a healthcare professional. If you have any further questions, please contact your nearest healthcare facility for guidance and consultation.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

const styles = {
    container: {
        paddingTop: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        minHeight: '10vh',
        paddingBottom: '40px',
    },
    resultCard: {
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    heading: {
        fontSize: '3em',
        marginBottom: '20px',
        color: '#333',
    },
    resultText: {
        fontSize: '3.8em',
        color: '#81c408',
    },
    loadingSpinner: {
        display: 'flex',
        justifyContent: 'center',
alignItems: 'center',
        height: '200px',
    },
    noAnswers: {
        textAlign: 'center',
        padding: '20px',
        color: '#333',
        fontSize: '1.2em',
    },
};

export default Results;