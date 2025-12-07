// WhyChooseUs.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaStar, FaHeadset } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt size={30} />,
      title: "Secure Booking",
      description: "All your bookings are 100% safe and encrypted for a hassle-free experience.",
      color: "#FEBC00",
    },
    {
      icon: <FaStar size={30} />,
      title: "Top-rated Services",
      description: "Our services are highly rated by thousands of satisfied travelers.",
      color: "#2C9CE5",
    },
    {
      icon: <FaHeadset size={30} />,
      title: "24/7 Support",
      description: "Our dedicated team is available round the clock to assist you.",
      color: "#FF6B6B",
    },
  ];

  return (
    <section className="w-11/12 mx-auto py-20">
      <h2 className="text-5xl font-bold text-center mb-12 text-[#FEBC00] dark:text-[#2C9CE5]">
        Why Choose Us
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-amber-300 dark:bg-[#0b0b1f] rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div
              className="p-4 mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: feature.color + "33" }}
            >
              {React.cloneElement(feature.icon, { color: feature.color })}
            </div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {feature.title}
            </h3>
            <p className=" dark:text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
