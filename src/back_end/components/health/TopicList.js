import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll'; // Import animateScroll

function TopicList(props) {
    const { handleFetchTopics, setTopics, topics } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newTopic, setNewTopic] = useState({ question_topic: '',score:''});
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editTopicId, setEditTopicId] = useState(null);
    const [TopicIds, setTopicIds] = useState([]);
    const [inputErrors, setInputErrors] = useState({ question_topic: ''});


    useEffect(() => {
        handleFetchTopics();
        fetchTopicIds();
    }, []);

    async function fetchTopicIds() {
        try {
            const response = await axios.get("http://localhost:9999/api/health/list-question");
            if (response.status === 200) {
                const question_id = response.data.map(topic => topic.id);
                setTopicIds(question_id);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
        }
    }

    const validateInputs = () => {
        let isValid = true;
        const errors = {};

        if (!newTopic.question_topic.trim()) {
            errors.question_topic = 'Topic is required';
            isValid = false;
        } else if (newTopic.question_topic.length < 2 || newTopic.question_topic.length > 100) {
            errors.question_topic = 'Topic must be between 2 and 100 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newTopic.question_topic)) {
            errors.question_topic = 'Topic cannot contain special characters';
            isValid = false;
        }

        setInputErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditTopicId(null);
        setInputErrors({ question_topic: ''});
        setNewTopic({ question_topic: '',score:'' });
        setHasSubmitted(false);
    };

    const handleAddTopic = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post("http://localhost:9999/api/health/question-topic", newTopic);
            handleFetchTopics();
            fetchTopicIds();
            handleCancel();

            toast.success('Added successfully 🦄', {
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
            console.error("Error adding new topic:", error);
        }
    };

    const handleEditTopic = (id) => {
        const topicToEdit = topics.find(topic => topic.id === id);
        setEditTopicId(id);
        setNewTopic(topicToEdit);
        setIsEditing(true);
        setInputErrors({ question_topic: ''});

        // Scroll to the top of the form when editing
        scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });
    };

    const handleUpdateTopic = async () => {
        setHasSubmitted(true);

        if (!validateInputs()) {
            return;
        }

        try {
            await axios.post(`http://localhost:9999/api/health/question-topic`, newTopic);
            handleFetchTopics();
            fetchTopicIds();
            handleCancel();
            toast.success('Updated successfully 👌', {
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
            console.error("Error updating topic:", error);
        }
    };

    const handleDeleteTopic = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/health/question-topic/${id}`);
            handleFetchTopics();
            fetchTopicIds();
            toast.error('Deleted Topic!', {
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
            toast.success('Topic deleted successfully!', {
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
            console.error("Error deleting topic:", error);
        }
    };

   
    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Topics</h3>
                        {/* <div className='m-3 row'>
                            <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search by topic'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div> */}
                        {(isAdding || isEditing) && (
                            <form>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editTopicId} />
                                )}
                                <div className="mb-3 col-lg-12">
                                    <label htmlFor="nameTopic" className="form-label" style={{ float: 'left' }}>
                                        Topic
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.question_topic ? 'is-invalid' : ''}`}
                                        id="nameTopic"
                                        value={newTopic.question_topic}
                                        onChange={(e) => setNewTopic({ ...newTopic, question_topic: e.target.value })}
                                    />
                                    {hasSubmitted && inputErrors.question_topic && <div className="invalid-feedback">{inputErrors.question_topic}</div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateTopic : handleAddTopic}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Topic</h6>
                                        </th>

                                        {/* <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Score</h6>
                                        </th> */}

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action</h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topics?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.question_topic}</td>
                                            {/* <td>
                                                {item.score}
                                            </td> */}
                                            <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditTopic(item.id)}>Edit</button>
                                                {!TopicIds.includes(item.id) && (
                                                    <button
                                                        className="btn btn-outline-danger btn-small"
                                                        style={{ width: 'auto' }}
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this topic?')) {
                                                                handleDeleteTopic(item.id);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                                <td>
                                                <a href={`/questionAdmin/${item.id}`}>
                                                    <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }}>Question</button>
                                                </a>
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

export default TopicList;
