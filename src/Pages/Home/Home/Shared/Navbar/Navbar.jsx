import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../../../../Components/logo';
import { IoIosNotifications } from 'react-icons/io';
import useAuth from '../../../../../Hooks/useAuth';




const Navbar = () => {
    const { user } = useAuth()
    const {logOut}=useAuth()
    const navOptions =
        <>
            <Link to={'/'}><li><h2>Home</h2></li></Link>
            <li><h2 className='text-xl text-green-500'><IoIosNotifications /></h2></li>
            {
                user ? <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className=" rounded-xl mx-0 px-2 bg-whiteborder-none"> <h2 className="avatar">
                        <div className="mask mask-squircle h-8 w-8">
                            <img
                                src={user.photoURL}
                                alt="DP" />
                        </div>
                    </h2> </div>
                    <ul tabIndex={0} className="dropdown-content text-black menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li ><a>{user.displayName || 'anonymous'}</a></li>
                        <li><a>Dashboard</a></li>
                        <li><a onClick={()=>logOut()}>Logout</a></li>
                    </ul>
                </div> : <Link to={'/login'}><li><h2>Login</h2></li></Link>
            }

        </>
    return (
        <div className="navbar fixed bg-opacity-20 bg-gray-900">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost text-white lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                        {navOptions}
                    </ul>
                </div>

                <Logo></Logo>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-white">
                    {navOptions}

                </ul>
            </div>

        </div>
    );
};

export default Navbar;