import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useForm } from "react-hook-form";
import Popup from 'reactjs-popup';
import Swal from 'sweetalert2';

const AllParcels = () => {
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { data: parcels = [],refetch } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const result = await axiosSecure.get('/parcels')
            return result.data
        }
    })
    const { data: deliveryMan = [] } = useQuery({
        queryKey: ['deliveryMan'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/all/deliveryMan')
            return res.data
        }
    })
    const onSubmit = (data) => {
        const deliveryInfo = {
            senderName: data.senderName,
            receiverName: data.receiverName,
            senderPhone: data.senderPhone,
            approxDate: data.approxDate,
            receiverPhone: data.receiverPhone,
            deliveryMan: data.deliveryMan,
            parcelId: data.parcelId
        }
        axiosSecure.post('/delivery', deliveryInfo)
            .then(res => {
                if (res.data.insertedId) {
                    const parcelInfo = {
                        status: 'On The Way',
                        deliveryManEmail: data.deliveryMan
                    }
                    axiosSecure.put(`/parcels/delivery/${data.parcelId}`, parcelInfo)
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                refetch()
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
                            }
                        })

                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>Get Delivered || All Parcels</title>
            </Helmet>
            <h2 className='text-center text-3xl font-bold underline mt-5 mb-10'>All Parcels </h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>

                                <th>User Name</th>
                                <th>Booking Date</th>
                                <th>Delivery Date</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {
                                parcels.map(parcel => <tr key={parcel._id}>

                                    <td>{parcel.senderName}</td>
                                    <td>{parcel.bookingDate}</td>
                                    <td>{parcel.deliveryDate}</td>
                                    <td>{parcel.price}</td>
                                    <td>{parcel.status}</td>
                                    <td><Popup
                                        trigger={parcel.status === 'On The Way'?<p disabled className='btn '>Managed</p>:<button className="btn"> Manage </button>} modal>
                                        <div className="card bg-base-100 md::w-full  md:max-w-3xl mx-auto shrink-0 shadow-2xl">
                                            <p className='text-xl text-center font-bold my-5'>Assign Delivery Man</p>
                                            <form onSubmit={handleSubmit(onSubmit)} className="card-body grid grid-cols-1 md:grid-cols-2 gap-2 justify-center mx-auto">
                                                <div className="form-control mr-2 md:mx-0">
                                                    <label className="label w-full">
                                                        <span className="label-text">Booked User</span>
                                                    </label>
                                                    <input {...register('senderName')} type="text" disabled defaultValue={parcel.senderName} className="input  input-bordered" required />
                                                </div>
                                                <div className="form-control mr-2 md:mx-0">
                                                    <label className="label w-full">
                                                        <span className="label-text">Receiver Name</span>
                                                    </label>
                                                    <input {...register('receiverName')} type="text" disabled defaultValue={parcel.receiverName} className="input  input-bordered" required />

                                                </div>
                                                <div className="form-control mr-2 md:mx-0">
                                                    <label className="label w-full">
                                                        <span className="label-text">Booked User’s Phone</span>
                                                    </label>
                                                    <input type="text" {...register('senderPhone')} disabled defaultValue={parcel.senderPhone} className="input input-bordered" required />

                                                </div>
                                                <div className="form-control mr-2 md:mx-0">
                                                    <label className="label w-full">
                                                        <span className="label-text">Approximate Delivery Date</span>
                                                    </label>
                                                    <input {...register('approxDate')} type="date" placeholder="Approximate Delivery Date" className="input input-bordered" required />

                                                </div>
                                                <div className="form-control mr-2 md:mx-0">
                                                    <label className="label w-full">
                                                        <span className="label-text">Receivers phone number</span>
                                                    </label>
                                                    <input type="text" {...register('receiverPhone')} disabled defaultValue={parcel.receiverPhone} className="input input-bordered" required />

                                                </div>
                                                <select {...register('deliveryMan')} className="select select-bordered w-full max-w-xs">
                                                    <option disabled selected>Delivery Man</option>
                                                    {
                                                        deliveryMan.map(man => <option key={man._id}>{man.email}</option>)
                                                    }


                                                </select>

                                                <div className="form-control mr-2 md:mx-0">
                                                    <label className="label w-full">
                                                        <span className="label-text">Parcel Id</span>
                                                    </label>
                                                    <input {...register('parcelId')} disabled defaultValue={parcel._id} type="text" className="input input-bordered" required />

                                                </div>

                                                <div className="form-control col-span-2 mt-6 mr-2 md:mx-0">
                                                   
                                                        <button  className="btn border-none btn-primary bg-green-700 w-full text-white">Assign</button>
                                                  
                                                    
                                                </div>
                                            </form>
                                        </div>
                                    </Popup>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllParcels;