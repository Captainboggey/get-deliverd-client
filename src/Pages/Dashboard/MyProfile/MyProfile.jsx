import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from "react-hook-form";
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
const imgKey = import.meta.env.VITE_image_api
const uploadUrl = `https://api.imgbb.com/1/upload?key=${imgKey}`

const MyProfile = () => {
    const { user, update } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { data: profileUser = [], refetch } = useQuery({
        queryKey: ['profileUser', user?.email],
        queryFn: async () => {
            const result = await axiosPublic.get(`/users/${user.email}`)
            return result.data
        }

    })
    // console.log(typeof(profileUser))
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const imgFile = { image: data.image[0] }
        // console.log(imgFile)
        const imgUpload = await axiosPublic.post(uploadUrl, imgFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        // console.log(imgUpload.data.data.display_url)
        // console.log()
        if (imgUpload.data.success) {


            const mongoInfo = {
                image: imgUpload.data.data.display_url
            }
            const mongo = await axiosPublic.patch(`/users/${user.email}`, mongoInfo)

            if (mongo.data.modifiedCount > 0) {
                refetch()
                update(user.displayName, imgUpload.data.data.display_url)
                    .then(res => {
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
                            title: "Updated successfully"
                        });
                    })
            }






        }

    }
    return (
        <div className='ml-4'>
            <h2 className='text-center text-3xl font-bold underline mt-5 mb-10'>My Profile</h2>




            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="text-2xl font-bold">Name: {profileUser.name}</h2>
                    <img src={profileUser.image} className='rounded-xl mb-10' alt="" />
                    <label className="form-control w-full max-w-xs ">
                        <div className="label w-full mt-10">
                            <span className="label-text">Update Profile Picture</span>

                        </div>
                        <input {...register('image')} type="file" className="file-input file-input-bordered w-full max-w-xs" />

                    </label>
                    <button className='btn btn-primary bg-green-600 text-white border-none'>Update</button>
                </form>
            </div>

        </div>
    );
};

export default MyProfile;