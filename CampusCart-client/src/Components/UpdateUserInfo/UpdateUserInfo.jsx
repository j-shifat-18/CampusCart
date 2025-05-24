import React, { useState, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import { useEffect } from "react";

const UpdateUserProfile = () => {
  const { user, updateUserInfo, setUser } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!user?.email) return;

      try {
        const res = await fetch(`http://localhost:3000/users/${user.email}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user ID");
        }
        const data = await res.json();
        setUserId(data._id);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, [user?.email]);

  if (!userId) return;

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const university = form.university.value;
    const department = form.department.value;
    const year = form.year.value;
    const program = form.program.value;
    const phone = form.phone.value;
    const dob = form.dob.value;

    const updatedInfo = {
      name,
      photo,
      university,
      department,
      year,
      program,
      phone,
      dob,
    };

    try {
      // Update profile in Firebase
      await updateUserInfo({
        displayName: name,
        photoURL: photo,
      });

      // Update local user state
      setUser((prevUser) => ({
        ...prevUser,
        displayName: name,
        photoURL: photo,
      }));

      fetch(`http://localhost:3000/updateprofile/${userId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      // toast.success("Profile updated successfully!");
      // navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="hero min-h-screen my-24">
      <Helmet>
        <title>Update Profile | CampusCart</title>
      </Helmet>
      <div className="card bg-white w-full max-w-lg shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-5">
            Update Profile
          </h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Display Name */}
            <div>
              <label className="label font-semibold">Display Name</label>
              <input
                name="displayName"
                defaultValue={user.displayName}
                type="text"
                placeholder="Enter your display name"
                className="input bg-base-300 border-none w-full"
                required
              />
            </div>

            {/* Photo URL */}
            <div>
              <label className="label font-semibold">Photo URL</label>
              <input
                name="photo"
                defaultValue={user.photoURL}
                type="text"
                placeholder="Enter your photo URL"
                className="input bg-base-300 border-none w-full"
                required
              />
            </div>

            {/* University */}
            {/* University */}
            <div>
              <label className="label font-semibold">university</label>
              <select
                name="university"
                required
                className="input bg-base-300 border-none w-full"
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
            {/* Department */}
            <div>
              <label className="label font-semibold">Department</label>
              <input
                name="department"
                type="text"
                placeholder="Enter your department"
                className="input bg-base-300 border-none w-full"
                required
              />
            </div>

            {/* Year */}
            <div>
              <label className="label font-semibold">Year</label>
              <input
                name="year"
                type="text"
                placeholder="Enter your year"
                className="input bg-base-300 border-none w-full"
                required
              />
            </div>

            {/* Program */}
            <div>
              <label className="label font-semibold">Program</label>
              <input
                name="program"
                type="text"
                placeholder="e.g. BSc in CSE"
                className="input bg-base-300 border-none w-full"
                required
              />
            </div>

            {/* Phone (Private) */}
            <div>
              <label className="label font-semibold">
                Phone Number (Private)
              </label>
              <input
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="input bg-base-300 border-none w-full"
              />
            </div>

            {/* Date of Birth (Private) */}
            <div>
              <label className="label font-semibold">
                Date of Birth (Private)
              </label>
              <input
                name="dob"
                type="date"
                className="input bg-base-300 border-none w-full"
              />
            </div>

            <button className="btn btn-primary mt-4 w-full">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
