import React from "react";
import { MdArrowOutward } from "react-icons/md";
import logo from "../../assets/logo.png"
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="p-10 bg-secondary flex flex-col gap-14">
      <div className="footer sm:footer-horizontal text-base-content">
        <aside>
          <div className="flex items-center ">
            <img src={logo} alt="" />
            <a className="text-3xl font-bold ml-4">
              Work<span className=" text-primary">lify</span>
            </a>
          </div>
          <p className="text-lg text-slate-700 font-medium">Lets Head Into The Future</p>
        </aside>
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.facebook.com/jahirul.sifat.3/" target="_blank" >
              <FaFacebook size={28}></FaFacebook>
            </a>
            <a href="https://github.com/j-shifat-18" target="_blank" >
              <FaGithub size={28}></FaGithub>
            </a>
            <a href="https://www.linkedin.com/in/jahirulshifat/" target="_blank" >
              <FaLinkedinIn size={28}></FaLinkedinIn>
            </a>
          </div>
        </nav>
      </div>
      <div className="flex justify-center items-center gap-8">
        <h2 className="font-extrabold text-4xl md:text-6xl lg:text-9xl">Let`s Talk</h2>
        <p className="bg-primary p-2 md:p-4 lg:p-7 rounded-full">
          <MdArrowOutward color="white" size={50}></MdArrowOutward>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
