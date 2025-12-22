import React, { useEffect, useState } from "react";
import { Link} from "react-router";
import { motion } from "framer-motion";

const LatestTickets = () => {
  
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("https://ticketkati.vercel.app/all-tickets") // backend endpoint
      .then(res => res.json())
      .then(data => {
        
        const sortedTickets = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setTickets(sortedTickets.slice(0, 8));
      })
      .catch(err => console.error(err));
  }, []);

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
            key={ticket._id}
            className="bg-white dark:bg-[#0b0b1f] rounded-xl shadow-md overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            
          >
            <motion.div className="h-40 overflow-hidden rounded-t-xl">
              <motion.img
                src={ticket.image}
                alt={ticket.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-3">
              <h3 className="text-lg font-semibold mb-1 text-white dark:text-white">
                {ticket.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Price: ${ticket.price} / unit
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Quantity: {ticket.quantity}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Transport: {ticket.transportType}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                Perks: {ticket.perks?.join(", ")}
              </p>
               <Link to={`/ticket/${ticket._id}`}>
                  <button className="mt-4 w-full bg-[#FEBC00] dark:bg-[#2C9CE5] hover:bg-[#ffdf89] dark:hover:bg-[#3aa0ff] text-black dark:text-white py-2 rounded-xl font-bold transition">
                    See Details
                  </button>
                </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LatestTickets;
