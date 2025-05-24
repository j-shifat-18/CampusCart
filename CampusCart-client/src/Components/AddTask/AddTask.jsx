import React, { use } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import { toast, ToastContainer } from "react-toastify";


const AddTask = () => {

  const { user } = use(AuthContext);




  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const thumbnail=form.thumbnail.value;
    const visibility=form.visibility.value;
    const payment=form.payment.value;
    const price = form.price.value;

    const userData = {
      title,
      category,
      description,
      thumbnail,
      price,
      visibility,
      payment,
      userEmail: user.email,
      userName: user.displayName,
      photoURL: user.photoURL,
      
    };

    // add task to the db
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.insertedId){
            toast.success("Product added successfully")
        }
        
      });

    
  };
  return (
    <div className="min-h-screen p-6 bg-base-200 flex items-center justify-center pb-28">
      <Helmet>
        <title>Sell Stuff | Worklify</title>
      </Helmet>

      <div className="w-full max-w-2xl p-8 bg-white rounded shadow-lg shadow-primary">
        <h2 className="text-2xl font-bold text-center mb-6">Sell Your Stuff </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
           <div>
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              required
              className="select select-bordered w-full"
            >
              <option value="">
                Select a category
              </option>
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
              required
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g., https://0Vv07d9Y/thumbnail.jpg"
            />
          </div>

          <div>
            <label className="block font-semibold">Payment Option</label>
            <select
              name="payment"
              required
              className="select select-bordered w-full"
            >
              <option value="">
                Select a Option
              </option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Monthly Subscription">Monthly Subscription</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">Price (৳)</label>
            <input
              name="price"
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
              required
              className="select select-bordered w-full"
            >
              <option value="">
                Select a Option
              </option>
              <option value="Own University Student">Own University Student</option>
              <option value="All registered Student">All registered Student</option>
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

          {/* <div>
            <label className="block font-semibold">University</label>
            <input
              name="displayName"
              type="text"
              readOnly
              value='hello'
              className="input input-bordered w-full bg-gray-100"
            />
          </div> */}

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

export default AddTask;
