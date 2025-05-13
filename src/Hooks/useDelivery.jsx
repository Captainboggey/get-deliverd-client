import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useDelivery = () => {
   const {user}=useAuth();
   const axiosSecure = useAxiosSecure();
   const {data: deliveryAdmin,isPending: isDeliveryAdminLoading}=useQuery({
    queryKey:['deliveryAdmin',user?.email],
    queryFn:async()=>{
        const result = await axiosSecure.get(`/users/delivery/${user.email}`)
        return result.data.deliveryMan
    }
   })
   return [deliveryAdmin,isDeliveryAdminLoading]
};

export default useDelivery;