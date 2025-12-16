import React from 'react';

const AllTickets = () => {
  // Sample admin-approved tickets
  const tickets = [
    {
      id: 1,
      image: "https://via.placeholder.com/250x150",
      title: "Dhaka → Chittagong",
      from: "Dhaka",
      to: "Chittagong",
      transport: "Bus",
      price: 1200,
      quantity: 40,
      perks: ["AC", "WiFi", "Snacks"],
      departure: "2025-12-20 08:00 AM",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/250x150",
      title: "Dhaka → Sylhet",
      from: "Dhaka",
      to: "Sylhet",
      transport: "Bus",
      price: 1500,
      quantity: 30,
      perks: ["AC", "WiFi"],
      departure: "2025-12-21 09:00 AM",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/250x150",
      title: "Dhaka → Rajshahi",
      from: "Dhaka",
      to: "Rajshahi",
      transport: "Train",
      price: 1100,
      quantity: 50,
      perks: ["Sleeper", "Food Service"],
      departure: "2025-12-22 07:30 AM",
    },
  ];

  return (
    <div className="py-30 mx-auto w-11/12 max-w-7xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        All Tickets
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white dark:bg-[#1e1e3a] rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
            
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{ticket.title}</h3>
              <p className="text-gray-500 dark:text-gray-300">{ticket.from} → {ticket.to}</p>
              <p className="text-gray-500 dark:text-gray-300 mt-1">Transport: {ticket.transport}</p>
              <p className="text-gray-500 dark:text-gray-300 mt-1">Price: ৳ {ticket.price} per unit</p>
              <p className="text-gray-500 dark:text-gray-300 mt-1">Quantity: {ticket.quantity}</p>

              <div className="mt-2">
                <p className="text-gray-500 dark:text-gray-400 text-sm">Perks:</p>
                <ul className="flex flex-wrap gap-2 mt-1">
                  {ticket.perks.map((perk, index) => (
                    <li key={index} className="px-2 py-1 bg-[#FEBC00]/20 dark:bg-[#2C9CE5]/20 text-xs rounded-full">
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-500 dark:text-gray-300 mt-2 text-sm">Departure: {ticket.departure}</p>

              <button className="mt-4 w-full bg-[#FEBC00] dark:bg-[#2C9CE5] text-black dark:text-white font-semibold py-2 rounded-xl hover:bg-[#ffdf89] dark:hover:bg-[#3ba0ff] transition">
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
