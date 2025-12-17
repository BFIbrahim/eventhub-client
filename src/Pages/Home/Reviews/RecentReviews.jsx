import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import useAxios from "../../../Hooks/useAxios";

const RecentReviews = () => {
  const [reviews, setReviews] = useState([]);
  const axios = useAxios();

  useEffect(() => {
    axios.get("/reviews")
      .then(res => setReviews(res.data))
      .catch(err => console.error(err.message));
  }, []);

  return (
    <section className="mt-14 w-[96%] md:max-w-6xl mx-auto mb-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-base-content">Recent Reviews</h2>
        <p className="text-base-content/70 mt-2">
          Latest reviews posted by our users
        </p>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
        grabCursor
      >
        {reviews.map(review => (
          <SwiperSlide key={review._id} className="flex justify-center">
            <div className="p-6 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-base-content">
                    {review.userName}
                  </h3>

                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-base-content/70 text-sm">
                  {review.comment}
                </p>
              </div>

              <p className="text-xs text-base-content/50 mt-4">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RecentReviews;
