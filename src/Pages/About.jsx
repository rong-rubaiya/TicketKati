import React from "react";
import { motion } from "framer-motion";
import { FaBus, FaPlane } from "react-icons/fa";
import { FaTicket } from "react-icons/fa6";
import {
  FiUsers,
  FiShield,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiCreditCard,
} from "react-icons/fi";
import AnimatedPlane from "../Shared/AnimatedPlane";
import AnimatedTrain from "../Shared/AnimatedTrain";

const About = () => {
  return (
    <section className="relative overflow-hidden bg-[#fffdf7] dark:bg-[#0b1020]">

      <AnimatedPlane/>

      {/* ================= HERO ================= */}
      <div className="relative overflow-hidden my-5">

        {/* ✈️ Fast Moving Airplane */}
        <motion.div
          initial={{ x: "-20%", y: 60, opacity: 0 }}
          animate={{ x: ["-20%", "120%"] }}
          transition={{
            duration: 6, // faster movement
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-0 text-[#2C9CE5]/40 text-5xl z-10"
        >
          <FaPlane />
        </motion.div>

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://newsroom.aaa.com/wp-content/uploads/2021/06/Plane-taking-off-twilight-1024x684.jpg')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-white/70 dark:bg-black/60" />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center z-20">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-6">
            About
            <span className="block text-[#ff9900]">TicketKati</span>
          </h1>

          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            TicketKati is a secure, fast, and user-friendly ticket booking platform
            connecting travelers with trusted vendors.
          </p>
        </div>
      </div>

      {/* ================= MISSION & VISION ================= */}
      <AnimatedTrain/>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 pb-24">
        <InfoCard
          title="Our Mission"
          text="To simplify ticket booking with transparency, secure payments, and verified vendors."
        />
        <InfoCard
          title="Our Vision"
          text="To become the most trusted digital ticket platform in Bangladesh."
        />
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <div className="relative bg-[#fff3cf] dark:bg-[#111733] py-24 overflow-hidden">

        {/* 🚌 Fast Moving Bus */}
        <motion.div
          initial={{ x: "-30%" }}
          animate={{ x: ["-30%", "110%"] }}
          transition={{
            duration: 8, // faster movement
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-8 left-0 text-[#FEBC00]/50 text-4xl z-10"
        >
          <FaBus />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-20">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-14">
            How It Works
          </h2>

          <div className="grid sm:grid-cols-3 gap-10">
            <Step
              icon={<FiSearch />}
              title="Search Tickets"
              desc="Browse routes and prices from verified vendors."
            />
            <Step
              icon={<FiCreditCard />}
              title="Secure Payment"
              desc="Pay safely using trusted payment gateways."
            />
            <Step
              icon={<FaTicket />}
              title="Instant Confirmation"
              desc="Get your ticket immediately after booking."
            />
          </div>
        </div>
      </div>

      {/* ================= CORE VALUES ================= */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-14">
          Our Core Values
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Value icon={<FiShield />} title="Secure System" />
          <Value icon={<FiCheckCircle />} title="Transparency" />
          <Value icon={<FiClock />} title="Reliability" />
          <Value icon={<FiUsers />} title="User Focused" />
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="bg-gradient-to-r from-[#FEBC00] to-[#ff9900] py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-10 text-center text-black">
          <Stat value="500+" label="Happy Users" />
          <Stat value="120+" label="Verified Vendors" />
          <Stat value="4.9★" label="Rating" />
        </div>
      </div>

      {/* ================= CTA ================= */}
      <div className="pb-28 text-center">
        <button className="px-12 py-3 mt-7 rounded-full bg-[#FEBC00] text-black font-bold shadow-xl hover:bg-[#ffdf89] transition">
          Start Booking Today
        </button>
      </div>
    </section>
  );
};

/* ---------- Components ---------- */

const InfoCard = ({ title, text }) => (
  <div className="bg-white dark:bg-[#121a3a] rounded-3xl p-10 shadow-lg border border-[#FEBC00]/40">
    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h3>
    <p className="text-gray-700 dark:text-gray-300">{text}</p>
  </div>
);

const Step = ({ icon, title, desc }) => (
  <div className="p-8 rounded-3xl bg-white dark:bg-[#121a3a] shadow-lg border border-[#2C9CE5]/40 hover:-translate-y-2 transition-all duration-300">
    <div className="text-4xl text-[#2C9CE5] mb-4 flex justify-center">{icon}</div>
    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h4>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
  </div>
);

const Value = ({ icon, title }) => (
  <div className="flex flex-col items-center p-6 bg-white dark:bg-[#121a3a] rounded-2xl shadow-lg border border-[#FEBC00]/40 hover:scale-105 transition-all duration-300">
    <div className="text-3xl text-[#FEBC00] mb-3">{icon}</div>
    <span className="font-semibold text-gray-900 dark:text-gray-100">{title}</span>
  </div>
);

const Stat = ({ value, label }) => (
  <div>
    <div className="text-4xl font-extrabold">{value}</div>
    <div className="text-sm font-medium">{label}</div>
  </div>
);

export default About;
