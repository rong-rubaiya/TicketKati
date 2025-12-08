import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import SocialBtn from "./SocialBtn";
import { Link } from "react-router";

const Login = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FEBC00]/20 to-[#2C9CE5]/20 relative overflow-hidden pt-28 pb-10 px-6">

      {/* Floating Blobs */}
      <div className="absolute w-72 h-72 bg-[#FEBC00]/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[#2C9CE5]/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Glass Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/10 dark:bg-black/30 border border-white/20 shadow-2xl rounded-3xl p-10 max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-[#FEBC00] dark:text-[#2C9CE5]">
          Welcome Back
        </h2>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block mb-2  font-medium">Email</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
            <FiMail className="text-[#FEBC00]" />
            <input
              type="email"
              className="bg-transparent outline-none w-full "
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block mb-2  font-medium">Password</label>
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
            <FiLock className="text-[#FEBC00]" />
            <input
              type="password"
              className="bg-transparent outline-none w-full "
              placeholder="Enter password"
            />
          </div>
        </div>

        {/* Forgot */}
        <p className="text-right text-sm mb-6 hover:text-[#FEBC00] cursor-pointer">
          Forgot Password?
        </p>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#FEBC00] text-black font-bold py-3 rounded-full hover:bg-[#ffdf89] transition-colors duration-300"
        >
          Login
        </motion.button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px  bg-black"></span>
          <span className="">or</span>
          <span className="flex-1 h-px bg-black"></span>
        </div>

        <SocialBtn/>

        {/* Signup Link */}
        <p className="text-center mt-2">
          Don't have an account?
          <Link to={'/register'}>
          <span className="ml-1 text-[#FEBC00] font-semibold cursor-pointer hover:underline">
            Register now
          </span>
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;
