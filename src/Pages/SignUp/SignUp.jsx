import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import GoogleLogin from '../../Components/googleLogin';
import { Link, useNavigate } from 'react-router-dom';

import useAxiosPublic from '../../Hooks/useAxiosPublic';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const imageBBApi = import.meta.env.VITE_image_api
const apiUpload = `https://api.imgbb.com/1/upload?key=${imageBBApi}`

const SignUp = () => {
    const { update, signUp } = useAuth()
    const [error, setError] = useState(' ')
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        // console.log(imageFile)
        const imageUpload = await axiosPublic.post(apiUpload, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (imageUpload.data.success) {
            // console.log(imageUpload.data.data.display_url)

            signUp(data.email, data.password)
                .then(res => {
                    if (res.user) {
                        const userInfo = {
                            name: data.first,
                            image: imageUpload.data.data.display_url,
                            role: data.userType,
                            email: data.email

                        }
                        update(data.first, imageUpload.data.data.display_url)
                            .then(res => {
                                axiosPublic.post('/users', userInfo)
                                    .then(res => {
                                        if (res.data.insertedId) {
                                            
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
                                            navigate('/')
                                        }
                                    })
                            })
                        // console.log(res.user)


                    }
                })
                .catch(error => {
                    console.log(error.message)
                    if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                        console.log('error')
                        setError("Already Have Account!")
                    }
                })



        }
    }
    return (
        <div className='flex justify-center items-center min-h-screen '>
            <Helmet>
                <title>Get Delivered || SignUp</title>
            </Helmet>
            <div className="card bg-base-100 border-2 max-w-sm my-20 border-green-500 w-full md:max-w-lg shrink-0 shadow-2xl p-6">
                <h2 className="text-3xl text-center my-5">Registered Now To <span className='text-green-500'>Grab</span>!</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body space-y-3">
                    <div className="form-control">

                        <input {...register("first")} type="text" placeholder="First Name" className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">

                        <input {...register("last")} type="text" placeholder="Last Name" className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        <legend className="fieldset-legend">Profile Picture</legend>
                        <input required {...register('image')} type="file" className="file-input w-full" />
                    </div>
                    <div className="form-control">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Apply For</legend>
                            <select required {...register('userType')} defaultValue="Pick a browser" className="select w-full">
                                <option disabled={true}>Applicant Type</option>
                                <option>User</option>
                                <option>Delivery</option>

                            </select>

                        </fieldset>
                    </div>
                    <div className="form-control">

                        <input {...register("email")} type="email" placeholder="email" className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">

                        <input {...register("password", { maxLength: 20, minLength: 6, pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ })} type="password" placeholder="password" className="input w-full input-bordered" required />
                        {errors.password?.type === "minLength" && (<p className='text-red-600 my-2'>Minimum 6 Character is Required</p>)}
                        {errors.password?.type === "maxLength" && (<p className='text-red-600 my-2'>Maximum 20 Letters</p>)}
                        {errors.password?.type === "pattern" && (<p className='text-red-600 my-2'>Password must have 1 uppercase , 1 lowercase , 1 special character</p>)}

                    </div>
                    <div className="form-control pt-4">
                        <button className="btn border-none w-full bg-black text-green-300">Register</button>
                    </div>
                </form>
                <p className='test-xl text-center my-5 text-red-600'>{error}</p>
                <p className='text-center text-xl'>Already have an account? <Link to={'/login'}><span className='text-red-600'>Login</span></Link> Then</p>
                <div className="divider">Or</div>
                <GoogleLogin></GoogleLogin>
            </div>

        </div>
    );
};

export default SignUp;