import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const MyAddedTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;

  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

  useEffect(() => {
    if (!user?.email) return;

    fetch(`${backendURL}/tickets/vendor/${user.email}`)
      .then(res => res.json())
      .then(data => {
        // Sort: pending first, then approved, then rejected
        const sorted = data.sort((a, b) => {
          const order = { pending: 1, approved: 2, rejected: 3 };
          return (order[a.verificationStatus] || 4) - (order[b.verificationStatus] || 4);
        });
        setTickets(sorted);
      })
      .catch(err => console.error(err));
  }, [backendURL, user.email]);

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
        {currentTickets.map(ticket => (
          <div
            key={ticket._id}
            className="bg-white dark:bg-[#0f0f2a] border dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={ticket.image || "/images/placeholder.jpg"}
              alt={ticket.title}
              className="h-40 w-full object-cover rounded-lg mb-3"
            />
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">{ticket.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{ticket.from} → {ticket.to}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Departure: {new Date(ticket.departureDateTime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Price: ৳{ticket.price} | Qty: {ticket.quantity}
            </p>

            {/* Status badge */}
            <span
              className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold w-fit ${statusStyle(
                ticket.verificationStatus
              )}`}
            >
              {ticket.verificationStatus?.toUpperCase()}
            </span>

            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                disabled={ticket.verificationStatus === "rejected"}
                className={`flex-1 py-2 rounded-lg font-semibold transition
                ${
                  ticket.verificationStatus === "rejected"
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#2C9CE5] text-white hover:bg-[#2486c7]"
                }`}
              >
                Update
              </button>

              <button
                disabled={ticket.verificationStatus === "rejected"}
                className={`flex-1 py-2 rounded-lg font-semibold transition
                ${
                  ticket.verificationStatus === "rejected"
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
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded bg-[#cc810f] text-white hover:bg-[#ff9900]"
        >
          ← Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded transition ${
              currentPage === i + 1 ? "bg-[#ff9900] text-white" : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          className="px-3 py-1 rounded bg-[#cc810f] text-white hover:bg-[#ff9900]"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MyAddedTickets;
