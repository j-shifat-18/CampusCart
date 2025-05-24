import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import Swal from "sweetalert2";

const MyTaskCard = ({ task ,handleDelete }) => {
  const { thumbnail, title, deadline, category, _id, bids } = task;
  const formattedDeadline = new Date(deadline).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });


  const showBids = () => {
    Swal.fire({
      title: `📨 Total ${bids} Bids Received`,
      text: `This task has received ${bids} bids from interested freelancers.`,
    });
  };
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={thumbnail} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-medium text-black badge badge-secondary">
              {category}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="badge text-black badge-secondary badge-lg">
          {title}
        </span>
      </td>
      <td>
        <span className="bg-primary text-white py-1 px-3 rounded-full">
          {formattedDeadline}
        </span>
      </td>
      <th>
        <div className="flex items-center h-full gap-3">
          <Link
            to={`/updateTask/${_id}`}
            className="btn btn-outline btn-sm btn-primary"
          >
            <FaRegEdit size={18} />
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-outline btn-sm btn-primary"
          >
            <MdDelete size={18} />
          </button>
          <button
            onClick={showBids}
            className="btn btn-outline btn-sm btn-primary text-base"
          >
            Bids
          </button>
        </div>
      </th>
    </tr>
  );
};

export default MyTaskCard;
