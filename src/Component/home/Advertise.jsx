import React from "react";
import { motion } from "framer-motion";

const tickets = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "City Tour Adventure",
    price: 50,
    transport: "Bus",
    perks: ["Guide", "Snacks"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Beach Escape",
    price: 100,
    transport: "Boat",
    perks: ["Lunch", "Beach games"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Mountain Trekking",
    price: 80,
    transport: "Hike",
    perks: ["Guide", "Safety gear"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1551907234-9f007ebc25f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "Safari Adventure",
    price: 120,
    transport: "Jeep",
    perks: ["Guide", "Binoculars"],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1533616688412-0b6f44b9f7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    title: "City Nightlife Tour",
    price: 60,
    transport: "Bus",
    perks: ["Drinks", "Music"],
  },
];

const Advertise = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-[#FEBC00]/20 to-[#ff9900]/20 dark:from-[#2C9CE5]/20 dark:to-[#0b1020]/20 overflow-hidden">
      
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#FEBC00] dark:text-[#2C9CE5] mb-16 ">
        Adventure Awaits! Book Your Next Trip
      </h2>

      {/* Marquee container */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-8 w-max">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              className="relative min-w-[300px] md:min-w-[350px] lg:min-w-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              {/* Ticket Image */}
              <img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-64 object-cover"
              />

              {/* Ticket Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{ticket.title}</h3>
                <p className="text-white text-sm mb-1">
                  ${ticket.price} — {ticket.transport}
                </p>
                <p className="text-white text-sm mb-2">
                  Perks: {ticket.perks.join(", ")}
                </p>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full bg-[#FEBC00] dark:bg-[#2C9CE5] text-black font-bold hover:bg-[#ffdf89] dark:hover:bg-blue-400 transition"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animated floating icons */}
      <motion.div
        className="absolute top-10 left-10 text-[#FEBC00]/50 text-6xl"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        ✈️
      </motion.div>
    <motion.div
  className="absolute bottom-20 text-[#2C9CE5] text-6xl"
  initial={{ x: "100vw" }}
  animate={{ x: "-100vw" }} // moves completely from right to left
  transition={{
    repeat: Infinity,
    duration: 16, // decrease for faster movement, increase for slower
    ease: "linear"
  }}
>
  🚌
</motion.div>
    </section>
  );
};

export default Advertise;
