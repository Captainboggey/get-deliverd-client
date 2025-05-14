import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../Components/googleLogin';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const Login = () => {
    const { signIn } = useAuth()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [error,setError]=useState('')
    const navigate = useNavigate()
    const location = useLocation();
    // console.log(location)
    const goTo =location?.state?.from?.pathname || '/'
    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(res => {
                if (res) {
                    const Toast = Swal.mixin({

                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });
                    navigate(goTo)
                }
            })
            .catch(error=>{
                console.log(error.message)
                if(error.message === 'Firebase: Error (auth/invalid-credential).'){
                    setError("User Not Registered!")
                }
               
                
            })
    };
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Helmet>
                <title>Get Delivered || Login</title>
            </Helmet>
            <div className="card bg-base-100 border-2 max-w-sm border-green-500 w-full md:max-w-lg shrink-0 shadow-2xl p-6">
                <h2 className="text-3xl text-center my-5">Login Now To <span className='text-green-500'>Get</span>!</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-3">
                    <div className="form-control">

                        <input {...register("email")} type="email" placeholder="email" className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">

                        <input {...register("password")} type="password" placeholder="password" className="input w-full input-bordered" required />

                    </div>
                    <div className="form-control pt-4">
                        <button className="btn border-none w-full bg-black text-green-300">Login</button>
                    </div>
                </form>
                <p className='test-xl text-center my-5 text-red-600'>{error}</p>
                <p className='text-center text-xl'>New Here? <Link to={'/signup'}><span className='text-red-600'>Register</span></Link> First</p>
                <div className="divider">Or</div>
                <GoogleLogin></GoogleLogin>
            </div>

        </div>
    );
};

export default Login;