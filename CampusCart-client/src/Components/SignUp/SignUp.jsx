import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import { toast } from "react-toastify";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, setUser, updateUserInfo, googleLogin } = use(AuthContext);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const university = e.target.university.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const eduEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/;
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!eduEmailRegex.test(email)) {
    setError("Only .edu email addresses are allowed");
    return;
  }

    if (passwordRegEx.test(password) === false) {
      setError(
        "Password must have one Uppercase , one lowercase and minimum 6 characters or longer"
      );
      return;
    }
    createUser(email, password)
      .then((result) => {
        const newUser = result.user;
        updateUserInfo({ displayName: name, photoURL: photo })
          .then(() => {
            fetch("http://localhost:3000/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ name, photo, email, university , isAdmin:false }),
            })
              .then((res) => res.json())
              .then(() => {
                toast.success("Registered Successfully");
              });
            setUser({ ...newUser, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setUser(newUser);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => console.log(error.message));
  };
  return (
    <div className="hero  min-h-screen my-10">
      <Helmet>
        <title>Signup | Worklify </title>
      </Helmet>
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h2 className="font-semibold text-3xl text-center mb-5">
            Signup Now!
          </h2>
          <form onSubmit={handleRegister} className="fieldset space-y-3">
            {/* name */}
            <label className="label font-semibold text-xl">Name</label>
            <input
              name="name"
              required
              type="text"
              className=" input border-none bg-base-300"
              placeholder="Enter your Name"
            />
            {/* photo url */}
            <label className="label font-semibold text-xl">Photo URL</label>
            <input
              name="photo"
              required
              type="text"
              className=" input border-none bg-base-300"
              placeholder="Enter your Photo URL"
            />
            {/* University */}
            <div>
              <label className="label font-semibold text-xl">university</label>
              <select
                name="university"
                required
                className="input border-none bg-base-300"
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

            {/* <label className="label font-semibold text-xl">university</label>
            <input
              name="university"
              required
              type="text"
              className=" input border-none bg-base-300"
              placeholder="Enter your university name"
            /> */}
            {/* email */}
            <label className="label font-semibold text-xl">Email</label>
            <input
              name="email"
              required
              type="email"
              className=" input border-none bg-base-300"
              placeholder="Enter your email address"
            />

            {/* password */}
            <label className="label font-semibold text-xl">Password</label>
            <div className="relative">
              <input
                name="password"
                required
                type={showPass ? "text" : "password"}
                className=" input border-none bg-base-300 "
                placeholder="Enter your password"
              />
              <p
                onClick={() => setShowPass(!showPass)}
                className="btn btn-xs absolute top-2 right-6 bg-transparent border-none"
              >
                {showPass ? (
                  <FaEyeSlash size={20}></FaEyeSlash>
                ) : (
                  <FaEye size={20}></FaEye>
                )}
              </p>
            </div>
            {/* <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-sm rounded-[5px]"
              />
              <p className="text-accent">Accept Term & Conditions</p>
            </div> */}

            {error && <p className="text-red-700 text-xs">{error}</p>}
            <button className="btn btn-neutral mt-4">Register</button>
          </form>
          <h2 className="font-semibold text-center">
            Already Have An Account ?{" "}
            <Link to="/login" className="text-primary underline">
              Login
            </Link>
          </h2>
        </div>

        <p className="font-semibold text-primary text-center">
          -----------OR-----------
        </p>
        <button
          onClick={handleGoogleLogin}
          className="btn bg-white text-black border-[#e5e5e5] mt-3 mb-5 w-11/12 mx-auto hover:bg-info text-xl"
        >
          <svg
            aria-label="Google logo"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
