import Lottie from "lottie-react";
import React from "react";
import freelancerAnimation from "../../../public/freelaner-animation.json";

const FreelancerAnimation = () => {
  return (
    <div className=" w-full  grid grid-cols-2 place-items-center bg-secondary p-8 rounded-2xl ">
      <div className="gap-6">
        <h2 className="mb-3 text-3xl font-extrabold">
          Empowering Your <span className="text-primary">Digital Vision</span> <br /> with Confidence
        </h2>
        <h4 className="mb-5 text-xl font-medium text-slate-600">Turn your ideas into impactful, user-focused digital solutions that shine.</h4>
        <p className="text-lg text-slate-600">
          At Work<span className="text-primary">lify</span>, we believe in turning creativity into results. Whether you're launching a new product, building a web platform, or enhancing your app's design, our team is here to guide you through every step. With intuitive tools, collaborative workflows, and a passion for quality, we help bring your vision to life—efficiently and beautifully. Experience a process that’s built around your goals, your audience, and your future.
        </p>
      </div>
      <div>
        <Lottie animationData={freelancerAnimation} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default FreelancerAnimation;
