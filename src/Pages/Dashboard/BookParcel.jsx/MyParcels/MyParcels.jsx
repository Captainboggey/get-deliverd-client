import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAuth from '../../../../Hooks/useAuth';
import { useForm } from "react-hook-form";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const MyParcels = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic =useAxiosPublic()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { data: parcels = [],refetch } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/parcels/${user?.email}`)
            return result.data
        }
    })
    const onSubmit = (data) => {
        const updateInfo = {
            senderPhone: data.senderPhone,
            parcelType: data.parcelType,
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            deliveryDate: data.deliveryDate,
            deliveryLatitude: data.deliveryLatitude,
            deliveryLongitude: data.deliveryLongitude
        }

        axiosPublic.patch(`/parcels/${data.id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount > 0) {
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
                        title: "Updated successfully"
                    });
                }
            })
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/parcels/${id}`)
                .then(res=>{
                    if(res.data.deletedCount>0){
                        refetch()
                         Swal.fire({
                    title: "Canceled!",
                    text: "Your Parcel Has Been Canceled",
                    icon: "success"
                });
                    }
                })
               
            }
        });
        

    }

    return (
        <div>
            <Helmet>
                <title>Get Delivered || My Parcels</title>
            </Helmet>
            <h2 className='text-center text-3xl font-bold underline mt-5 mb-10'>My Parcels</h2>
            <div className='grid md:grid-cols-4 '>
                {
                    parcels.map(parcel =>
                        <div key={parcel._id} className="card bg-base-100 w-96 shadow-xl">

                            <div className="card-body">
                                <div className='flex justify-between'>
                                    <h2 className="card-title">Parcel Type {parcel.parcelType}</h2>
                                    <h2 className="card-title"> <Popup trigger={<button disabled={parcel.status!=='pending'} className="btn btn-sm btn-secondary"> Update </button>} modal >

                                        <span>

                                            <div className="card bg-base-100 md::w-full  md:max-w-3xl mx-auto shrink-0 shadow-2xl">
                                                <p className='text-xl text-center font-bold my-5'>Update Your Parcel</p>
                                                <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-1 md:grid-cols-2 gap-2 justify-center mx-auto">
                                                    <div className="form-control mr-2 md:mx-0">
                                                        <label className="label w-full">
                                                            <span className="label-text">Phone Number</span>
                                                        </label>
                                                        <input {...register("senderPhone")} type="text" placeholder="Phone" name='senderPhone' className="input  input-bordered" required />
                                                    </div>
                                                    <div className="form-control mr-2 md:mx-0">
                                                        <label className="label w-full">
                                                            <span className="label-text">Parcel Type</span>
                                                        </label>
                                                        <input {...register("parcelType")} name='parcelType' type="text" placeholder="parcel type" className="input input-bordered" required />

                                                    </div>
                                                    <div className="form-control mr-2 md:mx-0">
                                                        <label className="label w-full">
                                                            <span className="label-text">Receiver's Name</span>
                                                        </label>
                                                        <input {...register("receiverName")} type="text" placeholder="receiver name" className="input input-bordered" required />

                                                    </div>
                                                    <div className="form-control mr-2 md:mx-0">
                                                        <label className="label w-full">
                                                            <span className="label-text">Receiver's Phone Number</span>
                                                        </label>
                                                        <input {...register("receiverPhone")} type="text" placeholder="receiver phone number" className="input input-bordered" required />

                                                    </div>
                                                    <div className="form-control mr-2 md:mx-0">
                                                        <label className="label w-full">
                                                            <span className="label-text">Requested Delivery Date</span>
                                                        </label>
                                                        <input {...register("deliveryDate")} type="date" placeholder="Requested Delivery Dater" className="input input-bordered" required />

                                                    </div>
                                                    <div className="form-control mr-2 md:mx-0">
                                                        <label className="label w-full">
                                                            <span className="label-text">Delivery Address Latitude</span>
                                                        </label>
                                                        <input {...register("deliveryLatitude")} type="text" placeholder="Latitude" className="input input-bordered" required />

                                                    </div>
                                                    <div className="form-control mr-2 md:mx-0">
                                                        <label className="label w-full">
                                                            <span className="label-text">Delivery Address Longitude</span>
                                                        </label>
                                                        <input {...register("deliveryLongitude")} type="text" placeholder="Longitude" className="input input-bordered" required />

                                                    </div>
                                                    <div className="form-control mr-2 md:mx-0">
                                                        <label className="label w-full">
                                                            <span className="label-text">Parcel Id</span>
                                                        </label>
                                                        <input {...register("id")} disabled type="text" value={parcel._id} className="input input-bordered" required />

                                                    </div>

                                                    <div className="form-control col-span-2 mt-6 mr-2 md:mx-0">
                                                        <button className="btn border-none btn-primary bg-green-700 w-full text-white">Update</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </span>  </Popup><button disabled={parcel.status !=='pending'} onClick={()=>handleDelete(parcel._id)} className='btn btn-sm btn-secondary'>Cancel</button></h2>
                                </div>
                                <p>Requested Delivery Date {parcel.deliveryDate}</p>
                                <p>Booking Date {parcel.bookingDate}</p>
                                <p>Delivery Men Contact : {parcel.deliveryManEmail?parcel.deliveryManEmail:'Not Assigned Yet'} </p>
                                <p>Booking Status <span><button className='btn btn-sm bg-yellow-700 text-white'>{parcel.status}</button></span> <span><button className='btn btn-sm bg-yellow-500 text-white'>Review</button></span> </p>
                                <div className="card-actions justify-start">
                                    <button className="btn btn-primary bg-green-600 text-white border-none">Pay</button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyParcels;