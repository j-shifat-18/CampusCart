import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import { BsFillHeartbreakFill } from "react-icons/bs";

const FeaturedTasks = ({ featuredProducts }) => {
  return (
    <div className="my-24">
      <div className="text-center max-w-3/5 mx-auto space-y-4 mb-10">
        <h2 className="font-extrabold text-4xl ">Featured <span className="text-primary">Products</span></h2>
        <p className="text-slate-700">
          Discover top picks from our student community! Handpicked for quality, value, and popularity, these featured items showcase the best of what your fellow students are offering. From textbooks and gadgets to handmade crafts and dorm essentials — grab these deals before they’re gone!
        </p>
      </div>
      {/* cards */}
      <div>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-24 gap-12 justify-items-center">
            {featuredProducts.map((product) => (
              <TaskCard key={product._id} product={product}></TaskCard>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center my-24 bg-secondary rounded-xl max-w-lg mx-auto py-24 gap-10">
            <p className="font-extrabold text-3xl">No task available...</p>
            <BsFillHeartbreakFill size={60} className="text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedTasks;
