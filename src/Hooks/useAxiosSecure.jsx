import axios from 'axios';
import { config } from 'localforage';
import React from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const {logOut}=useAuth();
    const navigate =useNavigate();

    axiosSecure.interceptors.request.use(function(config){
        // console.log('hit by iterceptor')
        const token =localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        // console.log(config.headers.authorization)
        return config

    },function(error){
        return Promise.reject(error)
    })

    axiosSecure.interceptors.response.use(function(response){
        return response
    },function(error){
        if(error.response.status === 401 ||error.response.status === 403){
            logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;