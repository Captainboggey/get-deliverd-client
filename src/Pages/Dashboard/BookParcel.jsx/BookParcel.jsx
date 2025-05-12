import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
const BookParcel = () => {
    const [calculatePrice, setCalculatePrice] = useState(0)
    const { user } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()
    const handlePrice = (e) => {
        e.preventDefault();
        const form = e.target;
        const price = form.weight.value;
        const sum = price * 50;
        setCalculatePrice(sum)
        if (price === 0) {
            setCalculatePrice(0)
        }
    }
    const onSubmit = data => {

        const parcelInfo = {
            senderName: data.senderName,
            senderEmail: data.senderEmail,
            senderPhone: data.senderPhone,
            parcelType: data.parcelType,
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            deliveryDate: data.deliveryDate,
            deliveryLatitude: data.deliveryLatitude,
            deliveryLongitude: data.deliveryLongitude,
            price: calculatePrice,
            status: "pending",
            bookingDate: new Date()
        }
        //    console.log(parcelInfo)
        axiosPublic.post('/parcels', parcelInfo)
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
                        title: "Parcel Booked successfully"
                    });
                }
            })


    }
    return (
        <div>
            <Helmet>
                <title>Get Delivered || Book Parcel</title>
            </Helmet>
            <h2 className='text-center text-3xl font-bold underline mt-5 mb-10'>Book Parcel</h2>
            <div className=' flex justify-center items-center'>
                <div className="card bg-base-100 w-full  max-w-3xl shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control gap-4 grid md:grid-cols-2">
                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("senderName")} type="text" disabled defaultValue={user.displayName} className="input w-full input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("senderEmail")} type="email" disabled defaultValue={user.email} className="input  w-full input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Phone Number</span>
                                </label>
                                <input {...register("senderPhone")} type="text" placeholder='phone number' className="input w-full input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Parcel Type</span>
                                </label>
                                <input {...register("parcelType")} type="text" placeholder='Parcel Type' className="input w-full input-bordered" required />
                            </div>

                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Receiver's Name</span>
                                </label>
                                <input {...register("receiverName")} type="text" placeholder='receiver name' className="input w-full input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Receiver's Phone Number</span>
                                </label>
                                <input {...register("receiverPhone")} type="text" placeholder='receiver phone number' className="input w-full input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Requested Delivery Date</span>
                                </label>
                                <input {...register("deliveryDate")} type="date" className="input w-full input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Delivery Address Latitude</span>
                                </label>
                                <input {...register("deliveryLatitude")} type="text" placeholder='Latitude' className="input w-full input-bordered" required />
                            </div>
                            <div className="form-control ">
                                <label className="label w-full">
                                    <span className="label-text">Delivery Address Longitude</span>
                                </label>
                                <input type="text" {...register("deliveryLongitude")} placeholder='Longitude' className="input w-full input-bordered" required />
                            </div>

                        </div>

                        <div className="form-control mt-6">
                            <input disabled={calculatePrice <= 0} type="submit" className='btn btn-secondary' value="Submit" />

                            {
                                calculatePrice <= 0 ? <p className='mt-2'>Calculate Price First<span className='text-red-600'>*</span></p> : ''
                            }
                        </div>
                    </form>
                    <div className='p-4 space-y-2'>
                        <form onSubmit={handlePrice}>
                            <label className="label w-full">
                                <span className="label-text">Parcel Weight</span>
                            </label>
                            <input type="number" min={0} name='weight' placeholder='KG' className="input  input-bordered" required />
                            <p className="text-2xl">Price: {calculatePrice} Taka</p>
                            <button className="btn btn-sm btn-primary">Calculate</button>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default BookParcel;