import React, { useState } from "react";
import { useLoaderData } from "react-router";
import MyTaskCard from "../MyTasks/MyTaskCard";

const AdminPanel = () => {
  // Load all tasks (or products) for admin review
  const tasks = useLoaderData();
  const [pendingTasks, setPendingTasks] = useState(tasks);
  const [acceptedTasks, setAcceptedTasks] = useState([]);

  // Accept a task: move to acceptedTasks
  const handleAccept = (taskId) => {
    const acceptedTask = pendingTasks.find((task) => task._id === taskId);
    setAcceptedTasks([...acceptedTasks, acceptedTask]);
    setPendingTasks(pendingTasks.filter((task) => task._id !== taskId));
  };

  // Reject a task: remove from pendingTasks
  const handleReject = (taskId) => {
    setPendingTasks(pendingTasks.filter((task) => task._id !== taskId));
  };

  return (
    <div className="admin-panel max-w-5xl mx-auto my-12">
      <div className="Header text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-gray-600">
          Welcome to the admin panel. Here you can manage users, products, and orders.
        </p>
      </div>
      <div className="Content">
        <h2 className="text-xl font-semibold mb-4">Pending Tasks</h2>
        {pendingTasks.length === 0 ? (
          <div className="text-center text-gray-500 my-12">No pending tasks.</div>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Category</th>
                <th>Title</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map((task) => (
                <tr key={task._id}>
                  <MyTaskCard task={task} handleDelete={() => handleReject(task._id)} />
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleAccept(task._id)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleReject(task._id)}
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <h2 className="text-xl font-semibold mt-12 mb-4">Accepted Tasks</h2>
        {acceptedTasks.length === 0 ? (
          <div className="text-center text-gray-500 my-8">No accepted tasks yet.</div>
        ) : (
          <ul className="space-y-4">
            {acceptedTasks.map((task) => (
              <li key={task._id} className="bg-green-50 rounded-lg p-4 shadow">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{task.title}</span>
                  <span className="text-sm text-gray-500">{task.category}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;