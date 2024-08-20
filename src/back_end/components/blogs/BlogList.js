import React, { useContext, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function BlogList(props) {
    const { handleFetchBlogs, setBlogs, blogs, handleFetchTypes, types } = useContext(AuthContext);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editBlogId, setEditBlogId] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        handleFetchBlogs();
        handleFetchTypes();
    }, []);

    const truncate = (str, maxLength) => {
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...';
        }
        return str;
    };

    const schema = yup.object().shape({
        title: yup.string().required('Title Blog is required').min(2, 'Title Blog must be at least 2 characters').max(100, 'Title Blog must be at most 100 characters').matches(/^[a-zA-Z0-9 ?]+$/, 'Title Blog cannot contain special characters'),
        content: yup.string().required('Content is required').min(10, 'Content must be at least 10 characters'), //.max(750, 'Content must be at most 750 characters').matches(/^[a-zA-Z0-9 ,.:;?!]+$/, 'Content cannot contain special characters')
        typeid: yup.string().required('Type of Blog is required'),
        image: !isEditing && yup.mixed().required('Image is required').test('fileFormat', 'Only .jpg and .png files are allowed', (value) => value && /\.(jpg|png)$/i.test(value.name)).test('fileExists', 'File name already exists', async (value) => {
            if (!value) return true;
            try {
                const response = await axios.get(`http://localhost:9999/api/blog/getImage/${value.name}`);
                return response.status !== 200
            } catch (e) {
                return true
            }
        })
    });

    const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleCancel = () => {
        setIsAdding(false);
        setIsEditing(false);
        setEditBlogId(null);
        setImagePreview('');
        reset();
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('typeid', data.typeid);
        if (data.image) {
            formData.append('image', data.image);
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:9999/api/blog/${editBlogId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
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
                await axios.post("http://localhost:9999/api/blog", formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
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

            handleFetchBlogs();

            handleCancel();

        } catch (error) {
            console.error("Error submitting Blog:", error);
        }
    };



    const handleEditBlog = (id) => {
        const blogToEdit = blogs.find(blog => blog.id === id);
        setEditBlogId(id);
        setValue('title', blogToEdit.title);
        setValue('content', blogToEdit.content);
        setValue('typeid', blogToEdit.typeid?.id);
        setIsEditing(true);
        setImagePreview(`http://localhost:9999/api/blog/getImage/${blogToEdit.image}`);
    };

    const handleDeleteBlog = async (id) => {
        try {
            await axios.delete(`http://localhost:9999/api/blog/delete/${id}`);
            handleFetchBlogs();
            toast.error('Deleted Blog!', {
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
            console.error("Error deleting Blog:", error);
        }
    };

    useEffect(() => {
        handleSearchBlogs();
    }, [searchTerm]);

    const handleSearchBlogs = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/api/blog`, {
                params: { name: searchTerm }
            });
            if (response.status === 200) {
                setBlogs(response.data);
            }
        } catch (error) {
            console.error("Error searching blogs:", error);
        }
    };

    // phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const PAGE_SIZE = 5;

    useEffect(() => {
        setTotalPages(Math.ceil(blogs.length / PAGE_SIZE));
    }, [blogs]);
    const displayedBlogs = blogs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    return (
        <div>
            <div className="col-lg-12 d-flex align-items-stretch">
                <div className="card w-100">
                    <button className='btn btn-outline-success' onClick={isAdding || isEditing ? handleCancel : () => setIsAdding(true)}>
                        {isAdding || isEditing ? 'Cancel' : 'Add new'}
                    </button>

                    <div className="card-body p-4">
                        {/* phân trang */}
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
                        <h3 className="fw-semibold mb-4">Blogs</h3>
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
                                    <input type="hidden" className="form-control" value={editBlogId} />
                                )}

                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="nameBlog" className="form-label" style={{ float: 'left' }}>
                                        Title Blog
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                        id="titleBlog"
                                        {...register('title')}
                                    />
                                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="typeCategory_id" className="form-label" style={{ float: 'left' }}>
                                        Types
                                    </label>
                                    <select
                                        className={`form-select ${errors.typeid ? 'is-invalid' : ''}`}
                                        id="typeCategory_id"
                                        {...register('typeid')}
                                    >
                                        <option value="">Choose . . .</option>
                                        {types.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.typeid && <div className="invalid-feedback">{errors.typeid.message}</div>}
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="content" className="form-label" style={{ float: 'left' }}>
                                        Content
                                    </label>
                                    <div className='mt-5'>
                                        <Controller
                                            name="content"
                                            control={control}
                                            render={({ field }) => (
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    config={{
                                                        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
                                                    }}
                                                    data={field.value}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        field.onChange(data);
                                                    }}
                                                    onBlur={field.onBlur}
                                                />
                                            )}
                                        />
                                    </div>
                                    {errors.content && <div className="invalid-feedback">{errors.content.message}</div>}
                                </div>

                                <div className="mb-3 col-lg-6">
                                    <label htmlFor="image" className="form-label" style={{ float: 'left' }}>
                                        Image
                                    </label>
                                    <div className='mt-5'>
                                        <input
                                            type="file"
                                            className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                            id="image"
                                            accept=".jpg, .png"
                                            onChange={(e) => {
                                                const file = e.target.files[0];

                                                setValue('image', file);
                                                if (file) {
                                                    setImagePreview(URL.createObjectURL(file));
                                                } else {
                                                    setImagePreview('');
                                                }
                                            }}
                                        />
                                    </div>

                                    {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px' }} />
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className="btn btn-primary btn-lg ms-auto">
                                    {isEditing ? 'Edit' : 'Add'}
                                </button>
                            </form>
                        )}

                        <div className="table-responsive">
                            <table className="table text-nowrap mb-0 align-middle">
                                <thead className="text-dark fs-4">
                                    <tr>
                                        <th className="border-bottom-0">
                                            <h4>Image</h4>
                                        </th>
                                        <th className="border-bottom-0">
                                            <h4>Title</h4>
                                        </th>
                                        {/* <th className="border-bottom-0">
                      <h4>Type</h4>
                    </th> */}
                                        <th className="border-bottom-0">
                                            <h4>Action</h4>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayedBlogs.length > 0 ? (
                                        Array.isArray(displayedBlogs) && displayedBlogs.map((blog, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <img
                                                        src={`http://localhost:9999/api/blog/getImage/${blog.image}`}
                                                        alt={blog.title}
                                                        className="img-fluid rounded"
                                                        style={{ maxWidth: '100px' }}
                                                    />
                                                </td>
                                                <td>{blog.title}</td>
                                                {/* <td>{blog.typeid?.type}</td> */}
                                                <td>
                                                    <button
                                                        style={{ maxWidth: '80px' }}
                                                        className="btn btn-outline-success mx-1"
                                                        onClick={() => handleEditBlog(blog.id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        style={{ maxWidth: '80px' }}
                                                        className="btn btn-outline-danger"
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this type?')) {
                                                                handleDeleteBlog(blog.id);
                                                            }
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link
                                                        className="btn btn-outline-primary mx-1"
                                                        to={`/blogDetailAdminPage/${blog.id}`}
                                                    >
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr >
                                            <td>No Blog to display.</td>
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

export default BlogList;
