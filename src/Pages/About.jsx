import React from 'react';
import { FiUsers, FiTruck, FiStar } from 'react-icons/fi';

const About = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#FEBC00]/20 to-[#2C9CE5]/20 py-16 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        
        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src="https://via.placeholder.com/500x400"
            alt="About Us"
            className="rounded-3xl shadow-xl hover:scale-105 transition-transform"
          />
        </div>

        {/* Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            About Our Platform
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We provide a seamless ticket booking experience with trusted vendors and verified services.
            Our mission is to make travel convenient, safe, and enjoyable for everyone.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <FiUsers className="text-3xl text-[#FEBC00] mb-1" />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">500+</span>
              <span className="text-gray-500 dark:text-gray-300 text-sm">Happy Users</span>
            </div>
            <div className="flex flex-col items-center">
              <FiTruck className="text-3xl text-[#2C9CE5] mb-1" />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">120</span>
              <span className="text-gray-500 dark:text-gray-300 text-sm">Vendors</span>
            </div>
            <div className="flex flex-col items-center">
              <FiStar className="text-3xl text-yellow-400 mb-1" />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">4.9/5</span>
              <span className="text-gray-500 dark:text-gray-300 text-sm">Rating</span>
            </div>
          </div>

          {/* CTA */}
          <button className="px-6 py-3 bg-[#FEBC00] text-black font-semibold rounded-full shadow-lg hover:bg-[#ffdf89] transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
