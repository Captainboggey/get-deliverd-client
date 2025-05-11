import React from 'react';
import logo from "../assets/ChatGPT Image May 11, 2025, 10_03_16 PM.png"

const Logo = () => {
    return (
        <div>
           <h2 className='logo-font btn btn-ghost text-xl p-2 flex items-center text-green-600'><img src={logo} className='w-10' alt="" />Get Delivered</h2> 
        </div>
    );
};

export default Logo;