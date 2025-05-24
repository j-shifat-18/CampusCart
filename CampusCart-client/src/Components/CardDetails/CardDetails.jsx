import React, { useState } from "react";
import { FaClock, FaHeart, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdAttachEmail, MdEmail } from "react-icons/md";
import { useLoaderData } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const CardDetails = () => {
  const taskData = useLoaderData();
  const {
    thumbnail,
    userName,
    userEmail,
    budget,
    deadline,
    description,
    category,
    title,
    createdAt,
    bids,
    _id,
  } = taskData;

  const localTime = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedDeadline = new Date(deadline).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const [bidCount, setBidcount] = useState(bids);

  const handleCountBid = (id) => {
    let convertedBidCount = parseInt(bidCount);
    convertedBidCount++;

    const updatedBids = { bids: convertedBidCount };

    fetch(`https://freelancing-marketplace-server.vercel.app/updateTask/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedBids),
    })
      .then((res) => res.json())
      .then(() => {
        toast.info(`🦄 You Bid for ${convertedBidCount} opportunities! `, {
          position: "top-center",
          autoClose: 2000,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBidcount(convertedBidCount);
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md shadow-primary p-5 space-y-4 my-24">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <div className="flex items-center text-sm text-gray-500 space-x-4 mt-1">
            <div className="flex items-center gap-1">
              <FaClock />
              <span>{localTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaUser />
              <span>{userName}</span>
            </div>
          </div>
        </div>
        <FaHeart className="text-primary text-xl mt-1" />
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm">{description}...</p>

      {/* Tags */}
      <div className="mb-4 flex justify-between items-center">
        <span className="bg-secondary text-sm px-3 py-2 rounded-full">
          #{category}
        </span>
        <span className="bg-primary text-white text-sm px-3 py-2 rounded-full">
          Deadline: {formattedDeadline}
        </span>
      </div>

      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt="Thumbnail"
        className="w-full h-56 object-cover rounded-lg"
      />

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-primary pt-3">
        <p className="text-lg">
          Proposals: <span className="font-semibold">{bidCount}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800">
          ${budget} <span className="text-gray-500">Hourly rate</span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <MdEmail size={20} />
        <span>{userEmail}</span>
      </div>

      {/* Button */}
      <button
        onClick={() => handleCountBid(_id)}
        className="w-full btn btn-outline btn-primary font-medium text-xl"
      >
        Bid Now
      </button>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CardDetails;
