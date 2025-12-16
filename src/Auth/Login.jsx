import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock } from "react-icons/fi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import SocialBtn from "./SocialBtn";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { signInUser, resetPassword,user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
     const adminEmail = import.meta.env.VITE_APP_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_APP_ADMIN_PASSWORD;
    const adminName = import.meta.env.VITE_APP_ADMIN_NAME;
   if(email === adminEmail && password === adminPassword){
  const adminUser = {
    uid: "admin-uid",
    email: adminEmail,
    displayName: adminName,
    role: "admin",
  };
  localStorage.setItem("user", JSON.stringify(adminUser));
  setUser(adminUser);  // ✅ This works now with correct useContext
  navigate("/dashboard/admin/profile");
  return;
}
   
   else{
     try {
      // Sign in with Firebase
      await signInUser(email, password);

      // Fetch role from backend
      const res = await fetch(`http://localhost:5000/user-role/${email}`);
      if (!res.ok) throw new Error("Failed to fetch user role");
      const data = await res.json();

      // Redirect based on role
      if (data.role === "vendor") navigate("/");
      else if (data.role === "admin") navigate("/");
      else navigate("/");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
   }
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email first!");
    try {
      await resetPassword(email);
      alert("Password reset email sent!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

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
        className="backdrop-blur-xl bg-white/20 dark:bg-black/30 border border-gray-300 shadow-2xl rounded-3xl p-10 max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Email</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3">
              <FiMail className="text-[#FEBC00]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent outline-none w-full"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password with Eye Toggle */}
          <div className="mb-4 relative">
            <label className="block mb-2 font-medium">Password</label>
            <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-4 py-3 relative">
              <FiLock className="text-[#FEBC00]" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent outline-none w-full"
                placeholder="Enter password"
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

          {/* Forgot Password */}
          <p
            className="text-right text-sm mb-6 hover:text-[#FEBC00] cursor-pointer"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#FEBC00] text-black font-bold py-3 rounded-full hover:bg-[#ffdf89] transition-colors duration-300"
          >
            Login
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="text-gray-500">or</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>

        {/* Social Login */}
        <SocialBtn />

        {/* Signup Link */}
        <p className="text-center mt-2">
          Don't have an account?
          <Link to="/register">
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
