import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyDelivery = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: myDeliveries = [], refetch } = useQuery({
        queryKey: ['myDeliveries', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/delivery/collection/${user.email}`)
            return result.data
        }
    })
    const handleDelivered = (parcelId, deliveryId) => {
        axiosSecure.put(`/parcels/delivery/delivered/${parcelId}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    axiosSecure.patch(`/delivery/collection/delivered/${deliveryId}`)
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
                                    title: "Delivered"
                                });
                            }
                        })
                }
            })
    }
    return (
        <div>
            <Helmet>
                <title>Get Delivered || My Delivery List</title>
            </Helmet>
            <h2 className='text-center text-3xl font-bold underline mt-5 mb-10'>My Deliveries
            </h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Booked User's Name</th>
                                <th>Receiver's Name</th>
                                <th>Booked User's Phone</th>
                                <th>Approximate Delivery Date</th>
                                <th>Receiver's Phone Number</th>
                                <th>Action</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {
                                myDeliveries.map((delivery, i) => <tr key={delivery._id}>
                                    <th>{i + 1}</th>
                                    <td>{delivery.senderName}</td>
                                    <td>{delivery.receiverName}</td>
                                    <td>{delivery.senderPhone}</td>
                                    <td>{delivery.approxDate}</td>
                                    <td>{delivery.receiverPhone}</td>
                                    <td><button className='btn'>Cancel</button></td>
                                    <td>{delivery.deliveredStatus === 'true' ? 'Already Delivered' : <button onClick={() => handleDelivered(delivery.parcelId, delivery._id)} className='btn'>Delivered</button>}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyDelivery;