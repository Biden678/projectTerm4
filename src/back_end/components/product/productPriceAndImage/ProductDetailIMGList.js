import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductDetailIMGList({ imageExists, onIMGChange }) {
    const { proId } = useParams();
    const [productImages, setProductImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [selectedImages, setSelectedImages] = useState(new Set());


    useEffect(() => {
        handleFetchProductImages();
    }, [proId]);

    async function handleFetchProductImages() {
        try {
            const response = await axios.get(`http://localhost:9999/api/productImages/${proId}`);
            if (response.status === 200) {
                setProductImages(response.data);
                onIMGChange(response.data.length);
            }
        } catch (error) {
            console.log("Something went wrong:", error);
        }
    }
    async function handleAddImages() {
        if (newImages.length === 0) {
            toast.error('Please select at least one image to upload.', {
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
            return;
        }

        if (selectedImages.size > 0) {
            await handleDeleteSelectedImages(); // Delete selected images before uploading new ones
        }

        try {
            const formData = new FormData();
            newImages.forEach(image => {
                formData.append('files', image);
            });

            const response = await axios.post(`http://localhost:9999/api/uploadMultipleFiles/${proId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                toast.success('Images added successfully!', {
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
                handleFetchProductImages(); // Refresh images after upload
                setNewImages([]);
                setPreviewUrls([]);
                setSelectedImages(new Set());
            }
        } catch (error) {
            console.log("Error while adding images:", error);
            toast.error('Failed to add images ! Change to another image OR name of image !', {
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
    }
    async function handleDeleteSelectedImages() {
        if (selectedImages.size > 0) {
            if (selectedImages.size === imageExists) {
                toast.error('There must be at least one image for a product.', {
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
                return;
            }

            const deletePromises = [];
            selectedImages.forEach(imageId => {
                deletePromises.push(axios.delete(`http://localhost:9999/api/productImage/${imageId}`));
            });
    
            try {
                await Promise.all(deletePromises);
                toast.success('Selected images deleted successfully!', {
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
                setSelectedImages(new Set());
                handleFetchProductImages(); // Refresh images after delete
            } catch (error) {
                console.log("Error while deleting images:", error);
                toast.error('Failed to delete selected images.', {
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
                }else{
                    toast.error('Select the images you want to delete first.', {
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
        
    }

    function handleImageChange(e) {
        const files = Array.from(e.target.files);
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'];
        const specialCharRegex = /[^a-zA-Z0-9_.-]/;

        const validFiles = [];
        const urls = [];
        const existingFileNames = new Set(productImages.map(img => img.image_path));

        files.forEach(file => {
            if (!allowedTypes.includes(file.type)) {
                toast.error(`File type not allowed: ${file.name}`, {
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
                return;
            }

            if (specialCharRegex.test(file.name)) {
                toast.error(`File name contains special characters: ${file.name}`, {
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
                return;
            }

            if (existingFileNames.has(file.name)) {
                toast.error(`File name already exists: ${file.name}`, {
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
                return;
            }

            validFiles.push(file);
            urls.push(URL.createObjectURL(file));
        });

        setNewImages(validFiles);
        setPreviewUrls(urls);
    }
    //=============================================
    function handleImageSelect(imageId) {
        const updatedSelectedImages = new Set(selectedImages);
        if (updatedSelectedImages.has(imageId)) {
            updatedSelectedImages.delete(imageId);
        } else {
            updatedSelectedImages.add(imageId);
        }
        setSelectedImages(updatedSelectedImages);
    }

    return (
        <div className='col-lg-12'>
            <div className="d-flex align-items-stretch">
                <div className="card w-100">
                    <div className="card-body p-4">
                        <h3 className="fw-semibold mb-4">Images: {productImages.length ? <button className="btn btn-danger" onClick={handleDeleteSelectedImages} style={{float:'right', width:'auto'}}><i className='ti'>&#xeb41;</i></button> : '' }</h3>
                        <div className="table-responsive mt-5 row">

                            {productImages.length > 0 ? (
                                productImages.map((img, index) => (
                                    <div key={index} className='col-3'>
                                        <div className="mb-3">
                                            <img src={`http://localhost:9999/api/getImage/${img.image_path}`} className="img-fluid w-100 rounded" alt={`Product ${index + 1}`} />
                                            <div className="mt-2 d-flex justify-content-between align-items-center">
                                                {/* <button className="btn btn-danger" onClick={() => handleDeleteImage(img.id)}>Delete</button> */}
                                                <input type="checkbox" onChange={() => handleImageSelect(img.id)} checked={selectedImages.has(img.id)} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <h6>No images for this product! Add some below.</h6>
                            )}

                            {/* <div className="mt-4">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="mb-3">
                                        <img src={url} className="img-fluid w-100 rounded" alt={`Preview ${index + 1}`} />
                                    </div>
                                ))}
                                <label htmlFor="file-upload" style={{ width: '100%' }}>
                                    <input id="file-upload" className="btn btn-primary mt-2" style={{ display: 'none' }} type="file" onChange={handleImageChange} multiple />
                                    <i className='ti fa-3x'>&#xf38b;</i> Add New Images
                                </label>
                                <button className="btn btn-primary mt-2" onClick={handleAddImages}>Upload</button>
                            </div> */}

                            <div className="mt-4 row">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="mb-3 col-4">
                                        <img src={url} className="img-fluid w-100 rounded" alt={`Preview ${index + 1}`} />
                                    </div>
                                ))}
                                <label htmlFor="file-upload" style={{ width: '100%' }}>
                                    <input id="file-upload" className="btn btn-primary mt-2" style={{ display: 'none' }} type="file" onChange={handleImageChange} multiple />
                                    <i className='ti fa-3x'>&#xf38b;</i> Add New Images
                                </label>
                                <button className="btn btn-primary mt-2" onClick={handleAddImages}>Upload</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailIMGList;
