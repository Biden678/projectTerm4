import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll'; // Import animateScroll
import { useParams } from 'react-router-dom';

function AnswerList(props) {

    const { questionId } = useParams();
    const { navigate } = useContext(AuthContext);


    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newAnswer, setNewAnswer] = useState({ the_answer: '', score_for_answer: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editAnswerId, setEditAnswerId] = useState(null);
    const [inputErrors, setInputErrors] = useState({ the_answer: '', score_for_answer: '' });


    const [answers, setAnswers] = useState([]);
    //const [newQuestion, setNewQuestion] = useState({});



    async function handleFetchAnswers() {
        try {
            const response = await axios.get(`http://localhost:9999/api/health/rsbyquestion/${questionId}`);
            setAnswers(response.data);
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    }
    useEffect(() => {
        handleFetchAnswers();
    }, [questionId]);

    const validateInputs = () => {
        let isValid = true;
        const errors = { the_answer: '', score_for_answer: '' };

        // answer
        if (!newAnswer.the_answer.trim()) {
            errors.the_answer = 'Answer is required';
            isValid = false;
        } else if (newAnswer.the_answer.length < 2 || newAnswer.the_answer.length > 100) {
            errors.the_answer = 'Answer must be between 2 and 100 characters';
            isValid = false;
        }
        // } else if (!/^[a-zA-Z0-9 ]+$/.test(newAnswer.the_answer)) {
        //     errors.the_answer = 'Answer cannot contain special characters';
        //     isValid = false;
        // }


        // score
        if (!newAnswer.score_for_answer.trim()) {
            errors.score_for_answer = 'Level is required';
            isValid = false;
        }
        // else if (isNaN(newAnswer.score_for_answer) || newAnswer.score_for_answer < 0) {
        //     errors.score_for_answer = 'Score must be a positive number';
        //     isValid = false;
        // }




        setInputErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditAnswerId(null);
        setInputErrors({ the_answer: '', score_for_answer: '' });
        setNewAnswer({ the_answer: '', score_for_answer: '' });
        setHasSubmitted(false);
    };


    const handleAddAnswer = async () => {
        setHasSubmitted(true);
        if (!validateInputs()) {
            return;
        }

        const newAnswerData = {
            the_answer: newAnswer.the_answer,
            score_for_answer: newAnswer.score_for_answer,
            id_list_question: { id: questionId }
        };

        try {
            const response = await axios.post("http://localhost:9999/api/health/score-question", newAnswerData);
            console.log('API Response:', response.data);

            await handleUpdateQuestion(newAnswer.score_for_answer);
            await handleUpdateTopic(newAnswer.score_for_answer);

            handleFetchAnswers();
            handleCancel();

            toast.success('ADDED SUCCESSFULLY 🦄', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false,
            });
        } catch (error) {
            console.error("Error adding new answer:", error);
        }
    };

    const handleUpdateQuestion = async (answerScore) => {
        try {
            const questionResponse = await axios.get(`http://localhost:9999/api/health/list-question/${questionId}`);
            const question = questionResponse.data;
            const updatedScore = parseInt(question.score, 10) + parseInt(answerScore, 10);

            await axios.post(`http://localhost:9999/api/health/list-question`, {
                ...question,
                id: questionId,
                score: updatedScore,
            });
        } catch (error) {
            console.error("Error updating question score:", error);
        }
    };

    const handleUpdateTopic = async (answerScore) => {
        try {
            const questionResponse = await axios.get(`http://localhost:9999/api/health/list-question/${questionId}`);
            const question = questionResponse.data;
            const topicId = question.id_question_topic.id;
            const topicResponse = await axios.get(`http://localhost:9999/api/health/question-topic/${topicId}`);
            const topic = topicResponse.data;

            const updatedScoreTopic = parseInt(topic.score, 10) + parseInt(answerScore, 10);

            await axios.post(`http://localhost:9999/api/health/question-topic`, {
                ...topic,
                id: topicId,
                score: updatedScoreTopic,
            });

        } catch (error) {
            console.error("Error updating topic score:", error);
        }


    };



    const handleEditAnswer = (id) => {
        const answerToEdit = answers.find(answer => answer.id === id);

        if (!answerToEdit) {
            console.error('Answer not found for editing');
            return;
        }

        setEditAnswerId(id);
        setNewAnswer({
            ...answerToEdit,
            the_answer: answerToEdit.the_answer ? answerToEdit.the_answer.toString() : '',
            score_for_answer: answerToEdit.score_for_answer ? answerToEdit.score_for_answer.toString() : '',
            id_list_question: { id: questionId }


        });

        // Scroll to the top of the form when editing
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });

        setIsEditing(true);
        setInputErrors({ the_answer: '', score_for_answer: '' });
    };

    const handleUpdateAnswer = async () => {
        setHasSubmitted(true);
        if (!validateInputs()) {
            return;
        }



        try {
            // Tạo dữ liệu câu hỏi được cập nhật
            const updatedAnswerData = {
                ...newAnswer,
                score_for_answer: newAnswer.score_for_answer,
                id_list_question: { id: questionId }
            };

            // Gửi yêu cầu PUT đến API để cập nhật câu hỏi
            const response = await axios.post(`http://localhost:9999/api/health/score-question`, updatedAnswerData);

            // Sau khi cập nhật thành công, làm mới danh sách câu hỏi và reset form
            handleFetchAnswers();
            handleCancel();

            // Hiển thị thông báo thành công
            toast.success('Answer updated successfully 👌', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false,
            });
        } catch (error) {
            console.error("Error updating Answer:", error);
        }
    };

    const handleDeleteAnswer = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/health/score-question/${id}`);
            // Cập nhật điểm số câu hỏi sau khi xóa đáp án
            const answerToDelete = answers.find(answer => answer.id === id);
            if (answerToDelete) {
                await handleUpdateQuestion(-parseInt(answerToDelete.score_for_answer, 10));
                await handleUpdateTopic(-parseInt(answerToDelete.score_for_answer, 10));
            }

            handleFetchAnswers();
            toast.error('Deleted Answer!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false,
            });
            toast.success('Answer deleted successfully!', {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton: false,
            });
        } catch (error) {
            console.error("Error deleting Answer:", error);
        }
    };


    const truncateName = (name) => {
        return name.length > 50 ? name.substring(0, 50) + "..." : name;
    };
    const handleBackToTopic = () => {
        navigate("/topicAdmin");
    };
    return (
        <div>
            <style>
                {`
                .auto-expand-textarea {
                    width: 100%;
                    min-height: 50px; /* Chiều cao tối thiểu */
                    overflow-y: auto;
                    resize: none; /* Ngăn việc thay đổi kích thước bằng tay */
                    box-sizing: border-box;

                }
                `}
            </style>
            <div className="col-lg-12 d-flex align-items-stretch">

                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    {/* <button className='btn btn-outline-success' onClick={handleUpdateTopic}>
                        test
                    </button> */}

                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Answers</h3>
                        <div className='m-3 row'>
                            {/* <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search . . .'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div> */}
                        </div>
                        {(isAdding || isEditing) && (
                            <form className='row'>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editAnswerId} />
                                )}

                                <div className="mb-3 col-lg-8">
                                    <label htmlFor="nameAnswer" className="form-label" style={{ float: 'left' }}>
                                        Answer
                                    </label>
                                    <textarea
                                        type="text"
                                        className={`form-control auto-expand-textarea ${hasSubmitted && inputErrors.the_answer ? 'is-invalid' : ''}`}
                                        id="nameAnswer"
                                        value={newAnswer.the_answer}
                                        onChange={(e) => setNewAnswer({ ...newAnswer, the_answer: e.target.value })}
                                    />

                                    {hasSubmitted && inputErrors.the_answer && <div className="invalid-feedback">{inputErrors.the_answer}</div>}
                                </div>


                                <div className="mb-3 col-lg-4">
                                    <label htmlFor="score" className="form-label" style={{ float: 'left' }}>
                                        Level
                                    </label>
                                    <select
                                        className={`form-control auto-expand-textarea ${hasSubmitted && inputErrors.score_for_answer ? 'is-invalid' : ''}`}
                                        id="score"
                                        value={newAnswer.score_for_answer}
                                        onChange={(e) => setNewAnswer({ ...newAnswer, score_for_answer: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="0">Low Level</option>
                                        <option value="4">Average Level</option>
                                        <option value="8">Decent Level</option>
                                        <option value="12">High Level</option>
                                    </select>

                                    {hasSubmitted && inputErrors.score_for_answer && (
                                        <div className="invalid-feedback">{inputErrors.score_for_answer}</div>
                                    )}
                                </div>


                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateAnswer : handleAddAnswer}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Answer</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Level</h6>
                                        </th>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action <i className="ti ti-activity"></i> <i className="ti">&#xf345;</i></h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {answers?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.the_answer}</td>
                                            <td>
                                                {item.score_for_answer === 0 ? "Low" :
                                                    item.score_for_answer === 4 ? "Average" :
                                                        item.score_for_answer === 8 ? "Decent" :
                                                            item.score_for_answer === 12 ? "High" :
                                                                "Unknown Level"}
                                            </td>
                                            <td>
                                                <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditAnswer(item.id)}>Edit</button>
                                                <button
                                                    className="btn btn-outline-danger btn-small"
                                                    style={{ width: 'auto' }}
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this answer?')) {
                                                            handleDeleteAnswer(item.id);
                                                        }
                                                    }}
                                                >
                                                    <i className="ti ti-trash"></i>
                                                </button>
                                                <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={handleBackToTopic}>
                                                    go back Topic
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnswerList;
