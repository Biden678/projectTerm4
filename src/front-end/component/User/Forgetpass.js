import React from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import Input from '../../Input';
import axios from 'axios';
import { toast } from 'react-toastify';
function Forgetpass(props) {
    const navigate = useNavigate();
    const schema = yup.object({
        email: yup.string().required('Your Email is required'),
    });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:9999/api/customer/forget-password",data);
            console.log("Response:", response);
            if (response?.status===200) {
                // sessionStorage.setItem("isLoggedIn", true);
                // sessionStorage.setItem("user", JSON.stringify(response.data));
                reset();
                toast.success("We have sent a link to reset your password, please check your mail!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    closeButton:false
                    });
                navigate("/login");
         
                // console.log(response.data);
            }
        } catch (error) {
            // const message = error.response.data;
            // toast.error(message, {
            //     position: "top-right",
            //     autoClose: 2000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //     closeButton:false
            //     });
            console.log(error);
        }
    };
    return (
        <div>
            <div class="container-fluid page-header py-5">
                <h1 class="text-center text-white display-6">Forget Password Page</h1>
            </div>
        <div className="login-container mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <Input
                    label="Email : "
                    // htmlFor="id"
                    id="username"
                    type="text"
                    placeholder="Enter your email"
                    register={{ ...register("email") }}
                    className="form-control py-2"
                    errorMessage={errors.email?.message}
                />
            </div>
            <button type="submit">Get Link</button>
        </form>
        <div className="links">
            <a href="/register">Register</a><span> / </span>
            <a href="/login">Login</a>
         
        </div>
    </div>
        </div>
    );
}

export default Forgetpass;