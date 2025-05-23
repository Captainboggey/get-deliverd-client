import React from 'react';
import Navbar from '../Pages/Home/Home/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useDelivery from '../Hooks/useDelivery';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [deliveryAdmin]=useDelivery()
    const navDash = 
    
   isAdmin && <>
        <Link to={'/'}><li ><h2 className='text-center '>Home</h2></li></Link>
        <Link to={'/dashboard/allParcels'}><li ><h2 className='text-center '>All Parcels</h2></li></Link>
        <Link to={'/dashboard/allDeliveryMan'}><li ><h2 className='text-center '>All Delivery Man</h2></li></Link>
        <Link to={'/dashboard/allUsers'}><li ><h2 className='text-center '>All Users</h2></li></Link>
    </> ||
   deliveryAdmin &&
    <>
        <Link to={'/'}><li ><h2 className='text-center '>Home</h2></li></Link>
        <Link to={'/dashboard/myDelivery'}><li ><h2 className='text-center '>My Delivery List</h2></li></Link>
        <Link to={'/'}><li ><h2 className='text-center '>My Reviews</h2></li></Link>
        
    </>
   || !isAdmin && !deliveryAdmin &&
    <>
        <Link to={'/'}><li ><h2 className='text-center '>Home</h2></li></Link>
        <Link to={'/dashboard/bookParcel'}><li ><h2 className='text-center '>Book a Parcel</h2></li></Link>
        <Link to={'/dashboard/myParcels'}><li ><h2 className='text-center '>My Parcels</h2></li></Link>
        <Link to={'/dashboard/myProfile'}><li ><h2 className='text-center '>My Profile</h2></li></Link>
    </>
//   ||  isAdmin && deliveryAdmin &&
//     <>
//         <Link to={'/'}><li ><h2 className='text-center '>Home</h2></li></Link>
//         <Link to={'/dashboard/allParcels'}><li ><h2 className='text-center '>All Parcels</h2></li></Link>
//         <Link to={'/dashboard/myParcels'}><li ><h2 className='text-center '>All Delivery Man</h2></li></Link>
//         <Link to={'/dashboard/allUsers'}><li ><h2 className='text-center '>All Users</h2></li></Link>
//     </>

    return (
        <div className='md:flex'>
            <div className=" md:w-64 bg-base-100 md:min-h-screen bg-green-400 md:text-center shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            {navDash}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Dashboard</a>
                </div>
                <div className="hidden   md:flex">
                    <ul className="menu menu-lg w-full  px-1">
                        {navDash}
                    </ul>
                </div>

            </div>
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;