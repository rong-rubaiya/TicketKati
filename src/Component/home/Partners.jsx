// Partners.jsx
import React from "react";
import { motion } from "framer-motion";

const partners = [
  "https://easydigitaldownloads.com/wp-content/uploads/edd/2019/03/stripe-product-image.png",
  "https://play-lh.googleusercontent.com/9ps_d6nGKQzfbsJfMaFR0RkdwzEdbZV53ReYCS09Eo5MV-GtVylFD-7IHcVktlnz9Mo",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
];

const Partners = () => {
  return (
    <section className="w-11/12 mx-auto py-16">
      <h2 className="text-5xl font-bold text-center mb-12 text-[#FEBC00] dark:text-[#2C9CE5]">
        Our Trusted Partners
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-12 max-w-6xl mx-auto">
        {partners.map((logo, index) => (
          <motion.div
            key={index}
            className="w-32 h-16 flex items-center justify-center p-4 bg-white/10 dark:bg-black/20 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <img src={logo} alt={`Partner ${index}`} className="max-h-full object-contain" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Partners;
