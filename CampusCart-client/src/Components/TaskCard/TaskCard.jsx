import React from "react";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link } from "react-router";

const TaskCard = ({ product }) => {
  const { thumbnail, title, category, userName, price , _id , photoURL} = product;
  return (
    <div className=" w-full rounded-lg overflow-hidden shadow-lg shadow-primary bg-white">
      {/* Image */}
      <img
        src={thumbnail} // Replace with your image
        alt="Service"
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Tag + Rating */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
            {category}
          </span>
          <span className="flex items-center gap-1 text-yellow-500 font-semibold">
            <FaStar />
            5.0 <span className="text-gray-400">(1)</span>
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold text-gray-900 leading-tight">
          {title}
        </h2>

        {/* Author + Price */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center gap-2">
            <img
              src={photoURL} // Replace with user's profile image
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
              {userName}
            </span>
          </div>
          <p className="text-sm font-semibold bg-secondary text-primary p-2 rounded-2xl">
             <span>$ {price}</span>
          </p>
        </div>
        <Link to={`/exploreProducts/${_id}`} className="btn btn-primary mt-4 btn-outline ">View Details</Link>
      </div>
    </div>
  );
};

export default TaskCard;
