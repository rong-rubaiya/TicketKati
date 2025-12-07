// LatestTickets.jsx
import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const LatestTickets = () => {
  const navigate = useNavigate();

  // Example: 8 recently added tickets
  const tickets = [
    {
      id: 101,
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "City Skyline Tour",
      price: 55,
      quantity: 10,
      transport: "Bus",
      perks: ["Guide", "Snacks"]
    },
    {
      id: 102,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Sunset Beach Escape",
      price: 100,
      quantity: 5,
      transport: "Boat",
      perks: ["Lunch", "Beach games"]
    },
    {
      id: 103,
      image: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Mountain Adventure",
      price: 80,
      quantity: 8,
      transport: "Hike",
      perks: ["Guide", "Safety gear"]
    },
    {
      id: 104,
      image: "https://images.unsplash.com/photo-1551907234-9f007ebc25f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Safari Experience",
      price: 120,
      quantity: 6,
      transport: "Jeep",
      perks: ["Guide", "Binoculars"]
    },
    {
      id: 105,
      image: "https://images.unsplash.com/photo-1533616688412-0b6f44b9f7ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "City Nightlife",
      price: 60,
      quantity: 12,
      transport: "Bus",
      perks: ["Drinks", "Music"]
    },
    {
      id: 106,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "River Cruise",
      price: 90,
      quantity: 7,
      transport: "Boat",
      perks: ["Dinner", "Live music"]
    },
    {
      id: 107,
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Historic Landmarks Tour",
      price: 70,
      quantity: 9,
      transport: "Bus",
      perks: ["Guide", "Snacks"]
    },
    {
      id: 108,
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
      title: "Island Adventure",
      price: 130,
      quantity: 4,
      transport: "Boat",
      perks: ["Lunch", "Snorkeling"]
    }
  ];

  // Framer Motion Variants
  

  

  

  return (
    <section className="w-11/12 mx-auto px-4 py-10">
      <h2 className="text-5xl font-bold text-center mb-8 text-[#FEBC00] dark:text-[#2C9CE5]">
        Latest Tickets
      </h2>
      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {tickets.map(ticket => (
          <motion.div
            key={ticket.id}
            className="bg-white dark:bg-[#0b0b1f] rounded-xl shadow-md overflow-hidden cursor-pointer"
            
            whileHover="hover"
            onClick={() => navigate(`/tickets/${ticket.id}`)}
          >
            <motion.div className="h-40 overflow-hidden rounded-t-xl">
              <motion.img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-full object-cover"
               
              />
            </motion.div>
            <div className="p-3">
              <h3 className="text-lg font-semibold mb-1 text-white dark:text-white">{ticket.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Price: ${ticket.price} / unit</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Quantity: {ticket.quantity}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">Transport: {ticket.transport}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Perks: {ticket.perks.join(", ")}</p>
              <motion.button
               
                className="btnStyle bg-[#FEBC00] hover:bg-[#ffdf89] dark:bg-[#2C9CE5] dark:hover:bg-blue-300"
               
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

export default LatestTickets;
