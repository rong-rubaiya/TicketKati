import React, { useEffect, useState } from "react";

const RequestedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const statusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-[#FEBC00]/30 text-[#FEBC00]";
      case "accepted":
        return "bg-[#2C9CE5]/30 text-[#2C9CE5]";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // Accept booking
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/bookings/accept/${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        // Update the booking status locally
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "accepted" } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Reject booking
  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/bookings/reject/${id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "rejected" } : b))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-6">Loading bookings...</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Requested Bookings
      </h1>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white dark:bg-[#0f0f2a] rounded-xl shadow-md p-4 border dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="font-bold text-gray-800 dark:text-white">
                  {booking.ticket?.title || "No Ticket Info"}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {booking.userEmail}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                  booking.status
                )}`}
              >
                {booking.status.toUpperCase()}
              </span>
            </div>

            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Quantity: <span className="font-semibold">{booking.quantity}</span>
              </p>
              <p className="text-gray-800 dark:text-white font-bold text-sm">
                ৳ {booking.quantity * (booking.ticket?.price || 0)}
              </p>
            </div>

            {booking.status.toLowerCase() === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleAccept(booking._id)}
                  className="flex-1 px-3 py-2 rounded-md bg-[#2C9CE5] text-white text-sm font-semibold hover:bg-[#2486c7] transition"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(booking._id)}
                  className="flex-1 px-3 py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-md border dark:border-gray-700">
        <table className="min-w-full bg-white dark:bg-[#0f0f2a] text-sm">
          <thead className="bg-[#FEBC00]/30 dark:bg-[#2C9CE5]/30">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Ticket</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Total Price</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#12123a]"
              >
                <td className="px-4 py-3">{booking.userEmail}</td>
                <td className="px-4 py-3">{booking.ticket?.title || "No Ticket Info"}</td>
                <td className="px-4 py-3 text-center">{booking.quantity}</td>
                <td className="px-4 py-3 text-center font-bold">
                  ৳ {booking.quantity * (booking.ticket?.price || 0)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(booking.status)}`}>
                    {booking.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {booking.status.toLowerCase() === "pending" && (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAccept(booking._id)}
                        className="px-3 py-1 rounded-md bg-[#2C9CE5] text-white text-sm font-semibold hover:bg-[#2486c7] transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(booking._id)}
                        className="px-3 py-1 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;
