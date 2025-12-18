import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const SingleTickets = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Fetch ticket data
  useEffect(() => {
    fetch(`${backendURL}/ticket/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then((data) => {
        setTicket(data.result || data); // support both structures
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [backendURL, id]);

  // Countdown timer
  useEffect(() => {
    if (!ticket) return;
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const departure = new Date(ticket.departureDateTime).getTime();
      const diff = departure - now;

      if (diff <= 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [ticket]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (!ticket) return <p className="text-center mt-10 text-red-500">Ticket not found</p>;

  const isExpired = new Date(ticket.departureDateTime).getTime() < new Date().getTime();

  const handleBooking = () => {
    const bookingData = {
      ticketId: ticket._id,
      userEmail: user.email,
      quantity,
      status: "Pending",
      bookingDate: new Date(),
    };

    fetch(`${backendURL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then(() => {
        setOpenModal(false);
        navigate("/dashboard/user/booked-tickets");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="pt-28 pb-10 px-4 bg-gray-100 dark:bg-[#0f0f2a] min-h-screen">
      <div className="w-11/12 mx-auto rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-[#1a1a3a] transition-colors duration-500">
        {/* Image */}
        <img
          src={ticket.image || "/images/placeholder.jpg"}
          onError={(e) => (e.target.src = "/images/placeholder.jpg")}
          alt={ticket.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-8 space-y-6">
          {/* Title + Approved */}
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{ticket.title}</h1>
            {ticket.approved && (
              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                Approved
              </span>
            )}
          </div>

          {/* Countdown */}
          <p
            className={`font-semibold text-lg px-4 py-2 w-fit rounded-full shadow-md transition-colors ${
              isExpired
                ? "bg-red-100 text-red-600"
                : "bg-[#FEBC00]/20 text-[#FEBC00] dark:bg-[#2C9CE5]/20 dark:text-[#2C9CE5]"
            }`}
          >
            Departure In: {timeLeft}
          </p>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{ticket.description}</p>

          {/* Route Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold">From</p>
              <p>{ticket.from}</p>
            </div>
            <div>
              <p className="font-semibold">To</p>
              <p>{ticket.to}</p>
            </div>
            <div>
              <p className="font-semibold">Transport</p>
              <p>{ticket.transportType}</p>
            </div>
          </div>

          {/* Perks */}
          {ticket.perks?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Perks</p>
              <div className="flex flex-wrap gap-2">
                {ticket.perks.map((perk, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-700 dark:bg-[#2C9CE5]/20 dark:text-[#2C9CE5] px-3 py-1 rounded-full text-sm font-medium">
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price + Booking */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-6">
            <div>
              <p className="text-2xl font-bold text-green-600">৳ {ticket.price}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Available Seats: {ticket.quantity}</p>
            </div>

            <button
              disabled={!user || ticket.quantity === 0 || isExpired}
              onClick={() => setOpenModal(true)}
              className="bg-[#FEBC00] dark:bg-[#2C9CE5] hover:bg-yellow-400 dark:hover:bg-blue-500 text-black dark:text-white px-8 py-3 rounded-xl font-semibold transition disabled:bg-gray-400"
            >
              {isExpired ? "Departure Passed" : ticket.quantity === 0 ? "Sold Out" : user ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </div>
      </div>

     {/* Booking Modal */}
{openModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-[#1a1a3a] p-6 rounded-xl w-96 transition-colors duration-500">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Book Ticket</h2>
      
      <label className="block mb-2 text-gray-700 dark:text-gray-200 font-medium">Select Quantity</label>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full border p-2 rounded mb-4 dark:bg-[#0f0f2a] dark:text-white dark:border-gray-600 transition-colors"
      >
        {Array.from({ length: ticket.quantity }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <div className="flex gap-3">
        <button
          onClick={handleBooking}
          className="bg-[#FEBC00] dark:bg-[#2C9CE5] hover:bg-yellow-400 dark:hover:bg-blue-500 text-black dark:text-white px-4 py-2 rounded font-semibold"
        >
          Confirm
        </button>
        <button
          onClick={() => setOpenModal(false)}
          className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded text-black dark:text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default SingleTickets;
