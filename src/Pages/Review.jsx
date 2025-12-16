import React, { use, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import AnimatedTrain from '../Shared/AnimatedTrain';


const Review = () => {
  const { user } = use(AuthContext) // check if user is logged in
  const [reviews, setReviews] = useState([
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
  ]);

  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const handleSubmit = () => {
    if (newReview.comment && newReview.rating > 0) {
      setReviews([
        {
          id: reviews.length + 1,
          name: user.displayName || "Anonymous",
          image: user.photoURL || "https://via.placeholder.com/50",
          rating: newReview.rating,
          comment: newReview.comment,
        },
        ...reviews,
      ]);
      setNewReview({ rating: 0, comment: '' });
    }
  };

  return (
    <section className="py-28 mx-auto max-w-7xl px-4">
      <AnimatedTrain/>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Customer Reviews
      </h2>

      {/* Add Review Section */}
      {user ? (
        <div className="bg-white dark:bg-[#1e1e3a] p-6 rounded-2xl shadow-lg mb-8 border border-[#FEBC00]/40">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Leave a Review</h3>
          <div className="flex items-center mb-4">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                className={`text-2xl cursor-pointer ${star <= newReview.rating ? 'text-[#FEBC00]' : 'text-gray-300 dark:text-gray-500'}`}
                onClick={() => setNewReview({...newReview, rating: star})}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            placeholder="Write your review..."
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none mb-3 dark:bg-[#121a3a] dark:text-gray-100"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-full bg-[#FEBC00] text-black font-semibold hover:bg-[#ffdf89] transition"
          >
            Submit Review
          </button>
        </div>
      ) : (
        <div className="bg-yellow-50 dark:bg-[#2C2C44] text-center p-6 rounded-2xl mb-8 border border-[#FEBC00]/40">
          <p className="text-gray-800 dark:text-gray-200">Please <span className="font-bold text-[#FEBC00]">log in</span> to submit a review.</p>
        </div>
      )}

      {/* Reviews Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-[#1e1e3a] p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-[#FEBC00]/40"
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
                  <FaStar key={star} className="text-[#FEBC00] mr-1" />
                ) : (
                  <FaRegStar key={star} className="text-[#FEBC00] mr-1" />
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
