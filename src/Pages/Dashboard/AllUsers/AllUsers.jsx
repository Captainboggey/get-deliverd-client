import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const result = await axiosSecure.get('/users')
            return result.data
        }
    })
    const handleDelivery = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Delivery Man!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Updated!",
                                text: "Delivery Man Assigned",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    const handleAdmin =(id)=>{
             Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/makeAdmin/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Updated!",
                                text: "Admin Assigned",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <Helmet>
                <title>Get Delivered || All Users</title>
            </Helmet>
            <h2 className='text-center text-3xl font-bold underline mt-5 mb-10'>All Users</h2>
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}

                            {
                                allUsers.map((users, i) => <tr key={users._id}>
                                    <th>{i + 1}</th>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.role === 'User' ? <button onClick={()=>handleDelivery(users._id)} className='btn '>Make Delivery Man</button> : 'Delivery Man'}</td>
                                    <td>{users.role === 'Admin'?'Admin':<button onClick={()=>handleAdmin(users._id)} className='btn'>Make Admin</button>}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;