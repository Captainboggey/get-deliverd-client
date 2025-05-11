import React from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from '../../Components/googleLogin';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Helmet>
                <title>Get Delivered || Login</title>
            </Helmet>
            <div className="card bg-base-100 border-2 max-w-sm border-green-500 w-full md:max-w-lg shrink-0 shadow-2xl p-6">
                <h2 className="text-3xl text-center my-5">Login Now To <span className='text-green-500'>Grab</span>!</h2>
                <form className="card-body space-y-3">
                    <div className="form-control">
                        
                        <input type="email" placeholder="email" className="input w-full input-bordered" required />
                    </div>
                    <div className="form-control">
                        
                        <input type="password" placeholder="password" className="input w-full input-bordered" required />
                        
                    </div>
                    <div className="form-control pt-4">
                        <button className="btn border-none w-full bg-black text-green-300">Login</button>
                    </div>
                </form>
                <p className='text-center text-xl'>New Here? <Link to={'/register'}><span className='text-red-600'>Login</span></Link> First</p>
                  <div className="divider">Or</div>
                  <GoogleLogin></GoogleLogin>
            </div>

        </div>
    );
};

export default Login;