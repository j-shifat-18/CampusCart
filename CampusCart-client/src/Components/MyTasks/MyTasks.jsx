import React, { use, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Providers/AuthProvider";
import MyTaskCard from "./MyTaskCard";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const MyTasks = () => {
  const { user } = use(AuthContext);
  const data = useLoaderData();

  const myTasks = data.filter((task) => task.userEmail === user.email);
  const [myTotalTasks, setMyTotalTasks] = useState(myTasks);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A5ACD",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://freelancing-marketplace-server.vercel.app/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {

              const remainignTasks = myTotalTasks.filter(task => task._id != id);
              setMyTotalTasks(remainignTasks);

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto mt-10 mb-32">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myTotalTasks.map((task) => (
            <MyTaskCard key={task._id} handleDelete={handleDelete} task={task}></MyTaskCard>
          ))}
        </tbody>
      </table>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default MyTasks;
