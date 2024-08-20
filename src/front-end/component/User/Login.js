import React from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import Input from '../../Input';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const schema = yup.object({
        email: yup.
            string().required('Your Customer Name is required'),
        password: yup
            .string().required('Password is required'),
    });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:9999/api/customer/login", data);
            // console.log("Response:", response.data.cus_id);
            if (response?.status === 200) {
                sessionStorage.setItem("isLoggedIn", true);
                sessionStorage.setItem("user", JSON.stringify(response.data));
                reset();
                navigate("/shop");
                toast.success("Welcome!!!", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    closeButton: false

                });

            }
        } catch (error) {

            if (error?.response?.status === 401) {
                const message = error.response.data;
                toast.error(message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    closeButton: false

                });
            }

        }
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Add your authentication logic here
    //     if (username === 'user' && password === 'password') {
    //         alert('Login successful!');
    //     } else {
    //         setError('Invalid username or password');
    //     }
    // };

    return (
        <div>
            <div class="container-fluid page-header py-5">
                <h1 class="text-center text-white display-6">Login Page</h1>
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
                <div className="form-group">
                    <Input
                        label="Password : "
                        // htmlFor="id"
                        id="username"
                        type="password"
                        placeholder="Enter your password"
                        register={{ ...register("password") }}
                        className="form-control py-2"
                        errorMessage={errors.password?.message}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="links">
                <a href="/register">Register</a><span> / </span>
                <a href="/forgetpass">Forget Password</a>

            </div>
        </div>
        </div>
       
    );
}
export default Login;