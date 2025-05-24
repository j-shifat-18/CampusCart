// components/BannerSlider.jsx
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import Slider from "react-slick";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  
  {
    title: "Hire Top Talent Instantly",
    description:
      "Post your project and get proposals from verified professionals within minutes.",
    image: "https://res.cloudinary.com/dn9arhbst/image/upload/v1747994057/digital-team-work_1_cjiwse.jpg",
  },
  {
    title: "Find Work. Build Your Career.",
    description:
      "Join a global network of skilled freelancers and start earning from anywhere.",
    image: "https://res.cloudinary.com/dn9arhbst/image/upload/v1747994056/freelancer_eeieim.webp",
  },
  {
    title: "Safe Payments, Trusted by Thousands",
    description:
      "Your money is protected until the job is done right. Secure escrow included.",
    image: "https://res.cloudinary.com/dn9arhbst/image/upload/v1747994057/secure-payment_1_uqiyrc.jpg",
  },
];

const Banner = () => {
  return (
    <div className="w-full mb-24 mt-4">
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={10}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper mx-auto h-[400px] w-full md:h-[650px]  rounded-2xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-11/12 w-full  bg-cover bg-center rounded-2xl "
              style={{
                backgroundImage: `linear-gradient(to top, rgba(68, 37, 132, 0.79),  rgba(247, 250, 255, 0)), url(${slide.image})`,
              }}
            >
              <div className="absolute bottom-4 w-full  flex items-center justify-center text-center p-2 md:p-4 lg:p-6">
                <div
                  className="text-white space-y-2 lg:space-y-4 flex flex-col items-center"
                  data-aos="fade-up"
                >
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold">
                    {slide.title}
                  </h2>
                  <p className="text-base lg:text-lg">{slide.description}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
