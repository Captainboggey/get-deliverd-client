import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import useAuth from '../../../../Hooks/useAuth';

const MyParcels = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const result = await axiosPublic.get(`/parcels/${user?.email}`)
            return result.data
        }
    })
    return (
        <div>
            <Helmet>
                <title>Get Delivered || My Parcels</title>
            </Helmet>
            <h2 className='text-center text-3xl font-bold underline mt-5 mb-10'>My Parcels</h2>
            <div className='grid md:grid-col-3 '>
                {
                    parcels.map(parcel => <div className='mx-auto' key={parcel._id}>
                        <div key={parcel._id} className="card bg-base-100 w-96 shadow-xl">
                        
                        <div className="card-body">
                            <div className='flex justify-between'>
                                <h2 className="card-title">Parcel Type {parcel.parcelType}</h2>
                                <h2 className="card-title"><button className='btn btn-sm btn-primary'>Update</button><button className='btn btn-sm btn-secondary'>Cancel</button></h2>
                            </div>
                            <p>Requested Delivery Date {parcel.deliveryDate}</p>
                            <p>Booking Date {parcel.bookingDate}</p>
                            <p>Delivery Men ID </p>
                            <p>Booking Status <span><button  className='btn btn-sm bg-yellow-700 text-white'>{parcel.status}</button></span> <span><button   className='btn btn-sm bg-yellow-500 text-white'>Review</button></span> </p>
                            <div className="card-actions justify-start">
                                <button className="btn btn-primary bg-green-600 text-white border-none">Pay</button>
                            </div>
                        </div>
                    </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyParcels;