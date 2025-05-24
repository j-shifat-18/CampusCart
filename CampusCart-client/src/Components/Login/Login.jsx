import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";


const Login = () => {
  const { loginUser, googleLogin } = use(AuthContext);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log(email, password);

    loginUser(email, password)
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`, {
          state: { loginSuccess: true },
        });
      })
      .catch(() => {
        setError("Invalid email or password.");
        toast.error("Login Failed");
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
    <div className="hero  min-h-screen">
      <Helmet>
        <title>Login | Worklify</title>
      </Helmet>
      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body ">
          <h2 className="font-semibold text-3xl text-center mb-5">
            Login your account
          </h2>
          <form onSubmit={handleLogin} className="fieldset space-y-3">
            <label className="label font-semibold text-xl">Email</label>
            <input
              name="email"
              required
              type="email"
              className="input border-none bg-base-300"
              placeholder="Enter your email address"
            />
            <label className="label font-semibold text-xl">Password</label>
            <div className="relative">
              <input
                name="password"
                required
                type={showPass ? "text" : "password"}
                className="input border-none bg-base-300 "
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

            {error && <p className="text-red-700 text-xs">{error}</p>}

            <div>
              <Link to="/auth/forgot-password" className="link link-hover">
                Forgot password?
              </Link>
            </div>

            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <h2 className="font-semibold text-center">
            Dont’t Have An Account ?{" "}
            <Link to="/signup" className="text-primary underline">
              Register
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

export default Login;
