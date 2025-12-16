import React from "react";
import { motion } from "framer-motion";
import train from "../../src/assets/train-Photoroom.png"; // put your train PNG here

const AnimatedTrain = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[55] overflow-hidden">
      {/* Train moving one side to the other */}
      <motion.img
        src={train}
        alt="train"
        className="w-32 md:w-60 absolute bottom-0 left-0"
        initial={{ x: "-100vw" }}
        animate={{ x: "120vw" }}
        transition={{
          duration: 6,      // faster speed
          ease: "linear",   
          repeat: Infinity, // continuous loop
          repeatType: "loop",
        }}
      />
    </div>
  );
};

export default AnimatedTrain;
