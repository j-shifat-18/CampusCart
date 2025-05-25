import React, { use } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";

const UpdateTask = () => {
  const { user } = use(AuthContext);
  const product = useLoaderData();
  const {
    title,
    category,
    description,
    thumbnail,
    price,
    _id,
    visibility,
    pricing,
    university,
  } = product;

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const thumbnail = form.thumbnail.value;
    const visibility = form.visibility.value;
    const pricing = form.pricing.value;
    const price = form.price.value;
    const university = form.university.value;

    const productData = {
      title,
      category,
      description,
      thumbnail,
      price,
      visibility,
      pricing,
      university,
      userEmail: user.email,
      userName: user.displayName,
      photoURL: user.photoURL,
    };

    fetch(
      `https://campus-cart-server.vercel.app/updateProduct/${_id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Updated task successfully");
        } else {
          toast.error("No changes to update");
        }
      });
  };

  return (
    <div className="min-h-screen p-6 bg-base-200 flex items-center justify-center pb-28">
      <Helmet>
        <title>Sell Stuff | Worklify</title>
      </Helmet>

      <div className="w-full max-w-2xl p-8 bg-white rounded shadow-lg shadow-primary">
        <h2 className="text-2xl font-bold text-center mb-6">
          Update Your Stuff{" "}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              defaultValue={category}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select a category</option>
              <option value="Book">Book</option>
              <option value="Electronics">Electronics</option>
              <option value="Stationary">Stationary</option>
              <option value="Accessories">Accessories</option>
              <option value="Service">Service</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Product Name</label>
            <input
              name="title"
              defaultValue={title}
              required
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g., C Programming Book"
            />
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
            <label className="block font-semibold">Product Photo URL</label>
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
            <label className="block font-semibold">Pricing Option</label>
            <select
              name="pricing"
              defaultValue={pricing}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select a Option</option>
              <option value="Fixed Price">Fixed Price</option>
              <option value="Allow Bidding">Allow Bidding</option>
              <option value="Monthly Subscription">Monthly Subscription</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Price (৳)</label>
            <input
              name="price"
              defaultValue={price}
              required
              type="number"
              min="1"
              className="input input-bordered w-full"
              placeholder="e.g., 100"
            />
          </div>

          <div>
            <label className="block font-semibold">Visibility</label>
            <select
              name="visibility"
              defaultValue={visibility}
              required
              className="select select-bordered w-full"
            >
              <option value="">public</option>
              <option value="Own University Student">public</option>
              <option value="university-only">university-only</option>
            </select>
          </div>

          {/* University */}
          <div>
            <label className="block font-semibold">Your University</label>
            <select
              name="university"
              defaultValue={university}
              required
              className="select select-bordered w-full"
            >
              <option value="">Select a Option</option>
              <option value="Islamic University of Technology">
                Islamic University of Technology
              </option>
              <option value="Dhaka University">Dhaka University</option>
              <option value="BUET">BUET</option>
              <option value="DMC">DMC</option>
              <option value="AUST">AUST</option>
            </select>
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
            Add Listing
          </button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateTask;
