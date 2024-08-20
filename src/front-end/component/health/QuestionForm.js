import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Spinner, Container, Row, Col, Alert } from 'reactstrap';
import { useParams, Link } from 'react-router-dom';
import { FaHeartbeat } from 'react-icons/fa';

const QuestionForm = () => {
    const [storedTopicId, setStoredTopicId] = useState(null); // Biến state để lưu topicId
    const { topicId } = useParams(); // Lấy topicId từ useParams()
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/api/health/list-question/find-by-id/${topicId}`);
                console.log('Fetched questions:', response.data);
                setQuestions(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [topicId]);

    // useEffect(() => {
    //     localStorage.setItem('topicId', topicId); // Lưu topicId vào localStorage khi nó đã được lấy từ API thành công
    // }, [topicId]);
    useEffect(() => {
        if (topicId) {
            localStorage.setItem('topicId', topicId); // Lưu topicId vào localStorage khi nó đã được lấy từ API thành công
        }
    }, [topicId]);

    useEffect(() => {
        const fetchAnswers = async () => {
            if (questions.length > 0) {
                try {
                    const response = await axios.get(`http://localhost:9999/api/health/score-question/find-by-id/${questions[currentQuestionIndex].id}`);
                    console.log('Fetched answers:', response.data);
                    setAnswers(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching answers:', error);
                    setLoading(false);
                }
            }
        };

        fetchAnswers();
    }, [currentQuestionIndex, questions]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            // Kiểm tra xem đã chọn đáp án cho câu hỏi hiện tại chưa
            if (selectedAnswers[questions[currentQuestionIndex].id] !== undefined) {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setError('');
            } else {
                setError('Please select an answer before proceeding.');
            }
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
            setError('');
        } 
    };

    const handleAnswerSelect = (questionId, answerIndex) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: answerIndex // Cập nhật answerIndex là câu trả lời mà người dùng đã chọn
        }));
    };
    
    console.log("selectedAnswers:"+selectedAnswers);

    const handleSubmit = () => {
        // Kiểm tra xem đã chọn đáp án cho câu hỏi hiện tại chưa
        if (selectedAnswers[questions[currentQuestionIndex].id] !== undefined) {
            // Kiểm tra xem đang ở câu hỏi cuối cùng hay không
            if (currentQuestionIndex === questions.length - 1) {
                localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
            }
        } else {
            setError('Please select an answer before submitting.');
        }
    };
    

    if (loading) {
        return <div className="loading-spinner"><Spinner color="primary" /></div>;
    }

    return (
        <Container style={{ paddingTop: '20px' }}>
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <div style={styles.questionCard}>
                        <div style={styles.questionHeader}>
                            <FaHeartbeat style={styles.heartbeatIcon} />
                        </div>
                        {questions.length > 0 ? (
                            <div style={styles.questionContent}>
                                <p style={styles.questionText}>{questions[currentQuestionIndex].name_of_question}</p>
                                <Form>
                                    <FormGroup>
                                        {answers.map((answer, index) => (
                                            <div key={index} style={styles.answerOption}>
                                                {answer.id_list_question && answer.id_list_question.id === questions[currentQuestionIndex].id && (
                                                    <Label check>
                                                        <Input type="radio" name="answer" checked={selectedAnswers[questions[currentQuestionIndex].id] === index} onChange={() => handleAnswerSelect(questions[currentQuestionIndex].id, index)} />
                                                        {answer.the_answer}
                                                    </Label>
                                                )}
                                            </div>
                                        ))}
                                    </FormGroup>
                                </Form>
                                {error && <Alert color="danger">{error}</Alert>}
                                <div style={styles.navigationButtons}>
                                    {currentQuestionIndex > 0 && (
                                        <Button color="primary" style={styles.button} onClick={handlePreviousQuestion}>Previous</Button>
                                    )}
                                    {currentQuestionIndex < questions.length - 1 && (
                                        <Button color="primary" style={styles.button} onClick={handleNextQuestion}>Next</Button>
                                    )}

                                    {currentQuestionIndex === questions.length - 1 && (
                                        // <Link to="/result/:storedTopicId" onClick={handleSubmit} className="btn btn-success ml-2">
                                        <Link to="/result" onClick={handleSubmit} className="btn btn-success ml-2">
                                            Submit
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div>No questions available for this topic.</div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

const styles = {
    questionCard: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '40px', // Tăng padding để làm khung to ra
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        width: '100%', // Đảm bảo khung chiếm toàn bộ chiều rộng của phần tử chứa
        maxWidth: '800px', // Đặt chiều rộng tối đa để khung không quá rộng
        margin: '0 auto', // Căn giữa khung trong phần tử chứa
    },
    questionHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    heartbeatIcon: {
        fontSize: '1.5em',
        marginRight: '10px',
        color: '#FF6347',
    },
    questionText: {
        fontSize: '1.2em',
        marginBottom: '20px',
    },
    answerOption: {
        marginBottom: '10px',
    },
    navigationButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '30px', // Tăng khoảng cách trên giữa các nút
    },
    button: {
        margin: '0 10px', // Tạo khoảng cách giữa các nút
    },
    loadingSpinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
    },
};

export default QuestionForm;
