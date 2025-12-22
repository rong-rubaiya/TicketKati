import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const AllTickets = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [transportFilter, setTransportFilter] = useState("all");

  

  // Fetch all tickets from backend
  useEffect(() => {
    fetch(`https://ticketkati.vercel.app/all-tickets`)
      .then((res) => res.json())
      .then((data) => {
        // Filter only approved tickets
        const approvedTickets = data.filter(ticket => ticket.verificationStatus === "approved");
        setTickets(approvedTickets);
        setFilteredTickets(approvedTickets);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Filter tickets by search or transport
  useEffect(() => {
    let updated = [...tickets];

    // Transport filter
    if (transportFilter !== "all") {
      updated = updated.filter(t => t.transportType === transportFilter);
    }

    // Search filter
    if (search.trim() !== "") {
      const lower = search.toLowerCase();
      updated = updated.filter(
        t =>
          t.title.toLowerCase().includes(lower) ||
          t.from.toLowerCase().includes(lower) ||
          t.to.toLowerCase().includes(lower)
      );
    }

    setFilteredTickets(updated);
  }, [search, transportFilter, tickets]);

  if (loading) {
    return <p className="text-center pt-10 text-gray-500 dark:text-gray-300">Loading tickets...</p>;
  }

  return (
    <div className="py-28 w-11/12 max-w-7xl mx-auto transition-colors">
      <h2 className="text-3xl text-center font-bold mb-6 text-[#FEBC00] dark:text-[#2C9CE5]">All Tickets</h2>

      {/* Search & Transport Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title, from or to..."
          className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FEBC00] dark:focus:ring-[#2C9CE5] w-full sm:w-1/2 text-gray-900 dark:text-white bg-white dark:bg-[#001138]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FEBC00] dark:focus:ring-[#2C9CE5] text-gray-900 dark:text-white bg-white dark:bg-[#001138]"
          value={transportFilter}
          onChange={(e) => setTransportFilter(e.target.value)}
        >
          <option value="all">All Transport</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Air">Air</option>
          <option value="Launch">Launch</option>
        </select>
      </div>

      {/* Ticket cards */}
      {filteredTickets.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No tickets found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTickets.map(ticket => (
            <div
              key={ticket._id}
              className="rounded-2xl shadow bg-white dark:bg-[#00138e]/40 border border-[#FEBC00]/30 dark:border-[#2C9CE5]/30 overflow-hidden transition-colors"
            >
              <img
                src={ticket.image || "/images/placeholder.jpg"}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{ticket.title}</h3>
                <p className="text-gray-700 dark:text-gray-200">{ticket.from} → {ticket.to}</p>
                <p className="text-gray-700 dark:text-gray-200">Transport: {ticket.transportType}</p>
                <p className="font-semibold text-gray-800 dark:text-white">Price: ৳{ticket.price}</p>
                <Link to={`/ticket/${ticket._id}`}>
                  <button className="mt-4 w-full bg-[#FEBC00] dark:bg-[#2C9CE5] hover:bg-[#ffdf89] dark:hover:bg-[#3aa0ff] text-black dark:text-white py-2 rounded-xl font-bold transition">
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTickets;
