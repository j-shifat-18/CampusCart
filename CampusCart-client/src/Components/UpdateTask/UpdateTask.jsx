import React, { use } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";

const UpdateTask = () => {
  const { user } = use(AuthContext);
  const task = useLoaderData();
  const { title, category, description, thumbnail, deadline, budget , _id} = task;

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const thumbnail=form.thumbnail.value;
    const oldDeadline = form.deadline.value;
    const deadline = new Date(oldDeadline).getTime();
    const budget = form.budget.value;


    const updateTask  = {
        title , category , description , thumbnail , deadline , budget
    }


    fetch(`https://freelancing-marketplace-server.vercel.app/updateTask/${_id}` , {
        method:"PATCH",
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(updateTask)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.modifiedCount){
            toast.success('Updated task successfully');
        }
        else{
            toast.error('No changes to update');
        }
    })
  };

  return (
    <div className="min-h-screen p-6 bg-base-200 flex items-center justify-center pb-28">
      <Helmet>
        <title>Add Task | Worklify</title>
      </Helmet>

      <div className="w-full max-w-2xl p-8 bg-white rounded shadow-lg shadow-primary">
        <h2 className="text-2xl font-bold text-center mb-6">Update Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Task Title</label>
            <input
              name="title"
              defaultValue={title}
              required
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g., Build a portfolio website"
            />
          </div>

          <div>
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              defaultValue={category}
              required
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Select a category
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              defaultValue={description}
              required
              rows="4"
              className="textarea textarea-bordered w-full"
              placeholder="Describe what needs to be done"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold">Thumbnail URL</label>
            <input
              name="thumbnail"
              defaultValue={thumbnail}
              required
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g., https://0Vv07d9Y/thumbnail.jpg"
            />
          </div>

          <div>
            <label className="block font-semibold">Deadline</label>
            <input
              name="deadline"
              defaultValue={deadline}
              required
              type="date"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Budget ($)</label>
            <input
              name="budget"
              defaultValue={budget}
              required
              type="number"
              min="1"
              className="input input-bordered w-full"
              placeholder="e.g., 100"
            />
          </div>

          <div>
            <label className="block font-semibold">Your Name</label>
            <input
              name="displayName"
              type="text"
              readOnly
              value={user?.displayName || ""}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="block font-semibold">Your Email</label>
            <input
              name="email"
              type="email"
              readOnly
              value={user?.email || ""}
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <button className="bg-primary text-white font-medium text-xl px-4 py-2 rounded  mt-5">
            Update Task
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateTask;
