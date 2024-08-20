import React from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import Input from '../../Input';
import axios from 'axios';
import { toast } from 'react-toastify';


function Register(props) {
    const navigate = useNavigate();
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const today = new Date();
    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(today.getFullYear() - 12);
    const schema = yup.object({
        Name: yup.string().required('Your Customer Name is required'),
        Phone: yup.string()
            .required('Phone number is required')
            .matches(/^\d{10}$/, 'The phone number must be 10 digits long and should not contain letters or special characters.'),
        ADD: yup.string()
            .required('Your Address is required')
            .min(20, 'Address must be at least 20 characters')
            .max(100, 'Address must be at greatest 100 characters')
            .matches(/^[a-zA-Z0-9\s/]+$/, 'Address cannot contain special characters except /'),
        Email: yup.string().email('Invalid email format').required('Your Email is required'),
        Password: yup
            .string()
            .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,12}$/, 'Password must contain at least one letter, one number, one special character, and be between 6 and 12 characters long')
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('Password'), null], 'ConfirmPassword and Password must match')
            .required('Confirm Password is required'),
        dob: yup.date()
            .required('Date of Birth is required')
            .max(twelveYearsAgo, 'You must be at least 12 years old')
    });

    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })


    const onSubmit = async (data) => {
        // console.log("Data to be submitted:", data);
        const dataNeeded = {
            cus_name: data.Name,
            cus_password: data.Password,
            cus_email: data.Email,
            cus_phone: data.Phone,
            cus_address: data.ADD,
            cus_birth: data.dob
        };
        try {
            const response = await axios.post("http://localhost:9999/api/customer/register", dataNeeded);
            // console.log("Response:", response);
            if (response?.status === 200) {
                reset();
                navigate("/login");
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
                closeButton: false
            });
        }
    };


    return (
        <div>
        <div class="container-fluid page-header py-5">
            <h1 class="text-center text-white display-6">Register Page</h1>
        </div>
        
        <div className="login-container">
            <h2>Register</h2>
            {/* {error && <div className="error">{error}</div>} */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <div className='col-12'>
                        <div className="form-group">
                            {/* <label htmlFor="username">Name :</label> */}
                            <Input
                                label="*Name : "
                                // htmlFor="id"
                                id="username"
                                type="text"
                                placeholder="Enter Name"
                                register={{ ...register("Name") }}
                                className="form-control py-2"
                                errorMessage={errors.Name?.message}
                            />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="form-group">
                            {/* <label htmlFor="password">Phone:</label> */}
                            <Input
                                label="*Phone : "
                                // htmlFor="id"
                                id="phone"
                                type="text"
                                placeholder="Enter Phone"
                                register={{ ...register("Phone") }}
                                className="form-control py-2"
                                errorMessage={errors.Phone?.message}
                            />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="form-group">
                            {/* <label htmlFor="email">Email:</label> */}
                            <Input
                                label="*Email : "
                                // htmlFor="id"
                                id="email"
                                type="text"
                                placeholder="Enter Email"
                                register={{ ...register("Email") }}
                                className="form-control py-2"
                                errorMessage={errors.Email?.message}
                            />
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className="form-group">
                            {/* <label htmlFor="password">Pasword:</label> */}
                            <Input
                                label="*Password : "
                                // htmlFor="id"
                                id="Password"
                                type="password"
                                placeholder="Enter Password"
                                register={{ ...register("Password") }}
                                className="form-control py-2"
                                errorMessage={errors.Password?.message}
                            />
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className="form-group">
                            {/* <label htmlFor="password">Confirm Password:</label> */}
                            <Input
                                label="*Confirm Password : "
                                // htmlFor="id"
                                id="confirmpassword"
                                type="password"
                                placeholder="Enter Confirm password"
                                register={{ ...register("confirmPassword") }}
                                className="form-control py-2"
                                errorMessage={errors.confirmPassword?.message}
                            />
                        </div>
                    </div>

                    <div className='col-12'>
                        <div className="form-group">
                            {/* <label htmlFor="add">Adress:</label> */}
                            <Input
                                label="*Address : "
                                // htmlFor="id"
                                id="address"
                                type="text"
                                placeholder="Enter Address"
                                register={{ ...register("ADD") }}
                                className="form-control py-2"
                                errorMessage={errors.ADD?.message}
                            />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="form-group">
                            {/* <label htmlFor="add">Adress:</label> */}
                            <Input
                                label="Dob : "
                                // htmlFor="id"
                                id="dob"
                                type="date"
                                placeholder="Enter Dob"
                                register={{ ...register("dob") }}
                                className="form-control py-2"
                                errorMessage={errors.dob?.message}
                            />
                        </div>
                    </div>
                </div>
                <button type="submit">Register</button>
            </form>
            <div className="links">
                <a href="/login">Login</a><span> / </span>
                <a href="/forget-password">Forget Password</a>
            </div>
        </div>
        </div>
    );
}
export default Register;