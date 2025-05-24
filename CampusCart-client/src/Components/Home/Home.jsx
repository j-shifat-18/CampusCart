import React from 'react';
import FeaturedTasks from '../FeaturedTasks/FeaturedTasks';
import { useLoaderData } from 'react-router';
import Banner from '../Banner/Banner';
import FreelancerAnimation from '../Animation/FreelancerAnimation';
import Reviews from '../Reviews/Reviews';

const Home = () => {
    const featuredTasks = useLoaderData();
    return (
        <div>
            <Banner></Banner>
            {/* <FreelancerAnimation ></FreelancerAnimation> */}
            {/* <FeaturedTasks featuredTasks={featuredTasks}></FeaturedTasks> */}
            {/* <Reviews></Reviews> */}
        </div>
    );
};

export default Home;