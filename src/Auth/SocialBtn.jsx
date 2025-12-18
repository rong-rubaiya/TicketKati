// GoogleButton.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext"; // Adjust path
import { useNavigate } from "react-router";

const SocialBtn = () => {
  const { signInWithGoogle, loading } = useContext(AuthContext);
  const navigate=useNavigate()

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/')
      console.log("Google login successful");
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <motion.button
      onClick={handleGoogleLogin}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Sign in with Google"
      className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-full
                 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                 shadow-sm hover:shadow-md transition-all duration-200 text-sm font-medium"
      disabled={loading} // optional, prevent double clicks
    >
      {/* Google Icon (SVG) */}
      <svg
        className="w-5 h-5"
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-hidden="true"
      >
        <path
          fill="#EA4335"
          d="M533.5 278.4c0-18.7-1.6-37-4.8-54.7H272v103.5h147.1c-6.3 34-25 62.8-53.4 82v68.2h86.2c50.5-46.6 83.6-115 83.6-199z"
        />
        <path
          fill="#34A853"
          d="M272 544.3c72.8 0 134-24.2 178.7-65.9l-86.2-68.2c-24 16.1-54.8 25.6-92.5 25.6-71 0-131.2-47.9-152.7-112.4H31.4v70.7C75.8 485.3 168.6 544.3 272 544.3z"
        />
        <path
          fill="#4A90E2"
          d="M119.3 323.4c-10.9-32.6-10.9-67.8 0-100.4V152.3H31.4C11.2 194.8 0 235.8 0 272s11.2 77.2 31.4 119.7l87.9-68.3z"
        />
        <path
          fill="#FBBC05"
          d="M272 107.7c39.6 0 75.4 13.6 103.6 40.4l77.7-77.7C405.7 25 344.5 0 272 0 168.6 0 75.8 59 31.4 152.3l87.9 70.7C140.8 155.6 201 107.7 272 107.7z"
        />
      </svg>

      <span className="text-black dark:text-white">
        Continue with Google
      </span>
    </motion.button>
  );
};

export default SocialBtn;
