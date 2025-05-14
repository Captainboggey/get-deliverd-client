import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const TopDelivery = () => {
    const axiosPublic = useAxiosPublic()
    const { data: tops = [] } = useQuery({
        queryKey: ['tops'],
        queryFn: async () => {
            const result = await axiosPublic.get('/users/all/deliveryMan/home')
            return result.data
        }
    })
    return (
        <div className='my-10'>
            <h2 className="text-center text-3xl font-bold my-10">Our Top Delivery Man</h2>
     <div className=' flex flex-col mt-5 md:flex-row'>
            {
                tops.map(top => <div key={top._id} className="card bg-base-100 mx-auto w-96 shadow-xl">
                    <figure>
                        <img
                            src={top.image}
                            className='h-52'
                             />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{top.name}</h2>
                        <p>Contact: {top.email}</p>
                        
                    </div>
                </div>)
            }

        </div>
        </div>
    );
};

export default TopDelivery;