import React from "react";
import { useLoaderData } from "react-router";
import TaskCard from "../TaskCard/TaskCard";
import { BsFillHeartbreakFill } from "react-icons/bs";

const BrowseTasks = () => {
  const products = useLoaderData();

  return (
    <div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-24 gap-12 justify-items-center">
          {products.map((product) => (
            <TaskCard key={product._id} product={product}></TaskCard>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center my-24 bg-secondary rounded-xl max-w-lg mx-auto py-24 gap-10">
            <p className="font-extrabold text-3xl">No product available...</p>
            <BsFillHeartbreakFill size={60} className="text-primary" />
        </div>
      )}
    </div>
  );
};

export default BrowseTasks;
