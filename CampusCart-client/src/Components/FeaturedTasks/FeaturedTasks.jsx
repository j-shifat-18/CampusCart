import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import { BsFillHeartbreakFill } from "react-icons/bs";

const FeaturedTasks = ({ featuredTasks }) => {
  return (
    <div className="my-24">
      <div className="text-center max-w-3/5 mx-auto space-y-4 mb-10">
        <h2 className="font-extrabold text-4xl ">Featured <span className="text-primary">Tasks</span></h2>
        <p className="text-slate-700">
          Explore high-quality, handpicked tasks from trusted clients. These
          top-rated opportunities are selected based on budget, clarity, and
          relevance — perfect for freelancers ready to make an impact.
        </p>
      </div>
      {/* cards */}
      <div>
        {featuredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-24 gap-12 justify-items-center">
            {featuredTasks.map((task) => (
              <TaskCard key={task._id} task={task}></TaskCard>
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
