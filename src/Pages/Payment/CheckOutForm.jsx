
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const CheckOutForm = ({ data }) => {
    const { price, _id } = data;
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transaction, setTransaction] = useState('')
    const axiosSecure = useAxiosSecure();
    const itemPrice = { parcelPrice: price }
    useEffect(() => {
        axiosSecure.post("/create-payment-intent", itemPrice)
            .then(res => {
                // console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, itemPrice])






    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log(error)
            setError('Error: ', error)
        } else {
            console.log('[PaymentMethod]', paymentMethod)
            setError('')
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || anonymous,
                    name: user?.displayName || anonymous
                }
            }
        })
        if (confirmError) {
            console.log('payment intent error ', confirmError)
        } else {
            console.log(paymentIntent.id)
            if (paymentIntent.status === 'succeeded') {
                setTransaction(paymentIntent.id)
                const paymentDetails = {
                    transactionId: paymentIntent.id,
                    name: user.displayName || anonymous,
                    email: user.email || anonymous
                }
                axiosSecure.post('/payments', paymentDetails)
                    .then(res => {
                        if (res.data.insertedId) {
                            axiosSecure.patch(`/parcels/payment/confirmPayment/${_id}`)
                                .then(res => {
                                    console.log(res.data)
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
                                        title: "Payment Succeed"
                                    });
                                })
                        }
                    })
            }
        }
    }
    return (
        <div className='mx-10'>
            <h2 className="text-center text-3xl my-10">Payment</h2>
            <p className='my-10 text-green-500'>Price: {price}</p>
            <form onSubmit={handleSubmit}>
                <CardElement

                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <p className='text-xl text-red-500'>{error}</p>
                <p className='text-xl text-green-500'>{transaction}</p>
                <button className=' btn mt-10' type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>

        </div>
    );
};

export default CheckOutForm;