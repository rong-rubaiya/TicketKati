import React, { useState } from "react";

const Booked = () => {
  const bookedTickets = [
    {
      id: 1,
      title: "Dhaka → Chittagong",
      image:
        "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      quantity: 2,
      unitPrice: 1250,
      from: "Dhaka",
      to: "Chittagong",
      departure: "2025-12-15 08:30 AM",
      status: "pending",
    },
    {
      id: 2,
      title: "Dhaka → Sylhet",
      image:
        "https://images.pexels.com/photos/21014/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      quantity: 1,
      unitPrice: 1500,
      from: "Dhaka",
      to: "Sylhet",
      departure: "2025-12-20 10:00 AM",
      status: "accepted",
    },
    {
      id: 3,
      title: "Dhaka → Khulna",
      image:
        "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      quantity: 3,
      unitPrice: 1100,
      from: "Dhaka",
      to: "Khulna",
      departure: "2025-12-18 06:45 PM",
      status: "paid",
    },
    {
      id: 4,
      title: "Dhaka → Rajshahi",
      image:
        "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      quantity: 1,
      unitPrice: 1300,
      from: "Dhaka",
      to: "Rajshahi",
      departure: "2025-12-22 09:00 AM",
      status: "rejected",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = bookedTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(bookedTickets.length / ticketsPerPage);

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#FEBC00]/30 text-[#FEBC00]";
      case "accepted":
        return "bg-[#2C9CE5]/30 text-[#2C9CE5]";
      case "rejected":
        return "bg-red-100 text-red-600";
      case "paid":
        return "bg-[#ff9900]/30 text-[#ff9900]";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        My Booked Tickets
      </h1>

      {/* Responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white dark:bg-[#0f0f2a] border dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition p-3 flex flex-col text-sm"
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="rounded-lg w-full h-40 object-cover mb-3"
            />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
              {ticket.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              From: <span className="font-semibold">{ticket.from}</span> → To:{" "}
              <span className="font-semibold">{ticket.to}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              Departure: <span className="font-semibold">{ticket.departure}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-1">
              Quantity: <span className="font-semibold">{ticket.quantity}</span>
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Total Price:{" "}
              <span className="font-bold text-gray-800 dark:text-white">
                ৳ {ticket.unitPrice * ticket.quantity}
              </span>
            </p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${statusColor(
                ticket.status
              )}`}
            >
              {ticket.status.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-3 py-1 rounded bg-[#cc810f] text-white hover:bg-[#ff9900] cursor-pointer transition-all duration-300"
        >
          &#8592; Prev
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            className={`px-3 py-1 rounded ${
              currentPage === idx + 1
                ? "bg-[#ff9900] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            } hover:bg-[#ff9900] cursor-pointer transition-all duration-300`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-3 py-1 rounded bg-[#cc810f] text-white hover:bg-[#ff9900] cursor-pointer transition-all duration-300"
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
};

export default Booked;
