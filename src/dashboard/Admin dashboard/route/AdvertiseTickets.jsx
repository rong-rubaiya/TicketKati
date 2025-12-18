import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdvertiseTickets = () => {
  const backendURL = import.meta.env.VITE_APP_BACKEND_URL;
  const [tickets, setTickets] = useState([]);

  // Fetch approved tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch(`${backendURL}/tickets/approved`);
        const data = await res.json();
        // Add advertised property (default false)
        const updatedData = data.map(t => ({ ...t, advertised: t.advertised || false }));
        setTickets(updatedData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTickets();
  }, [backendURL]);

  // Advertise/unadvertise a ticket
  const handleAdvertise = async (ticket) => {
    const action = ticket.advertised ? "unadvertise" : "advertise";

    // SweetAlert confirmation
    const result = await Swal.fire({
      icon: "question",
      title: `Are you sure you want to ${action} this ticket?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${backendURL}/tickets/advertise/${ticket._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ advertised: !ticket.advertised }),
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: `Ticket ${action}d successfully`,
          timer: 1500,
          showConfirmButton: false,
        });
        setTickets(prev => prev.map(t => t._id === ticket._id ? { ...t, advertised: !t.advertised } : t));
      } else {
        Swal.fire({
          icon: "error",
          title: "Action failed",
          text: data.message || "Unknown error",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Action failed",
      });
    }
  };

  // Delete ticket
  const handleDelete = async (ticketId) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure you want to delete this ticket?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${backendURL}/tickets/${ticketId}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Ticket deleted successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        setTickets(prev => prev.filter(t => t._id !== ticketId));
      } else {
        Swal.fire({
          icon: "error",
          title: "Delete failed",
          text: data.message || "Unknown error",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Delete failed" });
    }
  };

  return (
    <div className="my-10 mx-auto w-11/12 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Advertise Tickets
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-[#1e1e3a] rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left">Ticket</th>
              <th className="px-4 py-3 text-left">Vendor</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Advertise</th>
              <th className="px-4 py-3 text-center">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#12123a]">
                <td className="px-4 py-3">{ticket.title}</td>
                <td className="px-4 py-3">{ticket.vendorName}</td>
                <td className="px-4 py-3 text-center font-semibold">৳ {ticket.price}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleAdvertise(ticket)}
                    className={`px-4 py-1 rounded-full font-semibold text-white transition ${
                      ticket.advertised ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {ticket.advertised ? "Unadvertise" : "Advertise"}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleDelete(ticket._id)}
                    className="px-4 py-1 rounded-full font-semibold text-white bg-red-500 hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Note: You cannot advertise more than 6 tickets at a time.
      </p>
    </div>
  );
};

export default AdvertiseTickets;
