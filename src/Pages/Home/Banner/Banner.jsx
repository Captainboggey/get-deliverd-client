import React from 'react';

const Banner = () => {
    return (
        <div
            className="hero h-[800px] banner-img"
        >
            <div className="hero-overlay "></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-3xl font-bold">Get Delivered — Where Speed Meets Reliability</h1>
                    <p className="mb-5">
                        Delivering parcels faster, safer, and smarter. Whether it's across town or across the country, Get Delivered ensures every package reaches its destination on time. Trusted by individuals and businesses alike, we bring efficiency right to your doorstep.
                    </p>
                    <h2><input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs text-black" /> <button   className="btn  bg-green-700 text-white border-none "> Search</button></h2>

                </div>
            </div>
        </div>
    );
};

export default Banner;