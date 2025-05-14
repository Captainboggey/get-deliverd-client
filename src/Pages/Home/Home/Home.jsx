import React from 'react';
import Banner from '../Banner/Banner';
import { Helmet } from 'react-helmet-async';
import Features from '../Features/Features';
import Stats from '../Stats/Stats';
import TopDelivery from '../TopDelivery/TopDelivery';

const Home = () => {
    return (
        <div >
            <Helmet>
                <title>Get Delivered || Home</title>
            </Helmet>
            <Banner></Banner>
            <Features></Features>
            <Stats></Stats>
            <TopDelivery></TopDelivery>
        </div>
    );
};

export default Home;