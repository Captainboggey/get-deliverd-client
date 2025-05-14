import React from 'react';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin()
    
    const location =useLocation()
    if (loading || isAdminLoading) {
        return <div className='flex justify-center items-center'>
            <progress className="progress w-56"></progress>
        </div>
    }
    if( user && isAdmin){
        return children
    }
    return <Navigate state={{from: location}} to={'/login'} replace></Navigate>
};

export default AdminRoute;