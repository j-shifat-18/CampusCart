import React, { useState } from "react";
import { FaClock, FaHeart, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdAttachEmail, MdEmail } from "react-icons/md";
import { useLoaderData } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import ProductChat from "../Chat/ProductChat";
import { FaComments } from "react-icons/fa";

const CardDetails = () => {
  const productData = useLoaderData();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const {
    thumbnail,
    userName,
    userEmail,
    price,
    description,
    category,
    title,
    // createdAt,
    // bids,
    _id,
    userId, // seller's ID
  } = productData;

  // const localTime = new Date(createdAt).toLocaleString("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // });

  // const [bidCount, setBidcount] = useState(bids);

  // Get current user ID from localStorage or your auth context
  const currentUserId = localStorage.getItem('userId'); // Adjust based on your auth implementation

  const handleCountBid = (id) => {
    // let convertedBidCount = parseInt(bidCount);
    // convertedBidCount++;

    // const updatedBids = { bids: convertedBidCount };

    fetch(
      `https://freelancing-marketplace-server.vercel.app/updateTask/${id}`
      //    {
      //   method: "PATCH",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(updatedBids),
      // }
    )
      .then((res) => res.json())
      .then((data) => {
        // toast.info(`🦄 You Bid for ${convertedBidCount} opportunities! `, {
        //   position: "top-center",
        //   autoClose: 2000,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        // setBidcount(convertedBidCount);
        console.log(data);
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
              {/* <span>{localTime}</span> */}
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
        {/* <span className="bg-primary text-white text-sm px-3 py-2 rounded-full">
          Deadline: {formattedDeadline}
        </span> */}
      </div>

      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt="Thumbnail"
        className="w-full h-56 object-cover rounded-lg"
      />

      {/* Footer */}
      <div className="flex justify-between items-center border-t border-primary pt-3">
        <div className="flex items-center gap-2">
          <MdEmail size={20} />
          <span>{userEmail}</span>
        </div>
        <p className="text-lg font-semibold text-gray-800">
          ${price} <span className="text-gray-500">Hourly rate</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => handleCountBid(_id)}
          className="flex-1 btn btn-outline btn-primary font-medium text-xl"
        >
          Buy Now
        </button>
        <button
          onClick={() => setIsChatOpen(true)}
          className="btn btn-primary font-medium text-xl flex items-center gap-2"
        >
          <FaComments /> Chat with Seller
        </button>
      </div>

      {/* Chat Component */}
      <ProductChat
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        productId={_id}
        sellerId={userId}
        buyerId={currentUserId}
        currentUserId={currentUserId}
      />

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default CardDetails;
