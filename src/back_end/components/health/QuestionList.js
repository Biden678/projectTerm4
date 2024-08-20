import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll'; // Import animateScroll
import { useParams } from 'react-router-dom';

function QuestionList(props) {
    const { topicId } = useParams();
    const { navigate } = useContext(AuthContext);

    // const location = useLocation();
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newQuestion, setNewQuestion] = useState({ name_of_question: '' });
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editQuestionId, setEditQuestionId] = useState(null);
    const [inputErrors, setInputErrors] = useState({ name_of_question: '' });
    const [answerIds, setAnswerIds] = useState([]);
    // search
    // const [searchTerm, setSearchTerm] = useState('');
    const [questions, setQuestions] = useState([]);


    //phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 5;
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(questions.length / questionsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li
                key={number}
                id={number}
                onClick={() => setCurrentPage(number)}
                className={`page-item ${currentPage === number ? 'active' : ''}`}
            >
                <a className="page-link">
                    {number}
                </a>
            </li>
        );
    });



    async function handleFetchQuestions() {
        try {
            const response = await axios.get(`http://localhost:9999/api/health/qsbytopic/${topicId}`);
            setQuestions(response.data);

        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    useEffect(() => {
        handleFetchQuestions();
        fetchAnswerIds();
    }, [topicId]);
    useEffect(() => {
        handleFetchQuestions(); // Gọi lại hàm fetchQuestions khi location thay đổi
    }, [navigate]);

    async function fetchAnswerIds() {
        try {
            const response = await axios.get("http://localhost:9999/api/health/score-question");
            if (response.status === 200) {
                const answerIds = response.data.map(q => q.id_list_question.id);
                setAnswerIds(answerIds);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }




    const validateInputs = () => {
        let isValid = true;
        const errors = { name_of_question: '' };

        // question
        if (!newQuestion.name_of_question.trim()) {
            errors.name_of_question = 'Question is required';
            isValid = false;
        } else if (newQuestion.name_of_question.length < 2 || newQuestion.name_of_question.length > 300) {
            errors.name_of_question = 'Question must be between 2 and 100 characters';
            isValid = false;
        }
        setInputErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditQuestionId(null);
        setInputErrors({ name_of_question: '' });
        setNewQuestion({ name_of_question: '' });
        setHasSubmitted(false);
    };


    useEffect(() => {
        console.log('Questions:', questions); // Kiểm tra dữ liệu questions
    }, [questions]);


    const handleAddQuestion = async () => {
        setHasSubmitted(true);
        if (!validateInputs()) {
            return;
        }

        // Trong handleAddQuestion
        const newQuestionData = {
            name_of_question: newQuestion.name_of_question,
            id_question_topic: { id: topicId }
        };


        console.log('New question data:', newQuestionData); // Kiểm tra dữ liệu trước khi gửi

        try {
            const response = await axios.post("http://localhost:9999/api/health/list-question", newQuestionData);
            console.log('API Response:', response.data); // Kiểm tra dữ liệu trả về từ API
            handleFetchQuestions();
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
            console.error("Error adding new question:", error);
        }
    };


    const handleEditQuestion = (id) => {
        const questionToEdit = questions.find(question => question.id === id);

        if (!questionToEdit) {
            console.error('Question not found for editing');
            return;
        }

        setEditQuestionId(id);
        setNewQuestion({
            ...questionToEdit,
            name_of_question: questionToEdit.name_of_question ? questionToEdit.name_of_question.toString() : '',
            id_question_topic: { id: topicId }
        });

        // Scroll to the top of the form when editing
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });

        setIsEditing(true);
        setInputErrors({ name_of_question: '' });
    };



    const handleUpdateQuestion = async () => {
        setHasSubmitted(true);
        if (!validateInputs()) {
            return;
        }

        try {
            // Tạo dữ liệu câu hỏi được cập nhật
            const updatedQuestionData = {
                ...newQuestion,
                id_question_topic: { id: topicId }
            };

            // Gửi yêu cầu PUT đến API để cập nhật câu hỏi
            const response = await axios.post(`http://localhost:9999/api/health/list-question`, updatedQuestionData);

            // Sau khi cập nhật thành công, làm mới danh sách câu hỏi và reset form
            handleFetchQuestions();
            handleCancel();

            // Hiển thị thông báo thành công
            toast.success('Question updated successfully 👌', {
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
            console.error("Error updating Question:", error);
        }
    };




    const handleDeleteQuestion = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/health/list-question/${id}`);
            handleFetchQuestions();
            toast.error('Deleted Question!', {
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
            toast.success('Question deleted successfully!', {
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
            console.error("Error deleting Question:", error);
        }
    };
    const truncateName = (name) => {
        return name.length > 90 ? name.substring(0, 90) + "..." : name;
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

                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Questions</h3>
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
                                    <input type="hidden" className="form-control" value={editQuestionId} />
                                )}

                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameProduct" className="form-label" style={{ float: 'left' }}>
                                        Question
                                    </label>
                                    <textarea
                                        type="text"
                                        className={`form-control auto-expand-textarea ${hasSubmitted && inputErrors.name_of_question ? 'is-invalid' : ''}`}
                                        id="nameProduct"
                                        value={newQuestion.name_of_question}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, name_of_question: e.target.value })}
                                    />

                                    {hasSubmitted && inputErrors.name_of_question && <div className="invalid-feedback">{inputErrors.name_of_question}</div>}
                                </div>


                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateQuestion : handleAddQuestion}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Question</h6>
                                        </th>

                                        {/* <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Score</h6>
                                        </th> */}

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action <i className="ti ti-activity"></i> <i className="ti">&#xf345;</i></h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentQuestions && currentQuestions.map((question, p) => (
                                        <tr key={p}>
                                            <td>{truncateName(question.name_of_question)}</td>
                                            {/* <td>
                                                <p>{question.score}</p>
                                            </td> */}
                                            <td>
                                                <button
                                                    className="btn btn-outline-primary btn-small"
                                                    style={{ width: 'auto' }}
                                                    onClick={() => handleEditQuestion(question.id)}
                                                >
                                                    Edit
                                                </button>
                                                {/* {!QuestionIds.includes(question.id) && (

                                                <button
                                                    className="btn btn-outline-danger btn-small"
                                                    style={{ width: 'auto', margin: '2%' }}
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this question?')) {
                                                            handleDeleteQuestion(question.id);
                                                        }
                                                    }}
                                                >
                                                    <i className="ti ti-trash"></i>
                                                </button>
                                                 )} */}
                                                {!answerIds.includes(question.id) && (
                                                    <button className="btn btn-outline-danger btn-small"
                                                        style={{ width: 'auto' }}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this question?')) {
                                                                handleDeleteQuestion(question.id);
                                                            }
                                                        }
                                                        }>
                                                        <i className="ti ti-trash"></i>
                                                    </button>
                                                )}
                                                <a href={`/answerAdmin/${question.id}`}>
                                                    <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }}>Answer</button>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                        <div className="pagination-container">
                            <style>
                                {`
                                    .pagination-container ul {
                                        display: flex;
                                        list-style-type: none;
                                        padding: 0;
                                        margin: 0;
                                    }
                                    .pagination-container li {
                                        display: inline-block;
                                        margin-right: 5px;
                                    }
                                    .pagination-container a {
                                        display: block;
                                        padding: 10px 15px;
                                        border: 1px solid #ddd;
                                        border-radius: 4px;
                                        text-decoration: none;
                                        color: #007bff;
                                        background-color: #fff;
                                        cursor: pointer;
                                    }
                                    .pagination-container a:hover {
                                        background-color: #f1f1f1;
                                    }
                                    .pagination-container .active a {
                                        background-color: #007bff;
                                        color: #fff;
                                        border-color: #007bff;
                                    }
                                `}
                            </style>
                            <nav aria-label="Page navigation">
                                <ul className="pagination">
                                    {renderPageNumbers}
                                </ul>
                            </nav>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionList;
