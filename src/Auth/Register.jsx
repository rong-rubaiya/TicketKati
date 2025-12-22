import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SocialBtn from "./SocialBtn";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register: formRegister, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password", "");

  const rules = [
    { test: /.{6,}/, label: "At least 6 characters" },
    { test: /[A-Z]/, label: "One uppercase letter (A–Z)" },
    { test: /[a-z]/, label: "One lowercase letter (a–z)" },
  ];

  const onSubmit = async (data) => {
    try {
      // Firebase registration
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photo);

      // Save to backend
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          photo: data.photo,
          role: data.role,
        }),
           
      });

      console.log("Selected role:", data.role);

      const savedData = await res.json();
      if (savedData.success) {
        alert("Registration successful!");
        navigate("/");
      } else {
        alert(savedData.error || "Backend error");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
 
  };

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
        className="backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-gray-300 shadow-2xl rounded-3xl p-10 max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">Full Name</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3">
              <FiUser className="text-[#FEBC00]" />
              <input
                {...formRegister("name", { required: "Name is required" })}
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">Email</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3">
              <FiMail className="text-[#FEBC00]" />
              <input
                {...formRegister("email", { required: "Email is required" })}
                type="email"
                className="bg-transparent outline-none w-full"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">Select Role</label>
            <select
              {...formRegister("role", { required: "Role is required" })}
              className="border border-gray-300 w-full px-4 py-3 rounded-2xl outline-none"
            >
              <option value="">Choose role</option>
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Photo */}
          <div className="mb-4">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">Profile Photo URL</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3">
              <FiCamera className="text-[#FEBC00]" />
              <input
                {...formRegister("photo")}
                type="text"
                className="bg-transparent outline-none w-full"
                placeholder="Enter photo URL"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6 relative">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">Password</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3">
              <FiLock className="text-[#FEBC00]" />
              <input
                {...formRegister("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "At least 6 characters" },
                  validate: {
                    hasUpper: (v) => /[A-Z]/.test(v) || "Must include uppercase",
                    hasLower: (v) => /[a-z]/.test(v) || "Must include lowercase",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className="bg-transparent outline-none w-full"
                placeholder="Enter your password"
              />
              <span
                className="absolute right-4 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>

            {/* Password rules */}
            {password && (
              <ul className="mt-2 space-y-1">
                {rules.map((rule, i) => {
                  const passed = rule.test.test(password);
                  return (
                    <li key={i} className={`flex items-center gap-2 italic ${passed ? "text-green-600" : "text-red-500"}`}>
                      <span className="text-lg">{passed ? "✔" : "✖"}</span>
                      <span>{rule.label}</span>
                    </li>
                  );
                })}
              </ul>
            )}
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#FEBC00] text-black font-bold py-3 rounded-full hover:bg-[#ffdf89] transition-colors duration-300 mb-4"
          >
            Register
          </motion.button>
        </form>

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
          <Link to="/login" className="ml-1 text-[#FEBC00] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;