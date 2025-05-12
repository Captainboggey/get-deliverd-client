import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation()
    if (loading) {
        return <div className='flex justify-center items-center'>
            <progress className="progress w-56"></progress>
        </div>
    }
    if(user){
        return children
    }
    return <Navigate state={{from: location}} to={'/login'} replace></Navigate>
};

export default PrivateRoute;