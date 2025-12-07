// Advertise.jsx
import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Advertise = () => {
  const navigate = useNavigate();

  const tickets = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "City Tour Adventure",
      price: 50,
      quantity: 10,
      transport: "Bus",
      perks: ["Guide", "Snacks"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Beach Escape",
      price: 100,
      quantity: 5,
      transport: "Boat",
      perks: ["Lunch", "Beach games"]
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Mountain Trekking",
      price: 80,
      quantity: 8,
      transport: "Hike",
      perks: ["Guide", "Safety gear"]
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1551907234-9f007ebc25f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Safari Adventure",
      price: 120,
      quantity: 6,
      transport: "Jeep",
      perks: ["Guide", "Binoculars"]
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1533616688412-0b6f44b9f7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "City Nightlife Tour",
      price: 60,
      quantity: 12,
      transport: "Bus",
      perks: ["Drinks", "Music"]
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "River Cruise Experience",
      price: 90,
      quantity: 7,
      transport: "Boat",
      perks: ["Dinner", "Live music"]
    }
  ];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.5 } }
  };

  
  

  return (
    <section className="w-11/12 mx-auto px-4 py-10">
      <h2 className="text-5xl text-[#FEBC00] dark:text-[#2C9CE5] font-bold text-center mb-8">
        Featured Tickets
      </h2>
      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {tickets.map(ticket => (
          <motion.div
            key={ticket.id}
            className="bg-white dark:bg-[#0b0b1f] rounded-xl shadow-md overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            onClick={() => navigate(`/tickets/${ticket.id}`)}
          >
            <motion.div className="h-48 overflow-hidden rounded-t-xl">
              <motion.img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-full object-cover"
                
              />
            </motion.div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1  text1">{ticket.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Price: ${ticket.price} / unit</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Quantity: {ticket.quantity}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Transport: {ticket.transport}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">Perks: {ticket.perks.join(", ")}</p>
              <motion.button
                onClick={(e) => { e.stopPropagation(); navigate(`/tickets/${ticket.id}`); }}
                className="btnStyle bg-[#FEBC00] hover:bg-[#ffdf89] dark:bg-[#2C9CE5] dark:hover:bg-blue-300"
                
                whileHover="hover"
              >
                See Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Advertise;
