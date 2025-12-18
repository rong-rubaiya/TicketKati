import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-tickets")
      .then((res) => res.json())
      .then((data) => {
        // Only show pending tickets
        const pendingTickets = data.filter(ticket => ticket.verificationStatus === "pending");
        setTickets(pendingTickets);
      })
      .catch((err) => console.error(err));
  }, []);

  const statusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleAction = async (ticketId, action) => {
    const confirm = await Swal.fire({
      title: `Are you sure?`,
      text: `You want to ${action} this ticket!`,
      icon: action === "approve" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/tickets/${action}/${ticketId}`, { method: "PATCH" });
      if (!res.ok) throw new Error(`Failed to ${action} ticket`);

      Swal.fire(`${action.charAt(0).toUpperCase() + action.slice(1)}d!`, `Ticket has been ${action}d.`, "success");

      // Remove ticket from pending list
      setTickets(prev => prev.filter(t => t._id !== ticketId));
    } catch (err) {
      Swal.fire("Error!", err.message, "error");
    }
  };

  return (
    <div className="my-10 p-6 bg-white dark:bg-[#0f0f2a] rounded-2xl shadow-md dark:border-gray-700 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Manage Tickets</h2>

      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">No pending tickets.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-[#0f0f2a] text-sm border border-gray-200 dark:border-gray-600 rounded-xl">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left">Ticket</th>
                <th className="px-4 py-3 text-left">Vendor</th>
                <th className="px-4 py-3 text-center">Price</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#12123a]">
                  <td className="px-4 py-3">{ticket.title}</td>
                  <td className="px-4 py-3">{ticket.vendorName}</td>
                  <td className="px-4 py-3 text-center font-semibold">৳ {ticket.price}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(ticket.verificationStatus)}`}>
                      {ticket.verificationStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2">
                    <button onClick={() => handleAction(ticket._id, "approve")} className="px-3 py-1 rounded-md bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition">
                      Approve
                    </button>
                    <button onClick={() => handleAction(ticket._id, "reject")} className="px-3 py-1 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageTickets;
