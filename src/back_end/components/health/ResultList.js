import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll'; // Import animateScroll

function ResultList(props) {
    const { handleFetchResults, setResults, results,
        handleFetchTopics, topics,
    } = useContext(AuthContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [newResult, setNewResult] = useState({ result: '',percentage: '' , topic: { id: '' }});
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editResultId, setEditResultId] = useState(null);
    const [inputErrors, setInputErrors] = useState({ result: '', percentage: '' , topic: { id: '' }});

    // search
    const [searchTerm, setSearchTerm] = useState('');




    useEffect(() => {
        handleFetchResults();
        handleFetchTopics();
    }, []);



    const validateInputs = () => {
        let isValid = true;
        const errors = { result: '', percentage: '' , topic: { id: '' }};

        // answer
        if (!newResult.result.trim()) {
            errors.result = 'Result is required';
            isValid = false;
        } else if (newResult.result.length < 2 || newResult.result.length > 100) {
            errors.result = 'Result must be between 2 and 100 characters';
            isValid = false;
        } else if (!/^[a-zA-Z0-9 ]+$/.test(newResult.result)) {
            errors.result = 'Result cannot contain special characters';
            isValid = false;
        }


        // score
        if (!newResult.percentage.trim()) {
            errors.percentage = 'Percentage is required';
            isValid = false;
        } else if (isNaN(newResult.percentage) || newResult.percentage < 0) {
            errors.percentage = 'Percentage must be a positive number';
            isValid = false;
        }


        // question
        if (!newResult.topic.id.trim()) {
            errors.topic.id = 'Topic is required';
            isValid = false;
        }


        setInputErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditResultId(null);
        setInputErrors({ result: '', percentage: '', topic: { id: '' } });
        setNewResult({ result: '',percentage: '', topic: { id: '' } });
        setHasSubmitted(false);
    };


    const handleAddResult = async () => {
        setHasSubmitted(true);
        if (!validateInputs()) {
            return;
        }
    
        const newResultData = {
            result: newResult.result,
            percentage: newResult.percentage,
            id_question_topic: {
                id: newResult.topic.id,
                question_topic: newResult.topic.question_topic,
                id_user_dtt: newResult.topic.id_user_dtt
            }
        };
    
        try {
            const response = await axios.post("http://localhost:9999/api/health/percentage", newResultData);
            console.log('API Response:', response.data);
            
            // Cập nhật lại danh sách answers sau khi thêm mới thành công
            handleFetchResults();
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
            console.error("Error adding new result:", error);
        }
    };
    

    const handleEditResult = (id) => {
        const resultToEdit = results.find(result => result.id === id);

        if (!resultToEdit) {
            console.error('Result not found for editing');
            return;
        }

        setEditResultId(id);
        setNewResult({
            ...resultToEdit,
            result: resultToEdit.result ? resultToEdit.result.toString() : '',
            percentage: resultToEdit.percentage ? resultToEdit.percentage.toString() : '',
            topic: {
                id: resultToEdit.id_question_topic?.id ? resultToEdit.id_question_topic.id.toString() : ''
            }
            
        });

         // Scroll to the top of the form when editing
         scroll.scrollToTop({
            duration: 500,
            smooth: true,
        });

        setIsEditing(true);
        setInputErrors({ result: '', percentage: '' , topic: { id: '' }});
    };

    const handleUpdateResult = async () => {
        setHasSubmitted(true);
        if (!validateInputs()) {
            return;
        }

        

        try {
            // Tạo dữ liệu câu hỏi được cập nhật
            const updatedResultData = {
                ...newResult,
                percentage: newResult.percentage,
                id_question_topic: {
                    id: newResult.topic.id
                }
                
            };

            // Gửi yêu cầu PUT đến API để cập nhật câu hỏi
            const response = await axios.post(`http://localhost:9999/api/health/percentage`, updatedResultData);

            // Sau khi cập nhật thành công, làm mới danh sách câu hỏi và reset form
            handleFetchResults();
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
            console.error("Error updating Result:", error);
        }
    };

    const handleDeleteResult = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/health/percentage/${id}`);
            handleFetchResults();
            toast.error('Deleted Result!', {
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
            toast.success('Result deleted successfully!', {
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
            console.error("Error deleting Result:", error);
        }
    };

    useEffect(() => {
        handleSearchResults();
    }, [searchTerm]);
    const handleSearchResults = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/health/percentage`, {
                params: { name: searchTerm }
            });
            if (response.status === 200) {
                setResults(response.data);
            }
        } catch (error) {
            console.error("Error searching Results:", error);
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
                        <h3 className="fw-semibold mb-4">Results</h3>
                        <div className='m-3 row'>
                            <div className='col-lg-12'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Search . . .'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {(isAdding || isEditing) && (
                            <form className='row'>
                                {isEditing && (
                                    <input type="hidden" className="form-control" value={editResultId} />
                                )}

                                <div className="mb-3 col-lg-4">
                                    <label htmlFor="nameAnswer" className="form-label" style={{ float: 'left' }}>
                                        Result
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${hasSubmitted && inputErrors.result ? 'is-invalid' : ''}`}
                                        id="nameAnswer"
                                        value={newResult.result}
                                        onChange={(e) => setNewResult({ ...newResult, result: e.target.value })}
                                    />

                                    {hasSubmitted && inputErrors.result && <div className="invalid-feedback">{inputErrors.result}</div>}
                                </div>


                                <div className="mb-3 col-lg-4">
                                    <label htmlFor="score" className="form-label" style={{ float: 'left' }}>
                                      Percentage
                                    </label>
                                    <select
                                         type="number"
                                         className={`form-control ${hasSubmitted && inputErrors.percentage ? 'is-invalid' : ''}`}
                                         id="score"
                                         value={newResult.percentage}
                                         onChange={(e) => setNewResult({ ...newResult, percentage: e.target.value })}
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Low</option>
                                        <option value="2">Average</option>
                                        <option value="3">High</option>
                                    </select>
                                   
                                    {hasSubmitted && inputErrors.percentage && (
                                        <div className="invalid-feedback">{inputErrors.percentage}</div>
                                    )}
                                </div>



                                <div className="mb-3 col-lg-4">
                                    <label htmlFor="typeId_question_topic" className="form-label" style={{ float: 'left' }}>
                                        Topics
                                    </label>
                                    <select
                                        className={`form-select ${hasSubmitted && inputErrors.topic.id && 'is-invalid'}`}
                                        id="typeId_question_topic"
                                        value={newResult.topic.id}
                                        onChange={(e) =>
                                            setNewResult(prevResult => ({
                                                ...prevResult,
                                                topic: {
                                                    ...prevResult.topic,
                                                    id: e.target.value
                                                }
                                            }))
                                        }
                                    >
                                        <option>Choose . . .</option>
                                        {topics.map((topic) => (
                                            <option key={topic.id} value={topic.id}>
                                                {topic.id_question_topic} {/* Hiển thị tên của question */}
                                            </option>
                                        ))}
                                    </select>



                                    {hasSubmitted && inputErrors.topic.id && (
                                        <div className="invalid-feedback">{inputErrors.topic.id}</div>
                                    )}
                                </div>


                                <button type="button" className="btn btn-primary" onClick={isEditing ? handleUpdateResult : handleAddResult}>
                                    {isEditing ? 'Update' : 'Submit'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive mt-5">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>

                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Result</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Level</h6>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Topic</h6>
                                        </th>
                                        
                                        <th className="border-bottom-0">
                                            <h6 className="fw-semibold mb-0">Action <i className="ti ti-activity"></i> <i className="ti">&#xf345;</i></h6>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.result}</td>
                                            <td>{item.percentage}</td>
                                            <td>{item.id_question_topic ? item.id_question_topic.question_topic : '-'}</td> {/* Kiểm tra item.topic trước khi truy cập name_of_question */}
                                            <td>
                                                <button className="btn btn-outline-primary btn-small" style={{ width: 'auto' }} onClick={() => handleEditResult(item.id)}>Edit</button>
                                                <button
                                                    className="btn btn-outline-danger btn-small"
                                                    style={{ width: 'auto', margin: '2%' }}
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this result?')) {
                                                            handleDeleteResult(item.id);
                                                        }
                                                    }}
                                                >
                                                    <i className="ti ti-trash"></i>
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

export default ResultList;
