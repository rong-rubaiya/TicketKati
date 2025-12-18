import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Booked = () => {
  const { user } = useContext(AuthContext);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;

  // Fetch user bookings
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/bookings/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setBookedTickets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  // Live countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      bookedTickets.forEach(b => {
        if (!b.ticket?.departureDateTime) return;
        const now = new Date().getTime();
        const dep = new Date(b.ticket.departureDateTime).getTime();
        const diff = dep - now;

        if (diff <= 0) newCountdowns[b._id] = "Expired";
        else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / (1000 * 60)) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          newCountdowns[b._id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookedTickets]);

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = bookedTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(bookedTickets.length / ticketsPerPage);

  const statusColor = (status) => {
    switch (status) {
      case "pending": return "bg-[#FEBC00]/30 text-[#FEBC00]";
      case "accepted": return "bg-[#2C9CE5]/30 text-[#2C9CE5]";
      case "rejected": return "bg-red-100 text-red-600";
      case "paid": return "bg-[#ff9900]/30 text-[#ff9900]";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handlePay = async (id) => {
    await fetch(`http://localhost:5000/bookings/pay/${id}`, { method: "PATCH" });
    setBookedTickets(prev => prev.map(b => b._id === id ? { ...b, status: "paid" } : b));
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Booked Tickets</h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentTickets.map(b => (
          <div key={b._id} className="bg-white rounded-xl shadow-md p-3 flex flex-col text-sm">
            <img src={b.ticket?.image || "/images/placeholder.jpg"} alt={b.ticket?.title} className="rounded-lg w-full h-40 object-cover mb-3"/>
            <h2 className="text-lg font-bold mb-1">{b.ticket?.title}</h2>
            <p>From: <b>{b.ticket?.from}</b> → To: <b>{b.ticket?.to}</b></p>
            <p>Departure: <b>{new Date(b.ticket?.departureDateTime).toLocaleString()}</b></p>
            <p>Quantity: <b>{b.quantity}</b></p>
            <p>Total Price: <b>৳ {(b.ticket?.price || 0) * b.quantity}</b></p>
            <p>Countdown: <b>{countdowns[b._id] || "Calculating..."}</b></p>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${statusColor(b.status)}`}>
              {b.status.toUpperCase()}
            </span>

            {b.status === "accepted" && (
              <button onClick={() => handlePay(b._id)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button onClick={() => setCurrentPage(prev => Math.max(prev-1,1))} className="px-3 py-1 rounded bg-[#cc810f] text-white">&#8592; Prev</button>
        {[...Array(totalPages)].map((_, idx) => (
          <button key={idx+1} onClick={() => setCurrentPage(idx+1)} className={`px-3 py-1 rounded ${currentPage === idx+1 ? "bg-[#ff9900] text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}>{idx+1}</button>
        ))}
        <button onClick={() => setCurrentPage(prev => Math.min(prev+1,totalPages))} className="px-3 py-1 rounded bg-[#cc810f] text-white">Next &#8594;</button>
      </div>
    </div>
  );
};

export default Booked;
