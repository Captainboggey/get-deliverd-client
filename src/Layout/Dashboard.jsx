import React from 'react';
import Navbar from '../Pages/Home/Home/Shared/Navbar/Navbar';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const navDash = <>
        <Link to={'/'}><li ><h2 className='text-center '>Home</h2></li></Link>
        <Link to={'/dashboard/bookParcel'}><li ><h2 className='text-center '>Book a Parcel</h2></li></Link>
        <Link to={'/'}><li ><h2 className='text-center '>My Parcels</h2></li></Link>
        <Link to={'/'}><li ><h2 className='text-center '>My Profile</h2></li></Link>
    </>
    return (
        <div className='md:flex'>
            <div className=" md:w-64 bg-base-100 md:min-h-screen bg-green-400 md:text-center shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                <div className="hidden   lg:flex">
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