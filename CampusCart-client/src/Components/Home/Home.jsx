import React from 'react';
import FeaturedTasks from '../FeaturedTasks/FeaturedTasks';
import { useLoaderData } from 'react-router';
import Banner from '../Banner/Banner';
import FreelancerAnimation from '../Animation/FreelancerAnimation';
import Reviews from '../Reviews/Reviews';
import Chatbot from '../Chatbot/Chatbot';

const Home = () => {
    const featuredProducts = useLoaderData();
    return (
        <div className='relative'>
            <Banner></Banner>
            <FreelancerAnimation ></FreelancerAnimation>
            <FeaturedTasks featuredProducts={featuredProducts}></FeaturedTasks>
            <Reviews></Reviews>
            <Chatbot></Chatbot>
        </div>
    );
};

export default Home;