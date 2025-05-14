import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import CheckOutForm from './CheckOutForm';

const Payment = () => {
    const data=useLoaderData()
   const stripePromise =loadStripe(import.meta.env.VITE_PK)
//    console.log(stripePromise)
    return (
        <Elements stripe={stripePromise}>
            <CheckOutForm data={data}></CheckOutForm>
        </Elements>
    );
};

export default Payment;