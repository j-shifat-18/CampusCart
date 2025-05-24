import React, { useState, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const UpdateUserProfile = () => {
  const { user, updateUserInfo, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    department: "",
    year: "",
    program: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Update profile in Firebase
      await updateUserInfo({
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      // Update local user state
      setUser((prevUser) => ({
        ...prevUser,
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      }));

      // Store additional user data in your backend if needed
      // You can add an API call here to store department, year, program, etc.

      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="hero min-h-screen">
      <Helmet>
        <title>Update Profile | CampusCart</title>
      </Helmet>
      <div className="card bg-white w-full max-w-lg shadow-2xl">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-5">Update Profile</h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Display Name */}
            <div>
              <label className="label font-semibold">Display Name</label>
              <input
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
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
                name="photoURL"
                value={formData.photoURL}
                onChange={handleChange}
                type="text"
                placeholder="Enter your photo URL"
                className="input bg-base-300 border-none w-full"
                required
              />
            </div>
            
            {/* University */}
            <div>
              <label className="label font-semibold">University</label>
              <input
                name="university"
                value={formData.university}
                onChange={handleChange}
                type="text"
                placeholder="Enter your university"
                className="input bg-base-300 border-none w-full"
                required
              />
</div>
            {/* Department */}
            <div>
              <label className="label font-semibold">Department</label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
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
                value={formData.year}
                onChange={handleChange}
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
                value={formData.program}
                onChange={handleChange}
                type="text"
                placeholder="e.g. BSc in CSE"
                className="input bg-base-300 border-none w-full"
                required
              />
            </div>

            {/* Phone (Private) */}
            <div>
              <label className="label font-semibold">Phone Number (Private)</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your phone number"
                className="input bg-base-300 border-none w-full"
              />
            </div>

            {/* Date of Birth (Private) */}
            <div>
              <label className="label font-semibold">Date of Birth (Private)</label>
              <input
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                type="date"
                className="input bg-base-300 border-none w-full"
              />
            </div>

            <button className="btn btn-primary mt-4 w-full">Update Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
