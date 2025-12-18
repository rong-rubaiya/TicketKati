import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SocialBtn from "./SocialBtn";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      await updateUserProfile(name, photo);
      Swal.fire({
        icon: "success",
        title: "Account created successfully!",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-28 px-6 bg-gradient-to-br from-[#FEBC00]/20 to-[#2C9CE5]/20 relative overflow-hidden pb-10">
      {/* Floating Blobs */}
      <div className="absolute w-72 h-72 bg-[#FEBC00]/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-[#2C9CE5]/30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      {/* Glass Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-gray-300 shadow-2xl rounded-3xl p-10 max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="mb-4">
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3">
              <FiUser className="text-[#FEBC00]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="bg-transparent outline-none w-full"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3">
              <FiMail className="text-[#FEBC00]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-transparent outline-none w-full"
                required
              />
            </div>
          </div>

          {/* Photo URL */}
          <div className="mb-4">
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3">
              <FiUser className="text-[#FEBC00]" />
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                placeholder="Photo URL"
                className="bg-transparent outline-none w-full"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3 relative">
              <FiLock className="text-[#FEBC00]" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="bg-transparent outline-none w-full"
                required
              />
              <span
                className="absolute right-4 cursor-pointer text-xl"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <button className="w-full bg-[#FEBC00] text-black font-bold py-3 rounded-full hover:bg-[#ffdf89] transition-colors duration-300">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-gray-500">or</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        <SocialBtn />

        <p className="text-center mt-4 text-gray-900 dark:text-white">
          Already have an account?
          <Link to="/login" className="text-[#FEBC00] ml-1">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
