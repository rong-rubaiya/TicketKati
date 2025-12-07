import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200",
    title: "Your Journey Begins",
    text: "Find flights, trains & buses with a premium booking experience."
  },
  {
    img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200",
    title: "Travel in Style",
    text: "Book smarter with smooth, fast & secure ticketing."
  },
  {
    img: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=1200",
    title: "Plan. Book. Go.",
    text: "Everything you need for the perfect trip — in one place."
  },
  {
    img: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?q=80&w=1200",
    title: "Where Will You Go Next?",
    text: "Explore destinations with confidence and ease."
  }
];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[75vh] md:h-[60vh] overflow-hidden  shadow-2xl">

      {/* Background Image */}
      <AnimatePresence>
        <motion.img
          key={slides[index].img}
          src={slides[index].img}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />

      {/* Aesthetic Glass Text Box */}
      <motion.div
        key={slides[index].title}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute  bottom-20 w-full flex justify-center px-6"
      >
        <div className="backdrop-blur-md bg-white/10 p-6 rounded-2xl max-w-2xl border border-white/20 shadow-xl text-center ">
          <h1 className="text-4xl md:text-6xl font-bold text-[#FEBC00] drop-shadow-lg tracking-wide">
            {slides[index].title}
          </h1>
          <p className="text-gray-100 mt-3 text-lg md:text-xl leading-relaxed">
            {slides[index].text}
          </p>
        </div>
      </motion.div>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === i ? "bg-[#FEBC00] scale-125 shadow-lg" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
