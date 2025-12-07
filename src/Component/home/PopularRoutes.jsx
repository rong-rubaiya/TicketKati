// PopularRoutes.jsx
import React from "react";
import { motion } from "framer-motion";

const PopularRoutes = () => {
  const routes = [
    { id: 1, from: "Dhaka", to: "Cox's Bazar", percent: 80, color: "#FEBC00" },
    { id: 2, from: "Chittagong", to: "Sylhet", percent: 60, color: "#2C9CE5" },
    { id: 3, from: "Dhaka", to: "Sundarbans", percent: 45, color: "#FF6B6B" },
    { id: 4, from: "Dhaka", to: "Rangamati", percent: 30, color: "#8E44AD" },
  ];

  return (
    <section 
      className="w-full py-16 relative bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0  bg-gray-300/60 dark:bg-black/60"></div>


      <div className="flex flex-col sm:flex-row  w-11/12 mx-auto">
<div className="relative flex-1  px-4">
        <h2 className="text-5xl font-bold text-center mb-12 text-[#000000] dark:text-[#2C9CE5]">
          Popular Routes
        </h2>
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {routes.map((route, index) => (
            <motion.div
              key={route.id}
              className="flex flex-col"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Route Info */}
              <div className="flex justify-between mb-2  font-semibold">
                <span className="text-lg">{route.from} → {route.to}</span>
                <span className="text-lg">{route.percent}%</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-6 overflow-hidden shadow-lg">
                <motion.div
                  className="h-6 rounded-full"
                  style={{ backgroundColor: route.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${route.percent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      {/* another */}

      <section className="relative py-20 px-4 flex flex-1 justify-center">
      {/* Glassmorphic Container */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 p-10 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Decorative floating gradient blobs */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-r from-[#FEBC00] to-[#FF6B6B] rounded-full opacity-30 animate-blob"></div>
        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-gradient-to-r from-[#2C9CE5] to-[#8E44AD] rounded-full opacity-30 animate-blob animation-delay-2000"></div>

        {/* Text Section */}
        <div className="flex-1 text-center md:text-left relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black dark:text-[#2C9CE5] animate-fadeIn">
            Become a Premium Member
          </h2>
          <p className=" dark:text-gray-300 mb-6 text-lg md:text-xl">
            Unlock exclusive discounts, special coupons, and premium perks on all your favorite routes. Travel smarter and save more by joining today!
          </p>
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px #FEBC00" }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#FEBC00] text-black font-bold py-3 px-10 rounded-full hover:bg-[#ffdf89] transition-all duration-300 shadow-lg"
          >
            Join Premium
          </motion.button>
        </div>

        {/* Image Section */}
        <motion.div
          className="flex-1 relative z-10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
            alt="Premium Travel"
            className="w-full rounded-3xl shadow-2xl object-cover border-4 border-white/20 dark:border-gray-600"
            whileHover={{ scale: 1.05, rotate: 1 }}
          />
        </motion.div>
      </motion.div>

      {/* Tailwind Animations */}
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob { animation: blob 8s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .animate-fadeIn { animation: fadeIn 1.5s ease forwards; }
        `}
      </style>
    </section>


      </div>
    </section>
  );
};

export default PopularRoutes;
