import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi";
import SocialBtn from "./SocialBtn";
import { Link } from "react-router";

const Register = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEBC00]/20 to-[#2C9CE5]/20 relative overflow-hidden pt-28 pb-10 px-6">

      {/* Floating Blobs */}
      <div className="absolute w-72 h-72 bg-[#FEBC00]/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[#2C9CE5]/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Glass Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-white/20 shadow-2xl rounded-3xl p-10 max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Create Account
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-900 dark:text-white font-medium">Full Name</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
            <FiUser className="text-[#FEBC00]" />
            <input
              type="text"
              className="bg-transparent outline-none w-full text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-300"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-900 dark:text-white font-medium">Email</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
            <FiMail className="text-[#FEBC00]" />
            <input
              type="email"
              className="bg-transparent outline-none w-full text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-300"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-900 dark:text-white font-medium">Password</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
            <FiLock className="text-[#FEBC00]" />
            <input
              type="password"
              className="bg-transparent outline-none w-full text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-300"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Profile Photo URL */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-900 dark:text-white font-medium">Profile Photo URL</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
            <FiCamera className="text-[#FEBC00]" />
            <input
              type="text"
              className="bg-transparent outline-none w-full text-gray-900 dark:text-white placeholder-gray-700 dark:placeholder-gray-300"
              placeholder="Enter photo URL"
            />
          </div>
        </div>

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#FEBC00] text-black font-bold py-3 rounded-full hover:bg-[#ffdf89] transition-colors duration-300 mb-4"
        >
          Register
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <span className="flex-1 h-px bg-gray-300 dark:bg-white/40"></span>
          <span className="text-gray-500 dark:text-white/40">or</span>
          <span className="flex-1 h-px bg-gray-300 dark:bg-white/40"></span>
        </div>

        {/* Social Login */}
        <SocialBtn />

        {/* Login Redirect */}
        <p className="text-center mt-6 text-gray-900 dark:text-white">
          Already have an account?
          <Link to="/login">
            <span className="ml-1 text-[#FEBC00] font-semibold cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
