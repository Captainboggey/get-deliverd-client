import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {
    const {user,loading}=useAuth()
    const axiosSecure =useAxiosSecure()
  const {data: isAdmin, isPending: isAdminLoading}=useQuery({
    queryKey:[user?.email,'isAdmin'],
    enabled: !loading,
    queryFn:async()=>{
        const result =await axiosSecure.get(`/users/admin/${user?.email}`) 
        return result.data?.admin
    }
  })
  return [isAdmin,isAdminLoading]
};

export default useAdmin;