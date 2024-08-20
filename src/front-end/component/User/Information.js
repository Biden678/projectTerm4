import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useForm, useWatch } from 'react-hook-form';
import Input from '../../Input';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Information(props) {
    const [formattedBirth, setFormattedBirth] = useState('');
    const today = new Date();
    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(today.getFullYear() - 12);
    const schema = yup.object({
        cus_name: yup.string().required('Your Customer Name is required'),
        cus_phone: yup.string()
            .required('Phone number is required')
            .matches(/^\d{10}$/, 'The phone number must be 10 digits long and should not contain letters or special characters.'),
        cus_address: yup.string()
            .required('Your Address is required')
            .min(20, 'Address must be at least 20 characters')
            .max(100, 'Address must be at greatest 100 characters')
            .matches(/^[a-zA-Z0-9\s/]+$/, 'Address cannot contain special characters except /'),
        cus_birth: yup.date()
            .required('Date of Birth is required')
            .max(twelveYearsAgo, 'You must be at least 12 years old'),
        // cus_gender: yup.mixed()
        // .oneOf([true, false], 'Please select a gender') // Giá trị có thể là true hoặc false
        // .required('Gender is required')
    });

    const { handleSubmit, register, formState: { errors }, reset, setValue,watch } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {

        // console.log("data: "+data);
        // console.log("Data to be submitted:", data);
        const dataNeeded = {
            cus_id: cus_Id,
            cus_name: data.cus_name,
            cus_email: user.cus_email,
            cus_phone: data.cus_phone,
            cus_address: data.cus_address,
            cus_birth: data.cus_birth,
            cus_gender: data.cus_gender,
        };
        // console.log("dataNeeded"+dataNeeded);
        sessionStorage.setItem("user", JSON.stringify(dataNeeded));
        try {
            const response = await axios.put("http://localhost:9999/api/customer/editCustomer", dataNeeded);
            // console.log("Response:", response);
            if (response?.status === 200) {
                reset();
                setUpdate();
                sessionStorage.setItem("user", JSON.stringify(dataNeeded));
                toast.success("Update successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    closeButton:false
                    });
            }
        } catch (error) {
            const message = error.response.data
            // console.log(message);
            toast.error(message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton:false
                });
        }
    };
    const navigate = useNavigate();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const cus_Id = user.cus_id;
    const defaultValue = user && user.gender === true;
    // console.log(defaultValue);
    console.log("user:"+user.cus_gender);
    // console.log(user.cus_name);
    // console.log(defaultValue);

    // const formattedBirth = formatDate(user.birth);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if (!user || !isLoggedIn) {
            navigate('/login');  // Use absolute path to navigate to login
              
        } else {
            setValue('cus_name', user.cus_name);
            setValue('cus_address', user.cus_address);
            setValue('cus_phone', user.cus_phone);
            const formattedBirth = formatDate(user.cus_birth);
            setValue('cus_birth', formattedBirth);
            // setValue('cus_gender', defaultValue);
            // setValue('cus_birth',user.birth);
            console.log(user);
        }
    }, []);
    // console.log(user);
    // const [changeinfor, setChangeInfor] = useState({
    //     cus_ADD: "",
    //     cus_Phone: ""
    // })
    const [update, setUpdate] = useState(false);
    const toggleInput = () => {
        setUpdate(!update);
        // setChangeInfor({ ...infor });
    };
    // function formatDate(dateString) {
    //     const date = new Date(dateString);
    //     const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    //     return formattedDate;
    // }
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    return (
        <div className='row'>
            <div className="container-fluid py-5 mt-5 col-12">
                <div className="container py-1">
                    <div className="text-center mx-auto pb-3 pt-7 wow fadeIn" data-wow-delay=".3s" style={{ maxWidth: 600, marginTop: "100px" }}>
                        <h1 className="mb-3">PERSONAL INFORMATION</h1>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="table">
                            <div className="contact-detail position-relative p-3">
                                {/* <p className="mb-4 text-primary">Information</p> */}
                                <div className="row g-5">
                                    <div className="col-lg-12 wow fadeIn" data-wow-delay=".5s">
                                        <div className="p-5 rounded contact-form row">
                                            <tbody>
                                                {update ? (
                                                    <>
                                                        <tr>
                                                            <td><label style={{ float: 'left', color: 'black', paddingRight: "20px" }}><strong>Name:</strong></label></td>
                                                            <td>
                                                                <Input
                                                                    style={{ width: 1000 }}
                                                                    type="text"
                                                                    placeholder="Enter your name"
                                                                    register={{ ...register("cus_name") }}
                                                                    className="form-control border-0 py-3"
                                                                    errorMessage={errors.cus_name?.message}
                                                                    labelStyle={{ float: 'left' }}
                                                                />
                                                            </td>
                                                        </tr>

                                                        <hr />

                                                        <tr>
                                                            <td><label style={{ float: 'left', color: 'black', paddingRight: "20px" }} htmlFor="Address"><strong>Address</strong></label></td>
                                                            <td>
                                                                <Input
                                                                    type="text"
                                                                    style={{ width: 1000 }}
                                                                    placeholder="Enter your address"
                                                                    register={{ ...register("cus_address") }}
                                                                    className="form-control border-0 py-3"
                                                                    errorMessage={errors.cus_address?.message}
                                                                    labelStyle={{ float: 'left' }}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td><label style={{ float: 'left', color: 'black', paddingRight: "20px" }} htmlFor="Address"><strong>Phone</strong></label></td>
                                                            <td>
                                                                <Input
                                                                    type="text"
                                                                    style={{ width: 1000 }}
                                                                    placeholder="Enter your phone"
                                                                    register={{ ...register("cus_phone") }}
                                                                    className="form-control border-0 py-3"
                                                                    errorMessage={errors.cus_phone?.message}
                                                                    labelStyle={{ float: 'left' }}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td>
                                                                <label style={{ float: 'left', color: 'black', paddingRight: "20px" }} htmlFor="Gender">
                                                                    <strong>Gender:</strong>
                                                                </label>
                                                            </td>
                                                            <td>
                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                    <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                                                                        <Input
                                                                        // id={"female"}
                                                                             type={"radio"}
                                                                              value={false}
                                                                              register={{ ...register("cus_gender") }}
                                                                            defaultChecked={!defaultValue} // Kiểm tra giá trị gender và chọn radio button tương ứng
                                                                            className=""
                                                                            style={{ marginRight: '5px' }}
                                                                        />
                                                                        <label htmlFor="female">Female</label>
                                                                    </div>
                                                                    <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                                                                        <Input
                                                                        // id={"male"}
                                                                        type={"radio"}
                                                                            value={true}
                                                                            register={{ ...register("cus_gender") }}
                                                                            defaultChecked={defaultValue}
                                                                            
                                                                            // Kiểm tra giá trị gender và chọn radio button tương ứng
                                                                            className=""
                                                                            style={{ marginRight: '5px' }}
                                                                        />
                                                                        <label htmlFor="male">Male</label>
                                                                    </div>
                                                                </div>
                                                                {/* {errors.gender && <span style={{ color: 'red' }}>{errors.gender.message}</span>} */}
                                                            </td>
                                                        </tr>
                                                        <hr />

                                                        <tr>
                                                            <td><label style={{ float: 'left', color: 'black', paddingRight: "20px" }} htmlFor="Address"><strong>BirthDay:</strong></label></td>
                                                            <td>
                                                                <Input
                                                                    type="date"
                                                                    style={{ width: 1000 }}
                                                                    register={{ ...register("cus_birth") }}
                                                                    className="form-control border-0 py-3"
                                                                    errorMessage={errors.cus_birth?.message}
                                                                    labelStyle={{ float: 'left' }}
                                                                />
                                                                <div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <hr />
                                                    </>
                                                ) : (
                                                    <>
                                                        <tr>
                                                            <td>  <label style={{ float: 'left', color: 'black' }}><strong>Name</strong> : </label></td>
                                                            <td>{user.cus_name}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td>  <label style={{ float: 'left', color: 'black' }}><strong>Email</strong> : </label></td>
                                                            <td>{user.cus_email}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td> <label style={{ float: 'left', color: 'black' }}><strong>Address</strong> : </label></td>
                                                            <td>{user.cus_address}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td>  <label style={{ float: 'left', color: 'black' }}><strong>Phone</strong> : </label></td>
                                                            <td>{user.cus_phone}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td>  <label style={{ float: 'left', color: 'black' }}><strong>Gender</strong> : </label></td>
                                                            <td>{user.cus_gender ? 'Male' : 'Female'}</td>
                                                        </tr>
                                                        <hr />
                                                        <tr>
                                                            <td><label style={{ float: 'left', color: 'black' }}><strong>Birthday</strong> : </label></td>
                                                            <td>{formatDate(user.cus_birth)}</td>
                                                        </tr>
                                                        <hr />
                                                    </>
                                                )}

                                            </tbody>
                                        </div>
                                        <button className="btn btn-secondary" type="button" onClick={toggleInput}>
                                            {update ? 'Cancel' : 'Update'}
                                        </button>
                                        {update && (
                                            <button className="btn btn-primary" type="submit">Save</button>
                                        )}
                                    </div>

                                </div>

                            </div>

                        </table>


                    </form>



                </div>

            </div>
        </div>
    );
}

export default Information;