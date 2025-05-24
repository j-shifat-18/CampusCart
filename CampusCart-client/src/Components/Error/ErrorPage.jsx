import React from "react";
import { Link } from "react-router";
import errorImg from '../../assets/vecteezy_404-landing-page_6549647.jpg'
import Navbar from "../Header/Navbar";


const ErrorPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="text-center mt-8 max-w-11/12 mx-auto">
        <div className="max-w-4/5 mx-auto">
          <img src={errorImg} alt="" />
        </div>
        <h1 className="font-extrabold text-2xl mt-4">Page not found!</h1>
        <Link to="/">
          <button className="btn font-bold md:text-xl rounded-[99px] bg-primary text-white md:px-7 md:py-4 mt-8">
            Return to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
