import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllDeliveryMan = () => {
    const axiosSecure = useAxiosSecure()
    const { data: deliveries =[]  } = useQuery({
        queryKey: ['deliveries'],
        queryFn: async () => {
            const result = await axiosSecure.get('/users/all/deliveryMan')
            return result.data
        }
    })
    // console.log(deliveries.length)
    return (
        <div>
            <Helmet>
                <title>Get Delivered || All Delivery Man</title>
            </Helmet>
            <h2 className='text-center text-3xl font-bold underline mt-5 mb-10'>All Delivery Man </h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>email</th>
                                <th>Parcel Delivered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            
                          {
                            deliveries.map(delivery=><tr key={delivery._id}>
                                <th></th>
                                <td>{delivery.name}</td>
                                <td>{delivery.email}</td>
                                <td>Blue</td>
                            </tr>)
                          }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllDeliveryMan;