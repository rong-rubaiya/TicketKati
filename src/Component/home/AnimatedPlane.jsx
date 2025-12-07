import React from "react";
import { motion } from "framer-motion";
import plane from "../../assets/airplane.png";

const AnimatedPlane = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {/* Plane moving from left-bottom to right-top */}
      <motion.img
        src={plane}
        alt="plane"
        className="w-20 md:w-48 absolute"
        initial={{ 
          x: "-100vw", 
          y: "300vh",
          rotate: 20
        }}
        animate={{ 
         x: "100vw",
          y: "-100vh",
          rotate: -10
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.1, // Small pause before restarting
        }}
      />
    </div>
  );
};

export default AnimatedPlane;