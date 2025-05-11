import React from 'react';
import Banner from '../Banner/Banner';
import { Helmet } from 'react-helmet-async';
import Features from '../Features/Features';

const Home = () => {
    return (
        <div >
            <Helmet>
                <title>Get Delivered || Home</title>
            </Helmet>
            <Banner></Banner>
            <Features></Features>
        </div>
    );
};

export default Home;