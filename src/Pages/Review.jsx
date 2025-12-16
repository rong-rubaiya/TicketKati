import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const Review = () => {
  const reviews = [
    {
      id: 1,
      name: "Arafat Hossain",
      image: "https://via.placeholder.com/50",
      rating: 5,
      comment: "Amazing experience! The tickets booking process was seamless.",
    },
    {
      id: 2,
      name: "Nusrat Jahan",
      image: "https://via.placeholder.com/50",
      rating: 4,
      comment: "Good service, but the bus was a bit late.",
    },
    {
      id: 3,
      name: "Rakib Hasan",
      image: "https://via.placeholder.com/50",
      rating: 5,
      comment: "Excellent! Comfortable journey and friendly staff.",
    },
  ];

  return (
    <section className="py-30 mx-auto max-w-7xl px-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Customer Reviews
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-[#1e1e3a] p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#FEBC00] dark:border-[#2C9CE5]"
              />
              <h3 className="font-semibold text-gray-800 dark:text-white">{review.name}</h3>
            </div>

            {/* Star Rating */}
            <div className="flex items-center mb-3">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= review.rating ? (
                  <FaStar key={star} className="text-yellow-400 mr-1" />
                ) : (
                  <FaRegStar key={star} className="text-yellow-400 mr-1" />
                )
              )}
            </div>

            {/* Comment */}
            <p className="text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>

            {/* Decorative Footer */}
            <div className="mt-4 h-1 w-16 bg-[#FEBC00] dark:bg-[#2C9CE5] rounded-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
