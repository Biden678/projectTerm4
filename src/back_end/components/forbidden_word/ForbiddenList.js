import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForbiddenList(props) {
  const { handleFetchWords, setWords, words } = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editWordId, setEditWordId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => {
    setTotalPages(Math.ceil(words.length / PAGE_SIZE));
  }, [words]);

  const displayedWords = words.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    handleFetchWords();
  }, []);

  useEffect(() => {
    handleSearchWords();
  }, [searchTerm]);

  const handleEditWord = (id) => {
    const wordToEdit = words.find(word => word.id === id);
    setEditWordId(id);
    setValue('word', wordToEdit.word);
    setIsEditing(true);
  };

  const handleDeleteWord = async (id) => {
    try {
      await axios.delete(`http://localhost:9999/api/words/${id}`);
      handleFetchWords();
      toast.error('Deleted Word!', {
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
      console.error("Error deleting Word:", error);
    }
  };

  const handleSearchWords = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/api/words`, {
        params: { name: searchTerm }
      });
      if (response.status === 200) {
        setWords(response.data);
      }
    } catch (error) {
      console.error("Error searching Words:", error);
    }
  };

  const schema = yup.object().shape({
    word: yup.string().required('Word is required')
      .min(2, 'Word must be at least 2 characters')
      .max(20, 'Word must be at most 20 characters')
      .matches(/^[a-zA-Z0-9 -_?.,]+$/, 'Word cannot contain special characters')
      .test('is-unique', 'Word already exists', function (value) {
        const { words } = this.options.context;
        return !words.some(word => word.word.toLowerCase() === value.toLowerCase());
      }),
  });

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    context: { words }
  });

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditWordId(null);
    reset();
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('word', data.word);

    try {
      if (isEditing) {
        await axios.put(`http://localhost:9999/api/words/${editWordId}`, formData);
        toast.success('UPDATE successfully 👌', {
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
      } else {
        await axios.post("http://localhost:9999/api/words", formData);
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
      }
      handleFetchWords();
      handleCancel();
      reset();
    } catch (error) {
      console.error("Error submitting Word:", error);
      toast.error('An error occurred while saving the word.', {
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
    }
  };

  return (
    <div>
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="card w-100">
          <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
            {isAdding || isEditing ? 'Cancel' : 'Add new'}
          </button>
          {/* Pagination */}
          <div className="d-flex justify-content-between mt-3">
            <div className="d-flex">
              <button
                className="btn btn-outline-primary me-2 ti"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &#xea19;
              </button>
              <button
                className="btn btn-outline-primary me-2 ti"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &#xea1f;
              </button>
            </div>
            <div>
              Page {currentPage} of {totalPages}
            </div>
          </div>
          <br />
          <div className="card-body p-4">
            <h3 className="fw-semibold mb-4">Words</h3>
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
              <form className='row' onSubmit={handleSubmit(onSubmit)}>
                {isEditing && (
                  <input type="hidden" className="form-control" value={editWordId} />
                )}

                <div className="mb-3 col-lg-6">
                  <label htmlFor="nameWord" className="form-label" style={{ float: 'left' }}>
                    Word
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.word ? 'is-invalid' : ''}`}
                    id="titleWord"
                    {...register('word')}
                  />
                  {errors.word && <div className="invalid-feedback">{errors.word.message}</div>}
                </div>

                <div className="col-lg-12">
                  <button type="submit" className="btn btn-primary">
                    {isEditing ? 'Update Word' : 'Add Word'}
                  </button>
                </div>
              </form>
            )}

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Word</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedWords.length > 0 ? (
                    Array.isArray(displayedWords) && displayedWords.map((word) => (
                      <tr key={word.id}>
                        <td>{word.word}</td>
                        <td>
                          <button className='btn btn-outline-danger'
                            style={{ maxWidth: '80px' }}
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this Word?')) {
                                handleDeleteWord(word.id);
                              }
                            }}> Delete
                          </button>
                          <button className='btn btn-outline-success mx-1' style={{ maxWidth: '80px' }} onClick={() => handleEditWord(word.id)}>Edit</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr >
                      <td>No words to display.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForbiddenList;