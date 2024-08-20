// LoginAdminPage.js
import React from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from '../../../front-end/Input';
import { useNavigate } from 'react-router-dom';
// import Input from '../front-end/Input';
import '../../assets/css/LoginAdminPage.css';


function LoginAdmin(props) {
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
            const response = await axios.post("http://localhost:9999/api/admin/login",data);
            // console.log("Response:", response);
            if (response.status === 200) {
              
                sessionStorage.setItem("admin", JSON.stringify(response.data));
                reset();
                navigate("/homeAdminPage");
                toast.success("Welcome!!!", {
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
   
            if(error.response.status===401){
                const message  = error.response.data;   
                    toast.error(message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        closeButton:false
                       
                        });
            }
          
        }
    };
    return (
        <div className='box'>
            <div className="login-container mt-5">
                <h2>WELCOME ADMIN</h2>
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
                                        register={{...register("password")}}
                                        className="form-control py-2"
                                        errorMessage={errors.password?.message}
                                        />
                </div>
                <button type="submit">Login</button>
            </form>
            </div>
        </div>
    );
}

export default LoginAdmin;