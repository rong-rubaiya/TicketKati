import React, { useState } from "react";

const MyAddedTickets = () => {
  const tickets = [
    {
      id: 1,
      title: "Dhaka → Chittagong",
      image:
        "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg",
      from: "Dhaka",
      to: "Chittagong",
      departure: "2025-12-15 08:30 AM",
      price: 1250,
      quantity: 40,
      status: "pending",
    },
    {
      id: 2,
      title: "Dhaka → Sylhet",
      image:
        "https://images.pexels.com/photos/21014/pexels-photo.jpg",
      from: "Dhaka",
      to: "Sylhet",
      departure: "2025-12-20 10:00 AM",
      price: 1500,
      quantity: 25,
      status: "approved",
    },
    {
      id: 3,
      title: "Dhaka → Rajshahi",
      image:
        "https://images.pexels.com/photos/462024/pexels-photo-462024.jpeg",
      from: "Dhaka",
      to: "Rajshahi",
      departure: "2025-12-22 09:00 AM",
      price: 1300,
      quantity: 15,
      status: "rejected",
    },
    {
      id: 4,
      title: "Dhaka → Khulna",
      image:
        "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      from: "Dhaka",
      to: "Khulna",
      departure: "2025-12-18 06:45 PM",
      price: 1100,
      quantity: 20,
      status: "approved",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;

  const indexOfLast = currentPage * ticketsPerPage;
  const indexOfFirst = indexOfLast - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(tickets.length / ticketsPerPage);

  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-[#FEBC00]/30 text-[#FEBC00]";
      case "approved":
        return "bg-[#2C9CE5]/30 text-[#2C9CE5]";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        My Added Tickets
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white dark:bg-[#0f0f2a] border dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={ticket.image}
              alt={ticket.title}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />

            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              {ticket.title}
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              {ticket.from} → {ticket.to}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Departure: {ticket.departure}
            </p>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Price: ৳{ticket.price} | Qty: {ticket.quantity}
            </p>

            {/* Status */}
            <span
              className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold w-fit ${statusStyle(
                ticket.status
              )}`}
            >
              {ticket.status.toUpperCase()}
            </span>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                disabled={ticket.status === "rejected"}
                className={`flex-1 py-2 rounded-lg font-semibold transition
                ${
                  ticket.status === "rejected"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#2C9CE5] text-white hover:bg-[#2486c7]"
                }`}
              >
                Update
              </button>

              <button
                disabled={ticket.status === "rejected"}
                className={`flex-1 py-2 rounded-lg font-semibold transition
                ${
                  ticket.status === "rejected"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-[#cc810f] text-white hover:bg-[#ff9900]"
        >
          ← Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded transition ${
              currentPage === i + 1
                ? "bg-[#ff9900] text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="px-3 py-1 rounded bg-[#cc810f] text-white hover:bg-[#ff9900]"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MyAddedTickets;
