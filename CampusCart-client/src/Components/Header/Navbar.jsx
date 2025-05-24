import React, { use } from "react";
import { Link, NavLink } from "react-router";
import "./Navbar.css";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import logo from "../../assets/logo.png";
import AdminPanel from "../AdminPanel/AdminPanel";
const Navbar = () => {
  const { user, logOutUser } = use(AuthContext);
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/addListing">Add Listing</NavLink>
      </li>
      <li>
        <NavLink to="/exploreProducts">Browse Tasks</NavLink>
      </li>
      <li>
        <NavLink to="/myTasks">My Posted Tasks</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("Logged Out Successfully");
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="navbar bg-secondary shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52  shadow"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center ">
          <img src={logo} alt="" />
          <a className="text-3xl font-bold ml-4">
            Work<span className=" text-primary">lify</span>
          </a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
          {/* Admin Panel button for admin users */}
          {user && user.email === "admin@admin.com" && (
            <li>
              <NavLink to="/adminPanel">Admin Panel</NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-end flex flex-col md:flex-row gap-4">
        <div>
          {user ? (
            <div className={`space-x-4 flex items-center`}>
              {/* Admin Panel button for admin users (mobile view) */}
              {user.email === "admin@admin.com" && (
                <Link
                  to="/adminPanel"
                  className="btn btn-outline btn-primary"
                >
                  Admin Panel
                </Link>
              )}
              <div className="relative">
                <img
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={user.displayName}
                  data-tooltip-place="left"
                  className="w-[40px] h-[40px] rounded-full "
                  src={user.photoURL}
                  alt=""
                />
              </div>
              <Tooltip id="my-tooltip" style={{ backgroundColor: "#6A5ACD" , borderRadius:'8px'}} />
              <button
                onClick={handleLogout}
                className="btn btn-outline btn-primary"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link to="/login" className="btn btn-outline btn-primary">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline btn-primary">
                Signup
              </Link>
            </div>
          )}
        </div>
        <div>
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="dark"
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
