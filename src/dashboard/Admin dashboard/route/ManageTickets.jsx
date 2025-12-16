import React from "react";

const ManageTickets = () => {
  const tickets = [
    { id: 1, title: "Dhaka → Chittagong", vendor: "Arafat Travels", price: 1200, status: "pending" },
    { id: 2, title: "Dhaka → Sylhet", vendor: "Nusrat Travels", price: 1500, status: "pending" },
    { id: 3, title: "Dhaka → Rajshahi", vendor: "Rakib Travels", price: 1100, status: "approved" },
  ];

  const statusStyle = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="my-10 p-6 bg-white dark:bg-[#0f0f2a] rounded-2xl shadow-md dark:border-gray-700 w-11/12 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Manage Tickets
      </h2>

      {/* Table for medium+ screens */}
      <div className="hidden md:block overflow-x-auto">
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
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#12123a]">
                <td className="px-4 py-3">{ticket.title}</td>
                <td className="px-4 py-3">{ticket.vendor}</td>
                <td className="px-4 py-3 text-center font-semibold">৳ {ticket.price}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(ticket.status)}`}>
                    {ticket.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="px-3 py-1 rounded-md bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition">Approve</button>
                    <button className="px-3 py-1 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for small screens */}
      <div className="md:hidden space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-gray-50 dark:bg-[#12123a] p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-600">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-800 dark:text-white">{ticket.title}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyle(ticket.status)}`}>
                {ticket.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Vendor: {ticket.vendor}</p>
            <p className="text-gray-600 dark:text-gray-300">Price: ৳ {ticket.price}</p>
            <div className="flex gap-2 mt-2">
              <button className="flex-1 px-3 py-1 rounded-md bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition">
                Approve
              </button>
              <button className="flex-1 px-3 py-1 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTickets;
