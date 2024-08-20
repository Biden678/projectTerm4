import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../../Input';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios';
import { toast } from 'react-toastify';
function Resetpass(props) {
    const navigate = useNavigate();
    // const { cus_id } = useParams();
    const location = useLocation();
    const queryString = location.search;
    const codeStartIndex = 1;
    const code = queryString.substring(codeStartIndex);

    // console.log('cus_id:', cus_id);
    // console.log('code:', code);
    const schema = yup.object({
        Password: yup
            .string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/, 'Password must contain at least one letter, one number, one special character, and be between 6 and 12 characters long')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('Password'), null], 'ConfirmPassword and Password must match')
            .required('Confirm Password is required'),

        //   .max(today, 'Date of Birth cannot be in the future'),
        //   gender: yup.string().required('Gender is required'),
    });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    //
    const onSubmit = async (data) => {
        const dataNeeded =
        {
            token: code,
            passwordNew: data.Password
        }
        try {
            const response = await axios.put("http://localhost:9999/api/customer/reset-password", dataNeeded);
            console.log("Response:", response);
            if (response?.status === 200) {
                reset();
                navigate("/login");
                toast.success("Reset successfully !", {
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
            // console.error("Error:", error);
            const message = error.response.data
            toast.error(message, {
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
    };
    //
    useEffect(() => {
        // Hiển thị toast message chào mừng hoặc hướng dẫn khi vào trang Resetpass
        toast.info("Please set your new password.", {
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
    }, [code]);
    return (
        <div>
            <div class="container-fluid page-header py-5">
                <h1 class="text-center text-white display-6">Reset Password Page</h1>
            </div>
            <div className="login-container mt-5">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <Input
                            label="PasswordNew : "
                            // htmlFor="id"
                            id="password"
                            type="password"
                            placeholder="Set your Password"
                            register={{ ...register("Password") }}
                            className="form-control py-2"
                            errorMessage={errors?.Password?.message}
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            label="*ConfirmPassword : "
                            // htmlFor="id"
                            id="confirmPassword"
                            type="password"
                            placeholder="Enter your confirm password"
                            register={{ ...register("confirmPassword") }}
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

export default Resetpass;