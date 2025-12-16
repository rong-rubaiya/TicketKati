import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const Subscription = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return alert("Please enter your email!");
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FEBC00]/20 to-[#FF9900]/20 dark:from-[#2C9CE5]/20 dark:to-[#1A1F40]/20 py-28 px-4">
      
      {/* Animated flying envelope */}
      <motion.div
        className="absolute top-10 left-0 text-[#FEBC00] dark:text-[#2C9CE5] text-4xl"
        animate={{ x: ["-10%", "110%"], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        <FaEnvelope />
      </motion.div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
          Stay in the Loop
          <span className="block text-[#FEBC00] dark:text-[#2C9CE5]">
            Subscribe to TicketKati
          </span>
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-10">
          Get exclusive updates, ticket alerts, and latest offers directly in your inbox.
        </p>

        {/* Subscription input & button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-4 rounded-full border border-[#FEBC00]/40 dark:border-[#2C9CE5]/40 bg-white dark:bg-[#121a3a] text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#FEBC00]/50 dark:focus:ring-[#2C9CE5]/50 transition shadow-lg"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubscribe}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#FEBC00] to-[#FF9900] dark:from-[#2C9CE5] dark:to-[#55b7f0] text-black font-bold shadow-xl hover:shadow-2xl transition"
          >
            Subscribe
          </motion.button>
        </div>

        {/* Benefits */}
        <div className="mt-8 text-left sm:text-center text-gray-700 dark:text-gray-300 space-y-2">
          <p><strong>Benefits of subscribing:</strong></p>
          <ul className="list-disc list-inside">
            <li>Exclusive ticket deals and discounts</li>
            <li>Latest travel updates and routes</li>
            <li>Priority access to promotions and events</li>
            <li>Personalized notifications and alerts</li>
          </ul>
        </div>

        {/* Terms & Policies */}
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          By subscribing, you agree to our{" "}
          <a href="/terms" className="underline hover:text-[#FEBC00] dark:hover:text-[#2C9CE5]">Terms & Conditions</a> and{" "}
          <a href="/privacy" className="underline hover:text-[#FEBC00] dark:hover:text-[#2C9CE5]">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
};

export default Subscription;
