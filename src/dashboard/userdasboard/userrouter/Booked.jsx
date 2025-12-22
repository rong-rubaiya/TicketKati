import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const Booked = () => {
  const { user } = useContext(AuthContext);
  const [bookedTickets, setBookedTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;
useEffect(() => {
  if (!user) return;

  fetch(`https://ticketkati.vercel.app/bookings`)
    .then(res => res.json())
    .then(data => {
      const userBookings = data
        .filter(b => b.userEmail === user.email)
        .filter(b => (b.ticket?.quantity || 0) > 0); // ✅ only show positive quantity
      setBookedTickets(userBookings);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newCountdowns = {};
      bookedTickets.forEach(b => {
        if (!b.ticket?.departureDateTime || b.status === "rejected") return;

        const now = Date.now();
        const dep = new Date(b.ticket.departureDateTime).getTime();
        const diff = dep - now;

        if (diff <= 0) newCountdowns[b._id] = "Expired";
        else {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const m = Math.floor((diff / (1000 * 60)) % 60);
          const s = Math.floor((diff / 1000) % 60);
          newCountdowns[b._id] = `${d}d ${h}h ${m}m ${s}s`;
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [bookedTickets]);

  const handlePayment = async (b) => {
    const now = Date.now();
    const dep = new Date(b.ticket.departureDateTime).getTime();

    if (dep <= now) {
  return Swal.fire({
    icon: "warning",
    title: "Invalid Time",
    text: "Departure time has already passed!",
    confirmButtonColor: "#f59e0b",
  });
}

    const paymentInfo = {
      cost: (b.ticket.price || 0) * b.quantity,
      bookingId: b._id,
      senderEmail: b.userEmail,
      bookingName: b.ticket.title,
    };

    const res = await axios.post(
      "https://ticketkati.vercel.app/create-checkout-session",
      paymentInfo
    );
    window.location.href = res.data.url;
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "accepted":
        return "bg-[#FEBC00]/20 text-[#c58f00]";
      case "paid":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  const indexOfLast = currentPage * ticketsPerPage;
  const indexOfFirst = indexOfLast - ticketsPerPage;
  const currentTickets = bookedTickets.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(bookedTickets.length / ticketsPerPage);

  return (
    <div className=" py-10 px-6 transition-colors">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#FEBC00] dark:text-[#2C9CE5]">
        My Booked Tickets
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTickets.map(b => (
          <div
            key={b._id}
            className="bg-white dark:bg-[#00138e]/40 backdrop-blur-lg
                       rounded-2xl shadow-lg p-4 text-sm
                       border border-[#FEBC00]/30 dark:border-[#2C9CE5]/30"
          >
            <img
              src={b.ticket?.image}
              alt={b.ticket?.title}
              className="rounded-xl h-40 w-full object-cover mb-3"
            />

            <h2 className="text-lg font-bold text-gray-800 dark:text-white">
              {b.ticket?.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-200">
              {b.ticket?.from} → {b.ticket?.to}
            </p>

            <p className="text-gray-600 dark:text-gray-300">
              Departure: {new Date(b.ticket?.departureDateTime).toLocaleString()}
            </p>

            <p className="mt-1">
              Quantity: <b>{b.quantity}</b>
            </p>

            <p>
              Total: <b>৳ {(b.ticket?.price || 0) * b.quantity}</b>
            </p>

            {b.status !== "rejected" && (
              <p className="mt-1 text-xs">
                Countdown: <b>{countdowns[b._id]}</b>
              </p>
            )}

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${statusColor(
                b.status
              )}`}
            >
              {b.status.toUpperCase()}
            </span>

            {b.status === "accepted" && (
              <button
                onClick={() => handlePayment(b)}
                className="w-full mt-4 bg-[#FEBC00] hover:bg-[#ffdf89]
                           text-black font-bold py-2 rounded-xl transition"
              >
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-1 rounded-full font-bold transition
              ${
                currentPage === i + 1
                  ? "bg-[#FEBC00] text-black"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Booked;
