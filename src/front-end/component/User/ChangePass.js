import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import Input from '../../Input';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../contexts/AuthContext';
function ChangePass(props) {
const navigate = useNavigate();
const {logout} = useContext(AuthContext);
useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!user || !isLoggedIn) {
        navigate('/login');  // Use absolute path to navigate to login
    }
},[]);
    const schema = yup.object({
        Password: yup
        .string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/, 'Password must contain at least one letter, one number, one special character, and be between 6 and 12 characters long')
        .required('Password is required'),
        PasswordNew: yup
          .string()
          .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/, 'Password must contain at least one letter, one number, one special character, and be between 6 and 12 characters long')
          .required('Password is required'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('PasswordNew'), null], 'ConfirmPassword and Password must match')
          .required('Confirm Password is required'),
        
      });
      const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const onSubmit = async (data) => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const dataNeeded = 
     {
        id : user.cus_id,
        passwordNow : data.Password,
        passwordNew : data.PasswordNew
     }
        try {
            const response = await axios.put("http://localhost:9999/api/customer/changepassword",dataNeeded);
            console.log("Response:", response);
            if (response?.status === 200) {
                reset();
                navigate("/login");
                logout();
                toast.success("Change password successfully !", {
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
            // console.error("Error:", error);
            const message = error.response.data
            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                closeButton:false
                });
            // console.log(error);
        }
    };
    return (
        <div>
            <div class="container-fluid page-header py-5">
                <h1 class="text-center text-white display-6">Change Password Page</h1>
            </div>
        <div className="login-container">
        <h2>Change Your Password here</h2>  

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
                <Input
                    label="Password Now : "
                    // htmlFor="id"
                    id="password"
                    type="password"
                    placeholder="Enter your Password Now"
                    register={{ ...register("Password") }}
                    className="form-control py-2"
                    errorMessage={errors.Password?.message}
                />
            </div>
            <div className="form-group">
                <Input
                    label="Password New : "
                    // htmlFor="id"
                    id="password"
                    type="password"
                    placeholder="Enter your Password New"
                    register={{ ...register("PasswordNew") }}
                    className="form-control py-2"
                    errorMessage={errors.PasswordNew?.message}
                />
            </div>
            <div className="form-group">
            <Input      
                                    label="*ConfirmPassword : "
                                    // htmlFor="id"
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Enter your confirm password"
                                    register={{...register("confirmPassword")}}
                                    className="form-control py-2"
                                    errorMessage={errors.confirmPassword?.message}
                                    />
            </div>
            <button type="submit">Set new password </button>
        </form>
        {/* <div className="links">
            <a href="/register">Register</a><span> / </span>
            <a href="/forgetpass">Forget Password</a>
        </div> */}
    </div>
        </div>
    );
}

export default ChangePass;