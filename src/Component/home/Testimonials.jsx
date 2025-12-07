// Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ayesha Rahman",
    text: "Booking was super easy and the tour experience was unforgettable. Highly recommend!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Arif Hossain",
    text: "Great service, helpful guides, and very smooth booking process.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sumaiya Khan",
    text: "Amazing discounts for premium members! Loved the trip and perks.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="w-11/12 mx-auto py-20">
      <h2 className="text-5xl font-bold text-center mb-12 text-[#FEBC00] dark:text-[#2C9CE5]">
        What Our Customers Say
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-amber-300 dark:bg-[#0b0b1f] rounded-3xl shadow-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-20 h-20 rounded-full mb-4 object-cover shadow-lg"
            />
            <p className=" dark:text-gray-400 mb-4">{testimonial.text}</p>
            <div className="flex gap-1 mb-2">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <FaStar key={i} color="#FEBC00" />
              ))}
            </div>
            <h4 className=" dark:text-white font-bold">{testimonial.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
