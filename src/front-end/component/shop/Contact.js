import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Input from '../../Input';
import axios from 'axios';

function Contact(props) {
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const onChange = (e) => {
        setIsCaptchaVerified(!isCaptchaVerified);
        // console.log(e);
    }
    const schema = yup.object({
        email: yup.string().email('Invalid email format').required('Your Email is required'),
     name: yup.string()
    .required('Subject is required')  
    .min(2, 'Name must be at least 2 characters')  
    .max(20, 'Name must be at most 20 characters'),
        message: yup
            .string()
            .required('Message is required')
            .max(100, 'Message must be at most 100 characters'),
    });
    const { handleSubmit, register, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    })
    const OnSubmit = async(data)=> {
        console.log(data);
        if (isCaptchaVerified) {
            try {
                const response = await axios.post('http://localhost:9999/api/contact/add', data)
                if (response.status === 200) {
                    toast.success(' ♥ Thank for your Feedback about my website', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    reset();
                    setIsCaptchaVerified(false)
                    
                }
            } catch (error) { 
                // console.log(error.response.data);
                if(error.response.status===409){
                    const  message  = error.response.data;
                    toast.error(message, {  
                        position: "bottom-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
                  
                
            }
        } else {
            toast('🤖verify capcha', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }


    }
    return (
        <div className="container-fluid contact py-5">
            <div className="container py-5">
                <div className="p-5 bg-light rounded">
                    <div className="row g-4">
                        <div className="col-12">
                            <div className="text-center mx-auto" style={{ maxWidth: '700px' }}>
                                <h1 className="text-primary">Get in touch</h1>
                                <p className="mb-4">
                                    The contact form is currently inactive. Get a functional and working contact form with Ajax & PHP in a few minutes. Just copy and paste the files, add a little code and you're done. <a href="https://htmlcodex.com/contact-form">Download Now</a>.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="h-100 rounded">
                                <iframe
                                    className="rounded w-100"
                                    style={{ height: '400px' }}
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                        <div className="col-lg-7">
                        <form onSubmit={handleSubmit(OnSubmit)}>
                                {/* <input type="text" className="w-100 form-control border-0 py-3 mb-4" placeholder="Your Email" /> */}
                                <Input      
                                        type="text"
                                        placeholder="Your Email"
                                        register={{...register("email")}}
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        errorMessage={errors.email?.message}
                                        />
                                {/* <input type="email" className="w-100 form-control border-0 py-3 mb-4" placeholder="Enter Your Title" /> */}
                                <Input      
                                        type="text"
                                        placeholder="Your Name"
                                        register={{...register("name")}}
                                        className="w-100 form-control border-0 py-3 mb-4"
                                        errorMessage={errors.name?.message}
                                        />
                                {/* <textarea className="w-100 form-control border-0 mb-4" rows="5" cols="10" placeholder="Your Message"></textarea> */}
                                <textarea
                                                className="w-100 form-control border-0 mb-4"
                                                rows="5"
                                                cols="10"
                                                placeholder="Message"
                                                {...register('message')}  // Register the textarea with useForm
                                            ></textarea>
                                            <span className="text-danger">{errors.message?.message}</span>
                                <ReCAPTCHA sitekey="6LeRVjIpAAAAANlG-fRy5BoTICNV-xTDVJqURMxh" onChange={onChange} />
                                <button className="w-100 btn form-control border-secondary py-3 bg-white text-primary mt-5" type="submit">Submit</button>
                            </form>
                        </div>
                        <div className="col-lg-5">
                            <div className="d-flex p-4 rounded mb-4 bg-white">
                                <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Address</h4>
                                    <p className="mb-2">123 Street New York, USA</p>
                                </div>
                            </div>
                            <div className="d-flex p-4 rounded mb-4 bg-white">
                                <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Mail Us</h4>
                                    <p className="mb-2">info@example.com</p>
                                </div>
                            </div>
                            <div className="d-flex p-4 rounded bg-white">
                                <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                                <div>
                                    <h4>Telephone</h4>
                                    <p className="mb-2">(+012) 3456 7890</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
