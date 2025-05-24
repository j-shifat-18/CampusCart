import React from "react";

const User = () => {
  return (
    <tr key={_id}>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={photo} alt={name} />
            </div>
          </div>
          <div>
            <div className="font-medium text-black">{name}</div>
            <div className="text-sm opacity-50">{university}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="badge badge-secondary text-black">{email}</span>
      </td>
      <td>
        <span
          className={`badge ${
            isAdmin ? "badge-primary" : "badge-neutral"
          } text-white`}
        >
          {isAdmin ? "Admin" : "User"}
        </span>
      </td>
      <th>
        <div className="flex items-center gap-3">
          <Link
            to={`/updateUser/${_id}`}
            className="btn btn-outline btn-sm btn-primary"
          >
            <FaRegEdit size={18} />
          </Link>
          <button
            onClick={() => handleDelete(_id)}
            className="btn btn-outline btn-sm btn-error"
          >
            <MdDelete size={18} />
          </button>
        </div>
      </th>
    </tr>
  );
};

export default User;
