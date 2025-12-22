import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Advertise = () => {
  const [tickets, setTickets] = useState([]);
  
  const navigate=useNavigate()

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const res = await fetch("https://ticketkati.vercel.app/advertisements");
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error("Failed to fetch advertisements:", err);
      }
    };

    fetchAdvertisements();
  }, []);

  const handleBookNow = (ticket) => {
    // Navigate to a booking page and pass ticket data
    navigate('/tickets');
  };

  if (tickets.length === 0) return null; // Or show a loading spinner

  return (
    <section className="relative py-20 bg-gradient-to-r from-[#FEBC00]/20 to-[#ff9900]/20 dark:from-[#2C9CE5]/20 dark:to-[#0b1020]/20 overflow-hidden">
      
      {/* Heading */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-[#FEBC00] dark:text-[#2C9CE5] mb-16">
        Adventure Awaits! Book Your Next Trip
      </h2>

      {/* Marquee container */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-8 w-max">
          {tickets.map((ticket) => (
            <motion.div
              key={ticket.ticketId}
              className="relative min-w-[300px] md:min-w-[350px] lg:min-w-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              {/* Ticket Image */}
              <img
                src={ticket.image || "/images/placeholder.jpg"}
                alt={ticket.title}
                className="w-full h-64 object-cover"
              />

              {/* Ticket Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-xl font-bold text-white">{ticket.title}</h3>
                <p className="text-white text-sm mb-1">
                  ৳{ticket.price} — {ticket.transportType}
                </p>
                {ticket.perks?.length > 0 && (
                  <p className="text-white text-sm mb-2">
                    Perks: {ticket.perks.join(", ")}
                  </p>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 rounded-full bg-[#FEBC00] dark:bg-[#2C9CE5] text-black font-bold hover:bg-[#ffdf89] dark:hover:bg-blue-400 transition"
               onClick={() => handleBookNow(ticket)} >
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
        animate={{ x: "-100vw" }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: "linear"
        }}
      >
        🚌
      </motion.div>
    </section>
  );
};

export default Advertise;
