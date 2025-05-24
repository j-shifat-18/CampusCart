import React from "react";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { AutoPlay, Pagination } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/pagination.css";
import "@egjs/react-flicking/dist/flicking.css";
import "./Carousel.css";




const testimonialCardsData = [
  {
    id: 1,
    rating: 5,
    title: "Timely Delivery with Exceptional Quality",
    testimonial:
      "It was very nice to work with you, especially the timeline achieved by you is excellent. I would love to do further work with you in future",
    authorName: "Bessie Cooper",
    authorTitle: "Marketing specialist",
    authorAvatar:
      "https://i.ibb.co/TMkHGtMN/mafia-2.jpg", // Example avatar
  },
  {
    id: 2,
    rating: 4,
    title: "Outstanding Support & Collaboration",
    testimonial:
      "The team provided incredible support throughout the project. Their collaborative approach made the entire process smooth and enjoyable. Highly recommend!",
    authorName: "John Doe",
    authorTitle: "Project Manager",
    authorAvatar:
      "https://i.ibb.co/SD5bC1q9/smiling-Boy.jpg",
  },
  {
    id: 3,
    rating: 5,
    title: "Exceeded Expectations on Every Front",
    testimonial:
      "Truly impressed with the results! They went above and beyond to deliver exactly what we needed, even anticipating future requirements. A fantastic experience.",
    authorName: "Jane Smith",
    authorTitle: "CEO, Tech Solutions",
    authorAvatar:
      "https://i.ibb.co/tMGSCsgF/mafia.jpg",
  },
  {
    id: 4,
    rating: 4,
    title: "Great Communication and Responsiveness",
    testimonial:
      "Communication was clear and consistent. Any questions or concerns were addressed promptly, which made working together very efficient.",
    authorName: "David Lee",
    authorTitle: "Lead Developer",
    authorAvatar:
      "https://i.ibb.co/TMkHGtMN/mafia-2.jpg",
  },
  {
    id: 5,
    rating: 5,
    title: "Highly Professional and Reliable Partner",
    testimonial:
      "From start to finish, the professionalism shown was remarkable. They are a reliable partner you can trust to deliver high-quality work every time.",
    authorName: "Sarah Chen",
    authorTitle: "Product Designer",
    authorAvatar:
      "https://i.ibb.co/SD5bC1q9/smiling-Boy.jpg",
  },
  {
    id: 6,
    rating: 5,
    title: "Game-Changing Solutions Provided",
    testimonial:
      "The solutions they offered truly transformed our operations. We've seen significant improvements in efficiency and customer satisfaction. A top-tier service!",
    authorName: "Michael Brown",
    authorTitle: "Operations Director",
    authorAvatar:
      "https://i.ibb.co/tMGSCsgF/mafia.jpg",
  },
];

const Reviews = () => {
  const plugins = [
    new Pagination({ type: "scroll" }),
    new AutoPlay({ duration: 2000, direction: "NEXT", stopOnHover: false }),
  ];

  return (
    <div className=" mx-auto my-24">
      <div className="text-center max-w-3/5 mx-auto space-y-4 mb-10">
        <h2 className="font-extrabold text-4xl ">
          Our Clients <span className="text-primary">Feedback</span>
        </h2>
        <p className="text-slate-700">
          Explore high-quality, handpicked tasks from trusted clients. These
          top-rated opportunities are selected based on budget, clarity, and
          relevance — perfect for freelancers ready to make an impact.
        </p>
      </div>
      <Flicking circular={true} plugins={plugins}>
        {testimonialCardsData.map((data) => (
          <div className="card-panel bg-secondary ">
            <div className="mb-6">
              <p className="text-xl font-semibold text-black mb-2 ">{data.title}</p>
              <div className="flex">
                {/* Render 5 gold stars */}
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.209-6.001 5.856 1.416 8.293L12 18.896l-7.415 3.907 1.416-8.293L.001 9.364l8.332-1.209L12 .587z" />
                  </svg>
                ))}
              </div>
            </div>
            {/* Middle Section (Testimonial Text) */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed">{data.testimonial}</p>
            </div>
            <hr className="border-gray-200 mb-6" />
            <div className="flex items-center">
              <img
                src={data.authorAvatar} // Replace with actual image path
                alt="Bessie Cooper"
                className="w-16 h-16 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {data.authorName}
                </p>
                <p className="text-gray-500 text-sm">{data.authorTitle}</p>
              </div>
            </div>
          </div>
        ))}

        <ViewportSlot>
          <div className="flicking-pagination"></div>
        </ViewportSlot>
      </Flicking>
    </div>
  );
};

export default Reviews;
